type Token = {
    access_token: string,
    expires: number
}

type Suggestions = {
    suggestion: Category[],
}

type Category = {
    id: string,
    name: string,
    meta?: Meta
}

type Meta = { [name: string]: string };

type ApiResponse = {
    categorySuggestions: {
        category: {
            categoryId: string,
            categoryName: string,
        }
        categoryTreeNodeLevel: number,
        categoryTreeNodeAncestors: {
            categoryId: string,
            categoryName: string,
            categoryTreeNodeLevel: number,
            categorySubtreeNodeHref: string
        }[]
    }[]
}

const getToken = async (auth: string): Promise<Token> => {

    console.log("GET TOKEN");

    const tokenResponse = await fetch(
        'https://api.ebay.com/identity/v1/oauth2/token',
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${auth}`
            },
            body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope"
        });

    if (tokenResponse.status !== 200) {
        throw new Error("Error getting token");
    }

    const token: { access_token: string, expires_in: number } = await tokenResponse.json();

    return {
        access_token: token.access_token,
        expires: (Date.now() / 1000) + (token.expires_in - 60)
    }
}

const getCredentials = async (auth: string, cache: KVNamespace): Promise<Token> => {
    const token = await cache.get('TOKEN');
    let credentials: Token;
    if (token) {
        credentials = JSON.parse(token);
        if (credentials.expires < (Date.now() / 1000)) {
            await cache.delete("TOKEN");
            credentials = await getToken(auth);
            await cache.put("TOKEN", JSON.stringify(credentials));
        }
    }
    else {
        credentials = await getToken(auth);
        await cache.put("TOKEN", JSON.stringify(credentials));
    }
    return credentials;
}

const extendCategory = async (category: Category, cache: KVNamespace, tariff: KVNamespace) => {
    const m = await cache.get(`META_${category.id}`);
    if (m) {
        category.meta = JSON.parse(m);

        if (category.meta && category.meta.hsCode) {

            let tariffCode = category.meta.hsCode;
            if (tariffCode.endsWith("00")) {
                tariffCode = tariffCode.slice(0, -2);
            }

            let attempts = 0;
            while (tariffCode.length > 0 && attempts < 3) {
                const detail = await tariff.get(tariffCode);
                if (detail) {
                    category.meta.tariff = detail;
                    break;
                }
                attempts++;
                tariffCode = tariffCode.slice(0, -2);
            }
        }
    }
}

const getCategories = async (query: string, auth: string, cache: KVNamespace): Promise<Suggestions[]> => {
    const key = `SUGGESTION_${query}`;
    const cached = await cache.get(key);

    if (cached) {
        return JSON.parse(cached);
    }

    const credentials = await getCredentials(auth, cache);

    const response = await fetch(
        `https://api.ebay.com/commerce/taxonomy/v1/category_tree/3/get_category_suggestions?q=${encodeURIComponent(query)}`,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${credentials.access_token}`
            }
        });

    if (response.status === 204) {
        return [];
    }

    if (response.status !== 200) {
        await cache.delete("TOKEN");
        throw new Error(`Failed to look ${response.status}`);
    }

    const payload: ApiResponse = await response.json();
    const result: Suggestions[] = [];

    for (let sc of payload.categorySuggestions) {
        const category: Category[] = [];

        for (let c of sc.categoryTreeNodeAncestors.reverse()) {
            category.push({ id: c.categoryId, name: c.categoryName });
        }
        category.push({ id: sc.category.categoryId, name: sc.category.categoryName });
        result.push({ suggestion: category });
    }

    await cache.put(key, JSON.stringify(result));

    return result;
}

const buildEtag = async (result: Suggestions[]) => {
    const msgUint8 = new TextEncoder().encode(JSON.stringify(result)) // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('MD5', msgUint8) // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
}

export const onRequestGet: PagesFunction<{ RESULTS: KVNamespace, TARIFF: KVNamespace, AUTH: string }> = async ({ params, env, request }) => {

    try {
        const query = params.id.toString().trim().toLowerCase();
        const suggestions = await getCategories(query, env.AUTH, env.RESULTS);

        const tasks: Promise<void>[] = [];
        for (let s of suggestions) {
            for (let c of s.suggestion) {
                tasks.push(extendCategory(c, env.RESULTS, env.TARIFF))
            }
        }
        await Promise.all(tasks);

        const etag = await buildEtag(suggestions);

        if (request.headers.has("If-None-Match") &&
            request.headers.get("If-None-Match") === `W/\"${etag}\"`) {
            return new Response(null, {
                status: 304
            });
        }

        return new Response(JSON.stringify({ suggestions: suggestions }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=60",
                "ETag": `W/\"${etag}\"`
            }
        });
    }
    catch (e) {
        return new Response(JSON.stringify({ error: e }), { status: 500 });
    }
}
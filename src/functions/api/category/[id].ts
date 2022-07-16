type Token = {
    access_token: string,
    expires: number
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
        expires: new Date().getSeconds() + (token.expires_in - 60)
    }
}

const getCredentials = async (auth: string, cache: KVNamespace): Promise<Token> => {
    const token = await cache.get('TOKEN');
    let credentials: Token;
    if (token) {
        credentials = JSON.parse(token);
        if (credentials.expires < new Date().getSeconds()) {
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

const getCategory = async (query: string, auth: string, cache: KVNamespace): Promise<Category[]> => {
    const key = `CATEGORY_${query}`;
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

    if (response.status !== 200) {
        return [];
    }

    const payload: ApiResponse = await response.json();
    const best = payload.categorySuggestions[0];

    const result: Category[] = [];

    for (let c of best.categoryTreeNodeAncestors.reverse()) {
        result.push({ id: c.categoryId, name: c.categoryName });
    }

    result.push({ id: best.category.categoryId, name: best.category.categoryName });

    await cache.put(key, JSON.stringify(result));

    return result;
}

export const onRequestGet: PagesFunction<{ RESULTS: KVNamespace, AUTH: string }> = async ({ params, env }) => {

    const query = (params.id as string).trim().toLowerCase();
    const category = await getCategory(query, env.AUTH, env.RESULTS);

    for (let c of category) {
        const m = await env.RESULTS.get(`META_${c.id}`);
        if (m) {
            c.meta = JSON.parse(m);
        }
    }

    return new Response(JSON.stringify({ categories: category }));
}

export const onRequestPost: PagesFunction<{ RESULTS: KVNamespace }> = async ({ request, params, env }) => {

    const query = params.id as string;
    const key = `META_${query}`;
    let payload: Meta = await request.json();
    const current = await env.RESULTS.get(key);

    if (current) {
        console.log(current);
        payload = { ...JSON.parse(current), ...payload }
    }

    await env.RESULTS.put(key, JSON.stringify({ ...payload }));
    return new Response();
}

export const onRequestDelete: PagesFunction<{ RESULTS: KVNamespace }> = async ({ params, env }) => {

    const query = params.id as string;
    const key = `META_${query}`;
    await env.RESULTS.delete(key);
    return new Response();
}

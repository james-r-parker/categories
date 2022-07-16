import { Box, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import type { GetStaticPropsResult } from 'next'
import { request, gql } from 'graphql-request';
import Search from '../components/search';
import React from 'react';
import Result from '../components/result';

export type ApiResponse = {
  categories: {
    id: string,
    name: string,
    meta?: { [name: string]: string }
  }[]
}

interface HomePageProps {
  page: {
    title: string,
    subtitle: string,
    sections: {
      title: string,
      slug: string
    }[]
  },
}

const Home: React.FC<HomePageProps> = ({ page }) => {

  const [query, setQuery] = React.useState<string>("");
  const [result, setResult] = React.useState<ApiResponse>({ categories: [] });
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function get() {
      setLoading(true);
      const result = await fetch(`/api/category/${query}`);
      if (result.status === 200) {
        setResult(await result.json());
      }
      else {
        setResult({ categories: [] });
      }
      setLoading(false);
    }

    get();
  }, [query]);

  const onSave = React.useCallback((id: string, meta: { [name: string]: string }) => {
    fetch(`/api/category/${id}`, { method: "POST", body: JSON.stringify(meta) });
  }, []);

  return (
    <Box>
      <Grid container direction={'column'} spacing={2}>
        <Grid item>
          <Box sx={{ backgroundColor: "#fff" }} pb={8}>
            <Container maxWidth={'xl'}>
              <Grid container direction={'column'} spacing={5}>
                <Grid item>
                  <Typography variant='h1' component="h1">{page.title}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle1' component="h2">{page.subtitle}</Typography>
                </Grid>
                <Grid item>
                  <Search onChange={(v) => setQuery(v)} />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
        {loading &&
          <Grid item>
            <Container maxWidth={'xl'} style={{ minHeight: 600 }}>
              <Grid container direction="row" spacing={6} justifyContent="center" alignItems="center">
                <Grid item>
                  <Stack spacing={1}>
                    <Skeleton variant="text" />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={118} />
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack spacing={1}>
                    <Skeleton variant="text" />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={118} />
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack spacing={1}>
                    <Skeleton variant="text" />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={118} />
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        }
        {!loading &&
          <Grid item>
            <Container maxWidth={'xl'} style={{ minHeight: 600 }}>
              <Result query={query} result={result} onChange={onSave} />
            </Container>
          </Grid>
        }

      </Grid>
    </Box>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<HomePageProps>> {

  const pageQuery = gql`
    query PageQuery {
      pages(where: {slug: "search"}) {
        title
        subtitle
        sections {
          ... on Section {
            title
            slug
          }
        }
      }
    }  
  `;

  const pageResponse = await request(process.env.NEXT_PUBLIC_GRAPHCMS_URL || '', pageQuery);

  return {
    props: {
      page: pageResponse.pages[0]
    }, // will be passed to the page component as props
  }
}

export default Home

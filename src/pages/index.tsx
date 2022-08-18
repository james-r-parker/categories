import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { GetStaticPropsResult } from 'next'
import { request, gql } from 'graphql-request';
import Search from '../components/search';
import React from 'react';
import Result from '../components/result';
import Loader from '../components/loader';
import Overview from '../components/overview';

export type ApiResponse = {
  categories: Category[]
}

export type Category = {
  id: string,
  name: string,
  meta?: { [name: string]: string }
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
  isLoading: boolean
  defaultValue: ApiResponse
}

const Home: React.FC<HomePageProps> = ({ page, isLoading, defaultValue }) => {

  const [query, setQuery] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [result, setResult] = React.useState<ApiResponse>(defaultValue);
  const [loading, setLoading] = React.useState<boolean>(isLoading);

  React.useEffect(() => {
    async function get() {
      if (query && query.length > 0) {
        setLoading(true);
        const result = await fetch(`/api/category/${query.trim().toLowerCase()}`);
        if (result.status === 200) {
          setResult(await result.json());
        }
        else {
          setResult({ categories: [] });
        }
        setTitle(query);
        setLoading(false);
      }
    }

    get();
  }, [query]);

  const onSave = React.useCallback((id: string, meta: { [name: string]: string }) => {
    fetch(`/api/category/${id}`, { method: "POST", body: JSON.stringify(meta) });

    const updated = result.categories.reduce((p: Category[], c) => {
      if (c.id === id) {
        c.meta = meta;
      }
      p.push(c);
      return p;
    }, []);

    setResult({ categories: updated });
  }, [result]);

  return (
    <Box style={{ minHeight: 900 }}>
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
                  <Search
                    onChange={(v) => setQuery(v)}
                    onSelect={(q, c) => {
                      setTitle(q);
                      setResult({ categories: c })
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
        {loading && query.length > 0 &&
          <Grid item>
            <Container maxWidth={'xl'} style={{ minHeight: 600 }}>
              LOADING
              <Loader />
            </Container>
          </Grid>
        }
        {!loading && result.categories.length > 0 &&
          <Grid item>
            <Container maxWidth={'xl'} style={{ minHeight: 600 }}>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Overview query={title} result={result} />
                </Grid>
                <Grid item>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="editor-content"
                      id="editor-header"
                    >
                      <Typography>Editor</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Result result={result} onChange={onSave} />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
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
      page: pageResponse.pages[0],
      isLoading: false,
      defaultValue: { categories: [] }
    }, // will be passed to the page component as props
  }
}

export default Home

import { Box, Container, Grid, Typography } from '@mui/material';
import type { GetStaticPropsResult } from 'next'
import { request, gql } from 'graphql-request';


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
                  
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<HomePageProps>> {

  const pageQuery = gql`
    query PageQuery {
      pages(where: {slug: "home"}) {
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

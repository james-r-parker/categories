import { Container, Divider, Grid, styled, Typography } from '@mui/material';

const FooterWrapper = styled('div')({
  backgroundColor: '#14496F',
  height: 300,
  marginTop: "75px",
});

function Footer() {
  return (
    <FooterWrapper>
      <Container maxWidth="xl">

        <Grid container direction={"column"} spacing={3}>

          <Grid item>

          </Grid>

          <Grid item>
            <Divider style={{ backgroundColor: "white" }} />
          </Grid>

          <Grid item>

          <Typography variant='caption' color={"white"}>
            © Parcel2Go.com Ltd 1995-2022 All Rights Reserved. | Company Number: 02591405 | VAT Number: 597 8491 61
          </Typography>

          </Grid>

        </Grid>

      </Container>
    </FooterWrapper >
  )
}

export default Footer

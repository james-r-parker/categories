import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import Footer from '../components/footer';
import Header from '../components/header';
import { CssBaseline } from '@mui/material';
import theme from '../components/theme';

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
}

export function reportWebVitals(metric: any) {
  console.log(metric)
}

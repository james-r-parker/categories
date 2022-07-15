import type { AppProps } from 'next/app'
import { Head, Html, Main, NextScript } from 'next/document';


function MyDocument({ Component, pageProps }: AppProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Get the best rates on parcel delivery from Parcel2Go. Send a parcel from just £1.95 exc VAT, and compare parcel delivery quotes from cheap UK courier services! Book now!" />
        <title>Parcel Delivery &amp; Courier Services | Send a Parcel | Parcel2Go</title>
        <link rel="canonical" href="https://www.parcel2go.com/" />
        <link rel="alternate" href="https://www.parcel2go.com/" hrefLang="en" />
        <link rel="alternate" href="https://www.p2g.com/es/" hrefLang="es" />
        <link rel="alternate" href="https://www.parcel2go.com/ie/" hrefLang="en-ie" />
        <meta property="fb:app_id" content="1381300818551216" />
        <meta property="og:image" content="/p2g-logo-1200x1200.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Parcel Delivery &amp; Courier Services | Send a Parcel | Parcel2Go" />
        <meta property="og:description" content="Get the best rates on parcel delivery from Parcel2Go. Send a parcel from just £1.95 exc VAT, and compare parcel delivery quotes from cheap UK courier services! Book now!" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'anonymous '} />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600&display=swap" rel="stylesheet" />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "Organization",
              "name": "Parcel2Go",
              "url": "https://www.parcel2go.com/",
              "alternateName": "Parcel to Go",
              "logo": "https://cdn.parcel2go.com/42c5534b-0f47-4342-80f0-8f21203f0669/images/p2g%20logo987.png",
              "sameAs": [
                "https://www.facebook.com/parcel2go/",
                "https://twitter.com/parcel2go",
                "https://www.linkedin.com/company/parcel2go-com/",
                "https://www.instagram.com/parcel2go_official/"
              ]
            })
          }}>
        </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument

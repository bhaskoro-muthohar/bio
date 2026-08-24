import Head from "next/head";
import { ThemeProvider } from "styled-components";
import Layout from "../components/Layout";
import GlobalStyle from "../styles/GlobalStyle";
import theme from "../styles/theme.config";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import useDarkMode from "../hooks/useDarkMode";

function MyApp({ Component, pageProps }) {
    // Owns the body class only. Colours resolve from CSS custom properties in
    // GlobalStyle, so the theme never round-trips through a React render.
    useDarkMode();

    return (
        <>
            <GoogleAnalytics />
            <ThemeProvider theme={theme}>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <GlobalStyle />
                <Layout>
                    <DefaultSeo
                        {...SEO}
                        additionalMetaTags={[{
                            name: 'keywords',
                            content: SEO.openGraph.keywords,
                        }]}
                    />
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    )
}
export default MyApp

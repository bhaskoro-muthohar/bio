import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var storageKey='darkMode';
  var classNameDark='dark-mode';
  var classNameLight='light-mode';
  function setClass(d){document.body.classList.add(d?classNameDark:classNameLight);document.body.classList.remove(d?classNameLight:classNameDark)}
  var preferDarkQuery='(prefers-color-scheme: dark)';
  var mql=window.matchMedia(preferDarkQuery);
  var stored=null;
  try{stored=localStorage.getItem(storageKey)}catch(e){}
  if(stored!==null){setClass(JSON.parse(stored))}
  else if(mql.media===preferDarkQuery){setClass(mql.matches);try{localStorage.setItem(storageKey,mql.matches)}catch(e){}}
  else{setClass(false)}
})();
                    `}} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

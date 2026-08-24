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
                    {/* Only the weights actually used: mono 400/500/600, display 600/700 */}
                    <link
                        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Saira+Condensed:wght@600;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    {/* Paints the theme before first paint. Reads only — an
                        absent preference means "follow the OS", so persisting
                        here would freeze the first OS value forever. */}
                    <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var c=document.body.classList,t='system';
  try{
    var s=localStorage.getItem('theme');
    if(s==='light'||s==='dark'){t=s}
    else{var l=localStorage.getItem('darkMode');if(l==='true'){t='dark'}else if(l==='false'){t='light'}}
  }catch(e){}
  var d=t==='dark';
  if(t==='system'){
    try{d=window.matchMedia('(prefers-color-scheme: dark)').matches}catch(e){d=false}
  }
  c.add(d?'dark-mode':'light-mode');
  c.remove(d?'light-mode':'dark-mode');
})();
                    `}} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

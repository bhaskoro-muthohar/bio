import { NextSeo } from 'next-seo';
import seoData from '../next-seo.config';

export default function Seo({ page }) {
    const { title, excerpt, slug, coverImage } = page;
    return (
        <>
            <NextSeo
                title={title}
                titleTemplate={`%s | ${seoData.openGraph.title}`}
                defaultTitle={seoData.openGraph.title}
                description={seoData.openGraph.description}
                canonical={seoData.openGraph.url}
                openGraph={{
                    type: 'website',
                    url: `${seoData.openGraph.url}`,
                    title: `${title}`,
                    description: `${seoData.openGraph.description}`,
                    locale: 'en_EN',
                    images: [
                        {
                            width: 1200,
                            height: 630,
                            url: `${seoData.openGraph.images[0].url}`,
                            alt: `${title}`,
                        },
                    ],
                    site_name: 'itsmebhas.net',
                }}
                twitter={{
                    handle: '@Br__AM',
                    site: 'itsmebhas.net',
                    cardType: 'summary_large_image',
                }}
                additionalMetaTags={[{
                    name: 'keywords',
                    content: `${seoData.openGraph.keywords}`
                },
                {
                    name: 'twitter:image',
                    content: `${seoData.openGraph.images[0].url}`
                },
                {
                    httpEquiv: 'x-ua-compatible',
                    content: 'IE=edge; chrome=1'
                }]}
                robotsProps={{
                    nosnippet: false,
                    notranslate: true,
                    noimageindex: false,
                    noarchive: false,
                    notranslate: false,
                    maxSnippet: -1,
                    maxImagePreview: 'large',
                    maxVideoPreview: -1,
                }}
                additionalLinkTags={[
                    {
                        rel: 'canonical',
                        href: seoData.openGraph.url,
                    }
                ]}
                additionalJsonLd={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'Person',
                        name: 'Bhaskoro Abdillah Muthohar',
                        alternateName: 'Bhaskoro Muthohar',
                        url: seoData.openGraph.url,
                        jobTitle: 'Analytics Engineer',
                        image: seoData.openGraph.images[0].url,
                        alumniOf: ['Bank Jago', 'GovTech Edu Indonesia'],
                        knowsAbout: ['Data Engineering', 'Machine Learning', 'MLOps', 'Python', 'SQL', 'BigQuery', 'dbt', 'Airflow', 'Kubernetes', 'CI/CD', 'GCP'],
                        worksFor: {
                            '@type': 'Organization',
                            name: 'StraitsX'
                        },
                        sameAs: [
                            'https://github.com/bhaskoro-muthohar',
                            'https://www.linkedin.com/in/bhaskoro-muthohar',
                            'https://twitter.com/Br__AM',
                            'https://instagram.com/bhaskoro.muthohar'
                        ]
                    }
                ]}
            />
        </>
    );
}
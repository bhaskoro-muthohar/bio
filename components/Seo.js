import { NextSeo } from 'next-seo';
import seoData from '../next-seo.config';

const PERSON_ID = 'https://www.itsmebhas.net/#person';

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Person',
            '@id': PERSON_ID,
            name: 'Bhaskoro Abdillah Muthohar',
            alternateName: 'Bhaskoro Muthohar',
            url: seoData.openGraph.url,
            jobTitle: 'Machine Learning Engineer',
            image: seoData.openGraph.images[0].url,
            alumniOf: ['GovTech Edu Indonesia', 'Bank Jago'],
            knowsAbout: [
                'Machine Learning Engineering',
                'Model Deployment',
                'MLOps',
                'Data Engineering',
                'Python',
                'SQL',
                'BigQuery',
                'dbt',
                'Airflow',
                'Amazon SageMaker',
                'GCP',
                'AWS',
                'Terraform',
            ],
            worksFor: {
                '@type': 'Organization',
                name: 'StraitsX',
            },
            sameAs: [
                'https://github.com/bhaskoro-muthohar',
                'https://www.linkedin.com/in/bhaskoro-muthohar',
                'https://twitter.com/Br__AM',
                'https://instagram.com/bhaskoro.muthohar',
            ],
        },
        {
            '@type': 'ScholarlyArticle',
            name: "Application of A/B Testing Experimentation on Government Digital Products to Enhance Teachers' Skills and Capabilities in Indonesia",
            url: 'https://journal.unesa.ac.id/index.php/jpsi/article/view/20964',
            datePublished: '2023',
            isPartOf: {
                '@type': 'Periodical',
                name: 'JPSI (Journal of Public Sector Innovations)',
            },
            author: [
                { '@type': 'Person', name: 'Bagoes Rahmat Widiarso' },
                { '@id': PERSON_ID },
                { '@type': 'Person', name: 'Septi Rito Tombe' },
                { '@type': 'Person', name: 'Putri Wikie Novianti' },
            ],
        },
    ],
};

export default function Seo() {
    return (
        <>
            <NextSeo
                title={seoData.openGraph.title}
                description={seoData.openGraph.description}
                canonical={seoData.openGraph.url}
                openGraph={{
                    type: 'website',
                    url: seoData.openGraph.url,
                    title: seoData.openGraph.title,
                    description: seoData.openGraph.description,
                    locale: 'en_US',
                    images: [
                        {
                            width: 800,
                            height: 800,
                            url: seoData.openGraph.images[0].url,
                            alt: 'Bhaskoro Abdillah Muthohar',
                        },
                    ],
                    site_name: 'itsmebhas.net',
                }}
                twitter={{
                    handle: '@Br__AM',
                    site: '@Br__AM',
                    cardType: 'summary',
                }}
                additionalMetaTags={[
                    {
                        name: 'keywords',
                        content: seoData.openGraph.keywords,
                    },
                    {
                        name: 'twitter:image',
                        content: seoData.openGraph.images[0].url,
                    },
                ]}
                robotsProps={{
                    maxSnippet: -1,
                    maxImagePreview: 'large',
                    maxVideoPreview: -1,
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
        </>
    );
}

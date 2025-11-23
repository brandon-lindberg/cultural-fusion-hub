import Head from 'next/head';
import { useRouter } from 'next/router';

interface StructuredDataProps {
  type: 'BlogPosting' | 'WebPage';
  data: Record<string, any>;
  lang?: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data, lang }) => {
  const { locale, defaultLocale } = useRouter();
  const activeLocale = lang || locale || defaultLocale || 'ja';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    inLanguage: activeLocale,
    ...data,
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default StructuredData;

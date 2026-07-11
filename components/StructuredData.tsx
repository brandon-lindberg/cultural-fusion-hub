import Head from 'next/head';
import { useRouter } from 'next/router';

interface StructuredDataProps {
  type: 'BlogPosting' | 'WebPage' | 'WebSite' | 'Organization';
  data: Record<string, any>;
  lang?: string;
  localizeUrl?: boolean;
}

const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  data,
  lang,
  localizeUrl = false,
}) => {
  const { locale, defaultLocale } = useRouter();
  const activeLocale = lang || locale || defaultLocale || 'ja';
  let localizedUrl = data.url;

  if (
    localizeUrl &&
    typeof data.url === 'string' &&
    activeLocale !== defaultLocale
  ) {
    const parsedUrl = new URL(data.url);
    const path = parsedUrl.pathname === '/' ? '' : parsedUrl.pathname;
    parsedUrl.pathname = `/${activeLocale}${path}`;
    localizedUrl = parsedUrl.toString().replace(/\/$/, '');
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    inLanguage: activeLocale,
    ...data,
    ...(localizedUrl ? { url: localizedUrl } : {}),
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

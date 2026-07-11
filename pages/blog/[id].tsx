import { GetStaticProps, GetStaticPaths } from 'next';
import blogPosts from '../../components/blog/entries.json';
import Layout from '../../components/Layout';
import { useTranslation } from 'react-i18next';
import SocialShare from '../../components/blog/SocialShare';
import StructuredData from '../../components/StructuredData';
import React from 'react';
import ensureLocale from '../../utils/ensureLocale';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Ensure blogPosts is always an array with robust error handling
const safeBlogPosts = (() => {
  try {
    if (!blogPosts) return [];
    if (!Array.isArray(blogPosts)) return [];
    return blogPosts;
  } catch (error) {
    console.error('Error processing blog posts:', error);
    return [];
  }
})();

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  entry: string;
  tags: string[];
}

interface BlogPostProps {
  post: BlogPost;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const { t } = useTranslation();
  const { locale, defaultLocale } = useRouter();

  if (!post) {
    return <p>{t('no-posts-found')}</p>;
  }

  // Format the date consistently
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Create structured data for BlogPosting
  const localizedPath = locale && locale !== defaultLocale ? `/${locale}` : '';
  const postUrl = `https://culturalfusionhub.com${localizedPath}/blog/${post.id}`;
  const description = post.entry.replace(/\s+/g, ' ').trim().substring(0, 160);
  const blogStructuredData = {
    headline: post.title,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    dateModified: post.date,
    description: description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cultural Fusion Hub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://culturalfusionhub.com/CFH-logo-vector.png',
      },
    },
    image: 'https://culturalfusionhub.com/about-banner.jpg',
  };

  return (
    <Layout
      title={post.title}
      description={description}
      image="/about-banner.jpg"
    >
      <StructuredData type="BlogPosting" data={blogStructuredData} />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Link href="/blog" className="text-sm font-semibold text-accent">
          ← {t('back-to-blog')}
        </Link>
        <article className="card-surface mt-6 rounded-3xl p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            {formattedDate} · {post.author}
          </p>
          <h1 className="font-display text-4xl text-ink mt-4">{post.title}</h1>
          <div className="mt-4">
            <SocialShare title={post.title} url={postUrl} />
          </div>
          <div className="mt-6 text-sm leading-relaxed text-ink opacity-80 whitespace-pre-wrap">
            {post.entry}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {Array.isArray(post.tags) &&
              post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-muted"
                >
                  #{tag}
                </span>
              ))}
          </div>
        </article>
      </section>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const paths = safeBlogPosts.flatMap((post) =>
      ['ja', 'en'].map((locale) => ({
        params: { id: post.id },
        locale,
      })),
    );

    return { paths, fallback: false };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  defaultLocale,
}) => {
  try {
    await ensureLocale(locale, defaultLocale);
    const post = safeBlogPosts.find((p) => p.id === params?.id) || null;
    return { props: { post: post || null } };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { props: { post: null } };
  }
};

export default BlogPost;

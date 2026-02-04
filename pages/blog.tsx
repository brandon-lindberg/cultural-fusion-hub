import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import BlogCardList from '../components/blog/BlogCardList';
import blogPosts from '../components/blog/entries.json';
import { useTranslation } from 'react-i18next';
import StructuredData from '../components/StructuredData';
import { GetStaticProps } from 'next';
import ensureLocale from '../utils/ensureLocale';

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

const Blog: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  // Sort posts by date
  const sortedPosts = useMemo(() => {
    return [...safeBlogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  // Filter posts based on selected tag and search term
  const filteredPosts = useMemo(() => {
    return sortedPosts.filter(post => 
      (!selectedTag || post.tags.includes(selectedTag)) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.entry.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.author.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [sortedPosts, selectedTag, searchTerm]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(prevTag => (prevTag === tag ? null : tag));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Layout title={t('blog')}>
      <StructuredData
        type="WebPage"
        data={{
          name: t('blog'),
          description: "Blog posts from Cultural Fusion Hub",
        }}
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-muted">
              {t('blog-tagline')}
            </p>
            <h1 className="font-display text-4xl text-ink mt-3">{t('blog')}</h1>
            <p className="mt-4 text-sm leading-relaxed text-muted">{t('blog-intro')}</p>
          </div>
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder={t('search')}
              className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-[color:var(--ring)]"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {selectedTag && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <span>{t('filtered-by')}:</span>
            <span>{selectedTag}</span>
            <button className="ml-1 text-base" onClick={() => setSelectedTag(null)}>
              ×
            </button>
          </div>
        )}
        <div className="mt-8">
          {filteredPosts.length > 0 ? (
            <BlogCardList posts={filteredPosts} onTagClick={handleTagClick} />
          ) : (
            <p className="text-center text-muted">{t('no-posts-found')}</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  await ensureLocale(locale, defaultLocale);
  return { props: {} };
};

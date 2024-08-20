import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import BlogCardList from '../components/blog/BlogCardList';
import blogPosts from '../components/blog/entries.json';
import { useTranslation } from 'react-i18next';
import StructuredData from '../components/StructuredData';

const Blog: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  const sortedPosts = useMemo(() => {
    return [...blogPosts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(post => ({
        ...post,
        id: `${post.title.toLowerCase().replace(/\s+/g, '-')}-${post.date}`,
      }));
  }, []);

  const filteredPosts = useMemo(() => {
    return sortedPosts.filter(post => 
      (!selectedTag || post.tags.includes(selectedTag)) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.entry.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.author.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [sortedPosts, selectedTag, searchTerm]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(prevTag => prevTag === tag ? null : tag);
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-zinc-400">{t('blog')}</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder={t('search')}
            className="w-full p-2 border rounded bg-gray-50 text-gray-700 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {selectedTag && (
          <div className="mb-4">
            <span className="text-sm text-zinc-400">{t('filtered-by')}: </span>
            <span className="bg-subGreen text-zinc-400 px-2 py-1 rounded text-sm">
              {selectedTag}
              <button className="ml-2 font-bold" onClick={() => setSelectedTag(null)}>×</button>
            </span>
          </div>
        )}
        {filteredPosts.length > 0 ? (
          <BlogCardList posts={filteredPosts} onTagClick={handleTagClick} />
        ) : (
          <p className="text-center text-zinc-400">{t('no-posts-found')}</p>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
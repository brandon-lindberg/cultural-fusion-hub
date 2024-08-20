import React, { useState, useMemo } from 'react';
import BlogCardList from '../components/blog/BlogCardList';
import blogPosts from '../components/blog/entries.json';

type BlogPost = {
  title: string;
  date: string;
  author: string;
  entry: string;
  tags: string[];
};

const Blog: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const sortedPosts = useMemo(() => {
    return [...blogPosts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(post => ({
        ...post,
        id: `${post.title.toLowerCase().replace(/\s+/g, '-')}-${post.date}`,
      }));
  }, []);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return sortedPosts;
    return sortedPosts.filter(post => post.tags.includes(selectedTag));
  }, [sortedPosts, selectedTag]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(prevTag => prevTag === tag ? null : tag);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Blog Posts</h1>
      {selectedTag && (
        <div className="mb-4">
          <span className="text-sm">Filtered by: </span>
          <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
            {selectedTag}
            <button className="ml-2 font-bold" onClick={() => setSelectedTag(null)}>×</button>
          </span>
        </div>
      )}
      <BlogCardList posts={filteredPosts} onTagClick={handleTagClick} />
    </div>
  );
};

export default Blog;
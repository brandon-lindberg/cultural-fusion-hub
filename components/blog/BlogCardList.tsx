import React from 'react';
import BlogCard from './blogCards';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  entry: string;
  tags: string[];
}

interface BlogCardListProps {
  posts: BlogPost[];
  onTagClick: (tag: string) => void;
}

const BlogCardList: React.FC<BlogCardListProps> = ({ posts, onTagClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(posts) && posts.map((post) => (
        <BlogCard
          key={post.id}
          title={post.title}
          author={post.author}
          entry={post.entry}
          tags={post.tags}
          date={post.date}
          onTagClick={onTagClick}
          id={post.id} // Ensure the ID is passed correctly
        />
      ))}
    </div>
  );
};

export default BlogCardList;
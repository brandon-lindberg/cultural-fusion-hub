import { GetStaticProps, GetStaticPaths } from 'next';
import blogPosts from '../../components/blog/entries.json';
import Layout from '../../components/Layout';
import { useTranslation } from 'react-i18next';
import SocialShare from '../../components/blog/SocialShare';
import StructuredData from '../../components/StructuredData';
import React from 'react';

// Ensure blogPosts is always an array
const safeBlogPosts = Array.isArray(blogPosts) ? blogPosts : [];

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
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "description": post.entry.substring(0, 160), // Short description
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.culturalfusionhub.com/blog/${post.id}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cultural Fusion Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.culturalfusionhub.com/logo.png"
      }
    },
    "image": "https://www.culturalfusionhub.com/path-to-blog-image.jpg" // Replace with actual image URL
  };

  return (
    <Layout title={post.title}>
      <StructuredData type="BlogPosting" data={blogStructuredData} />
      <article className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600">
            {formattedDate} | {post.author}
          </p>
          <SocialShare title={post.title} url={`https://www.culturalfusionhub.com/blog/${post.id}`} />
        </div>
        <div className="prose mb-6 whitespace-pre-wrap"> {/* Preserve whitespace */}
          {post.entry}
        </div>
        <div className="flex flex-wrap">
          {Array.isArray(post.tags) && post.tags.map(tag => (
            <span key={tag} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer hover:bg-gray-300">
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = safeBlogPosts.map(post => ({
    params: { id: post.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = safeBlogPosts.find((p) => p.id === params?.id) || null;
  return { props: { post: post || null } };
};

export default BlogPost;

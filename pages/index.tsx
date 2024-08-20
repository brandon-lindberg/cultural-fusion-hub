import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Image from 'next/image';
import Calendar from '../components/Calendar';
import ImageCarousel from '../components/Carousel';
import { useTranslation } from 'react-i18next';
import blogPosts from '../components/blog/entries.json';
import BlogCard from '../components/blog/blogCards';

const IndexPage = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const latestTwoPosts = useMemo(() => {
    return [...blogPosts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2);
  }, []);

  return (
    <Layout title="Cultural Fusion Hub">
      <header>
        <div
          style={{ maxHeight: '600px', overflow: 'hidden' }}
          className="relative w-full"
        >
          <ImageCarousel />
          <div className="absolute bottom-1/4 right-1/2 transform translate-x-1/2">
            {/* <h1 className="text-white text-4xl">Welcome to The Cultural Fusion Hub</h1> */}
          </div>
        </div>
      </header>
      <main className="height-30vh">
        <div className="p-4">
          <article className="p-5 text-justify text-zinc-400">
            {t('greeting')}
          </article>
        </div>
      </main>
      <div className="flex flex-col lg:flex-row items-start justify-between p-3 gap-8">
        <div className="w-full lg:w-1/2 min-h-[400px]">
          <h2 className="text-2xl font-bold mb-4">Events Calendar</h2>
          <div className="calendar-wrapper" style={{ width: '100%', height: '100%' }}>
            <Calendar />
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
          {latestTwoPosts.map((post, index) => (
            <div key={index} className={index === 0 ? 'mb-6' : ''}>
              <BlogCard
                title={post.title}
                date={post.date}
                author={post.author}
                entry={post.entry}
                tags={post.tags}
                onTagClick={() => {}}
              />
            </div>
          ))}
          <div className="mt-4">
            <Link href="/blog" className="text-blue-500 hover:underline">
              View all blog posts
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
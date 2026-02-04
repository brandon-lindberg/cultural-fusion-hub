import React, { useState } from 'react';
import Link from 'next/link';
import SocialShare from './SocialShare';
import { useTranslation } from 'react-i18next';

interface BlogCardProps {
  title: string;
  date: string;
  author: string;
  entry: string;
  tags: string[];
  id: string;
  onTagClick: (tag: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, author, entry, tags, date, id, onTagClick }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <>
      <div
        className="card-surface reveal group flex h-full cursor-pointer flex-col rounded-3xl p-6 transition duration-300 hover:-translate-y-1"
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
          <span>{formatDate(date)}</span>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-semibold text-accent">
            {author}
          </span>
        </div>
        <h2 className="font-display text-2xl text-ink mt-4 mb-2">{title}</h2>
        <p className="text-sm leading-relaxed text-muted line-clamp-3">{entry}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {Array.isArray(tags) &&
            tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-muted transition hover:bg-accent/10 hover:text-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
              >
                #{tag}
              </span>
            ))}
        </div>
        <div className="mt-6 flex items-center text-sm font-semibold text-accent transition group-hover:translate-x-1">
          {t('read-story')}
          <span className="ml-2">→</span>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="card-surface w-full max-w-2xl rounded-3xl p-6 md:p-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {formatDate(date)} · {author}
                </p>
                <h2 className="font-display text-3xl text-ink">{title}</h2>
              </div>
              <SocialShare title={title} url={`https://culturalfusionhub.com/blog/${id}`} />
              <div className="flex flex-wrap gap-2">
                {Array.isArray(tags) &&
                  tags.map((tag, index) => (
                    <button
                      key={index}
                      className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-muted transition hover:bg-accent/10 hover:text-accent"
                      onClick={() => {
                        onTagClick(tag);
                        setIsPopupOpen(false);
                      }}
                    >
                      #{tag}
                    </button>
                  ))}
              </div>
              <p className="text-sm leading-relaxed text-ink opacity-80 whitespace-pre-wrap">{entry}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/blog/${id}`} className="btn-primary">
                  {t('view-full-post')}
                </Link>
                <button className="btn-secondary" onClick={() => setIsPopupOpen(false)}>
                  {t('close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;

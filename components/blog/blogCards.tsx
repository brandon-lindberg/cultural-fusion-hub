import React, { useState } from 'react';
import Link from 'next/link';
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
        className="w-full rounded-lg overflow-hidden shadow-lg bg-white flex flex-col cursor-pointer hover:shadow-xl transition-shadow duration-300"
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="px-6 py-4 flex-grow">
          <h2 className="font-bold text-xl mb-2 text-gray-800">{title}</h2>
          <p className="text-gray-600 text-sm mb-2">{formatDate(date)} | {author}</p>
          <p className="text-gray-700 text-base line-clamp-3 overflow-hidden">{entry}</p>
        </div>
        <div className="px-6 pt-2 pb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer hover:bg-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tag);
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 mb-2">{formatDate(date)} | {author}</p>
            <div className="mb-4 flex flex-wrap">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer hover:bg-gray-300"
                  onClick={() => {
                    onTagClick(tag);
                    setIsPopupOpen(false);
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-gray-800 mb-6 whitespace-pre-wrap">{entry}</p>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsPopupOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
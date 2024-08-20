import React, { useState } from 'react';

interface BlogCardProps {
  title: string;
  date: string;
  author: string;
  entry: string;
  tags: string[];
  onTagClick: (tag: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, author, entry, tags, date, onTagClick }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleString('en-US', options)
      .replace(/,/, '')
      .replace(/(\d+)(?=\s)/, '$1,')
      .replace(/(\d+:\d+:\d+)/, 'at $1');
  };

  return (
    <>
      <div 
        className="w-full rounded overflow-hidden shadow-lg bg-white flex flex-col cursor-pointer hover:shadow-xl transition-shadow duration-300"
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="px-4 sm:px-6 py-4 flex-grow">
          <div className="font-bold text-lg sm:text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-sm sm:text-base">{author}</p>
          <p className="text-gray-700 text-sm sm:text-base line-clamp-2 overflow-hidden mt-4">{entry}</p>
        </div>
        <div className="px-4 sm:px-6 pt-2 pb-2 flex flex-wrap">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs sm:text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer hover:bg-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tag);
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="px-4 sm:px-6 pb-4 text-right">
          <span className="text-xs sm:text-sm font-semibold text-gray-700">{formatDate(date)}</span>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{title}</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">{author}</p>
            <p className="text-gray-600 text-sm sm:text-base mb-2 sm:mb-4">{formatDate(date)}</p>
            <div className="mb-2 sm:mb-4 flex flex-wrap">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs sm:text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer hover:bg-gray-300"
                  onClick={() => {
                    onTagClick(tag);
                    setIsPopupOpen(false);
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-gray-800 text-sm sm:text-base mb-4 sm:mb-6 whitespace-pre-wrap">{entry}</p>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base"
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
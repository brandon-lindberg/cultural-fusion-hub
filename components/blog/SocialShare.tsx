import React from 'react';
import { toast } from 'react-toastify';

interface SocialShareProps {
  title: string;
  url: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url }) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="flex space-x-2 items-center mb-2">
      <div className="relative group">
        <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center" title="Share on X">
          <img src="/x-twitter-brands-solid.svg" alt="X" className="w-6 h-6" />
        </a>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Share on X
        </span>
      </div>
      <div className="relative group">
        <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 flex items-center" title="Share on LinkedIn">
          <i className="fa fa-linkedin fa-lg" aria-hidden="true"></i>
        </a>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Share on LinkedIn
        </span>
      </div>
      <div className="relative group">
        <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 flex items-center" title="Share on Facebook">
          <i className="fa fa-facebook fa-lg" aria-hidden="true"></i>
        </a>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Share on Facebook
        </span>
      </div>
      <div className="relative group">
        <button onClick={copyToClipboard} className="text-gray-500 flex items-center" title="Copy link">
          <i className="fa fa-copy fa-lg" aria-hidden="true"></i>
        </button>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Copy link
        </span>
      </div>
    </div>
  );
};

export default SocialShare;

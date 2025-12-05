import React from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

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
    <div className="flex space-x-3 items-center mb-2">
      <div className="relative group">
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 transition-colors flex items-center p-1"
          title="Share on X"
        >
          <Image src="/x-twitter-brands-solid.svg" alt="X" width={20} height={20} className="w-5 h-5" />
        </a>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Share on X
        </span>
      </div>
      <div className="relative group">
        <a
          href={linkedinShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-800 transition-colors flex items-center p-1"
          title="Share on LinkedIn"
        >
          <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} className="w-5 h-5" />
        </a>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Share on LinkedIn
        </span>
      </div>
      <div className="relative group">
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 transition-colors flex items-center p-1"
          title="Share on Facebook"
        >
          <Image src="/facebook.svg" alt="Facebook" width={20} height={20} className="w-5 h-5" />
        </a>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Share on Facebook
        </span>
      </div>
      <div className="relative group">
        <button
          onClick={copyToClipboard}
          className="text-gray-500 hover:text-gray-700 transition-colors flex items-center p-1"
          title="Copy link"
        >
          <Image src="/copy.svg" alt="Copy" width={20} height={20} className="w-5 h-5" />
        </button>
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Copy link
        </span>
      </div>
    </div>
  );
};

export default SocialShare;

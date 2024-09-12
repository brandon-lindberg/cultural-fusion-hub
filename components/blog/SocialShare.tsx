import React from 'react';

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
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="flex space-x-2 items-center mb-2">
      <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center" title="Share on X">
        <img src="/x-twitter-brands-solid.svg" alt="X" className="w-6 h-6" /> {/* Custom SVG icon */}
      </a>
      <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 flex items-center" title="Share on LinkedIn">
        <i className="fa fa-linkedin fa-lg" aria-hidden="true"></i>
      </a>
      <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 flex items-center" title="Share on Facebook">
        <i className="fa fa-facebook fa-lg" aria-hidden="true"></i>
      </a>
      <button onClick={copyToClipboard} className="text-gray-500 flex items-center" title="Copy link">
        <i className="fa fa-copy fa-lg" aria-hidden="true"></i> {/* Font Awesome copy icon */}
      </button>
    </div>
  );
};

export default SocialShare;

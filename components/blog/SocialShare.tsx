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

  return (
    <div className="flex space-x-2">
      <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
        <i className="fa fa-twitter fa-lg" aria-hidden="true"></i>
      </a>
      <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700">
        <i className="fa fa-linkedin fa-lg" aria-hidden="true"></i>
      </a>
      <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
        <i className="fa fa-facebook fa-lg" aria-hidden="true"></i>
      </a>
    </div>
  );
};

export default SocialShare;

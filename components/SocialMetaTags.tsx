import React from 'react';
import Head from 'next/head';

type SocialMetaTagsProps = {
  title: string;
  description: string;
  image: string;
  url: string;
};

const SocialMetaTags = ({ title, description, image, url }: SocialMetaTagsProps) => {
  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Cultural Fusion Hub Logo" />
      <meta property="og:image:type" content="image/png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta property="og:site_name" content="Cultural Fusion Hub" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="article:author" content="Cultural Fusion Hub" />
    </Head>
  );
};

export default SocialMetaTags;

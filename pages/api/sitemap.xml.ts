import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/xml');
  res.write(createSitemap());
  res.end();
};

//URL to see sitemap = https://stupendous-longma-517c11.netlify.app/api/sitemap.xml

const createSitemap = () => {
  return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://stupendous-longma-517c11.netlify.app</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
            </url>
            <url>
                <loc>https://stupendous-longma-517c11.netlify.app/about</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
            </url>
            <url>
                <loc>https://stupendous-longma-517c11.netlify.app/profile</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
            </url>
            <url>
                <loc>https://stupendous-longma-517c11.netlify.app/contact</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
            </url>
        </urlset>
    `;
};

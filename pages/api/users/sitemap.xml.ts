import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/xml');
  res.write(createSitemap());
  res.end();
};

const createSitemap = () => {
  return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://stupendous-longma-517c11.netlify.app</loc>
                <changefreq>weekly</changefreq>
                <priority>0.7</priority>
            </url>
            <url>
                <loc>https://stupendous-longma-517c11.netlify.app/about</loc>
                <changefreq>weekly</changefreq>
                <priority>0.7</priority>
            </url>
            <url>
                <loc>https://stupendous-longma-517c11.netlify.app/profile</loc>
                <changefreq>weekly</changefreq>
                <priority>0.7</priority>
            </url>
            <url>
                <loc>https://stupendous-longma-517c11.netlify.app/contact</loc>
                <changefreq>never</changefreq>
                <priority>0.7</priority>
            </url>
        </urlset>
    `;
};

import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const BASE_URL = 'https://culturalfusionhub.com';
  const pagesDirectory = path.join(process.cwd(), 'pages');
  const pages: string[] = [];

  function traverseDirectory(dir: string) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        traverseDirectory(filePath);
      } else if (['.tsx', '.ts', '.js', '.jsx'].includes(path.extname(file))) {
        let route = filePath
          .replace(pagesDirectory, '')
          .replace(/\.(tsx|ts|js|jsx)$/, '');
        if (route.endsWith('/index')) {
          route = route.replace(/\/index$/, '');
        }
        if (!route.startsWith('/_') && !route.startsWith('/api')) {
          pages.push(route);
        }
      }
    });
  }

  traverseDirectory(pagesDirectory);

  const sitemapEntries = pages
    .map((page) => `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`)
    .join('');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemapXml);
  res.end();

  return { props: {} };
};

export default Sitemap;

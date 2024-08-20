import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://stupendous-longma-517c11.netlify.app';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/xml');
  res.write(createSitemap());
  res.end();
}

function createSitemap() {
  const pages = getAllPages();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          return `
            <url>
              <loc>${BASE_URL}${page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;
  return sitemap;
}

function getAllPages() {
  const pagesDirectory = path.join(process.cwd(), 'pages');
  const pages = [];

  function traverseDirectory(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        traverseDirectory(filePath);
      } else if (path.extname(file) === '.tsx' || path.extname(file) === '.ts') {
        let pagePath = filePath.replace(pagesDirectory, '').replace(/\.tsx?$/, '');
        if (pagePath.endsWith('/index')) {
          pagePath = pagePath.replace('/index', '');
        }
        if (!pagePath.includes('_app') && !pagePath.includes('_document') && !pagePath.includes('api/')) {
          pages.push(pagePath);
        }
      }
    });
  }

  traverseDirectory(pagesDirectory);
  return pages;
}
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import rateLimiter from '../../utils/rateLimiter';

const BASE_URL = 'https://culturalfusionhub.com';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  rateLimiter(req, res, () => {
    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap());
    res.end();
  });
}

function createSitemap() {
  const basePages = getAllPages();
  const locales = ['ja', 'en'];
  const defaultLocale = 'ja';

  // Ensure basePages is an array before using flatMap
  const safeBasePages = Array.isArray(basePages) ? basePages : [];
  const pages = safeBasePages.flatMap((page) =>
    locales.map((lng) => (lng === defaultLocale ? page : `/${lng}${page}`))
  );

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
  try {
    const pagesDirectory = path.join(process.cwd(), 'pages');
    const pages = [];

    const traverseDirectory = (dir: string) => {
      try {
        const files = fs.readdirSync(dir);
        if (!Array.isArray(files)) return;

        files.forEach((file) => {
          try {
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
          } catch (error) {
            console.error(`Error processing file ${file}:`, error);
          }
        });
      } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
      }
    };

    traverseDirectory(pagesDirectory);
    return pages;
  } catch (error) {
    console.error('Error in getAllPages:', error);
    return [];
  }
}

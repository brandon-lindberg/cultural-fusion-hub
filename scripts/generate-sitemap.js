#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Base URL for your production site
const siteUrl = 'https://culturalfusionhub.com';
const pagesDir = path.join(process.cwd(), 'pages');
const publicDir = path.join(process.cwd(), 'public');

const pages = [];

// Recursively traverse the pages directory
function traverseDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverseDir(fullPath);
    } else {
      const ext = path.extname(fullPath);
      // Only include page files
      if (!['.js', '.jsx', '.ts', '.tsx'].includes(ext)) continue;
      // Derive route by stripping the pagesDir prefix and extension
      let route = fullPath
        .replace(pagesDir, '')
        .replace(ext, '');
      // Skip Next.js internals and API routes
      if (route.startsWith('/_') || route.startsWith('/api')) continue;
      // Normalize index routes
      if (route.endsWith('/index')) {
        route = route.replace(/\/index$/, '');
      }
      pages.push(route);
    }
  }
}

traverseDir(pagesDir);

// Build XML string
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((route) => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`)
  .join('\n')}
</urlset>`;

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Write sitemap.xml
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);

console.log(`✅ sitemap.xml generated (${pages.length} URLs)`);

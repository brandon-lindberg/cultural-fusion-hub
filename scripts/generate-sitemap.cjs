#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable no-undef */

// Generate a clean hreflang-enabled sitemap using the build manifest
const fs = require('fs');
const path = require('path');

const siteUrl = process.env.SITE_URL || 'https://culturalfusionhub.com';
const publicDir = path.join(process.cwd(), 'public');
const manifestPath = path.join(process.cwd(), '.next', 'prerender-manifest.json');

const nextConfig = require('../next.config');
const i18n = nextConfig?.i18n || {};
const locales = i18n.locales || ['ja', 'en'];
const defaultLocale = i18n.defaultLocale || 'ja';

if (!fs.existsSync(manifestPath)) {
  console.error('❌ Missing .next/prerender-manifest.json. Run `next build` first.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Collect base paths (without locale prefix)
const basePaths = new Set(['/']);
for (const route of Object.keys(manifest.routes || {})) {
  const segments = route.split('/').filter(Boolean);
  const hasLocalePrefix = segments[0] && locales.includes(segments[0]);
  const pathWithoutLocale = hasLocalePrefix ? `/${segments.slice(1).join('/')}` : route;
  const normalized = pathWithoutLocale === '' ? '/' : pathWithoutLocale;

  if (normalized.startsWith('/users')) continue; // exclude demo user pages from sitemap
  basePaths.add(normalized === '/index' ? '/' : normalized);
}

const buildAlternateRefs = (pathSuffix) => {
  const suffix = pathSuffix === '/' ? '' : pathSuffix;
  const refs = locales.map((lng) => ({
    hreflang: lng,
    href: `${siteUrl}${lng === defaultLocale ? '' : `/${lng}`}${suffix}`,
  }));
  refs.push({ hreflang: 'x-default', href: `${siteUrl}${suffix}` });
  return refs;
};

const urls = [];
for (const basePath of basePaths) {
  const suffix = basePath === '/' ? '' : basePath;

  for (const lng of locales) {
    urls.push({
      loc: `${siteUrl}${lng === defaultLocale ? '' : `/${lng}`}${suffix}`,
      alternates: buildAlternateRefs(basePath),
    });
  }
}

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    ({ loc, alternates }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
${alternates
  .map(
    (alt) =>
      `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`
  )
  .join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>`;

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

const sitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapContent);

const secondarySitemapPath = path.join(publicDir, 'sitemap-0.xml');
fs.writeFileSync(secondarySitemapPath, sitemapContent);

console.log(`✅ sitemap.xml generated with ${urls.length} localized URLs and hreflang alternates`);

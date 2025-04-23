// src/app/api/sitemap-index/route.ts
import { NextResponse } from 'next/server';

import { BaseUrl } from '@/configs/settings';

export async function GET() {
  const sitemaps = [
    'sitemap/0.xml',
    'product/sitemap/0.xml',
    'product/sitemap/1.xml',
    'product/sitemap/2.xml',
    'product/sitemap/3.xml',
    'search/sitemap/0.xml',
    'search/sitemap/1.xml',
    'search/sitemap/2.xml',
    'search/sitemap/3.xml',
  ];

  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps
    .map(
      (sitemapFile) =>
        `<sitemap><loc>${BaseUrl}/${sitemapFile}</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`
    )
    .join('')}</sitemapindex>`;

  return new NextResponse(sitemapIndexXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

import type { MetadataRoute } from 'next';

import { BaseUrl } from '@/configs/settings';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/users/', '/profile/', '/checkout/', '/payment/'],
    },
    host: `${BaseUrl}`,
    sitemap: `${BaseUrl}/sitemap.xml`,
  };
}

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

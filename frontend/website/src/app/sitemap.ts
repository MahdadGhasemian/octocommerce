import { MetadataRoute } from 'next';

import { BaseUrl } from '@/configs/settings';

export async function generateSitemaps() {
  return [{ id: 0 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  id;

  const items = [
    {
      url: `${BaseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${BaseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  return items.map((item) => {
    return {
      url: item.url,
      lastModified: item.lastModified,
      changefreq: item.changeFrequency,
      priority: item.priority,
    };
  });
}

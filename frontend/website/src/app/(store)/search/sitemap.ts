import { MetadataRoute } from 'next';

import { BaseUrl } from '@/configs/settings';
import basicService from '@/services/basic.service';
import { encodeCategoryId } from '@/utils/name-encode-decode';

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const pageSize = 1000;
  const page = id + 1;

  const categories = await basicService
    .getAllSitemapCategory(pageSize, page)
    .then((response) => response.data);

  return categories.map((category) => ({
    url: `${BaseUrl}/search/${encodeCategoryId(String(category.id))}`,
    lastModified: category.updated_at,
    changefreq: 'weekly',
    priority: 0.9,
  }));
}

import { MetadataRoute } from 'next';

import { BaseUrl } from '@/configs/settings';
import basicService from '@/services/basic.service';

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
  const pageSize = 10000;
  const page = id + 1;
  const productFilters = [{ id: 'is_active', value: true, operator: '$eq' }];

  const products = await basicService
    .getAllSitemapProduct(pageSize, page, undefined, productFilters)
    .then((response) => response.data);

  return products.map((product) => {
    let images = [];

    if (product?.image) {
      images.push(product.image);
    }

    if (Array.isArray(product?.images) && product.images.length) {
      images = images.concat(product.images);
    }

    return {
      url: `${BaseUrl}/product/${product.product_code}`,
      lastModified: product.updated_at,
      changefreq: 'weekly',
      priority: 0.9,
      images,
    };
  });
}

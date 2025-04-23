import { cache } from 'react';

import basicService from '@/services/basic.service';

export const getProduct = cache(async (product_code: string) => {
  const product = await basicService.getProductByCode(product_code);

  return product;
});

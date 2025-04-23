import { cache } from 'react';

import basicService from '@/services/basic.service';

export const getCategory = cache(async (category_id: number) => {
  const category = await basicService.getCategory(category_id);

  return category;
});

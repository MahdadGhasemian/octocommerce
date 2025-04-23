import SearchPageClient from '@/components/search/SearchPageClient';

import { PageSize } from '@/constants';
import basicService from '@/services/basic.service';

export default async function Page() {
  const productFilters: {
    id: string;
    value: string | boolean;
    operator: string;
  }[] = [{ id: 'is_active', value: true, operator: '$eq' }];
  const category_id = 3;

  const initialProducts = await basicService
    .getAllProduct(PageSize, 1, undefined, productFilters)
    .then((response) => response.data);

  return (
    <SearchPageClient
      initialProducts={initialProducts}
      productFilters={productFilters}
      categoryId={+category_id}
    />
  );
}

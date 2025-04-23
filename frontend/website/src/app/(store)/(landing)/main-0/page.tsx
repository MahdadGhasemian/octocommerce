import * as React from 'react';

import ProductList from '@/components/product/ProductList';

import { PageSize } from '@/constants';
import basicService from '@/services/basic.service';

export default async function Page() {
  const productFilters = [{ id: 'is_active', value: true, operator: '$eq' }];

  const initialProducts = await basicService
    .getAllProduct(PageSize, 1, undefined, productFilters)
    .then((response) => response.data);

  return (
    <div className='flex'>
      <ProductList
        initialProducts={initialProducts}
        productFilters={productFilters}
      />
    </div>
  );
}

'use client';

import React, { Suspense } from 'react';

import ProductList from '@/components/product/ProductList';
import SearchBox from '@/components/search/SearchBox';

import { Product } from '@/services/basic.service';

export default function SearchPageClient({
  productFilters,
  initialProducts,
  categoryId,
}: {
  productFilters: {
    id: string;
    value: string | boolean;
    operator: string;
  }[];
  initialProducts: Product[];
  categoryId: number;
}) {
  return (
    <div className='flex gap-4'>
      <div className='hidden lg:block float-start'>
        <div className='sticky top-28'>
          <Suspense fallback={<div>در حال لود ...</div>}>
            <SearchBox categoryId={categoryId} />
          </Suspense>
        </div>
      </div>
      <ProductList
        initialProducts={initialProducts}
        productFilters={productFilters}
      />
    </div>
  );
}

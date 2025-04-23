import * as React from 'react';

import SearchPageClient from '@/components/search/SearchPageClient';

import { BaseUrl } from '@/configs/settings';
import { PageSize } from '@/constants';
import basicService from '@/services/basic.service';
import { decodeCategoryId } from '@/utils/name-encode-decode';

type Params = Promise<{ category_id_encoded: string; category_name: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const { category_id_encoded, category_name } = params;

  const canonical = `${BaseUrl}/search/${category_id_encoded}/${category_name}`;

  return {
    alternates: { canonical },
  };
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;

  const { category_id_encoded } = params;

  const category_id = decodeCategoryId(category_id_encoded);

  const productFilters: {
    id: string;
    value: string | boolean;
    operator: string;
  }[] = [{ id: 'is_active', value: true, operator: '$eq' }];

  if (category_id && category_id !== '1') {
    productFilters.push({
      id: 'category.id',
      value: category_id,
      operator: '$eq',
    });
  }

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

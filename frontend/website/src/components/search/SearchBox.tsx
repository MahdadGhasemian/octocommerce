'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import CategorySearchBox from '@/components/search/CategorySearchBox';

import {
  encodeCategoryId,
  encodeCategoryName,
} from '@/utils/name-encode-decode';

export default function SearchBox({ categoryId }: { categoryId: number }) {
  const router = useRouter();

  return (
    <div className='flex flex-col rounded-md w-96'>
      {/* Categories */}
      <CategorySearchBox
        selectedCategoryId={categoryId}
        onChange={(category) => {
          router.push(
            `/search/${encodeCategoryId(String(category?.id))}/${
              category?.id !== 1 && category?.name
                ? encodeCategoryName(category.name)
                : ''
            }`
          );
        }}
      />
    </div>
  );
}

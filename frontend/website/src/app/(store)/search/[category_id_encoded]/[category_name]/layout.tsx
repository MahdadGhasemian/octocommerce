import * as React from 'react';

import { encodeCategoryName } from '@/utils/name-encode-decode';

type Params = Promise<{ category_name: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { category_name } = await params;

  const categoryName = encodeCategoryName(category_name) || 'محصولات';

  return {
    title: `قیمت و خرید ${categoryName}`,
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

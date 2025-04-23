'use client';

import * as React from 'react';

import ProductCard from '@/components/product/ProductCard';

import { Product } from '@/services/basic.service';
import basicService from '@/services/basic.service';

type ProductListProps = {
  productFilters: {
    id: string;
    value: string | boolean;
    operator: string;
  }[];
  initialProducts: Product[];
};

export default function ProductList({
  initialProducts,
  productFilters,
}: ProductListProps) {
  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  const [page, setPage] = React.useState(2); // Start from the next page
  const [isFetching, setIsFetching] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true); // Track if more pages are available

  const fetchMoreProducts = async () => {
    if (!hasMore) return;

    setIsFetching(true);
    const response = await basicService.getAllProduct(
      20,
      page,
      undefined,
      productFilters
    );

    setProducts((prev) => [...prev, ...response.data]);
    setPage((prev) => prev + 1);

    // Check if the current page is the last page
    if (response.meta.currentPage >= response.meta.totalPages) {
      setHasMore(false);
    }

    setIsFetching(false);
  };

  // Intersection Observer to detect scroll
  const observer = React.useRef<IntersectionObserver | null>(null);
  const lastProductRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreProducts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore, productFilters]
  );

  return (
    <section>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 auto-rows-fr'>
        {products.map((product, index) => {
          if (index === products.length - 1) {
            return (
              <div ref={lastProductRef} key={product.id}>
                <ProductCard
                  isFirstPage={page === 2}
                  image={product.image}
                  brand={product.brand}
                  product_code={product.product_code}
                  name={product.name}
                  sale_price={product.sale_price}
                  discount_percentage={product.discount_percentage}
                  discount_amount={product.discount_amount}
                />
              </div>
            );
          }
          return (
            <ProductCard
              key={product.id}
              isFirstPage={page === 2}
              image={product.image}
              brand={product.brand}
              product_code={product.product_code}
              name={product.name}
              sale_price={product.sale_price}
              discount_percentage={product.discount_percentage}
              discount_amount={product.discount_amount}
            />
          );
        })}
      </div>
      {isFetching && <div>در حال دریافت قطعات بیشتر ...</div>}
    </section>
  );
}

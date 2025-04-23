import ProductCard from '@/components/product/ProductCard';

import { Product } from '@/services/basic.service';

type ProductListProps = {
  products: Product[];
};

export default function RelatedProducts({ products }: ProductListProps) {
  return (
    <section>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>محصولات مرتبط :</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 auto-rows-fr'>
        {products?.map((product, index) => {
          return (
            <ProductCard
              key={index}
              isFirstPage={false}
              image={`${product.image}`}
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
    </section>
  );
}

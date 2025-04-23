'use server';

import * as React from 'react';

import OrderingCart from '@/components/product/OrderingCart';
import ProductDetail from '@/components/product/ProductDetail';
import RelatedProducts from '@/components/product/RelatedProducts';
import ProductSpecification from '@/components/product/specifications/ProductSpecification';
import ProductQuestion from '@/components/question/ProductQuestion';
import ProductReview from '@/components/review/ProductReview';

import { BaseUrl } from '@/configs/settings';
import { siteConfig } from '@/configs/site';
import basicService from '@/services/basic.service';
import { getProduct } from '@/utils/get-product';
import { encodeProductName } from '@/utils/name-encode-decode';

type Params = Promise<{ product_code: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const { product_code } = params;

  const product = await getProduct(product_code);
  const { id: product_id, name: product_name, description, available_quantity, sale_price, keywords, image } = product;

  const title = `خرید و قیمت ${product_name}`;
  const product_price = sale_price;
  const product_old_price = sale_price;
  const availability = +available_quantity > 0 ? 'instock' : 'outofstock';
  const canonical = `${BaseUrl}/product/${product_code}/${encodeProductName(product_name)}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.main_title,
      images: [
        {
          url: `${image}?width=350&quality=60`,
          alt: product_name,
        },
      ],
      locale: 'fa_IR',
      phoneNumbers: siteConfig.phoneNumbers,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: `${image}?width=350&quality=60`,
          alt: product_name,
        },
      ],
    },
    other: {
      product_id,
      product_name,
      product_price,
      product_old_price,
      availability,
    },
  };
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;

  const { product_code } = params;

  const product = await getProduct(product_code);

  const category_name = product.category?.name;
  const productFilters = [
    { id: 'is_active', value: true, operator: '$eq' },
    { id: 'category.name', value: category_name, operator: '$eq' },
  ];
  const relatedProducts = await basicService.getAllProduct(5, 1, undefined, productFilters).then(response => {
    return response.data;
  });

  const reviewFilters = [{ id: 'product.product_code', value: product_code, operator: '$eq' }];
  const reviews = await basicService.getAllReview(100, 1, undefined, reviewFilters).then(response => {
    return response.data;
  });
  const reviewGist = await basicService.getReviewGist(product_code);

  const questionFilters = [{ id: 'product.product_code', value: product_code, operator: '$eq' }];
  const questions = await basicService.getAllQuestion(100, 1, undefined, questionFilters).then(response => {
    return response.data;
  });

  if (!product) {
    return <div>محصول یافت نشد!</div>;
  }

  return (
    <section className='flex flex-col gap-32'>
      <div className='flex flex-col gap-10 md:gap-32 mx-4 md:mx-10'>
        <ProductDetail product={product} />
        <ProductSpecification product={product} />
        <ProductReview product={product} reviews={reviews} reviewGist={reviewGist} />
        <ProductQuestion product={product} questions={questions} />
        <RelatedProducts products={relatedProducts} />
      </div>
      <div className='fixed bottom-12 sm:bottom-0 w-full xl:hidden'>
        <OrderingCart product={product} />
      </div>
    </section>
  );
}

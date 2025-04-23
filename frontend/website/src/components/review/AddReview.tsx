'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import ReviewForm from '@/components/review/ReviewForm';

import { Product } from '@/services/basic.service';

type AddReviewProps = {
  product: Product;
};

const AddReview: React.FC<AddReviewProps> = (props: AddReviewProps) => {
  // ** Props
  const { product } = props;

  // ** Functions
  const closeModal = () => {
    const modalCheckbox = document.getElementById(
      'adding_review_modal'
    ) as HTMLInputElement;
    if (modalCheckbox) {
      modalCheckbox.checked = false;
    }
  };

  return (
    <div className='w-full'>
      <label
        className='btn btn-outline w-full btn-primary text-primary-content'
        htmlFor='adding_review_modal'
      >
        ثبت دیدگاه
      </label>
      <input
        type='checkbox'
        id='adding_review_modal'
        className='modal-toggle'
      />
      <div className='modal' role='dialog'>
        <div className='modal-box p-0'>
          {/* Title */}
          <div className='w-full flex flex-row gap-2 items-center border-b-2 border-base-200 py-4'>
            <label
              htmlFor='adding_review_modal'
              className='btn btn-sm btn-ghost'
            >
              <ArrowRight />
            </label>
            <p>دیدگاه و امتیاز من</p>
          </div>
          {/* Product Info */}
          <div className='flex flex-row gap-8 items-center px-4 py-4 border-b-2 border-base-200'>
            {/* Product Image */}
            <div className='flex flex-col'>
              <div className='h-[96px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4'>
                <Image
                  className='w-full h-full object-cover'
                  src={`${product.image}`}
                  alt={`${product.name}`}
                  width={96}
                  height={96}
                />
              </div>
            </div>
            {/* Product Name */}
            <p className=''>{product.name}</p>
          </div>
          {/* Review Content */}
          <div className='px-6'>
            <ReviewForm product_id={product.id} onClose={closeModal} />
          </div>
        </div>
        <label className='modal-backdrop' htmlFor='adding_review_modal'>
          Close
        </label>
      </div>
    </div>
  );
};

export default AddReview;

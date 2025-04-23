'use server';

import { Dot, Minus, Plus } from 'lucide-react';
import * as React from 'react';

import Rating from '@/components/Rating';
import AddReview from '@/components/review/AddReview';
import TimeAgo from '@/components/TimeAgo';

import { Product, Review, ReviewGist } from '@/services/basic.service';

type ProductReviewProps = {
  product: Product;
  reviews: Review[];
  reviewGist: ReviewGist;
};

const ProductReview: React.FC<ProductReviewProps> = (
  props: ProductReviewProps
) => {
  // ** Props
  const { product, reviews, reviewGist } = props;

  // ** Vars
  const is_empty = !reviews?.length;

  return (
    <section className=''>
      <div className='mb-6 flex flex-col items-start'>
        <p className='text-h5 text-neutral-900 pointer-events-none border-b-2 border-primary pb-1 md:pb-4'>
          {is_empty ? 'دیدگاه ها' : 'امتیاز و دیدگاه کاربران'}
        </p>
      </div>
      <div className='flex flex-col md:flex-row gap-12 w-full'>
        <div className='flex flex-col gap-2 md:w-1/5'>
          <div className='flex flex-row md:flex-col gap-10 md:gap-1 justify-evenly'>
            {!is_empty ? (
              <div className='flex items-center'>
                <p className='text-3xl ml-1 leading-none'>
                  {reviewGist.average_rating}
                </p>
                <p> از ۵ </p>
              </div>
            ) : (
              <></>
            )}
            {is_empty ? (
              <div className='flex flex-col gap-1'>
                <p className='text-neutral-400 text-xs'>
                  هنوز امتیازی ثبت نشده است
                </p>
                <Rating rating={0} />
              </div>
            ) : (
              <div className='flex flex-col md:flex-row gap-2 items-center'>
                <Rating rating={reviewGist.average_rating} />
                <p className='text-neutral-400 text-xs'>
                  از مجموع <span>{reviewGist.count}</span> امتیاز
                </p>
              </div>
            )}
          </div>
          <p className='text-neutral-500 text-sm mt-4 mb-3 w-full'>
            شما هم درباره این کالا دیدگاه ثبت کنید
          </p>
          <AddReview product={product} />
        </div>

        <div className='grow flex flex-col w-full md:w-4/5'>
          {is_empty ? (
            <div>
              <div className='text-neutral-900 text-l'>
                شما هم می‌توانید در مورد این کالا نظر دهید.
              </div>
              <p className='text-neutral-500 text-xs mt-4 mb-3 w-full'>
                اگر این محصول را قبلا از اُکتو کامرس خریده باشید، دیدگاه شما
                به عنوان خریدار ثبت خواهد شد. همچنین در صورت تمایل می‌توانید به
                صورت ناشناس نیز دیدگاه خود را ثبت کنید
              </p>
            </div>
          ) : (
            reviews?.map((review, index) => {
              return (
                <div key={review.id} className='flex flex-col gap-0'>
                  <div className='flex flex-col gap-4'>
                    {/* Head */}
                    <div className='flex flex-row gap-2'>
                      <p className='text-caption text-neutral-400 inline text-xs'>
                        {review.is_anonymous
                          ? 'کاربر اُکتو کامرس'
                          : `${review.user?.first_name || ''} ${
                              review.user?.last_name || ''
                            }`}
                      </p>
                      {review.user_has_bought_product ? (
                        <div className='badge badge-md bg-green-100 text-green-800 text-xs'>
                          خریدار
                        </div>
                      ) : (
                        <></>
                      )}
                      <Dot width={24} height={24} className='text-base-300' />
                      <TimeAgo date={review.created_at} />
                    </div>

                    {/* Rating */}
                    <div className=''>
                      <Rating rating={review?.rating ? review.rating : 0} />
                    </div>

                    {/* Title */}
                    <div className='text-neutral-900 text-xl'>
                      {review.title}
                    </div>

                    {/* Content */}
                    <p className='text-neutral-800 break-words text-sm leading-7'>
                      {review.content}
                    </p>

                    {/* Pros and Cons */}
                    {review?.pros?.length || review?.cons?.length ? (
                      <div className='flex flex-col gap-1 w-full'>
                        {review.pros?.map((prosItem, index) => (
                          <div
                            key={`pros-${prosItem}-${index}`}
                            className='flex flex-row items-center gap-2'
                          >
                            <Plus
                              size={18}
                              className='text-success border border-transparent text-4xl'
                            />
                            <p className='text-neutral-900 text-sm'>
                              {prosItem}
                            </p>
                          </div>
                        ))}
                        {review.cons?.map((consItem, index) => (
                          <div
                            key={`cons-${consItem}-${index}`}
                            className='flex flex-row items-center gap-2'
                          >
                            <Minus
                              size={18}
                              className='text-error border border-transparent text-4xl'
                            />
                            <p className='text-neutral-900 text-sm'>
                              {consItem}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}

                    {/* Images and Media */}
                    {review?.images || review?.videos ? (
                      <div className=''></div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* Divider */}
                  {index < reviews.length - 1 ? (
                    <div className='divider opacity-50'></div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReview;

'use server';

import * as React from 'react';

import AddAnswer from '@/components/question/AddAnswer';
import AddQuestion from '@/components/question/AddQuestion';

import { Product, Question } from '@/services/basic.service';

type ProductQuestionProps = {
  product: Product;
  questions: Question[];
};

const ProductQuestion: React.FC<ProductQuestionProps> = (
  props: ProductQuestionProps
) => {
  // ** Props
  const { product, questions } = props;

  // ** Vars
  const is_empty = !questions?.length;

  return (
    <section className=''>
      <div className='mb-6 flex flex-col items-start'>
        <p className='text-h5 text-neutral-900 pointer-events-none border-b-2 border-primary pb-1 md:pb-4'>
          پرسش ها
        </p>
      </div>
      <div className='flex flex-col md:flex-row gap-12 w-full'>
        <div className='flex flex-col gap-2 md:w-1/5'>
          <p className='text-neutral-500 text-sm mt-4 mb-3 w-full'>
            شما هم درباره این کالا پرسش ثبت کنید
          </p>
          <AddQuestion product={product} />
        </div>

        <div className='grow flex flex-col w-full md:w-4/5'>
          {is_empty ? (
            <div>
              <div className='text-neutral-900 text-l'>
                درباره این کالا چه پرسشی دارید؟
              </div>
            </div>
          ) : (
            questions?.map((question, index) => {
              return (
                <div key={question.id} className='flex flex-col gap-8'>
                  {/* Question Text */}
                  <div className='flex flex-row gap-4 items-start w-full'>
                    <div className='w-10'>
                      <div className='w-6 h-6 flex items-center justify-center border-2 border-secondary text-secondary text-l leading-none rounded-lg'>
                        <span>?</span>
                      </div>
                    </div>
                    <div className='flex-grow text-neutral-900 text-l'>
                      {question.question_text}
                    </div>
                  </div>
                  {/* Answers */}
                  {question?.answers?.length ? (
                    <div className='flex flex-row gap-4 w-full'>
                      <div className='w-10'>
                        <p className='text-neutral-400 text-sm'>پاسخ</p>
                      </div>
                      <div className='flex flex-col gap-4'>
                        {question.answers?.map((answer) => (
                          <div
                            key={answer.id}
                            className='border-b border-base-200 pb-2 my-1'
                          >
                            <p className='text-sm'>{answer.answer_text}</p>
                            <p className='text-neutral-400 text-xs mt-1'>{`${
                              answer.user?.first_name || ''
                            } ${answer.user?.last_name || ''}`}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}

                  {/* Add New Answer */}
                  <div className='flex flex-row items-center w-full'>
                    <div className='w-10'></div>
                    <AddAnswer product={product} question={question} />
                  </div>
                  {/* Divider */}
                  {index < questions.length - 1 ? (
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

export default ProductQuestion;

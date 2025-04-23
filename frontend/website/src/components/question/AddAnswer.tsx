'use client';

import { ArrowRight, ChevronLeft } from 'lucide-react';
import * as React from 'react';

import AnswerForm from '@/components/question/AnswerForm';

import { Product, Question } from '@/services/basic.service';

type AddAnswerProps = {
  product: Product;
  question: Question;
};

const AddAnswer: React.FC<AddAnswerProps> = (props: AddAnswerProps) => {
  // ** Props
  const { question } = props;

  // ** Vars
  const is_no_answered = !question.answers?.length;

  // ** Functions
  const closeModal = () => {
    const modalCheckbox = document.getElementById(
      'adding_answer_modal'
    ) as HTMLInputElement;
    if (modalCheckbox) {
      modalCheckbox.checked = false;
    }
  };

  return (
    <div className='w-full'>
      <label
        className='btn btn-ghost text-secondary'
        htmlFor='adding_answer_modal'
      >
        {is_no_answered ? 'ثبت پاسخ' : 'ثبت پاسخ جدید'}
        <ChevronLeft size={18} />
      </label>
      <input
        type='checkbox'
        id='adding_answer_modal'
        className='modal-toggle'
      />
      <div className='modal' role='dialog'>
        <div className='modal-box p-0'>
          {/* Title */}
          <div className='w-full flex flex-row gap-2 items-center border-b-2 border-base-200 py-4'>
            <label
              htmlFor='adding_answer_modal'
              className='btn btn-sm btn-ghost'
            >
              <ArrowRight />
            </label>
            <p>به این پرسش پاسخ دهید</p>
          </div>
          {/* Question */}
          <div className='flex flex-row gap-8 items-center px-4 py-4'>
            {/* Question Text */}
            <p className=''>{question.question_text}</p>
          </div>
          {/* Question Content */}
          <div className='px-6'>
            <AnswerForm question_id={question.id} onClose={closeModal} />
          </div>
        </div>
        <label className='modal-backdrop' htmlFor='adding_answer_modal'>
          Close
        </label>
      </div>
    </div>
  );
};

export default AddAnswer;

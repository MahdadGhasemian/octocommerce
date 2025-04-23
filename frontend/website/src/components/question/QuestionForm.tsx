'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import basicService from '@/services/basic.service';

type QuestionFormProps = {
  product_id: number;
  onClose?: () => void;
};

const QuestionForm: React.FC<QuestionFormProps> = (
  props: QuestionFormProps
) => {
  // ** Route
  const router = useRouter();

  // ** Props
  const { product_id, onClose } = props;

  // ** State
  const [questionText, setQuestionText] = useState('');

  // ** Functions
  const resetForm = () => {
    setQuestionText('');
  };

  async function submitQuestion() {
    const question = {
      product_id,
      question_text: questionText,
    };

    try {
      await basicService.createQuestion(question);

      resetForm();

      if (onClose) onClose();
      router.refresh();
    } catch (error) {
      //
    }
  }

  return (
    <div className='w-full'>
      {/* Form */}
      <form action={submitQuestion}>
        <div className='flex flex-col gap-4 py-8'>
          <p>پرسش خود را شرح دهید</p>

          <div className='flex flex-col gap-4'>
            <label htmlFor='title' className='text-sm font-medium'>
              <span>متن پرسش</span>
              <span className='text-error'>*</span>
            </label>
            <textarea
              id='questionText'
              name='questionText'
              className='textarea textarea-bordered textarea-secondary w-full'
              required
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>

          <button className='btn w-full btn-primary text-primary-content'>
            ثبت پرسش
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;

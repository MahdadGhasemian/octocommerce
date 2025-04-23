'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import basicService from '@/services/basic.service';

type AnswerFormProps = {
  question_id: number;
  onClose?: () => void;
};

const AnswerForm: React.FC<AnswerFormProps> = (props: AnswerFormProps) => {
  // ** Route
  const router = useRouter();

  // ** Props
  const { question_id, onClose } = props;

  // ** State
  const [answerText, setAnswerText] = useState('');

  // ** Functions
  const resetForm = () => {
    setAnswerText('');
  };

  async function submitAnswer() {
    const answer = {
      answer_text: answerText,
    };

    try {
      await basicService.createAnswerToQuestion(question_id, answer);

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
      <form action={submitAnswer}>
        <div className='flex flex-col gap-4 py-4'>
          <div className='flex flex-col gap-4'>
            <label htmlFor='title' className='text-sm font-medium'>
              <span className='text-neutral-700'>پاسخ</span>
            </label>
            <textarea
              id='answerText'
              name='answerText'
              className='textarea textarea-bordered textarea-secondary w-full'
              required
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
            />
          </div>

          <button className='btn w-full btn-primary text-primary-content'>
            ثبت پاسخ
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnswerForm;

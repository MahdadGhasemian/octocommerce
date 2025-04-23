'use client';

import clsx from 'clsx';
import { QuoteIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import React, { useState } from 'react';

import { RecommendationType } from '@/services/basic.service';

interface RecommendSelectProps {
  initialValue?: RecommendationType;
  onChange?: (value: RecommendationType) => void;
}

const RecommendSelect: React.FC<RecommendSelectProps> = (
  props: RecommendSelectProps
) => {
  // ** Props
  const { initialValue = RecommendationType.UNKNOWN, onChange } = props;

  // ** State
  const [recommendedNumber, setRecommendedNumber] = useState(initialValue);

  // ** Vars
  const names = ['پیشنهاد می‌کنم', 'مطمئن نیستم', 'پیشنهاد نمی‌کنم'];
  const icons = [
    <ThumbsUpIcon key='ThumbsUpIcon' />,
    <QuoteIcon key='QuoteIcon' />,
    <ThumbsDownIcon key='ThumbsDownIcon' />,
  ];

  // ** Functions
  const handleRecommendSelect = (type: RecommendationType) => {
    if (type === recommendedNumber)
      setRecommendedNumber(RecommendationType.UNKNOWN);
    else setRecommendedNumber(type);

    if (onChange) onChange(type);
  };

  return (
    <div className='flex flex-row justify-center gap-2 w-full'>
      {[
        { value: RecommendationType.RECOMMENDED, id: 0 },
        { value: RecommendationType.NOT_SURE, id: 1 },
        { value: RecommendationType.NOT_RECOMMENDED, id: 2 },
      ].map((_, index) => (
        <button
          key={`select-${_}-${index}`}
          className={clsx(
            recommendedNumber === _.value
              ? 'text-secondary border-secondary'
              : 'text-neutral-400 border-neutral-400',
            'flex flex-col items-center rounded-md border-2 px-2 py-6'
          )}
          onClick={(e) =>
            handleRecommendSelect(
              index === 0
                ? RecommendationType.RECOMMENDED
                : index === 1
                ? RecommendationType.NOT_SURE
                : index === 2
                ? RecommendationType.NOT_RECOMMENDED
                : RecommendationType.UNKNOWN
            )
          }
        >
          <div className='flex mb-2'>{icons[index]}</div>
          <p className='text-center mx-1 text-body2-strong'>{names[index]}</p>
        </button>
      ))}
    </div>
  );
};

export default RecommendSelect;

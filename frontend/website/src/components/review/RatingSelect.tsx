'use client';

import clsx from 'clsx';
import React, { useState } from 'react';

interface RatingSelectProps {
  initialValue?: number;
  totalStars?: number;
  onChange?: (value: number | 0) => void;
}

const RatingSelect: React.FC<RatingSelectProps> = (
  props: RatingSelectProps
) => {
  // ** Props
  const { initialValue = 0, totalStars = 5, onChange } = props;

  const [rating, setRating] = useState<number>(initialValue);

  const handleRatingSelect = (index: number) => {
    setRating(index + 1);

    if (onChange) onChange(index + 1);
  };

  return (
    <div className='rating rating-md'>
      {[...Array(totalStars)].map((_, index) => (
        <input
          key={index}
          type='radio'
          className={clsx(
            'mask mask-star-2',
            index < rating ? 'star-active' : 'star-inactive'
          )}
          checked={rating === index + 1}
          onChange={() => handleRatingSelect(index)}
        />
      ))}
    </div>
  );
};

export default RatingSelect;

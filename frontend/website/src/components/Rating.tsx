import clsx from 'clsx';
import React from 'react';

interface RatingProps {
  rating: number; // the rating value to display
  totalStars?: number; // total number of stars (defaults to 5)
}

const Rating: React.FC<RatingProps> = ({ rating, totalStars = 5 }) => {
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
          checked={false}
          readOnly
        />
      ))}
    </div>
  );
};

export default Rating;

import React from 'react';

import TomanIcon from '@/components/icons/toman-icon';
import NumberInput from '@/components/NumberInput';

interface PriceRangeProps {
  initialMinValue: number;
  initialMaxValue: number;
}

const PriceRange: React.FC<PriceRangeProps> = ({
  initialMinValue,
  initialMaxValue,
}: PriceRangeProps) => {
  const [minValue, setMinValue] = React.useState<number>(initialMinValue);
  const [maxValue, setMaxValue] = React.useState<number>(initialMaxValue);
  const [value, setValue] = React.useState<number>(initialMaxValue / 2);

  return (
    <div className=''>
      {/* از */}
      <div className='flex items-center text-subtitle text-neutral-500 mb-6 w-full'>
        <div>از</div>
        <div className='grow text-body-3 font-black px-2'>
          <NumberInput
            initialValue={minValue}
            onChange={(v) => setMinValue(+v)}
          />
        </div>
        <h3 className=''>
          <TomanIcon width='20' height='20' color='black' />
        </h3>
      </div>
      {/* تا */}
      <div className='flex items-center text-subtitle text-neutral-500 mb-6 w-full'>
        <div>تا</div>
        <div className='grow text-body-3 font-black px-2'>
          <NumberInput
            initialValue={maxValue}
            onChange={(v) => setMaxValue(+v)}
          />
        </div>
        <h3 className=''>
          <TomanIcon width='20' height='20' color='black' />
        </h3>
      </div>
      {/* رنج */}
      <input
        type='range'
        min={minValue}
        max={maxValue}
        className='range range-xs range-primary'
        step='25'
        value={value}
        onChange={(e) => setValue(+e.target.value)}
      />
      <div className='flex w-full justify-between px-2 text-xs text-base-300'>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
    </div>
  );
};

export default PriceRange;

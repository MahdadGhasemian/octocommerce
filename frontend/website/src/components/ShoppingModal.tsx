import * as React from 'react';

export interface Props {
  title?: string;
  content?: string;
  children?: React.ReactNode;
}

const ShoppingModal: React.FC<Props> = (props: Props) => {
  const { title, content, children } = props;

  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor='shopping_cart_modal'>{children}</label>

      {/* Put this part before </body> tag */}
      <input
        type='checkbox'
        id='shopping_cart_modal'
        className='modal-toggle'
      />
      <div className='modal' role='dialog'>
        <div className='modal-box fixed right-0 h-full max-h-max w-1/4 rounded-none flex items-center justify-center'>
          <h3 className='text-lg font-bold'>{title}</h3>
          <p className='py-4'>{content}</p>
        </div>
        <label className='modal-backdrop' htmlFor='shopping_cart_modal'>
          بستن
        </label>
      </div>
    </div>
  );
};

export default ShoppingModal;

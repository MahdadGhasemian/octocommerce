import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCart, selectDeliveryContact, selectDeliveryMethod } from '@/lib/store/features/cart/cartSlice';
import { cn } from '@/lib/utils';

import CartItems from '@/components/cart/CartItems';
import DeliveryMethodSelection from '@/components/cart/DeliveryMethodSelection';
import ProfileManage from '@/components/users/ProfileManage';
import SelectContactInfo from '@/components/users/SelectContactInfo';

interface CartStepsProps {
  needToSetName: boolean;
}

const CartSteps = (props: CartStepsProps) => {
  // ** Props
  const { needToSetName } = props;

  // ** Store
  const { isEmpty } = useSelector(selectCart);
  const deliveryContact = useSelector(selectDeliveryContact);
  const deliveryMethod = useSelector(selectDeliveryMethod);

  // ** State
  const [activeStep, setActiveStep] = useState(1);

  // ** Vars
  const deliveryContactIsValid = deliveryContact && deliveryContact.id;
  const deliveryMethodIsValid = deliveryMethod && deliveryMethod.id;

  // Function to handle step click
  const handleStepClick = (step: React.SetStateAction<number>) => {
    setActiveStep(step);
  };

  return (
    <div className='flex flex-col items-start justify-between text-base-content gap-10 w-full'>
      {/* Steps */}
      {!isEmpty &&
        (needToSetName ? (
          <ul className='steps w-full'>
            <li
              className={`step ${activeStep === 1 ? 'step-primary' : ''} cursor-pointer`}
              onClick={() => handleStepClick(1)}
            >
              مشاهده کالاها
            </li>
            <li
              className={`step ${activeStep === 2 ? 'step-primary' : ''} cursor-pointer`}
              onClick={() => handleStepClick(2)}
            >
              مشخصات کاربری
            </li>
            <li
              data-content={deliveryContactIsValid ? '✓' : '3'}
              className={cn(
                'step cursor-pointer',
                activeStep === 3 ? (deliveryContactIsValid ? 'step-success' : 'step-primary') : ''
              )}
              onClick={() => handleStepClick(3)}
            >
              آدرس
            </li>
            <li
              data-content={deliveryMethodIsValid ? '✓' : '4'}
              className={cn(
                'step cursor-pointer',
                activeStep === 4 ? (deliveryMethodIsValid ? 'step-success' : 'step-primary') : ''
              )}
              onClick={() => handleStepClick(4)}
            >
              انتخاب روش ارسال
            </li>
          </ul>
        ) : (
          <ul className='steps w-full'>
            <li
              className={`step ${activeStep === 1 ? 'step-primary' : ''} cursor-pointer`}
              onClick={() => handleStepClick(1)}
            >
              مشاهده کالاها
            </li>
            <li
              data-content={deliveryContactIsValid ? '✓' : '2'}
              className={cn(
                'step cursor-pointer',
                activeStep === 3 ? (deliveryContactIsValid ? 'step-success' : 'step-primary') : ''
              )}
              onClick={() => handleStepClick(3)}
            >
              آدرس
            </li>
            <li
              data-content={deliveryMethodIsValid ? '✓' : '3'}
              className={cn(
                'step cursor-pointer',
                activeStep === 4 ? (deliveryMethodIsValid ? 'step-success' : 'step-primary') : ''
              )}
              onClick={() => handleStepClick(4)}
            >
              انتخاب روش ارسال
            </li>
          </ul>
        ))}

      {/* Display Cart Items only for Step 1 */}
      {activeStep === 1 && (
        <div className='w-full'>
          <CartItems />
        </div>
      )}

      {/* Display Account Info only for Step 2 */}
      {activeStep === 2 && (
        <div className='w-full'>
          <ProfileManage />
        </div>
      )}

      {/* Display Contacts Selection only for Step 3 */}
      {activeStep === 3 && (
        <div className='w-full'>
          <SelectContactInfo />
        </div>
      )}

      {/* Display Delivery Method Selection only for Step 4 */}
      {activeStep === 4 && (
        <div className='w-full'>
          <DeliveryMethodSelection />
        </div>
      )}
    </div>
  );
};

export default CartSteps;

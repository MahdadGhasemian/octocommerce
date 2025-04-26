import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectCart,
  selectDeliveryAddress,
  selectDeliveryCost,
  selectDeliveryMethod,
  selectDeliveryMethodAreaRule,
  setDeliveryMethodAreaRuleSelected,
  setDeliveryMethodSelected,
} from '@/lib/store/features/cart/cartSlice';

import Heading from '@/components/ui/heading';

import basicService, {
  DeliveryChargeType,
  DeliveryMethod,
  DeliveryMethodAreaRule,
  DeliveryPricingType,
  DeliveryType,
} from '@/services/basic.service';
import { calculateCostPerDistance } from '@/utils/location';

const DeliveryTypeMap = new Map<DeliveryType, string>([
  [DeliveryType.POST_NORAMAL, 'پست عادی'],
  [DeliveryType.POST_FAST, 'پست پیشتاز'],
  [DeliveryType.TIPAX, 'تی پاکس'],
  [DeliveryType.RIDER, 'پیک'],
  [DeliveryType.SELF_PICKUP, 'تحویل حضوری'],
]);

const filters = [{ id: 'is_enabled', value: true, operator: '$eq' }];
const sorting = [
  {
    id: 'id',
    desc: false,
  },
];

const DeliveryMethodSelection = () => {
  // ** Store
  const dispatch = useDispatch();
  const { setting } = useSelector(selectCart);
  const deliveryCost = useSelector(selectDeliveryCost);
  const deliveryAddress = useSelector(selectDeliveryAddress);
  const deliveryMethod = useSelector(selectDeliveryMethod);
  const deliveryMethodAreaRule = useSelector(selectDeliveryMethodAreaRule);

  // ** State
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the available DeliveryMethod methods
    const fetchDeliveryMethodMethods = async () => {
      try {
        const response = await basicService.getAllDeliveryMethod(100, 1, undefined, filters, sorting);

        const data = response.data;
        setDeliveryMethods(
          data?.map(item => {
            return {
              ...item,
              fixed_price: Number(item.fixed_price || 0),
              delivery_method_area_rules: item?.delivery_method_area_rules
                ?.map(area => {
                  return {
                    ...area,
                    price: Number(area.price || 0),
                  };
                })
                ?.sort((a: DeliveryMethodAreaRule, b: DeliveryMethodAreaRule) => {
                  return a.area_name.localeCompare(b.area_name);
                }),
            };
          })
        );
      } catch (error) {
        error;
      }
    };

    fetchDeliveryMethodMethods();
  }, []);

  const validateLocations = (): boolean => {
    if (!setting?.delivery_center_latitude || !setting?.delivery_center_longitude) {
      return false;
    }

    if (!deliveryAddress?.latitude || !deliveryAddress?.longitude) {
      return false;
    }

    return true;
  };

  const showPricePart = (deliveryMethod: DeliveryMethod): string => {
    if (
      deliveryMethod.delivery_pricing_type === DeliveryPricingType.FIXED &&
      deliveryMethod.delivery_charge_type !== DeliveryChargeType.COD
    ) {
      return `${deliveryMethod.fixed_price} تومان`;
    } else if (
      deliveryMethod.delivery_pricing_type === DeliveryPricingType.FIXED &&
      deliveryMethod.delivery_charge_type === DeliveryChargeType.COD
    ) {
      return 'پس کرایه';
    } else if (deliveryMethod.delivery_pricing_type === DeliveryPricingType.SELECTED_AREA) {
      return deliveryMethodAreaRule?.price ? `${deliveryMethodAreaRule.price} تومان` : '';
    } else if (deliveryMethod.delivery_pricing_type === DeliveryPricingType.PER_KILOMETER) {
      return `${calculateCostPerDistance(deliveryMethod?.fixed_price || 0, deliveryMethod?.per_kilometer || 0, [
        {
          latitude: setting?.delivery_center_latitude,
          longitude: setting?.delivery_center_longitude,
        },
        {
          latitude: deliveryAddress?.latitude,
          longitude: deliveryAddress?.longitude,
        },
      ])} تومان`;
    } else {
      return '';
    }
  };

  // Handle DeliveryMethod method selection
  const handleDeliveryMethodSelect = (deliveryMethod: DeliveryMethod) => {
    if (deliveryMethod.delivery_pricing_type === DeliveryPricingType.PER_KILOMETER) {
      if (!validateLocations()) {
        setErrorMessage(
          `برای انتخاب ارسال توسط ${DeliveryTypeMap.get(
            deliveryMethod?.delivery_type
          )} نیاز به یک آدرس حمل با لوکیشن می باشد.` +
            '\n' +
            'لطفا به مرحله قبل در قسمت ویرایش آدرس ها بروید و لوکیشن آدرس را از روی نقشه انتخاب نمایید.'
        );

        return;
      }
    }

    setErrorMessage(null);

    dispatch(setDeliveryMethodSelected(deliveryMethod));

    if (
      deliveryMethod.delivery_pricing_type === DeliveryPricingType.SELECTED_AREA &&
      deliveryMethod.delivery_method_area_rules?.length
    ) {
      const areaRule = deliveryMethod.delivery_method_area_rules[0];
      dispatch(setDeliveryMethodAreaRuleSelected(areaRule));
    }
  };

  // Handle area rule selection
  const handleAreaRuleSelect = (deliveryMethod: DeliveryMethod, areaRule: DeliveryMethodAreaRule) => {
    dispatch(setDeliveryMethodSelected(deliveryMethod));
    dispatch(setDeliveryMethodAreaRuleSelected(areaRule));
  };

  return (
    <div className='flex flex-col items-start justify-between text-base-content gap-2 xl:gap-10 border rounded-lg w-full p-2 md:p-10'>
      <div className='flex xl:flex-col items-center xl:items-start gap-2'>
        <Heading variant='titleMedium'>انتخاب روش ارسال</Heading>
      </div>

      <div className='mt-4'>
        {deliveryMethod ? (
          <h3 className='text-base font-semibold text-neutral-700'>هزینه ارسال: {deliveryCost} تومان</h3>
        ) : (
          <h3 className='text-base font-semibold text-primary'>لطفا یکی از روش های ارسال را انتخاب نمایید.</h3>
        )}
      </div>

      {deliveryMethods.length === 0 ? (
        <p>در حال بارگذاری روش‌های ارسال...</p>
      ) : (
        <div className='space-y-4 w-full'>
          <p className='text-sm text-error'>{errorMessage}</p>

          {deliveryMethods.map(dMethod => (
            <div
              key={dMethod.id}
              className={`border rounded-lg p-4 cursor-pointer ${
                dMethod?.id === deliveryMethod?.id ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleDeliveryMethodSelect(dMethod)}
            >
              <div className='flex justify-between items-center'>
                <span>{DeliveryTypeMap.get(dMethod.delivery_type)}</span>
                <span>{showPricePart(dMethod)}</span>
              </div>

              <p className='text-sm text-neutral-500'>{dMethod.description}</p>

              {/* If there are area rules, show them as options */}
              {dMethod.delivery_pricing_type === DeliveryPricingType.SELECTED_AREA &&
                dMethod.delivery_method_area_rules &&
                dMethod.delivery_method_area_rules.length > 0 &&
                dMethod?.id === deliveryMethod?.id && (
                  <div className='mt-4 space-y-0'>
                    {dMethod.delivery_method_area_rules.map((areaRule, index) => (
                      <div
                        key={`area-item-${areaRule.area_name}-${index}`}
                        className={`p-2 border rounded-lg cursor-pointer ${
                          deliveryMethodAreaRule?.area_name === areaRule.area_name ? 'bg-gray-300' : ''
                        }`}
                        onClick={e => {
                          e.stopPropagation(); // Prevent the click event from bubbling up
                          handleAreaRuleSelect(dMethod, areaRule);
                        }}
                        style={{ zIndex: 10 }} // Ensure the area rule is above other elements
                      >
                        <span>{areaRule.area_name}</span> - {areaRule.price} تومان
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryMethodSelection;

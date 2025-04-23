'use server';

import * as React from 'react';

import { Product } from '@/services/basic.service';

type ProductSpecificationProps = {
  product: Product;
};

const ProductSpecification: React.FC<ProductSpecificationProps> = (
  props: ProductSpecificationProps
) => {
  // ** Props
  const { product } = props;

  // ** Vars
  const { specifications } = product;
  const is_empty = !specifications?.length;

  if (is_empty) return <div></div>;

  return (
    <section className=''>
      <div className='mb-6 flex flex-col items-start'>
        <p className='text-h5 text-neutral-900 pointer-events-none border-b-2 border-primary pb-1 md:pb-4'>
          مشخصات
        </p>
      </div>
      <div className='flex flex-row gap-12 w-full'>
        <div className='hidden md:flex flex-col gap-2 md:w-1/5'>
          <p className='text-neutral-700 text-sm mt-4 mb-3 w-full'>
            مشخصات کلی
          </p>
        </div>
        <div className='flex-grow flex flex-col w-full md:w-4/5'>
          <div className='overflow-x-auto'>
            <table className='table'>
              <tbody>
                {specifications.map((spec, index) => (
                  <tr key={`spec-key-${spec.key}-${index}`}>
                    <td>
                      <div>
                        <p>{spec.key}</p>
                        <p
                          className='text-neutral-400 text-xs me-4 mt-1'
                          dir='ltr'
                        >
                          {spec.key_2}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p>{spec.value}</p>
                        <p
                          className='text-neutral-400 text-xs me-4 mt-1'
                          dir='ltr'
                        >
                          {spec.value_2}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecification;

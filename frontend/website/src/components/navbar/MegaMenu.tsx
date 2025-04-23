'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import basicService from '@/services/basic.service';

const MegaMenu = () => {
  const [categoryNames, setCategoryNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryTree = await basicService.getAllTree();
      const categoryNames = categoryTree[0].children.map(
        (category) => category.name
      );

      setCategoryNames(categoryNames);
    };

    fetchCategories();
  }, []);

  return (
    <div className='transition-all duration-500 max-h-40 opacity-100'>
      <ul className='menu menu-vertical lg:menu-horizontal bg-white py-0 gap-4 px-0'>
        <li className='dropdown dropdown-hover dropdown-bottom dropdown-start hover:border-b-2 border-primary'>
          <div
            tabIndex={0}
            role='button'
            className='md:hidden text-gray-700 cursor-pointer flex flex-row items-center gap-2'
          >
            <Menu />
            دسته بندی کالاها
          </div>
          <div className='dropdown-content w-screen z-[1] mt-1 mx-0 h-screen bg-neutral-300/40'>
            <div className='p-4 bg-white max-w-screen-md min-w-96'>
              <ul className='menu rounded-box'>
                {categoryNames?.map((name) => (
                  <li key={name}>
                    <Link href={`/search/${name}`}>{name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>

        {categoryNames?.map((name) => (
          <li
            key={name}
            className='hidden md:block text-gray-700 cursor-pointer'
          >
            <Link href={`/search/${name}`}>{name}</Link>
          </li>
        ))}

        <li className='hidden md:block'>
          <div>
            <li className='text-gray-700 cursor-pointer'>سوالی دارید؟</li>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MegaMenu;

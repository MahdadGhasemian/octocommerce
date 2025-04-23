import { Menu } from 'lucide-react';
import Link from 'next/link';

const MenuItems = () => {
  const links = [
    {
      title: 'سوالی دارید؟',
      href: '/',
    },
  ];

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
                {links?.map(link => (
                  <li key={link.title}>
                    <Link href={link.href}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>

        {links?.map(link => (
          <li key={link.title} className='hidden xl:block text-gray-700 cursor-pointer'>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItems;

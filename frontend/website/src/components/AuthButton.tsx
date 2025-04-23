import { LogIn, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearAuth,
  isUserLoggedIn,
  userFullName,
} from '@/lib/store/features/authSlice';
import { resetCart } from '@/lib/store/features/cart/cartSlice';
import { useRequireLogin } from '@/hooks/useRequireLogin';

import authService from '@/services/auth.service';

interface Props {
  data?: string;
}

const AuthButton: React.FC<Props> = (_props: Props) => {
  // ** Props
  // const { data } = props;

  // ** Route
  const router = useRouter();

  // ** Hooks
  const { ensureLoggedIn } = useRequireLogin();

  // ** Store
  const isLoggedIn = useSelector(isUserLoggedIn);
  const fullName = useSelector(userFullName);

  const dispatch = useDispatch();

  // ** Functions
  const handleLogout = async () => {
    try {
      dispatch(clearAuth());
      dispatch(resetCart());

      await authService.logout();
      handleNavigationToHome();
    } catch (error) {
      //
    }
  };

  const handleNavigationToProfile = () => {
    // Ensure the user is logged in
    if (!ensureLoggedIn()) {
      return;
    }

    router.push('/profile');
  };

  const handleNavigationToOrders = () => {
    // Ensure the user is logged in
    if (!ensureLoggedIn()) {
      return;
    }

    router.push('/profile/orders');
  };

  const handleNavigationToLogin = () => {
    router.push('/users/login');
  };

  const handleNavigationToHome = () => {
    router.push('/');
  };

  return (
    <div>
      {/* User logo */}
      {isLoggedIn ? (
        <div className='dropdown sm-down:dropdown-top sm:dropdown-bottom dropdown-end'>
          <div tabIndex={0} role='button' className='btn m-1 btn-ghost'>
            <User />
          </div>
          <ul
            tabIndex={0}
            className='menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow flex gap-2'
          >
            <li>
              <div onClick={handleNavigationToProfile}>
                <div className=''>
                  {!fullName || fullName === ' ' ? 'پروفایل کاربری' : fullName}
                </div>
              </div>
            </li>
            <li>
              <div onClick={handleNavigationToOrders}>
                <span>سفارش ها</span>
              </div>
            </li>
            <li>
              <div
                className='cursor-pointer flex justify-center items-center gap-2 text-sm btn btn-outline hover:btn-primary border-neutral-400'
                onClick={() => handleLogout()}
              >
                <LogOut size={22} style={{ transform: 'scaleX(-1)' }} />
                <span>خروج از حساب کاربری</span>
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div onClick={handleNavigationToLogin}>
          <button className='flex justify-center items-center gap-2 text-sm btn btn-outline hover:btn-primary border-neutral-400'>
            <LogIn size={22} style={{ transform: 'scaleX(-1)' }} />
            <span>ورود | ثبت‌نام</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButton;

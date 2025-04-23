import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { isUserLoggedIn } from '@/lib/store/features/authSlice';

/**
 * Hook to check if a user is logged in and redirect to login page if not
 */
export const useRequireLogin = () => {
  // ** Route
  const router = useRouter();

  // ** Store
  const isLoggedIn = useSelector(isUserLoggedIn);

  /**
   * Check if the user is logged in and redirect to the login page if not.
   * @returns {boolean} - Whether the user is logged in.
   */
  const ensureLoggedIn = () => {
    if (!isLoggedIn) {
      router.push('/users/login');
      return false;
    }
    return true;
  };

  return { isLoggedIn, ensureLoggedIn };
};

'use client';

import React, { useEffect } from 'react';

import { useRequireLogin } from '@/hooks/useRequireLogin';

import Contacts from '@/components/users/Contacts';
import Profile from '@/components/users/Profile';

export default function Page() {
  // ** Hooks
  const { ensureLoggedIn } = useRequireLogin();

  useEffect(() => {
    // Ensure the user is logged in
    if (!ensureLoggedIn()) {
      return;
    }
  }, []);

  return (
    <div className='border rounded-lg w-full bg-white shadow-lg pb-24'>
      <Profile />
      <Contacts />
    </div>
  );
}

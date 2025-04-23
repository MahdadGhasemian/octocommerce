import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/services/auth.service';

export interface AuthState extends User {
  full_name: string;
  user_is_login?: boolean;
}

const initialState: AuthState = {
  id: '',
  mobile_phone: '',
  email: '',
  accesses: [],
  first_name: '',
  last_name: '',
  need_to_set_name: false,
  full_name: '',
  gender: 'unknown',
  avatar: '',
  balance: 0,
  user_is_login: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: create => ({
    setAuth: create.reducer((state, action: PayloadAction<AuthState>) => {
      action.payload.full_name = getFullName(action.payload);
      action.payload.user_is_login = true;

      Object.assign(state, action.payload);
    }),
    clearAuth: create.reducer(state => {
      Object.assign(state, initialState);
    }),
    updateAccount: create.reducer((state, action: PayloadAction<AuthState>) => {
      action.payload.full_name = getFullName(action.payload);
      action.payload.user_is_login = true;

      Object.assign(state, action.payload);
    }),
  }),
  selectors: {
    getAccount: state => state,
    isUserLoggedIn: (state: AuthState) => state.user_is_login,
    userFullName: (state: AuthState) => state.full_name,
    userNeedToSetName: (state: AuthState) => state.need_to_set_name,
  },
});

const getFullName = (user: User): string => {
  const { first_name, last_name } = user;

  return [first_name || '', last_name || ''].join(' ');
};

export const { setAuth, clearAuth, updateAccount } = authSlice.actions;

export const { getAccount, isUserLoggedIn, userFullName, userNeedToSetName } = authSlice.selectors;

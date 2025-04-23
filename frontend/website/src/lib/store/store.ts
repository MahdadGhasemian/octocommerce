import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  WebStorage,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authSlice } from '@/lib/store/features/authSlice';
import { cartSlice } from '@/lib/store/features/cart/cartSlice';

// import storage from './storage';

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(cartSlice, authSlice);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: {
  timeout?: number;
  key: string;
  storage: WebStorage;
} = {
  key: 'root',
  storage,
  // blacklist: ['tracking'],
};

if (process.env.NODE_ENV !== 'production') {
  persistConfig.timeout = 1000;
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

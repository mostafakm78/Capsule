import { configureStore } from '@reduxjs/toolkit';
import authStepOne from './authStepOneSlice';
import editOrcreate from './editOrcreateSlice';
import userReducer from './userSlice';

export const makeStore = (preloadedState?: unknown) =>
  configureStore({
    reducer: {
      authStepOne: authStepOne,
      editOrcreate: editOrcreate,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['editOrcreate/setCapsule'],
          ignoredPaths: ['editOrcreate.capsule.avatar'],
        },
      }),
    preloadedState,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

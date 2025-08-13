import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import capsuleSettingReducer from './capsuleSettingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    capsuleSetting: capsuleSettingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

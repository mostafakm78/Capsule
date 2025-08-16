import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import capsuleSettingReducer from './capsuleSettingSlice';
import editOrcreate from './editOrcreateSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    capsuleSetting: capsuleSettingReducer,
    editOrcreate: editOrcreate,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

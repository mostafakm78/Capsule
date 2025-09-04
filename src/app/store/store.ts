import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import capsuleSettingReducer from './capsuleSettingSlice';
import editOrcreate from './editOrcreateSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    capsuleSetting: capsuleSettingReducer,
    editOrcreate: editOrcreate,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

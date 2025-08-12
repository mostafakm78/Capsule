
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import capsuleColorReducer from './capsuleColorSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    capsuleColor: capsuleColorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

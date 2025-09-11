import { createAsyncThunk } from '@reduxjs/toolkit';
import callApi from '../services/callApi';
import { UserSafe } from '@/lib/types';

export const fetchMe = createAsyncThunk<UserSafe, void, { rejectValue: number }>('/me', async (_, { rejectWithValue }) => {
  const res = await callApi().get('/me');
  if (res.status === 200) return res.data.user as UserSafe;
  return rejectWithValue(res.status);
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import callApi from '../services/callApi';
import { UserSafe } from '@/lib/types';
import { AxiosError } from 'axios';

export const fetchMe = createAsyncThunk<UserSafe, void, { rejectValue: number }>('/me', async (_, { rejectWithValue }) => {
  try {
    const res = await callApi().get('/me');
    if (res.status === 200) return res.data.user as UserSafe;
    return rejectWithValue(res.status);
  } catch (error) {
    const err = error as AxiosError;
    const status = err.response?.status ?? 500;
    return rejectWithValue(status);
  }
});

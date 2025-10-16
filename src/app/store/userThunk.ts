import { createAsyncThunk } from '@reduxjs/toolkit';
import callApi from '../services/callApi';
import { UserSafe } from '@/lib/types';
import { AxiosError } from 'axios';

interface FetchError {
  status: number;
  message: string;
}

export const fetchMe = createAsyncThunk<UserSafe, void, { rejectValue: FetchError }>('/me', async (_, { rejectWithValue }) => {
  try {
    const res = await callApi().get('/me');
    if (res.status === 200) return res.data.user as UserSafe;
    return rejectWithValue({ status: res.status, message: res.data.message });
  } catch (error) {
    console.log(error);

    const err = error as AxiosError;
    const status = err.response?.status ?? 500;
    return rejectWithValue({ status, message: (err.response?.data as { message?: string })?.message || err.message });
  }
});

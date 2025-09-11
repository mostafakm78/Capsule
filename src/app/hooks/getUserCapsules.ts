'use Client';

import useSWR from 'swr';
import callApi from '../services/callApi';
import { GetCapsulesResponse } from '@/lib/types';
import { AxiosError } from 'axios';

type UserCap = GetCapsulesResponse | null;

const fetcher = async (): Promise<UserCap> => {
  try {
    const res = await callApi().get('/capsules?=${sort}');
    return res.data ?? null;
  } catch (e) {
    const status = (e as AxiosError).response?.status ?? 0;
    if (status === 401 || status === 403) return null;
    throw e;
  }
};

export default function useGetUserCap() {
  const {
    data: capsules,
    error,
    isLoading,
    mutate,
  } = useSWR('/capsules', fetcher, {
    suspense: true,
    revalidateOnFocus: true,
    shouldRetryOnError: false,
    refreshInterval: 10 * 60 * 1000,
  });

  return { capsules, error, loading: isLoading, mutate };
}

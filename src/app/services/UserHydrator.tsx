'use client';

import { useEffect } from 'react';
import callApi from './callApi';
import { useAppDispatch } from '../hooks/hook';
import { setUser } from '../store/userSlice';

export function UserHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getUser() {
      const res = await callApi().get('/me');
      if (res.status === 200) {
        dispatch(setUser(res.data?.user));
      }
    }

    getUser();
  }, [dispatch]);

  return null;
}

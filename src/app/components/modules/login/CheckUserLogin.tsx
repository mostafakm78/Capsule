'use client';

import Loadings from '@/app/components/shared/loadings';

import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/app/hooks/hook';
import { useEffect } from 'react';
import LoginOrSignup from './Login';

export default function CheckUserLogin() {
  const router = useRouter();
  const { user, loading } = useAppSelector((s) => s.user);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  if (user && loading) return <Loadings />;

  return <LoginOrSignup />;
}

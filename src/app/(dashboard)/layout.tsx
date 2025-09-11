'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { fetchMe } from '../store/userThunk';
import Loadings from '../components/shared/loadings';
import DashboardLayoutIndex from '../components/modules/dashboard/DashboardIndex';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading } = useAppSelector((s) => s.user);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchMe()).unwrap();
      } catch {
        router.replace('/login');
      }
    })();
  }, [dispatch, router]);

  if (loading) return <Loadings />;
  if (!user) return null;

  return <DashboardLayoutIndex>{children}</DashboardLayoutIndex>;
}

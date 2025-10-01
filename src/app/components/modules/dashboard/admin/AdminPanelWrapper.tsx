'use client';

import AdminPanelIndex from '@/app/components/modules/dashboard/admin/AdminPanelIndex';
import Loadings from '@/app/components/shared/loadings';
import { useAppSelector } from '@/app/hooks/hook';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminPanelWrapper() {
  const router = useRouter();
  const { user } = useAppSelector((s) => s.user);
  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    if (user?.role !== 'admin') {
      router.replace('/dashboard/panel');
    }

    if (user?.role === 'admin') {
      setLoad(false);
    }
  }, [user, router]);

  if (load) return <Loadings />;

  return <AdminPanelIndex />;
}

'use client';

import { useAppDispatch } from '@/app/hooks/hook';
import callApi from '@/app/services/callApi';
import { clearUser } from '@/app/store/userSlice';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function LogoutModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await callApi()
        .post('/auth/logout', {})
        .catch(() => {});
    } finally {
      dispatch(clearUser());
      router.replace('/');
      router.refresh();
    }
  }, [dispatch, router]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="cursor-pointer">خروج</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>خروج از حساب</AlertDialogTitle>
          <AlertDialogDescription>آیا میخواهید از حساب خود خارج شوید؟</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">خیر</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} className="cursor-pointer">
            خروج
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

'use client';

import { api } from '@/app/services/api';
import { clearUser } from '@/app/store/userSlice';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export function LogoutModal() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await api.logout();
      if (res.status === 200) {
        router.push('/');
        dispatch(clearUser());
      } else {
        console.log(res);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  };
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

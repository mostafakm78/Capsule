'use client';

import useCustomToast from '@/app/hooks/useCustomToast';
import callApi from '@/app/services/callApi';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { UserSafe } from '@/lib/types';
import { useEffect, useState } from 'react';

type Props = { user: UserSafe | undefined };

export function UserTypeModal({ user }: Props) {
  const [userRole, setUserRole] = useState<'admin' | 'user'>();
  const [loading, setLoading] = useState(false);
  const showToast = useCustomToast();

  useEffect(() => {
    if (user?.role) setUserRole(user.role);
  }, [user]);

  async function handleToggleRole() {
    if (!userRole) return;
    const next: 'admin' | 'user' = userRole === 'admin' ? 'user' : 'admin';

    try {
      setLoading(true);

      const res = await callApi().patch(`/admin/users/${user?._id}`, { role: next });
      if (res.status === 200) {
        setUserRole(next);
        showToast({ message: 'نقش کاربر با موفقیت تغییر کرد ✅', bg: 'bg-green-200' });
      } else {
        showToast({ message: 'متاسفانه خطایی پیش آمد', bg: 'bg-red-200' });
      }
    } catch {
      showToast({ message: 'متاسفانه خطایی پیش آمد', bg: 'bg-red-200' });
    } finally {
      setLoading(false);
    }
  }

  const isAdmin = userRole === 'admin';

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className={`cursor-pointer ${isAdmin ? 'bg-primary text-white/90' : ''} p-2 rounded-md w-full bg-green-700 text-center`}>{isAdmin ? 'ادمین' : 'کاربر'}</span>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{isAdmin ? <>برداشتن ادمینی از: {user?.name ?? user?.email}</> : <>ارتقا به ادمین برای: {user?.name ?? user?.email}</>}</AlertDialogTitle>
          <AlertDialogDescription>{isAdmin ? 'آیا می‌خواهید نقش کاربر به "کاربر" تغییر کند؟' : 'آیا می‌خواهید نقش کاربر به "ادمین" تغییر کند؟'}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">انصراف</AlertDialogCancel>
          <AlertDialogAction onClick={handleToggleRole} className="cursor-pointer" disabled={loading}>
            {loading ? 'در حال اعمال...' : isAdmin ? 'تبدیل به کاربر' : 'تبدیل به ادمین'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

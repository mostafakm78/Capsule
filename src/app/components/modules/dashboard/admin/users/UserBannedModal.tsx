'use client';

import useCustomToast from '@/app/hooks/useCustomToast';
import callApi from '@/app/services/callApi';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { UserSafe } from '@/lib/types';
import { useEffect, useState } from 'react';

type Props = {
  user: UserSafe | undefined;
};

export function UserBannedModal({ user }: Props) {
  const [isBanned, setIsBanned] = useState<boolean>(false);
  const [userBan, setUserBan] = useState<boolean | undefined>(undefined);
  const showToast = useCustomToast();

  useEffect(() => {
    if (!user) return;
    if (user) {
      setUserBan(user.isBanned);
    }
  }, [user]);

  async function handleBanned() {
    const next = !userBan;
    setIsBanned(!isBanned);
    try {
      const res = await callApi().patch(`/admin/users/${user?._id}`, { isBanned });
      if (res.status === 200) {
        setUserBan(next);
        showToast({ message: 'وضعیت بن کاربر با موفقیت تغییر یافت ✅', bg: 'bg-green-200' });
        return;
      } else {
        return showToast({ message: 'متاسفانه خطایی پیش آمده', bg: 'bg-red-200' });
      }
    } catch (error) {
      if (error) {
        return showToast({ message: 'متاسفانه خطایی پیش آمده', bg: 'bg-red-200' });
      }
    } finally {
      setIsBanned(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className={`cursor-pointer ${userBan === true ? 'bg-red-700 text-white/90' : ''} p-2 bg-primary rounded-md w-full text-center`}>{userBan === true ? 'بن شده' : 'بن کردن'}</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{userBan === false ? <span>بن کاربر : {user?.name ?? user?.email}</span> : <span>بازگشت کاربر از بن : {user?.name ?? user?.email}</span>}</AlertDialogTitle>
          <AlertDialogDescription>{user?.isBanned === false ? 'آیا میخواهید کاربر مورد نظر بن شود؟' : 'آیا میخواهید بن کاربر مورد نظر حذف شود؟'}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">انصراف</AlertDialogCancel>
          <AlertDialogAction onClick={handleBanned} className="cursor-pointer">
            {userBan === false ? 'بن کردن' : 'برداشتن بن'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

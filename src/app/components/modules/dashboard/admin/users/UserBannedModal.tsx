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
  // Local "in-progress" state for the ban toggle action (used as a simple busy flag)
  const [isBanned, setIsBanned] = useState<boolean>(false);
  // Source of truth for current ban status of the user (synced from server/user prop)
  const [userBan, setUserBan] = useState<boolean | undefined>(undefined);
  // Toast helper to display success/error feedback
  const showToast = useCustomToast();

  console.log(isBanned);

  // Sync the incoming user's ban status into local state whenever `user` changes
  useEffect(() => {
    if (!user) return;
    if (user) {
      setUserBan(user.isBanned);
    }
  }, [user]);

  // Handler: toggles ban status for the given user via API, updates local state, and shows feedback
  async function handleBanned() {
    if (!user) return;

    // Compute the next desired ban state (toggle)
    const next = !userBan;

    // Optimistically set "busy" state (prevents double submissions)
    setIsBanned(next);

    try {
      // PATCH request to admin endpoint to update ban status
      const res = await callApi().patch(`/admin/users/${user?._id}`, { isBanned: next });

      // On success: persist to local state and show success toast
      if (res.status === 200) {
        setUserBan(next);
        showToast({ message: 'وضعیت بن کاربر با موفقیت تغییر یافت ✅', bg: 'bg-green-200' });
        return;
      } else {
        // Non-200 response: show generic error
        return showToast({ message: 'متاسفانه خطایی پیش آمده', bg: 'bg-red-200' });
      }
    } catch (error) {
      // Network/server or unexpected error: show generic error
      if (error) {
        return showToast({ message: 'متاسفانه خطایی پیش آمده', bg: 'bg-red-200' });
      }
    } finally {
      // Always clear the local "busy" flag
      setIsBanned(false);
    }
  }

  return (
    // Dialog root component controlling open/close and providing accessible structure
    <AlertDialog>
      {/* Clickable trigger chip that opens the dialog; label/styling reflects current ban status */}
      <AlertDialogTrigger asChild>
        <span className={`cursor-pointer ${userBan === true ? 'bg-red-700 text-white/90' : ''} p-2 bg-primary rounded-md w-full text-center`}>{userBan === true ? 'بن شده' : 'بن کردن'}</span>
      </AlertDialogTrigger>

      {/* Modal content: confirms the ban/unban action and provides primary/secondary actions */}
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* Title reflects the action to be taken (ban or unban) and the target user */}
          <AlertDialogTitle>{userBan === false ? <span>بن کاربر : {user?.name ?? user?.email}</span> : <span>بازگشت کاربر از بن : {user?.name ?? user?.email}</span>}</AlertDialogTitle>

          {/* Short description explaining the consequence of the action */}
          <AlertDialogDescription>{user?.isBanned === false ? 'آیا میخواهید کاربر مورد نظر بن شود؟' : 'آیا میخواهید بن کاربر مورد نظر حذف شود؟'}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* Secondary action: close the dialog without applying changes */}
          <AlertDialogCancel className="cursor-pointer">انصراف</AlertDialogCancel>

          {/* Primary action: perform ban/unban; calls handler above */}
          <AlertDialogAction onClick={handleBanned} className="cursor-pointer">
            {userBan === false ? 'بن کردن' : 'برداشتن بن'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

'use client';

import useCustomToast from '@/app/hooks/useCustomToast';
import callApi from '@/app/services/callApi';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { UserSafe } from '@/lib/types';
import { useEffect, useState } from 'react';

type Props = { user: UserSafe | undefined };

export function UserTypeModal({ user }: Props) {
  // Local state for the user's current role (mirrors server/user prop)
  const [userRole, setUserRole] = useState<'admin' | 'user'>();
  // Loading flag while the PATCH request is in-flight (used to disable actions)
  const [loading, setLoading] = useState(false);
  // Toast helper for success/error feedback
  const showToast = useCustomToast();

  // Initialize local role state when the incoming user prop changes
  useEffect(() => {
    if (user?.role) setUserRole(user.role);
  }, [user]);

  // Toggle the user's role between "admin" and "user" on the server
  async function handleToggleRole() {
    if (!userRole) return;
    const next: 'admin' | 'user' = userRole === 'admin' ? 'user' : 'admin';

    try {
      setLoading(true);
      // Send PATCH request to update role; relies on admin endpoint authorization
      const res = await callApi().patch(`/admin/users/${user?._id}`, { role: next });

      // On success: update local state and show a confirmation toast
      if (res.status === 200) {
        setUserRole(next);
        showToast({ message: 'نقش کاربر با موفقیت تغییر کرد ✅', bg: 'bg-green-200' });
      } else {
        // Non-200 response: generic error feedback
        showToast({ message: 'متاسفانه خطایی پیش آمد', bg: 'bg-red-200' });
      }
    } catch {
      // Network/server error: show error toast
      showToast({ message: 'متاسفانه خطایی پیش آمد', bg: 'bg-red-200' });
    } finally {
      // Always clear the loading flag
      setLoading(false);
    }
  }

  // Convenience boolean for current admin state (used to render labels/styles)
  const isAdmin = userRole === 'admin';

  return (
    // Modal root: wraps trigger + dialog content with proper a11y behavior
    <AlertDialog>
      {/* Clickable trigger that opens the role-change dialog */}
      <AlertDialogTrigger asChild>
        <span className={`cursor-pointer ${isAdmin ? 'bg-primary text-white/90' : ''} p-2 rounded-md w-full bg-green-700 text-center`}>
          {/* Dynamic label that reflects current role */}
          {isAdmin ? 'ادمین' : 'کاربر'}
        </span>
      </AlertDialogTrigger>

      {/* The dialog overlay + panel with header, description, and actions */}
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* Dialog title: contextual based on current role */}
          <AlertDialogTitle>{isAdmin ? <>برداشتن ادمینی از: {user?.name ?? user?.email}</> : <>ارتقا به ادمین برای: {user?.name ?? user?.email}</>}</AlertDialogTitle>
          {/* Short description of the action being confirmed */}
          <AlertDialogDescription>{isAdmin ? 'آیا می‌خواهید نقش کاربر به "کاربر" تغییر کند؟' : 'آیا می‌خواهید نقش کاربر به "ادمین" تغییر کند؟'}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* Secondary action: close the dialog without changes */}
          <AlertDialogCancel className="cursor-pointer">انصراف</AlertDialogCancel>

          {/* Primary action: confirm and perform the role toggle (disabled while loading) */}
          <AlertDialogAction onClick={handleToggleRole} className="cursor-pointer" disabled={loading}>
            {loading ? 'در حال اعمال...' : isAdmin ? 'تبدیل به کاربر' : 'تبدیل به ادمین'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

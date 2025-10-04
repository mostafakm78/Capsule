'use client';

import { useAppDispatch } from '@/app/hooks/hook';
import callApi from '@/app/services/callApi';
import { clearUser } from '@/app/store/userSlice';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function LogoutModal() {
  // Redux dispatch for updating user state on logout
  const dispatch = useAppDispatch();
  // Router for redirecting after logout
  const router = useRouter();

  // Handles logout flow:
  // 1) Attempt server-side logout (ignore network errors)
  // 2) Clear user from client store
  // 3) Navigate to home and refresh to purge client data
  const handleLogout = useCallback(async () => {
    try {
      await callApi()
        .post('/auth/logout', {})
        .catch(() => {}); // swallow errors to ensure client-side cleanup still runs
    } finally {
      dispatch(clearUser()); // semantic: update application auth state
      router.replace('/'); // semantic: navigate to the public landing page
      router.refresh(); // semantic: revalidate client/router caches
    }
  }, [dispatch, router]);

  return (
    // Root dialog container (semantic dialog role handled by the UI library)
    <AlertDialog>
      {/* Trigger that opens the dialog (rendered as child to preserve styling) */}
      <AlertDialogTrigger asChild>
        {/* Semantic intent: acts like a button; library will manage ARIA/roles */}
        <span className="cursor-pointer">خروج</span>
      </AlertDialogTrigger>

      {/* Dialog panel content (focus-trapped, accessible modal provided by the library) */}
      <AlertDialogContent>
        {/* Dialog header: title and supporting description */}
        <AlertDialogHeader>
          <AlertDialogTitle>خروج از حساب</AlertDialogTitle>
          <AlertDialogDescription>آیا میخواهید از حساب خود خارج شوید؟</AlertDialogDescription>
        </AlertDialogHeader>

        {/* Footer actions: cancel (dismiss) and confirm (perform logout) */}
        <AlertDialogFooter>
          {/* Dismisses/Closes the dialog without side effects */}
          <AlertDialogCancel className="cursor-pointer">خیر</AlertDialogCancel>

          {/* Confirms logout: invokes handleLogout, then library closes the dialog */}
          <AlertDialogAction onClick={handleLogout} className="cursor-pointer">
            خروج
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

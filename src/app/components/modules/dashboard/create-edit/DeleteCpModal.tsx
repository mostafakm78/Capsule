'use client';

import checkUnlockAt from '@/app/hooks/checkUnlockAt';
import { useAppSelector } from '@/app/hooks/hook';
import useCustomToast from '@/app/hooks/useCustomToast';
import callApi from '@/app/services/callApi';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function DeleteCpModal() {
  // Read current edit/create mode and the selected capsule from the Redux store
  const { mode, capsule } = useAppSelector((state) => state.editOrcreate);

  // Toast helper to show success/error feedback
  const showToast = useCustomToast();

  // Next.js router for redirecting after a successful delete
  const router = useRouter();

  // Delete handler: only runs in "edit" mode and attempts to remove the capsule via API
  const handleDelete = async () => {
    if (mode !== 'edit') return;
    try {
      const res = await callApi().delete(`/capsules/${capsule?._id}`);
      if (res.status === 200) {
        // Success state: notify and navigate the user back to their capsules list
        showToast({ message: 'کپسول مورد نظر با موفقیت حذف شد ✅', bg: 'bg-green-200' });
        router.push('/dashboard/user-capsules');
        return;
      } else {
        // Non-200 responses are treated as failures
        return showToast({ message: 'مشکلی در حذف کپسول پیش آمده ❌', bg: 'bg-red-200' });
      }
    } catch {
      // Network/API error fallback
      return showToast({ message: 'مشکلی در حذف کپسول پیش آمده ❌', bg: 'bg-red-200' });
    }
  };

  // Determine if a time-locked capsule's unlock time has already passed (used to disable delete)
  let isTimedPassed = false;
  if (capsule?.access?.unlockAt) {
    isTimedPassed = checkUnlockAt(capsule.access.unlockAt);
  }

  return (
    // Dialog component (semantic role handled by the UI library); wraps trigger + confirmation content
    <AlertDialog>
      {/* Trigger button that opens the delete confirmation dialog.
          Disabled when creating a new capsule, or when a timed lock has passed. */}
      <AlertDialogTrigger asChild>
        <Button disabled={mode === 'create' || isTimedPassed} className="cursor-pointer md:w-1/4 py-6 bg-red-400 hover:bg-red-300 text-lg">
          حذف کپسول
        </Button>
      </AlertDialogTrigger>

      {/* Dialog surface with title, description and confirm/cancel actions */}
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* Dialog title dynamically includes the capsule title for clarity */}
          <AlertDialogTitle>حذف کپسول با عنوان : {capsule?.title}</AlertDialogTitle>

          {/* Short explanation/warning about irreversibility of the action */}
          <AlertDialogDescription>با حذف این کپسول، امکان بازگرداندن آن وجود ندارد. مطمئنید می‌خواهید حذفش کنید؟</AlertDialogDescription>
        </AlertDialogHeader>

        {/* Footer with Cancel and Confirm buttons */}
        <AlertDialogFooter>
          {/* Closes the dialog without performing any action */}
          <AlertDialogCancel className="cursor-pointer">خیر</AlertDialogCancel>

          {/* Confirms deletion and calls the API */}
          <AlertDialogAction onClick={handleDelete} className="cursor-pointer bg-red-400 hover:bg-red-300">
            بله
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

'use client';

import useCustomToast from '@/app/hooks/useCustomToast';
import callApi from '@/app/services/callApi';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  notifId: string;
  triggerRef?: React.Ref<HTMLButtonElement>;
  onOpenChange?: (open: boolean) => void;
};

export function DeleteNotifModal({ notifId, triggerRef, onOpenChange }: Props) {
  // Toast helper for user feedback (success/error messages)
  const showToast = useCustomToast();
  // Router instance to redirect after successful deletion
  const router = useRouter();

  // Handler: send DELETE request to remove a notification by its id
  const handleDelete = async () => {
    try {
      const res = await callApi().delete(`/admin/notification/${notifId}`);
      // If backend confirms deletion
      if (res.status === 200) {
        // Show success toast
        showToast({ message: 'اعلان مورد نظر با موفقیت حذف شد ✅', bg: 'bg-green-200' });
        // Navigate to admin dashboard (refreshes list implicitly)
        router.push('/dashboard/admin');
        return;
      } else {
        // Backend returned a non-200 but no thrown error
        return showToast({ message: 'خطایی در حذف اعلان پیش آمده ❌', bg: 'bg-red-200' });
      }
    } catch {
      // Network/unknown error while deleting
      return showToast({ message: 'خطایی در حذف اعلان پیش آمده ❌', bg: 'bg-red-200' });
    }
  };

  return (
    // Semantic dialog wrapper for the destructive action confirmation
    <AlertDialog onOpenChange={onOpenChange}>
      {/* Trigger button: disabled when no notifId is selected */}
      <AlertDialogTrigger asChild>
        <Button ref={triggerRef} disabled={!notifId} className="cursor-pointer mx-auto md:w-1/4 py-6 bg-red-400 hover:bg-red-300 text-lg">
          حذف اعلان انتخاب شده
        </Button>
      </AlertDialogTrigger>

      {/* Modal content that asks for final confirmation */}
      <AlertDialogContent>
        {/* Modal header: title and short description of the irreversible action */}
        <AlertDialogHeader>
          <AlertDialogTitle>حذف اعلان</AlertDialogTitle>
          <AlertDialogDescription>با حذف این اعلان امکان بازگرداندن آن وجود ندارد. مطمئنید می‌خواهید حذفش کنید؟</AlertDialogDescription>
        </AlertDialogHeader>

        {/* Modal footer: cancel and confirm actions */}
        <AlertDialogFooter>
          {/* Cancel: closes the dialog without side effects */}
          <AlertDialogCancel className="cursor-pointer">خیر</AlertDialogCancel>
          {/* Confirm: calls deletion handler */}
          <AlertDialogAction onClick={handleDelete} className="cursor-pointer bg-red-400 hover:bg-red-300">
            بله
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

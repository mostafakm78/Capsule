'use client';

import checkUnlockAt from '@/app/hooks/checkUnlockAt';
import { useAppSelector } from '@/app/hooks/hook';
import useCustomToast from '@/app/hooks/useCustomToast';
import callApi from '@/app/services/callApi';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function DeleteCpModal() {
  const { mode, capsule } = useAppSelector((state) => state.editOrcreate);
  const showToast = useCustomToast();
  const router = useRouter();

  const handleDelete = async () => {
    if (mode !== 'edit') return;
    try {
      const res = await callApi().delete(`/capsules/${capsule?._id}`);
      if (res.status === 200) {
        showToast({ message: 'کپسول مورد نظر با موفقیت حذف شد ✅', bg: 'bg-green-200' });
        router.push('/dashboard/user-capsules');
        return;
      } else {
        return showToast({ message: 'مشکلی در حذف کپسول پیش آمده ❌', bg: 'bg-red-200' });
      }
    } catch {
      return showToast({ message: 'مشکلی در حذف کپسول پیش آمده ❌', bg: 'bg-red-200' });
    }
  };

  let isTimedPassed = false;
  if (capsule?.access?.unlockAt) {
    isTimedPassed = checkUnlockAt(capsule.access.unlockAt);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={mode === 'create' || isTimedPassed} className="cursor-pointer md:w-1/4 py-6 bg-red-400 hover:bg-red-300 text-lg">
          حذف کپسول
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>حذف کپسول با عنوان : {capsule?.title}</AlertDialogTitle>
          <AlertDialogDescription>با حذف این کپسول، امکان بازگرداندن آن وجود ندارد. مطمئنید می‌خواهید حذفش کنید؟</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">خیر</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="cursor-pointer bg-red-400 hover:bg-red-300">
            بله
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

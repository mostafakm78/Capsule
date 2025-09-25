'use client';

import useCustomToast from '@/app/hooks/useCustomToast';
import callApi from '@/app/services/callApi';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  notifId: string;
};

export function DeleteNotifModal({ notifId }: Props) {
  const showToast = useCustomToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await callApi().delete(`/admin/notification/${notifId}`);
      if (res.status === 200) {
        showToast({ message: 'اعلان مورد نظر با موفقیت حذف شد ✅', bg: 'bg-green-200' });
        router.push('/dashboard/admin');
        return;
      } else {
        return showToast({message : 'خطایی در حذف اعلان پیش آمده ❌' , bg : 'bg-red-200'})
      }
    } catch  {
      return showToast({message : 'خطایی در حذف اعلان پیش آمده ❌' , bg : 'bg-red-200'})
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={!notifId} className="cursor-pointer md:w-1/4 py-6 bg-red-400 hover:bg-red-300 text-lg">
          حذف اعلان انتخاب شده
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>حذف اعلان</AlertDialogTitle>
          <AlertDialogDescription>با حذف این اعلان امکان بازگرداندن آن وجود ندارد. مطمئنید می‌خواهید حذفش کنید؟</AlertDialogDescription>
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

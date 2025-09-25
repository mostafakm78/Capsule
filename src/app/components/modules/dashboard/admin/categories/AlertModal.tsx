import useCustomToast from '@/app/hooks/useCustomToast';
import callApi from '@/app/services/callApi';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  item: { title: string; id: string };
  groupId: string;
};

export function AlertModal({ item, groupId }: Props) {
  const showToast = useCustomToast();
  const router = useRouter();

  async function deleteCategory() {
    try {
      const res = await callApi().delete(`/admin/categories/${groupId}/${item.id}`);
      if (res.status === 200) {
        showToast({ message: 'دسته‌بندی مورد نظر با موفقیت حذف شد ✅', bg: 'bg-green-200' });
        router.push('/dashboard/admin');
        return;
      } else {
        return showToast({ message: 'مشکلی در حذف دسته‌بندی مورد نظر پیش آمده ❌', bg: 'bg-red-200' });
      }
    } catch {
      return showToast({ message: 'مشکلی در حذف دسته‌بندی مورد نظر پیش آمده ❌', bg: 'bg-red-200' });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-transparent p-0 w-full absolute shadow-none hover:bg-transparent cursor-pointer text-2xl"></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>دسته بندی {item.title} حذف شود؟</AlertDialogTitle>
          <AlertDialogDescription>اگه دسته بندی مورد نظر شما حذف بشه قابل بازگشت نخواهد بود.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">انصراف</AlertDialogCancel>
          <AlertDialogAction onClick={deleteCategory} className="cursor-pointer">
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import useCustomToast from '@/app/hooks/useCustomToast';
import callApi from '@/app/services/callApi';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  // The category item to potentially delete (display title + unique id)
  item: { title: string; id: string };
  // Parent group id (needed by the delete endpoint)
  groupId: string;
};

export function AlertModal({ item, groupId }: Props) {
  // Toast helper for success/error feedback
  const showToast = useCustomToast();
  // Router used for redirecting after successful deletion
  const router = useRouter();

  // Handler: delete the selected category item from a specific group
  async function deleteCategory() {
    try {
      // Call backend API to delete item
      const res = await callApi().delete(`/admin/categories/${groupId}/${item.id}`);
      if (res.status === 200) {
        // Success: notify and navigate back to admin dashboard
        showToast({ message: 'دسته‌بندی مورد نظر با موفقیت حذف شد ✅', bg: 'bg-green-200' });
        router.push('/dashboard/admin');
        return;
      } else {
        // Non-200 response: show generic error
        return showToast({ message: 'مشکلی در حذف دسته‌بندی مورد نظر پیش آمده ❌', bg: 'bg-red-200' });
      }
    } catch {
      // Network or unexpected error
      return showToast({ message: 'مشکلی در حذف دسته‌بندی مورد نظر پیش آمده ❌', bg: 'bg-red-200' });
    }
  }

  return (
    // Semantic dialog container for destructive action confirmation
    <AlertDialog>
      {/* Trigger: full-area invisible button on the tag/chip; opens the dialog */}
      <AlertDialogTrigger asChild>
        <Button className="bg-transparent p-0 w-full absolute shadow-none hover:bg-transparent cursor-pointer text-2xl"></Button>
      </AlertDialogTrigger>

      {/* Dialog content: confirmation copy + action buttons */}
      <AlertDialogContent>
        {/* Dialog header: title & description explaining irreversibility */}
        <AlertDialogHeader>
          <AlertDialogTitle>دسته بندی {item.title} حذف شود؟</AlertDialogTitle>
          <AlertDialogDescription>اگه دسته بندی مورد نظر شما حذف بشه قابل بازگشت نخواهد بود.</AlertDialogDescription>
        </AlertDialogHeader>

        {/* Dialog footer: cancel & confirm buttons */}
        <AlertDialogFooter>
          {/* Cancel: close dialog without changes */}
          <AlertDialogCancel className="cursor-pointer">انصراف</AlertDialogCancel>
          {/* Confirm: performs deletion via API */}
          <AlertDialogAction onClick={deleteCategory} className="cursor-pointer">
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export function AlertModal() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='bg-transparent p-0 w-full absolute shadow-none hover:bg-transparent cursor-pointer text-2xl'>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>این دسته بندی حذف شود؟</AlertDialogTitle>
          <AlertDialogDescription>اگه دسته بندی مورد نظر شما حذف بشه قابل بازگشت نخواهد بود.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer'>انصراف</AlertDialogCancel>
          <AlertDialogAction className='cursor-pointer'>حذف</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

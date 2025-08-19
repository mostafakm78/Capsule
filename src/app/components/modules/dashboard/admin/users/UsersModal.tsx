import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
export function UsersModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className='py-1 px-1.5 text-sm'>مصطفی کمری</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>کاربر : مصطفی کمری</DialogTitle>
          <DialogDescription>ایمیل : Mostafamf555@gmail.com</DialogDescription>
        </DialogHeader>
        <Separator className="bg-foreground/20 w-full" />
        <div className="grid gap-1">
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <span className="text-lg">وضعیت کاربر</span>
            <Button className="w-full bg-emerald-800 text-white hover:text-background/80 cursor-pointer hover:bg-emerald-600">طبیعی</Button>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <span className="text-lg">بن کردن</span>
            <Button className="w-full bg-red-800 text-white hover:text-background/80 cursor-pointer hover:bg-red-600">بن</Button>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <span className="text-lg">نقش کاربر</span>
            <Button className="w-full cursor-pointer bg-sky-800 hover:bg-sky-600 text-white hover:text-background/80">ادمین</Button>
          </div>
        </div>
        <Separator className="bg-foreground/20 w-full" />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">انصراف</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

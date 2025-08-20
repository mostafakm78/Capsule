import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SingleUserCapsulesAdmin from './SingleUserCapsulesAdmin';

export default function SingleUserAdminIndex() {
  return (
    <section className="flex flex-col h-full gap-10">
      <div className="flex flex-col h-full justify-start gap-10">
        <div className="w-full px-4 flex items-center justify-between">
          <span className='text-foreground pr-4 text-xl relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کاربر : مصطفی کمری</span>
          <div>
            <Avatar className="md:h-20 md:w-20 w-15 h-15 ring-2 ring-secondary">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CP</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:p-8 p-3 bg-white dark:bg-slate-900 rounded-lg justify-center w-full">
          <div className="grid items-center place-items-center w-full border border-foreground/20 rounded-md p-2.5">
            <div className="flex flex-col md:flex-row gap-2 items-center justify-around w-full py-2">
              <span>ایمیل کاربر :</span>
              <span>Mostafamf555@gmail.com</span>
            </div>
            <Separator className="bg-foreground/20 w-full my-1" />
            <div className="flex flex-col md:flex-row gap-2 items-center justify-around w-full py-2">
              <span>وضعیت کاربر :</span>
              <Button className="bg-emerald-800 text-white hover:text-background/80 cursor-pointer hover:bg-emerald-600">طبیعی</Button>
            </div>
            <Separator className="bg-foreground/20 w-full my-1" />
            <div className="flex flex-col md:flex-row gap-2 items-center justify-around w-full py-2">
              <span>نقش کاربر :</span>
              <Button className="cursor-pointer bg-sky-800 hover:bg-sky-600 text-white hover:text-background/80">ادمین</Button>
            </div>
            <Separator className="bg-foreground/20 w-full my-1" />
            <div className="flex flex-col md:flex-row gap-2 items-center justify-around w-full py-2">
              <span>بن کاربر :</span>
              <Button className="bg-red-800 text-white hover:text-background/80 cursor-pointer hover:bg-red-600">بن</Button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-1">
            <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">کپسول‌های کاربر</h4>
            <p className="text-foreground/80">تمامی کپسول های ساخته شده توسط کاربر</p>
          </div>
          <SingleUserCapsulesAdmin />
        </div>
      </div>
    </section>
  );
}

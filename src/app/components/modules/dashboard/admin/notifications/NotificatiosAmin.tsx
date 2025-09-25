import { Separator } from '@/components/ui/separator';
import AllNotif from './AllNotif';
import CreateNotif from './CreateNotif';
import Image from 'next/image';

export default function NotificationsAdmin() {
  return (
    <section className="flex flex-col h-full gap-10">
      <div className="flex flex-col h-full justify-start gap-10">
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>مدیریت اعلان های سایت</span>
        <div className="flex flex-col gap-6 md:p-8 p-3 bg-white dark:bg-slate-900 rounded-lg items-center justify-center w-full">
          <AllNotif />
          <Separator className="w-full bg-foreground/30 my-4" />
          <CreateNotif />
        </div>
        <div className="flex gap-2 items-center py-4 px-2 border border-foreground/20 rounded-lg lg:w-2/3 w-full">
          <Image src="/images/cartoon-question.png" alt="question" width={100} height={100} />
          <div className="flex flex-col gap-1">
            <p className="lg:text-lg text-base font-bold text-foreground/80">ادمین عزیز شما میتونین با کلیک روی اعلان های موجود ، اعلان انتخابی رو حذف کنین و میتونین با وارد کردن فیلد های الزامی اعلان جدید بسازید.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

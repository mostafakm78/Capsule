
import UserAccInfo from './AdminAccInfo';
import { Separator } from '@/components/ui/separator';
import UserPassChange from './PassChange';

export default function AdminSettingIndex() {
  return (
    <section className="flex flex-col h-full gap-10">
      <div className="flex flex-col h-full justify-start gap-10">
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>تنظیمات حساب کاربری</span>
        <div className="flex flex-col gap-8 bg-white h-full w-full rounded-lg p-6 dark:bg-slate-900">
          <UserAccInfo />
          <Separator className='w-full bg-foreground/20'/>
          <UserPassChange />
        </div>
      </div>
    </section>
  );
}

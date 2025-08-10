import { Separator } from '@/components/ui/separator';
import jalaali from 'jalaali-js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/app/components/shared/Theme';
import Image from 'next/image';
import { Bungee } from 'next/font/google';
import Link from 'next/link';
import { MdHomeFilled } from 'react-icons/md';
import { HiMiniSquaresPlus } from 'react-icons/hi2';
import { BsCapsule } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';
import { BiSupport } from 'react-icons/bi';
import { PiQuestionFill } from 'react-icons/pi';
import { ImExit } from 'react-icons/im';
import { RiNotification4Line } from 'react-icons/ri';
import { PanelSidebar } from '../components/modules/dashboard/PanelSidebar';
const bungee = Bungee({
  weight: '400',
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const now = new Date();

  const { jy: year, jm: month, jd: day } = jalaali.toJalaali(now);
  const persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  const persianWeekDays = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
  const dayOfWeek = now.getDay();
  const persianDayOfWeekIndex = (dayOfWeek + 6) % 7;

  return (
    <div className="flex bg-white dark:bg-slate-900 h-screen">
      <aside className="bg-white dark:bg-slate-900 w-2/12 min-h-full hidden lg:flex flex-col py-10">
        <Link href="/" className="px-4 flex xl:text-3xl lg:text-2xl text-2xl text-muted items-center gap-2 justify-center">
          <Image className="h-[30px] w-[30px] lg:h-[35px] lg:w-[35px] xl:w-[40px] xl:h-[40px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </Link>
        <div className="flex flex-col text-foreground/85 py-18 px-5 gap-6">
          <div className="flex items-center text-lg active:text-primary justify-start gap-3 bg-background p-2 rounded-lg text-primary hover:text-primary duration-300">
            <MdHomeFilled className="text-2xl" />
            <Link href="/">صفحه اصلی پنل</Link>
          </div>
          <div className="flex items-center text-lg active:text-primary justify-start gap-3 p-2 rounded-lg hover:text-primary duration-300">
            <HiMiniSquaresPlus className="text-2xl" />
            <Link href="/">افزودن کپسول جدید</Link>
          </div>
          <div className="flex items-center text-lg active:text-primary justify-start gap-3 p-2 rounded-lg hover:text-primary duration-300">
            <BsCapsule className="text-2xl" />
            <Link href="/">کپسول های شما</Link>
          </div>
          <div className="flex items-center text-lg active:text-primary justify-start gap-3 p-2 rounded-lg hover:text-primary duration-300">
            <IoSettingsSharp className="text-2xl" />
            <Link href="/">تنظیمات حساب</Link>
          </div>
          <div className="flex items-center text-lg active:text-primary justify-start gap-3 p-2 rounded-lg hover:text-primary duration-300">
            <BiSupport className="text-2xl" />
            <Link href="/">پشتیبانی</Link>
          </div>
          <div className="flex items-center text-lg active:text-primary justify-start gap-3 p-2 rounded-lg hover:text-primary duration-300">
            <PiQuestionFill className="text-2xl" />
            <Link href="/">راهنما</Link>
          </div>
        </div>
        <div className="flex flex-col text-foreground/70 pt-5 px-5 gap-6">
          <div className="flex items-center text-lg active:text-primary justify-start gap-3 p-2 rounded-lg hover:text-primary duration-300">
            <ImExit className="text-2xl" />
            <Link href="/">خروج</Link>
          </div>
        </div>
      </aside>

      <div className="flex flex-col flex-1">
        <nav className="bg-white dark:bg-slate-900 flex items-center justify-between lg:py-6 lg:px-8 py-4 pt-8 px-3">
          <div className="flex h-full lg:gap-3 gap-1 items-center">
            <div className='flex gap-2 h-full items-center justify-center'>
              <div className='bg-foreground text-xl p-2 text-background rounded-lg lg:hidden block'>
                <PanelSidebar />
              </div>
              <div className='flex lg:flex-row flex-col h-full lg:items-center lg:gap-3 items-start'>
                <span className="lg:text-2xl text-base md:text-lg font-bold">مصطفی کمری عزیز ؛ خوش اومدی. 👋</span>
                <Separator orientation="vertical" className="bg-foreground/20 h-full lg:block hidden" />
                <span className="text-[11px] lg:text-base text-foreground/80">
                  {persianWeekDays[persianDayOfWeekIndex]}، {day} {persianMonths[month - 1]} {year}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center lg:gap-6 gap-3">
            <div className="lg:block hidden">
              <ThemeToggle />
            </div>
            <div className="lg:text-3xl text-2xl cursor-pointer">
              <RiNotification4Line />
            </div>
            <Avatar className="h-10 w-10 ring-2 ring-secondary">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CP</AvatarFallback>
            </Avatar>
          </div>
        </nav>

        <main className="flex-1 bg-background p-10 lg:rounded-tr-4xl">{children}</main>
      </div>
    </div>
  );
}

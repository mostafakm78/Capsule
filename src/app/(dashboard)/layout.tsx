'use client';

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
import { usePathname } from 'next/navigation';
import { DashboardSidebar } from '../components/modules/dashboard/DashboardSidebar';
const bungee = Bungee({
  weight: '400',
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const linkClasses = (href: string) => {
    const isActive = href === '/' ? pathName === '/' : pathName.startsWith(href);

    return `flex items-center text-lg active:text-primary justify-start gap-3 p-2 rounded-lg hover:text-primary duration-300 ${isActive ? 'bg-background text-primary' : ''}`;
  };

  const now = new Date();

  const { jy: year, jm: month, jd: day } = jalaali.toJalaali(now);
  const persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  const persianWeekDays = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
  const dayOfWeek = now.getDay();
  const persianDayOfWeekIndex = (dayOfWeek + 6) % 7;

  return (
    <div className="flex bg-white dark:bg-slate-900 min-h-screen">
      <aside className="bg-white dark:bg-slate-900 xl:w-[18.5%] lg:w-3/12 min-h-full h-full hidden lg:flex flex-col py-10">
        <Link href="/" className="px-4 flex xl:text-3xl lg:text-2xl text-2xl text-muted items-center gap-2 justify-center">
          <Image className="h-[30px] w-[30px] lg:h-[35px] lg:w-[35px] xl:w-[40px] xl:h-[40px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </Link>
        <div className="flex flex-col text-foreground/85 py-18 px-5 gap-6">
          <div className={linkClasses('/dashboard/panel')}>
            <MdHomeFilled className="text-2xl" />
            <Link href="/dashboard/panel">صفحه اصلی پنل</Link>
          </div>
          <div className={linkClasses('/dashboard/create-capsule')}>
            <HiMiniSquaresPlus className="text-2xl" />
            <Link href="/dashboard/create-capsule">افزودن کپسول جدید</Link>
          </div>
          <div className={linkClasses('/dashboard/user-capsules')}>
            <BsCapsule className="text-2xl" />
            <Link href="/dashboard/user-capsules">کپسول های شما</Link>
          </div>
          <div className={linkClasses('/dashboard/setting')}>
            <IoSettingsSharp className="text-2xl" />
            <Link href="/dashboard/setting">تنظیمات حساب</Link>
          </div>
          <div className={linkClasses('/dashboard/support')}>
            <BiSupport className="text-2xl" />
            <Link href="/dashboard/support">پشتیبانی</Link>
          </div>
          <div className={linkClasses('/dashboard/guide')}>
            <PiQuestionFill className="text-2xl" />
            <Link href="/dashboard/guide">راهنما</Link>
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
            <div className="flex gap-2 h-full items-center justify-center">
              <div className="bg-foreground text-xl p-2 text-background rounded-lg lg:hidden block">
                <DashboardSidebar />
              </div>
              <div className="flex lg:flex-row flex-col h-full lg:items-center xl:gap-3 lg:gap-1 items-start">
                <span className="lg:text-2xl text-base md:text-lg font-bold">مصطفی کمری عزیز ؛ خوش اومدی. 👋</span>
                <Separator orientation="vertical" className="bg-foreground/20 h-full lg:block hidden" />
                <span className="text-[11px] lg:text-base text-foreground/80">
                  {persianWeekDays[persianDayOfWeekIndex]}، {day} {persianMonths[month - 1]} {year}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center xl:gap-6 gap-3">
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

        <main className="flex-1 w-full bg-background lg:p-10 p-4 pb-10 lg:rounded-tr-4xl">{children}</main>
      </div>
    </div>
  );
}

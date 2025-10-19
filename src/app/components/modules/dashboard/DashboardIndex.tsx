'use client';

import { Separator } from '@/components/ui/separator';
import jalaali from 'jalaali-js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Bungee } from 'next/font/google';
import Link from 'next/link';
import { MdAdminPanelSettings, MdHomeFilled, MdOutlineEditNotifications } from 'react-icons/md';
import { HiMiniSquaresPlus } from 'react-icons/hi2';
import { BsCapsule } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';
import { PiQuestionFill } from 'react-icons/pi';
import { TbCategoryFilled } from 'react-icons/tb';
import { ImExit } from 'react-icons/im';
import { usePathname } from 'next/navigation';
import { DashboardSidebar } from './DashboardSidebar';
import { LinkProps } from '@/lib/types';
import { JSX, useEffect, useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { FaUser, FaUsers } from 'react-icons/fa';
import { useAppSelector } from '@/app/hooks/hook';
import dynamic from 'next/dynamic';
import { IoIosUndo } from 'react-icons/io';
import useMobile from '@/app/hooks/useMobile';

const ThemeToggle = dynamic(() => import('@/app/components/shared/Theme'), { ssr: false });
const LogoutModal = dynamic(() => import('./LogoutModal'), { ssr: false });
const Notification = dynamic(() => import('./Notification'), { ssr: false });

const bungee = Bungee({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Dashboard navigation links (user area)
const dashboardLinks: (LinkProps & { icon: JSX.Element })[] = [
  { link: '/dashboard/panel', title: 'صفحه اصلی پنل', icon: <MdHomeFilled className="text-2xl" /> },
  { link: '/dashboard/create-capsule', title: 'افزودن کپسول جدید', icon: <HiMiniSquaresPlus className="text-2xl" /> },
  { link: '/dashboard/user-capsules', title: 'کپسول های شما', icon: <BsCapsule className="text-2xl" /> },
  { link: '/dashboard/setting', title: 'تنظیمات حساب', icon: <IoSettingsSharp className="text-2xl" /> },
  { link: '/dashboard/guide', title: 'راهنما', icon: <PiQuestionFill className="text-2xl" /> },
  { link: '/', title: 'بازگشت به سایت', icon: <IoIosUndo className="text-2xl" /> },
  { link: '/dashboard/admin', title: 'پنل ادمین', icon: <MdAdminPanelSettings className="text-2xl" /> },
];

// Admin panel navigation links
const adminLinks: (LinkProps & { icon: JSX.Element })[] = [
  { link: '/dashboard/admin', title: 'صفحه اصلی پنل', icon: <MdHomeFilled className="text-2xl" /> },
  { link: '/dashboard/admin/users', title: 'کاربران سایت', icon: <FaUsers className="text-2xl" /> },
  { link: '/dashboard/admin/capsules', title: 'کپسول‌های سایت', icon: <BsCapsule className="text-2xl" /> },
  { link: '/dashboard/admin/categories', title: 'دسته بندی ها', icon: <TbCategoryFilled className="text-2xl" /> },
  { link: '/dashboard/admin/notifications', title: 'مدیریت اعلان‌ها', icon: <MdOutlineEditNotifications className="text-2xl" /> },
  { link: '/dashboard/panel', title: 'پنل کاربری', icon: <FaUser className="text-2xl" /> },
];

export default function DashboardLayoutIndex({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile();

  // Localized (Jalaali) date label shown in the top navbar
  const [dateLabel, setDateLabel] = useState<string>('');
  // Current pathname used for active-link logic and admin-area detection
  const pathName = usePathname();
  // Authenticated user from the global store (role, avatar, name, etc.)
  const { user } = useAppSelector((state) => state.user);

  // Compute Persian (Jalaali) date string on mount
  useEffect(() => {
    const now = new Date();
    const { jy: year, jm: month, jd: day } = jalaali.toJalaali(now);
    const persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    const persianWeekDays = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    const dayOfWeek = now.getDay();
    const persianDayOfWeekIndex = (dayOfWeek + 6) % 7;

    setDateLabel(`${persianWeekDays[persianDayOfWeekIndex]}، ${day} ${persianMonths[month - 1]} ${year}`);
  }, []);

  // Flag: whether current path is within the admin section
  const admin = pathName.startsWith('/dashboard/admin');

  // Utility: link classes for user dashboard list; marks active path
  const linkClasses = (href: string) => {
    const isActive = href === '/' ? pathName === '/' : pathName.startsWith(href);
    return `flex items-center text-lg active:text-primary justify-start gap-3 p-2 py-4 rounded-lg hover:text-primary duration-300 ${isActive ? 'bg-background text-primary' : ''}`;
  };

  // Utility: link classes for admin navigation; marks active path
  const linkClassesAdmin = (href: string) => {
    const isActive = href === '/dashboard/admin' ? pathName === href : pathName.startsWith(href);
    return `flex items-center text-lg active:text-primary justify-start gap-3 p-2 py-4 rounded-lg hover:text-primary duration-300 ${isActive ? 'bg-background text-primary' : ''}`;
  };

  return (
    // Root layout: two-column dashboard with sidebar + content area
    <div className="flex bg-white dark:bg-slate-900 min-h-screen">
      {/* Left fixed sidebar (desktop and up) */}
      <aside className="bg-white dark:bg-slate-900 xl:w-[18.5%] lg:w-3/12 min-h-full h-full hidden lg:flex flex-col py-10">
        {/* Brand/logo link at top of sidebar */}
        <Link href="/" className="px-4 flex xl:text-3xl lg:text-2xl text-2xl text-muted items-center gap-2 justify-center">
          <Image className="h-[30px] w-[30px] lg:h-[35px] lg:w-[35px] xl:w-[40px] xl:h-[40px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </Link>

        {/* Sidebar navigation: either user dashboard links or admin links */}
        <div className="flex flex-col text-foreground/85 py-18 px-5 gap-6">
          {/* User dashboard navigation (hidden on admin area or unauthenticated) */}
          {!admin &&
            user?.email &&
            dashboardLinks.map((links, i) => {
              const isLast = i === dashboardLinks.length - 1;
              // Hide "admin" link for non-admin users
              if (isLast && user.role !== 'admin') return null;
              return (
                <div key={i} className={linkClasses(links.link)}>
                  {links.icon}
                  <Link target="_top" href={links.link}>
                    {links.title}
                  </Link>
                </div>
              );
            })}

          {/* Admin navigation (only visible to admin users within admin area) */}
          {admin &&
            user?.email &&
            user?.role === 'admin' &&
            adminLinks.map((links, i) => (
              <div key={i} className={linkClassesAdmin(links.link)}>
                {links.icon}
                <Link target="_top" href={links.link}>
                  {links.title}
                </Link>
              </div>
            ))}
        </div>

        {/* Sidebar footer: logout action */}
        <div className="flex flex-col text-foreground/70 pt-5 px-5 gap-6">
          <div className="flex items-center text-lg active:text-primary justify-start gap-3 p-2 rounded-lg hover:text-primary duration-300">
            <ImExit className="text-2xl" />
            {/* Logout modal trigger (accessible dialog handled internally) */}
            <LogoutModal />
          </div>
        </div>
      </aside>

      {/* Right content column: top navbar + page content */}
      <div className="flex flex-col flex-1">
        {/* Top navbar: mobile sidebar trigger, greeting, date, theme, notifications, avatar */}
        <nav className="bg-white dark:bg-slate-900 flex items-center justify-between lg:py-6 lg:px-8 py-4 pt-6 px-2">
          {/* Left cluster: sidebar toggles and greeting/date */}
          <div className="flex h-full lg:gap-3 gap-1 items-center">
            <div className="flex gap-2 h-full items-center justify-center">
              {/* Mobile-only hamburger: shows dashboard or admin sidebar depending on context */}
              {isMobile && (
                <div className="bg-foreground text-xl p-2 text-background rounded-lg lg:hidden block">
                  {!admin && user?.email && <DashboardSidebar />}
                  {admin && user?.email && user?.role === 'admin' && <AdminSidebar />}
                </div>
              )}

              {/* Greeting text and localized date (vertical separator on large screens) */}
              <div className="flex lg:flex-row flex-col h-full lg:items-center xl:gap-3 lg:gap-1 items-start">
                <span className="xl:text-2xl text-sm md:text-base font-bold">{user?.name ?? user?.email} عزیز ؛ خوش اومدی. 👋</span>
                <Separator orientation="vertical" className="bg-foreground/20 h-full lg:block hidden" />
                <span suppressHydrationWarning className="text-[11px] lg:text-base text-foreground/80">
                  {dateLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right cluster: theme toggle, notifications, user avatar */}
          <div className="flex items-center xl:gap-6 gap-3">
            {/* Theme toggle hidden on small screens (exists in sidebar sheet there) */}
            <div className="lg:block hidden">
              <ThemeToggle />
            </div>

            {/* Notifications popover trigger */}
            <div className="lg:text-3xl flex items-center text-2xl cursor-pointer">
              <Notification />
            </div>

            {/* Current user avatar (falling back to default image) */}
            <Link href="/dashboard/setting" className='hover:scale-105 duration-300'>
              <Avatar className="h-10 w-10 ring-2 ring-secondary">
                <AvatarImage className="object-cover" src={user?.avatar ? `${baseURL}/images/${user.avatar}` : '/images/default.png'} />
                <AvatarFallback>...</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </nav>

        {/* Main content area where routed pages render */}
        <main className="flex-1 min-w-0 w-full overflow-x-hidden sm:overflow-x-visible bg-background lg:p-10 md:p-6 p-3 py-10 lg:rounded-tr-4xl">{children}</main>
      </div>
    </div>
  );
}

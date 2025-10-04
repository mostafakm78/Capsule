import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { RiMenu4Fill } from 'react-icons/ri';
import { Bungee } from 'next/font/google';
import Link from 'next/link';
import { MdAdminPanelSettings, MdHomeFilled } from 'react-icons/md';
import { BsCapsule } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';
import { ImExit } from 'react-icons/im';
import { PiQuestionFill } from 'react-icons/pi';
import { HiMiniSquaresPlus } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';
import { LinkProps } from '@/lib/types';
import { JSX } from 'react';
import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/app/hooks/hook';
import dynamic from 'next/dynamic';
import { IoIosUndo } from 'react-icons/io';

const ThemeToggle = dynamic(() => import('../../shared/Theme'), { ssr: false });
const LogoutModal = dynamic(() => import('./LogoutModal'), { ssr: false });

const bungee = Bungee({
  weight: '400',
});

const sidebarLinks: (LinkProps & { icon: JSX.Element })[] = [
  { link: '/dashboard/panel', title: 'صفحه اصلی پنل', icon: <MdHomeFilled className="text-2xl" /> },
  { link: '/dashboard/create-capsule', title: 'افزودن کپسول جدید', icon: <HiMiniSquaresPlus className="text-2xl" /> },
  { link: '/dashboard/user-capsules', title: 'کپسول های شما', icon: <BsCapsule className="text-2xl" /> },
  { link: '/dashboard/setting', title: 'تنظیمات حساب', icon: <IoSettingsSharp className="text-2xl" /> },
  { link: '/dashboard/guide', title: 'راهنما', icon: <PiQuestionFill className="text-2xl" /> },
  { link: '/', title: 'بازگشت به سایت', icon: <IoIosUndo className="text-2xl" /> },
  { link: '/dashboard/admin', title: 'پنل ادمین', icon: <MdAdminPanelSettings className="text-2xl" /> },
];

export function DashboardSidebar() {
  const pathName = usePathname();
  const { user } = useAppSelector((state) => state.user);

  // Computes active/hover classes for a given link based on current path
  const linkClasses = (href: string) => {
    const isActive = href === '/' ? pathName === '/' : pathName.startsWith(href);

    return `flex items-center ${isActive ? 'bg-white dark:bg-slate-900 text-primary' : ''} md:text-lg text-base active:text-primary justify-start gap-3 p-2 py-4 rounded-lg hover:text-primary duration-300`;
  };

  return (
    // Sidebar landmark for the dashboard navigation
    <aside>
      {/* Off-canvas sheet for mobile/compact navigation */}
      <Sheet>
        {/* Trigger button (hamburger icon) to open the sheet */}
        <SheetTrigger asChild>
          <RiMenu4Fill />
        </SheetTrigger>

        {/* Sheet panel that contains brand header, theme toggle, and nav links */}
        <SheetContent>
          {/* Brand header: app logo + wordmark */}
          <SheetHeader className="items-center mt-10">
            <SheetTitle>
              <Link href="/" className="brand flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
                <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
                <h1 className={`${bungee.className}`}>Capsule</h1>
              </Link>
            </SheetTitle>
          </SheetHeader>

          {/* Theme switcher section */}
          <section className="flex flex-col w-full py-4 px-10" aria-label="Theme settings">
            <Separator className="w-full bg-foreground/20 my-3" />
            <div className="flex items-center justify-between">
              <span>تم سایت</span>
              <ThemeToggle />
            </div>
          </section>

          {/* Navigation area: list of dashboard links */}
          <nav className="flex overflow-y-auto flex-col text-foreground/85 py-18 px-5 gap-6" aria-label="Dashboard navigation">
            {/* Using <ul>/<li> for a semantic list of navigation items */}
            <ul className="flex flex-col gap-6">
              {sidebarLinks.map((linkItem, i) => {
                const isLast = i === sidebarLinks.length - 1;
                // Hide admin link in admin route if user isn't admin
                if (isLast && user?.role !== 'admin') return null;
                return (
                  <li key={i} className={linkClasses(linkItem.link)}>
                    {linkItem.icon}
                    <Link target="_top" href={linkItem.link}>
                      {linkItem.title}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Account actions section: logout */}
            <section className="flex flex-col text-foreground/70 pt-5  gap-6" aria-label="Account actions">
              <div className="flex items-center text-lg active:text-primary justify-start gap-3 p-2 rounded-lg hover:text-primary duration-300">
                <ImExit className="text-2xl" />
                {/* Logout modal trigger (kept as is; accessible dialog handled by component) */}
                <LogoutModal />
              </div>
            </section>
          </nav>
        </SheetContent>
      </Sheet>
    </aside>
  );
}

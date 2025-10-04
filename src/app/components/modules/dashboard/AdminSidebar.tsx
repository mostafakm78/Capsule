import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { RiMenu4Fill } from 'react-icons/ri';
import { Bungee } from 'next/font/google';
import Link from 'next/link';
import { MdHomeFilled, MdOutlineEditNotifications } from 'react-icons/md';
import { BsCapsule } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { FaUser, FaUsers } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { LinkProps } from '@/lib/types';
import { JSX } from 'react';
import { TbCategoryFilled } from 'react-icons/tb';
import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';

/* Dynamically loaded UI controls to avoid SSR mismatch (theme switch, logout dialog) */
const ThemeToggle = dynamic(() => import('../../shared/Theme'), { ssr: false });
const LogoutModal = dynamic(() => import('./LogoutModal'), { ssr: false });

/* Brand font config */
const bungee = Bungee({
  weight: '400',
});

/* Admin sidebar navigation links with icons (source of truth for menu items) */
const sidebarLinks: (LinkProps & { icon: JSX.Element })[] = [
  { link: '/dashboard/admin', title: 'صفحه اصلی پنل', icon: <MdHomeFilled className="text-2xl" /> },
  { link: '/dashboard/admin/users', title: 'کاربران سایت', icon: <FaUsers className="text-2xl" /> },
  { link: '/dashboard/admin/capsules', title: 'کپسول‌های سایت', icon: <BsCapsule className="text-2xl" /> },
  { link: '/dashboard/admin/categories', title: 'دسته بندی ها', icon: <TbCategoryFilled className="text-2xl" /> },
  { link: '/dashboard/admin/notifications', title: 'مدیریت اعلان‌ها', icon: <MdOutlineEditNotifications className="text-2xl" /> },
  { link: '/dashboard/panel', title: 'پنل کاربری', icon: <FaUser className="text-2xl" /> },
];

export function AdminSidebar() {
  const pathName = usePathname();

  /* Utility: computes active/inactive classes for each link based on current pathname */
  const linkClasses = (href: string) => {
    const isActive = href === '/dashboard/admin' ? pathName === href : pathName.startsWith(href);

    return `flex items-center ${isActive ? 'bg-white dark:bg-slate-900 text-primary' : ''} md:text-lg text-base active:text-primary justify-start gap-3 p-2 py-4 rounded-lg hover:text-primary duration-300`;
  };
  return (
    /* Semantic: sidebar navigation container for admin area (acts as <aside>) */
    <aside>
      {/* Off-canvas sheet used as a mobile/compact navigation drawer */}
      <Sheet>
        {/* Trigger button (hamburger icon) to open the admin drawer */}
        <SheetTrigger asChild>
          <RiMenu4Fill />
        </SheetTrigger>

        {/* Drawer content: header (brand + logo), theme toggle, nav links, logout */}
        <SheetContent>
          {/* Drawer header with brand identity */}
          <SheetHeader className="items-center mt-10">
            <SheetTitle>
              {/* Brand / Home link with logo and display font */}
              <Link href="/" className="brand flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
                <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
                <h1 className={`${bungee.className}`}>Capsule</h1>
              </Link>
            </SheetTitle>
          </SheetHeader>

          {/* Preferences block: theme switcher (kept inside the drawer for mobile reachability) */}
          <div className="flex flex-col w-full py-4 px-10">
            <Separator className="w-full bg-foreground/20 my-3" />
            <div className="flex items-center justify-between">
              <span>تم سایت</span>
              <ThemeToggle />
            </div>
          </div>

          {/* Navigation list: admin routes + logout action */}
          <div className="flex overflow-y-auto flex-col text-foreground/85 py-18 px-5 gap-6">
            {/* Map through admin links to render each nav item with its icon */}
            {sidebarLinks.map((linkItem, i) => (
              <div key={i} className={linkClasses(linkItem.link)}>
                {linkItem.icon}
                <Link href={linkItem.link}>{linkItem.title}</Link>
              </div>
            ))}

            {/* Logout section: action row with icon and modal trigger */}
            <div className="flex flex-col text-foreground/70 pt-5  gap-6">
              <div className="flex items-center text-lg active:text-primary justify-start gap-3 p-2 rounded-lg hover:text-primary duration-300">
                <ImExit className="text-2xl" />
                <LogoutModal />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  );
}

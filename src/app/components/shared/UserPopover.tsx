import { useAppSelector } from '@/app/hooks/hook';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import LogoutModal from '../modules/dashboard/LogoutModal';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function UserPopover() {
  // Select authenticated user data from the global store
  const { user } = useAppSelector((state) => state.user);

  return (
    // Root popover wrapper controlling the user account dropdown
    <Popover>
      {/* Popover trigger: avatar acts as a button to open the menu.
          - aria-label (Persian): localized accessible name for the trigger
          - aria-haspopup="dialog": indicates the popup behaves like a light dialog
          - title: hover tooltip; purely cosmetic */}
      <PopoverTrigger aria-label="پروفایل" aria-haspopup="dialog" className="cursor-pointer text-foreground/70 data-[state=open]:text-secondary" title="پروفایل">
        {/* Visual trigger: user avatar (image with Persian alt text)
            - Fallback renders when image fails; ellipsis is decorative */}
        <Avatar className="h-10 w-10 ring-2 ring-secondary">
          <AvatarImage className="object-cover" src={user?.avatar ? `${baseURL}/images/${user.avatar}` : '/images/default.png'} alt="آواتار کاربر" />
          <AvatarFallback aria-hidden="true">...</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      {/* Popover panel content:
          - role="dialog" + aria-modal="false": non-blocking, lightweight dialog semantics
          - aria-label (Persian): announces the panel purpose to screen readers
          - sideOffset: visual positioning only (no semantic impact) */}
      <PopoverContent aria-label="گزینه‌های کاربری و لینک‌های داشبورد" role="dialog" aria-modal="false" sideOffset={30} className="z-50 bg-white dark:bg-slate-900 lg:min-w-[300px] md:min-w-[300px] min-w-[250px] md:p-6 lg:ml-40 md:ml-10 ml-5">
        {/* Header area: user identity block (avatar + name/email + quick links) */}
        <header className="flex items-center gap-3">
          {/* Larger avatar for context within the menu */}
          <div>
            <Avatar className="h-12 w-12 ring-2 ring-secondary">
              <AvatarImage className="object-cover" src={user?.avatar ? `${baseURL}/images/${user.avatar}` : '/images/default.png'} alt="آواتار کاربر" />
              <AvatarFallback aria-hidden="true">...</AvatarFallback>
            </Avatar>
          </div>

          {/* Identity and shortcuts:
              - Name preferred; fallback to email if name is missing
              - Links to user/admin panels with localized labels */}
          <div className="flex flex-col p-2 gap-1.5">
            <span className="font-bold text-base text-foreground/70 line-clamp-1">{user?.name ?? user?.email}</span>

            {/* User dashboard link; icon is decorative */}
            <Link className="text-primary flex items-center gap-2 hover:text-foreground/80 duration-300" href="/dashboard/panel" target="_top" aria-label="مشاهده پنل کاربری" title="مشاهده پنل کاربری">
              مشاهده پنل کاربری
              <FaLongArrowAltLeft aria-hidden="true" />
            </Link>

            {/* Admin dashboard link: conditionally rendered for admin role */}
            {user?.role === 'admin' && (
              <Link className="text-primary flex items-center gap-2 hover:text-foreground/80 duration-300" href="/dashboard/admin" target="_top" aria-label="مشاهده پنل ادمین" title="مشاهده پنل ادمین">
                مشاهده پنل ادمین
                <FaLongArrowAltLeft aria-hidden="true" />
              </Link>
            )}
          </div>
        </header>

        {/* Visual separator between header and navigation list */}
        <Separator className="w-full bg-foreground/20 my-4" />

        {/* Navigation section: list of dashboard actions/links
            - aria-label (Persian) clarifies the landmark purpose */}
        <nav className="flex flex-col gap-1" aria-label="لینک‌های داشبورد">
          {/* Create capsule action */}
          <Link className="p-2 text-foreground/70 font-light hover:bg-accent hover:text-foreground duration-150 rounded text-lg" href="/dashboard/create-capsule" aria-label="ساخت کپسول جدید" title="ساخت کپسول جدید">
            ساخت کپسول جدید
          </Link>

          {/* User’s capsules overview */}
          <Link className="p-2 text-foreground/70 font-light hover:bg-accent hover:text-foreground duration-150 rounded text-lg" href="/dashboard/create-capsule" aria-label="کپسول‌های شما" title="کپسول‌های شما">
            کپسول های شما
          </Link>

          {/* Account settings entry */}
          <Link className="p-2 text-foreground/70 font-light hover:bg-accent hover:text-foreground duration-150 rounded text-lg" href="/dashboard/create-capsule" aria-label="تنظیمات حساب" title="تنظیمات حساب">
            تنظیمات حساب
          </Link>

          {/* Dashboard help/documentation */}
          <Link className="p-2 text-foreground/70 font-light hover:bg-accent hover:text-foreground duration-150 rounded text-lg" href="/dashboard/create-capsule" aria-label="راهنمای داشبورد" title="راهنمای داشبورد">
            راهنمای داشبورد
          </Link>

          {/* Secondary separator and logout control */}
          <Separator className="w-full bg-foreground/20 mt-2" />

          {/* Logout action container; the modal component handles its own logic and a11y */}
          <div className="p-2 text-foreground/70 font-light hover:bg-accent hover:text-foreground duration-150 rounded text-lg" aria-label="خروج از حساب">
            <LogoutModal />
          </div>
        </nav>
      </PopoverContent>
    </Popover>
  );
}

'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { Bungee } from 'next/font/google';
import Link from 'next/link';
import { MdHomeFilled } from 'react-icons/md';
import { BsCapsule } from 'react-icons/bs';
import { FaQuestion } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { FaExclamationCircle } from 'react-icons/fa';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LinkProps } from '@/lib/types';
import { JSX, useCallback, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { IoIosSearch } from 'react-icons/io';
import dynamic from 'next/dynamic';

/* Lazy-load theme toggle to reduce initial JS for the sidebar */
const ThemeToggle = dynamic(() => import('./Theme'), { ssr: false });

/* Brand font setup (Bungee) used for the logo wordmark */
const bungee = Bungee({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

/* Static config: list of primary navigation links with leading icons */
const sidebarLinks: (LinkProps & { icon: JSX.Element })[] = [
  { link: '/', title: 'صفحه اصلی', icon: <MdHomeFilled className="text-2xl" /> },
  { link: '/capsules', title: 'کپسول های عمومی', icon: <BsCapsule className="text-xl" /> },
  { link: '/about-us', title: 'درباره ما', icon: <FaQuestion className="text-xl" /> },
  { link: '/contact-us', title: 'ارتباط با ما', icon: <IoCall className="text-xl" /> },
  { link: '/terms', title: 'قوانین و مقررات', icon: <FaExclamationCircle className="text-xl" /> },
];

export default function Sidebar() {
  /* Routing/query hooks: used for active link state and search navigation */
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  /* Local component state: search input value and drawer open/close flag */
  const [searchInput, setSearchInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // NOTE: visual helper (unchanged)
  /* Computes link classes based on current route; purely visual (no a11y impact) */
  const linkClasses = (href: string) => {
    const isActive = href === '/' ? pathName === '/' : pathName.startsWith(href);
    return `flex items-center ${isActive ? 'text-secondary' : 'text-foreground/80'} text-base md:text-xl bg-accent p-2 rounded-lg active:text-primary justify-start gap-4`;
  };

  // NOTE: routing helpers (unchanged)
  /* Pushes to /capsules with mutated query params; isolates query logic */
  const pushWithParams = useCallback(
    (mutator: (p: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutator(params);
      const qs = params.toString();
      router.push(qs ? `/capsules?${qs}` : `/capsules`);
    },
    [router, searchParams]
  );

  /* Executes search: sets/removes `q` and resets `page`; also closes the drawer */
  const performSearchAction = useCallback(() => {
    const q = searchInput.trim();

    if (q.length > 0) {
      pushWithParams((params) => {
        params.set('q', q);
        params.set('page', '1');
      });
      setIsOpen(false);
      setSearchInput('');
      return;
    }

    if (searchParams.get('q')) {
      pushWithParams((params) => {
        params.delete('q');
        params.set('page', '1');
      });
      setIsOpen(false);
      setSearchInput('');
      return;
    }
  }, [pushWithParams, searchInput, searchParams]);

  /* Submits search on Enter key (ignores IME composition); closes drawer */
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (!e.nativeEvent.isComposing && e.key === 'Enter') {
        setIsOpen(false);
        performSearchAction();
      }
    },
    [performSearchAction]
  );

  return (
    <aside aria-label="منوی سایت">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* Trigger button: hamburger icon; provides a Persian label for AT */}
        <SheetTrigger asChild>
          <HiOutlineBars3 className="cursor-pointer text-3xl md:text-4xl" aria-label="باز کردن منو" />
        </SheetTrigger>

        {/* Drawer content region: houses brand, theme, search, and primary links */}
        <SheetContent>
          {/* Drawer header: branded logo + wordmark */}
          <SheetHeader className="items-center mt-10">
            <SheetTitle>
              <div aria-label="لوگوی کپسول" className="brand flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
                {/* Logo image with localized Persian alt text for accessibility */}
                <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="لوگوی کپسول" width={50} height={50} />
                <h1 className={bungee.className}>Capsule</h1>
              </div>
            </SheetTitle>
          </SheetHeader>

          {/* Theme settings block: quick access to light/dark toggle */}
          <section aria-label="تنظیمات تم" className="flex flex-col w-full py-4 sm:px-10 px-4">
            <Separator className="w-full bg-foreground/20 my-3" />
            <div className="flex items-center justify-between">
              <span>تم سایت</span>
              <ThemeToggle />
            </div>
          </section>

          {/* Search (mobile-first): uses role="search" and localized labels */}
          <section aria-label="جستجو" className="flex flex-col w-full py-4 sm:px-10 px-4" role="search">
            <Separator className="w-full bg-foreground/20 my-3" />
            <div className="flex w-full relative md:hidden justify-center items-center">
              <Input onKeyDown={handleKeyDown} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="bg-white dark:bg-slate-900" type="text" placeholder="کپسول رو سرچ کن" aria-label="جستجوی کپسول" />
              <IoIosSearch onClick={performSearchAction} className="text-3xl cursor-pointer hover:animate-caret-blink absolute left-0 ml-3 text-foreground/70" aria-label="جستجو" />
            </div>
          </section>

          {/* Primary navigation area: list of site links inside a nav landmark */}
          <nav aria-label="لینک‌های سایت" className="flex flex-col text-lg w-full py-4 gap-4 sm:px-10 px-4" role="navigation">
            <div className="border-t border-foreground/20 py-3"></div>
            {sidebarLinks.map((linkItem, i) => {
              /* Compute semantic active state for aria-current */
              const isActive = linkItem.link === '/' ? pathName === '/' : pathName.startsWith(linkItem.link);
              return (
                <Link
                  key={i}
                  href={linkItem.link}
                  className={linkClasses(linkItem.link)}
                  aria-label={linkItem.title} /* Persian accessibile name for each link */
                  aria-current={isActive ? 'page' : undefined} /* Announces current page to screen readers */
                  title={linkItem.title} /* Tooltip for mouse users */
                >
                  {linkItem.icon /* Decorative leading icon (kept as-is; no a11y changes to avoid style diffs) */}
                  {linkItem.title}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </aside>
  );
}

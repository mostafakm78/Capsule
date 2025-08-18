'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { Bungee } from 'next/font/google';
import { ThemeToggle } from './Theme';
import Link from 'next/link';
import { MdHomeFilled } from 'react-icons/md';
import { BsCapsule } from 'react-icons/bs';
import { FaQuestion } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { FaExclamationCircle } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { LinkProps } from '@/lib/types';
import { JSX } from 'react';
import { Separator } from '@/components/ui/separator';

const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
});

const sidebarLinks: (LinkProps & { icon: JSX.Element })[] = [
  { link: '/', title: 'صفحه اصلی', icon: <MdHomeFilled className="text-2xl" /> },
  { link: '/capsules', title: 'کپسول های عمومی', icon: <BsCapsule className="text-xl" /> },
  { link: '/about-us', title: 'درباره ما', icon: <FaQuestion className="text-xl" /> },
  { link: '/contact-us', title: 'ارتباط با ما', icon: <IoCall className="text-xl" /> },
  { link: '/terms', title: 'قوانین و مقررات', icon: <FaExclamationCircle className="text-xl" /> },
];

export function Sidebar() {
  const pathName = usePathname();

  const linkClasses = (href: string) => {
    const isActive = href === '/' ? pathName === '/' : pathName.startsWith(href);
    return `flex items-center ${isActive ? 'text-secondary' : 'text-foreground/80'} text-xl bg-accent p-2 rounded-lg active:text-primary justify-start gap-4`;
  };

  return (
    <aside>
      <Sheet>
        <SheetTrigger asChild>
          <HiOutlineBars3 className="cursor-pointer text-3xl md:text-4xl" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="items-center mt-10">
            <SheetTitle>
              <div className="brand flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
                <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={50} height={50} />
                <h1 className={bungee.className}>Capsule</h1>
              </div>
            </SheetTitle>
          </SheetHeader>

          {/* تنظیمات تم */}
          <div className="flex flex-col w-full py-4 px-10">
            <Separator className='w-full bg-foreground/20 my-3'/>
            <div className="flex items-center justify-between">
              <span>تم سایت</span>
              <ThemeToggle />
            </div>
          </div>

          {/* لینک‌ها */}
          <div className="flex flex-col text-lg w-full py-4 gap-4 px-10">
            <div className="border-t border-foreground/20 py-3"></div>
            {sidebarLinks.map((linkItem, i) => (
              <Link key={i} href={linkItem.link} className={linkClasses(linkItem.link)}>
                {linkItem.icon}
                {linkItem.title}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  );
}

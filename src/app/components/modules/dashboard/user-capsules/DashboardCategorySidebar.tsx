'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { IoFilterSharp } from "react-icons/io5";
import { Bungee } from 'next/font/google';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { LinkProps } from '@/lib/types';

const bungee = Bungee({
  weight: '400',
});

const sortLinks: LinkProps[] = [
  { link: '/', title: 'همه کپسول ها' },
  { link: '/', title: 'جدید ترین' },
  { link: '/', title: 'قدیمی ترین' },
];

const filterLinks: LinkProps[] = [
  { link: '/', title: 'خوشحال‌کننده' },
  { link: '/', title: 'ناراحت‌کننده' },
  { link: '/', title: 'هیجان‌انگیز' },
  { link: '/', title: 'آرامش‌بخش' },
  { link: '/', title: 'ترسناک' },
  { link: '/', title: 'الهام‌بخش' },
  { link: '/', title: 'رویا' },
  { link: '/', title: 'سفر' },
  { link: '/', title: 'خانواده' },
  { link: '/', title: 'دوستان' },
  { link: '/', title: 'عشق' },
  { link: '/', title: 'کار' },
  { link: '/', title: 'چالش‌ها' },
  { link: '/', title: 'کودکی' },
  { link: '/', title: 'نوجوانی' },
  { link: '/', title: 'خاطره شخصی' },
  { link: '/', title: 'بزرگسالی' },
  { link: '/', title: 'مدرسه / دانشگاه' },
];

export function DashboardCategorySidebar() {
  const pathName = usePathname();

  const linkClasses = (href: string) => {
    const isActive = href === '/' ? pathName === '/' : pathName.startsWith(href);
    return `
      text-foreground/90 pr-4 py-1 text-base
      relative hover:text-primary duration-300
      after:content-[''] after:bg-foreground/70 after:absolute
      after:right-0 after:h-2 after:w-2 after:rounded-full
      after:top-1/2 after:-translate-y-1/2
      hover:after:bg-primary after:duration-300
      ${isActive ? 'bg-primary text-background' : ''}
    `;
  };

  return (
    <aside>
      <Sheet>
        <SheetTrigger asChild>
          <IoFilterSharp className="text-2xl cursor-pointer" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="items-center mt-10">
            <SheetTitle>
              <div className="brand flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
                <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={50} height={50} />
                <h1 className={`${bungee.className}`}>Capsule</h1>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col text-foreground/85 py-8 px-5 gap-8">
            {/* مرتب سازی */}
            <div>
              <h6 className="text-xl font-semibold">مرتب سازی بر اساس</h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto">
                {sortLinks.map((linkItem, i) => (
                  <Link key={i} href={linkItem.link} className={linkClasses(linkItem.link)}>
                    {linkItem.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* فیلتر */}
            <div>
              <h6 className="text-xl font-semibold">فیلتر بر اساس</h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto">
                {filterLinks.map((linkItem, i) => (
                  <Link key={i} href={linkItem.link} className={linkClasses(linkItem.link)}>
                    {linkItem.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  );
}

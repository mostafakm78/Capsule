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

const bungee = Bungee({
  weight: '400',
});

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
          <HiOutlineBars3 />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="items-center mt-10">
            <SheetTitle>
              <div className="brand flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
                <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
                <h1 className={`${bungee.className}`}>Capsule</h1>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col w-full py-4 px-10">
            <div className="border-t border-foreground/20 py-3"></div>
            <div className="flex items-center justify-between">
              <span>تم سایت</span>
              <ThemeToggle />
            </div>
          </div>
          <div className="flex flex-col text-lg w-full py-4 gap-4 px-10">
            <div className="border-t border-foreground/20 py-3"></div>
            <div className={linkClasses('/')}>
              <MdHomeFilled className="text-2xl" />
              <Link href="/">صفحه اصلی</Link>
            </div>
            <div className={linkClasses('/capsules')}>
              <BsCapsule className="text-xl" />
              <Link href="/capsules">کپسول های عمومی</Link>
            </div>
            <div className={linkClasses('/about-us')}>
              <FaQuestion className="text-xl" />
              <Link href="/about-us">درباره کپسول</Link>
            </div>
            <div className={linkClasses('/contact-us')}>
              <IoCall className="text-xl" />
              <Link href="/contact-us">ارتباط با ما</Link>
            </div>
            <div className={linkClasses('/terms')}>
              <FaExclamationCircle className="text-xl" />
              <Link href="/terms">قوانین و مقررات</Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  );
}

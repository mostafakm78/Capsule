import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { RiMenu4Fill } from 'react-icons/ri';
import { Bungee } from 'next/font/google';
import Link from 'next/link';
import { MdHomeFilled } from 'react-icons/md';
import { BsCapsule } from 'react-icons/bs';
import { FaQuestion } from 'react-icons/fa';
import { IoCall, IoSettingsSharp } from 'react-icons/io5';
import { ThemeToggle } from '../../shared/Theme';
import { ImExit } from 'react-icons/im';
import { PiQuestionFill } from 'react-icons/pi';
import { BiSupport } from 'react-icons/bi';
import { HiMiniSquaresPlus } from 'react-icons/hi2';

const bungee = Bungee({
  weight: '400',
});

export function PanelSidebar() {
  return (
    <aside>
      <Sheet>
        <SheetTrigger asChild>
          <RiMenu4Fill />
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
          <div className="flex overflow-y-auto flex-col text-foreground/85 py-18 px-5 gap-6">
            <div className="flex items-center text-lg active:text-primary justify-start gap-3 bg-white p-2 rounded-lg text-primary hover:text-primary duration-300">
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
            <div className="flex flex-col text-foreground/70 pt-5  gap-6">
              <div className="flex items-center text-lg active:text-primary justify-start gap-3 p-2 rounded-lg hover:text-primary duration-300">
                <ImExit className="text-2xl" />
                <Link href="/">خروج</Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  );
}

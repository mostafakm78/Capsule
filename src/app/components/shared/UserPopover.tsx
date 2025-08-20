import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export default function UserPopover() {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer text-foreground/70 data-[state=open]:text-secondary">
        <Avatar className="h-10 w-10 ring-2 ring-secondary">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CP</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent sideOffset={30} className="z-50 bg-white dark:bg-slate-900 lg:w-[300px] md:w-[300px] w-[250px] md:p-6 lg:ml-5 md:ml-10 ml-5">
        <div className="flex items-center gap-5">
          <div>
            <Avatar className="h-12 w-12 ring-2 ring-secondary">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CP</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-bold text-foreground/70 text-xl">مصطفی کمری</span>
            <Link className="text-primary flex items-center gap-2 hover:text-foreground/80 duration-300" href="/dashboard/panel">
              مشاهده پنل کاربری
              <FaLongArrowAltLeft />
            </Link>
          </div>
        </div>
        <Separator className="w-full bg-foreground/20 my-4" />
        <div className="flex flex-col gap-1">
          <Link className="p-2 text-foreground/70 font-light hover:bg-accent hover:text-foreground duration-150 rounded text-lg" href="/dashboard/create-capsule">
            ساخت کپسول جدید
          </Link>
          <Link className="p-2 text-foreground/70 font-light hover:bg-accent hover:text-foreground duration-150 rounded text-lg" href="/dashboard/create-capsule">
            کپسول های شما
          </Link>
          <Link className="p-2 text-foreground/70 font-light hover:bg-accent hover:text-foreground duration-150 rounded text-lg" href="/dashboard/create-capsule">
            تنظیمات حساب
          </Link>
          <Link className="p-2 text-foreground/70 font-light hover:bg-accent hover:text-foreground duration-150 rounded text-lg" href="/dashboard/create-capsule">
            راهنمای داشبورد
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

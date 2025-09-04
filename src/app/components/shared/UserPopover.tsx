import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { User } from '@/lib/types';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export default function UserPopover({ user }: { user: User }) {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer text-foreground/70 data-[state=open]:text-secondary">
        <Avatar className="h-10 w-10 ring-2 ring-secondary">
          <AvatarImage src={user.avatar ?? 'images/default.png'} />
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent sideOffset={30} className="z-50 bg-white dark:bg-slate-900 lg:min-w-[300px] md:min-w-[300px] min-w-[250px] md:p-6 lg:ml-5 md:ml-10 ml-5">
        <div className="flex items-center gap-3">
          <div>
            <Avatar className="h-12 w-12 ring-2 ring-secondary">
              <AvatarImage src={user.avatar ?? 'images/default.png'} />
              <AvatarFallback>...</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className={`font-bold text-foreground/70 line-clamp-1 ${user.name ? 'text-xl' : 'text-lg'}`}>{user.name ?? user.email}</span>
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

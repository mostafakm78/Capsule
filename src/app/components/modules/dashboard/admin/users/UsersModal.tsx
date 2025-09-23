import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { UserBannedModal } from './UserBannedModal';
import { UserSafe } from '@/lib/types';
import { UserFlagModal } from './UserFlagModal';
import { UserTypeModal } from './UserTypeModal';

type Props = {
  user: UserSafe;
};

export function UsersModal({ user }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="py-1 px-1.5 text-sm">
          مصطفی کمری
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>کاربر : مصطفی کمری</DialogTitle>
          <DialogDescription asChild>
            <div className="text-muted-foreground text-sm">
              <div className="flex flex-col items-center justify-center gap-2 py-2">
                <span>ایمیل : Mostafamf555@gmail.com</span>
                <Link className="flex items-center gap-2 font-light text-base text-primary hover:text-foreground/80 duration-300" href={`/dashboard/admin/users/${user._id}`}>
                  دیدن
                  <FaLongArrowAltLeft className="text-lg" />
                </Link>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-foreground/20 w-full" />
        <div className="grid gap-1">
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <span className="text-lg">وضعیت کاربر</span>
            <UserFlagModal user={user} />
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <span className="text-lg">وضعیت بن</span>
            <UserBannedModal user={user} />
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <span className="text-lg">نقش کاربر</span>
            <UserTypeModal user={user} />
          </div>
        </div>
        <Separator className="bg-foreground/20 w-full" />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">انصراف</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

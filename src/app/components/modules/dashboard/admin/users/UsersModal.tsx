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
    // Root dialog wrapper (handles open/close state & a11y under the hood)
    <Dialog>
      {/* The element that triggers opening the dialog; rendered as a Button */}
      <DialogTrigger asChild>
        <Button variant="outline" className="py-1 px-1.5 text-sm">
          {/* Button label (could be dynamic; currently hardcoded) */}
          {user.name ?? 'بی نام'}
        </Button>
      </DialogTrigger>

      {/* Dialog content container (modal body & structure) */}
      <DialogContent className="sm:max-w-[425px]">
        {/* Dialog header: title + short description area */}
        <DialogHeader>
          {/* Modal title (identifies the dialog’s purpose) */}
          <DialogTitle>کاربر : {user.name ?? user.email}</DialogTitle>

          {/* Additional descriptive content (using asChild to allow custom markup) */}
          <DialogDescription asChild>
            <div className="text-muted-foreground text-sm">
              {/* User quick info block */}
              <div className="flex flex-col items-center justify-center gap-2 py-2">
                {/* Email label/value */}
                <span>ایمیل : {user.email}</span>

                {/* Link to the user’s detail page in admin */}
                <Link className="flex items-center gap-2 font-light text-base text-primary hover:text-foreground/80 duration-300" href={`/dashboard/admin/users/${user._id}`}>
                  دیدن
                  <FaLongArrowAltLeft className="text-lg" />
                </Link>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* Visual separator between the header and the actionable controls */}
        <Separator className="bg-foreground/20 w-full" />

        {/* Action blocks: each section controls a different user attribute */}
        <div className="grid gap-1">
          {/* User flag/status controls (e.g., normal/suspicious/review/violation) */}
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <span className="text-lg">وضعیت کاربر</span>
            <UserFlagModal user={user} />
          </div>

          {/* Ban/unban controls */}
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <span className="text-lg">وضعیت بن</span>
            <UserBannedModal user={user} />
          </div>

          {/* Role controls (e.g., user/admin) */}
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <span className="text-lg">نقش کاربر</span>
            <UserTypeModal user={user} />
          </div>
        </div>

        {/* Divider before footer buttons */}
        <Separator className="bg-foreground/20 w-full" />

        {/* Dialog footer: primary/secondary actions */}
        <DialogFooter>
          {/* Close dialog button (mapped to dialog close action) */}
          <DialogClose asChild>
            <Button variant="outline">انصراف</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

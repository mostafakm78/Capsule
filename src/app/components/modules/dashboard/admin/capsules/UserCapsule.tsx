'use client';

import { RootState } from '@/app/store/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import CapsuleInfo from './CapsuleInfo';

export default function SingleUserCapsuleAdminIndex() {
//   const color_Code = useSelector((state: RootState) => state.capsuleSetting.colorCode);

  return (
    <section className="flex flex-col h-full gap-10">
      <div className="flex flex-col h-full justify-start gap-10">
        <div className="w-full px-4 flex items-center justify-between">
          <span className='text-foreground pr-4 text-xl relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کاربر : مصطفی کمری</span>
          <div>
            <Avatar className="md:h-20 md:w-20 w-15 h-15 ring-2 ring-secondary">
              <AvatarImage className='object-cover' src="https://github.com/shadcn.png" />
              <AvatarFallback>CP</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className={`flex flex-col gap-6 md:p-8 p-3  rounded-lg justify-center w-full`}>
          <CapsuleInfo />
        </div>
      </div>
    </section>
  );
}

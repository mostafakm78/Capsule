'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Link from 'next/link';
import { useState } from 'react';

type icons = {
  pass: boolean;
  newPass: boolean;
};

export default function UserPassChange() {
  const [show, setShow] = useState<icons>({
    pass: false,
    newPass: false,
  });

  return (
    <>
      <div className="space-y-1">
        <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">تغییر رمز عبور</h4>
      </div>
      <div className="flex lg:flex-row flex-col w-full lg:gap-10 gap-6">
        <Label className="flex lg:w-1/2 w-full flex-col items-start text-base text-foreground/80">
          پسورد فعلی
          <div className="relative w-full">
            <Input type={show.pass ? 'password' : 'text'} placeholder="پسورد فعلی حساب شما" className="md:text-sm md:placeholder:text-sm" />
            <div onClick={() => setShow((prev) => ({ ...prev, pass: !prev.pass }))}>
              {show.pass === false && <IoEye className="absolute text-foreground/60 text-xl top-1/2 -translate-y-1/2 left-0 ml-3 cursor-pointer" />}
              {show.pass === true && <IoEyeOff className="absolute text-foreground/60 text-xl top-1/2 -translate-y-1/2 left-0 ml-3 cursor-pointer" />}
            </div>
          </div>
          <Link className="text-sm font-light text-foreground/90" href="">
            رمز عبور فعلی رو فراموش کردی؟
          </Link>
        </Label>
        <Label className="flex lg:w-1/2 w-full flex-col items-start text-base text-foreground/80">
          پسورد جدید
          <div className='relative w-full'>
            <Input type={show.newPass ? 'password' : 'text'} placeholder="پسورد جدید حساب شما" className="md:text-sm md:placeholder:text-sm" />
          <div onClick={() => setShow((prev) => ({ ...prev, newPass: !prev.newPass }))}>
              {show.newPass === false && <IoEye className="absolute text-foreground/60 text-xl top-1/2 -translate-y-1/2 left-0 ml-3 cursor-pointer" />}
              {show.newPass === true && <IoEyeOff className="absolute text-foreground/60 text-xl top-1/2 -translate-y-1/2 left-0 ml-3 cursor-pointer" />}
            </div>
          </div>
        </Label>
      </div>
      <div className="self-center">
        <Button className="cursor-pointer">ثبت تغییرات</Button>
      </div>
    </>
  );
}

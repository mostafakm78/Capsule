'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Link from 'next/link';
import { useState } from 'react';
import callApi from '@/app/services/callApi';
import useCustomToast from '@/app/hooks/useCustomToast';
import { AxiosError } from 'axios';
import { ApiError } from '@/lib/types';

type icons = {
  pass: boolean;
  newPass: boolean;
};

export default function UserPassChange() {
  const showToast = useCustomToast();

  const [show, setShow] = useState<icons>({
    pass: false,
    newPass: false,
  });
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  async function handleSubmit() {
    try {
      const current = currentPassword.trim();
      const next = newPassword.trim();

      if (!current || !next) {
        return showToast({ message: 'هر دو فیلد رمز لازم است', bg: 'bg-red-200' });
      }
      const res = await callApi().patch('/me', {
        currentPassword,
        newPassword,
      });
      if (res.status === 200) {
        showToast({ message: 'رمز شما با موفقیت تغییر یافت ✅', bg: 'bg-green-200' });
        setCurrentPassword('');
        setNewPassword('');
        return;
      }

      showToast({ message: 'خطا در تغییر رمز', bg: 'bg-red-200' });
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      const payload = err.response?.data.data;
      console.log(err);
      if (err.response?.status === 422) {
        if (Array.isArray(payload)) {
          payload.forEach(({ message }) => {
            return showToast({ message: message, bg: 'bg-red-200' });
          });
        }
      } else if (err.response?.status === 400) {
        return showToast({ message: 'پسورد فعلی صحیح نمیباشد', bg: 'bg-red-200' });
      } else {
        return showToast({ message: err.message, bg: 'bg-red-200' });
      }
    }
  }

  return (
    <>
      <div className="space-y-1">
        <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">تغییر رمز عبور</h4>
      </div>
      <div className="flex lg:flex-row flex-col w-full lg:gap-10 gap-6">
        <Label className="flex lg:w-1/2 w-full flex-col items-start text-base text-foreground/80">
          پسورد فعلی
          <div className="relative w-full">
            <Input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type={show.pass ? 'password' : 'text'} placeholder="پسورد فعلی حساب شما" className="md:text-sm md:placeholder:text-sm" />
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
          <div className="relative w-full">
            <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type={show.newPass ? 'password' : 'text'} placeholder="پسورد جدید حساب شما" className="md:text-sm md:placeholder:text-sm" />
            <div onClick={() => setShow((prev) => ({ ...prev, newPass: !prev.newPass }))}>
              {show.newPass === false && <IoEye className="absolute text-foreground/60 text-xl top-1/2 -translate-y-1/2 left-0 ml-3 cursor-pointer" />}
              {show.newPass === true && <IoEyeOff className="absolute text-foreground/60 text-xl top-1/2 -translate-y-1/2 left-0 ml-3 cursor-pointer" />}
            </div>
          </div>
        </Label>
      </div>
      <div className="self-center">
        <Button disabled={!currentPassword && !newPassword} onClick={handleSubmit} className="cursor-pointer">
          ثبت تغییرات
        </Button>
      </div>
    </>
  );
}

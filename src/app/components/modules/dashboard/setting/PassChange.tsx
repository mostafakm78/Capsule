'use client'; // Enable client-side rendering for this component

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

// Local type for toggling visibility of password fields
type icons = {
  pass: boolean; // controls current password input visibility
  newPass: boolean; // controls new password input visibility
};

export default function UserPassChange() {
  const showToast = useCustomToast(); // Custom toast hook for user feedback

  // UI state for password visibility toggles
  const [show, setShow] = useState<icons>({
    pass: false,
    newPass: false,
  });

  // Controlled inputs for current/new password fields
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  // Submit handler: validates inputs and sends PATCH to update password
  async function handleSubmit() {
    try {
      const current = currentPassword.trim();
      const next = newPassword.trim();

      // Basic validation: both fields are required
      if (!current || !next) {
        return showToast({ message: 'هر دو فیلد رمز لازم است', bg: 'bg-red-200' });
      }

      // API request to update the password on the server
      const res = await callApi().patch('/me', {
        currentPassword,
        newPassword,
      });

      // Success path: inform user and clear inputs
      if (res.status === 200) {
        showToast({ message: 'رمز شما با موفقیت تغییر یافت ✅', bg: 'bg-green-200' });
        setCurrentPassword('');
        setNewPassword('');
        return;
      }

      // Fallback if status isn't 200
      showToast({ message: 'خطا در تغییر رمز', bg: 'bg-red-200' });
    } catch (error) {
      // Error mapping for server-side validation and common cases
      const err = error as AxiosError<ApiError>;
      const payload = err.response?.data.data;
      console.log(err);

      // Server validation errors (422): show each message
      if (err.response?.status === 422) {
        if (Array.isArray(payload)) {
          payload.forEach(({ message }) => {
            return showToast({ message: message, bg: 'bg-red-200' });
          });
        }
      }
      // Incorrect current password
      else if (err.response?.status === 400) {
        return showToast({ message: 'پسورد فعلی صحیح نمیباشد', bg: 'bg-red-200' });
      }
      // Generic error fallback
      else {
        return showToast({ message: err.message, bg: 'bg-red-200' });
      }
    }
  }

  return (
    <>
      {/* Section heading: Password change */}
      <div className="space-y-1">
        <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">تغییر رمز عبور</h4>
      </div>

      {/* Form fields: current password + new password (responsive two-column) */}
      <div className="flex lg:flex-row flex-col w-full lg:gap-10 gap-6">
        {/* Current password field with visibility toggle */}
        <Label className="flex lg:w-1/2 w-full flex-col items-start text-base text-foreground/80">
          پسورد فعلی
          <div className="relative w-full">
            {/* Toggle type between text/password based on state */}
            <Input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type={show.pass ? 'password' : 'text'} placeholder="پسورد فعلی حساب شما" className="md:text-sm md:placeholder:text-sm" />
            {/* Eye icon button to toggle visibility */}
            <div onClick={() => setShow((prev) => ({ ...prev, pass: !prev.pass }))}>
              {show.pass === false && <IoEye className="absolute text-foreground/60 text-xl top-1/2 -translate-y-1/2 left-0 ml-3 cursor-pointer" />}
              {show.pass === true && <IoEyeOff className="absolute text-foreground/60 text-xl top-1/2 -translate-y-1/2 left-0 ml-3 cursor-pointer" />}
            </div>
          </div>
          {/* Optional helper link for forgotten password flow */}
          <Link className="text-sm font-light text-foreground/90" href="">
            رمز عبور فعلی رو فراموش کردی؟
          </Link>
        </Label>

        {/* New password field with visibility toggle */}
        <Label className="flex lg:w-1/2 w-full flex-col items-start text-base text-foreground/80">
          پسورد جدید
          <div className="relative w-full">
            {/* Toggle type between text/password based on state */}
            <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type={show.newPass ? 'password' : 'text'} placeholder="پسورد جدید حساب شما" className="md:text-sm md:placeholder:text-sm" />
            {/* Eye icon button to toggle visibility */}
            <div onClick={() => setShow((prev) => ({ ...prev, newPass: !prev.newPass }))}>
              {show.newPass === false && <IoEye className="absolute text-foreground/60 text-xl top-1/2 -translate-y-1/2 left-0 ml-3 cursor-pointer" />}
              {show.newPass === true && <IoEyeOff className="absolute text-foreground/60 text-xl top-1/2 -translate-y-1/2 left-0 ml-3 cursor-pointer" />}
            </div>
          </div>
        </Label>
      </div>

      {/* Submit button: disabled when both fields are empty */}
      <div className="self-center">
        <Button disabled={!currentPassword && !newPassword} onClick={handleSubmit} className="cursor-pointer text-lg py-6">
          ثبت تغییرات
        </Button>
      </div>
    </>
  );
}

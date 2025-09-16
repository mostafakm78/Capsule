'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useState } from 'react';
import { MdOutlineCameraAlt } from 'react-icons/md';
import BirthDateInputs from './BirthDateInput';
import { useAppSelector } from '@/app/hooks/hook';

export default function UserAccInfo() {
  const [preview, setPreview] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.user);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="space-y-1">
        <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">اطلاعات حساب شما</h4>
        <p className="text-foreground/80">در این قسمت میتونین اطلاعات حساب خودتون رو مشخص کنین.</p>
      </div>
      <div className="flex lg:flex-row flex-col-reverse w-full items-center gap-10">
        <div className="lg:w-1/2 w-full flex flex-col gap-4">
          <Label className="flex flex-col items-start text-base text-foreground/80">
            نام و نام‌خانوادگی شما
            <Input type="text" defaultValue={user?.name ?? ''} placeholder="نام کامل شما" className="md:text-sm md:placeholder:text-sm" />
          </Label>
          <Label className="flex flex-col items-start text-base text-foreground/80">
            ایمیل شما
            <Input type="text" defaultValue={user?.email ?? ''} placeholder="google@gmail.com" className="md:text-sm md:placeholder:text-sm" />
          </Label>
        </div>
        <div className="flex flex-col items-center gap-2 w-1/2">
          <span className="text-base text-foreground/80 font-medium">پروفایل شما</span>
          <Label className={`relative flex flex-col w-[150px] bg-background h-[150px] items-center justify-center border border-primary cursor-pointer ${preview ? 'p-0' : 'p-4'} rounded-full text-base text-foreground/80 overflow-hidden`}>
            <span className={`text-lg ${preview ? 'hidden' : ''}`}>انتخاب عکس</span>
            <MdOutlineCameraAlt className={`text-4xl ${preview ? 'hidden' : ''}`} />
            {preview && (
              <div className="relative w-full h-full">
                <Image src={preview} alt="Preview" fill className="object-cover rounded-full" />
              </div>
            )}
            <Input onChange={handleFileChange} type="file" className="hidden" />
          </Label>
        </div>
      </div>
      <div className="space-y-1">
        <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">اطلاعات فردی</h4>
      </div>
      <div className="flex flex-col w-full items-center gap-10">
        <div className="flex lg:flex-row flex-col w-full gap-10">
          <Label className="flex lg:w-1/2 w-full flex-col items-start text-base text-foreground/80">
            تاریخ تولد
            <BirthDateInputs />
          </Label>
          <Label className="flex lg:w-1/2 w-full flex-col items-start text-base text-foreground/80">
            تحصیلات
            <Input type="text" placeholder="تحصیلات شما" className="md:text-sm md:placeholder:text-sm" />
          </Label>
        </div>
        <Label className="flex w-full flex-col lg:items-center items-start text-base text-foreground/80">
          درباره من
          <Textarea placeholder="توضیحی مختصر درباره خودتون و علاقه‌مندی هاتون" className="md:text-sm md:placeholder:text-sm lg:w-8/12 w-full h-[200px]" />
        </Label>
      </div>
      <div className="self-center">
        <Button className="cursor-pointer">ثبت تغییرات</Button>
      </div>
    </>
  );
}

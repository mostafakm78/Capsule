'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CalendarHijri } from './TimePicker';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import jalaali from 'jalaali-js';
import Image from 'next/image';

export default function CapsuleStatus() {

  const initialData = useSelector((state: RootState) => state.editOrcreate.capsule);

  const [selected, setSelected] = useState<string>('');
  const [privateType, setPrivateType] = useState<string>('');
  const capsuleDate = useSelector((state: RootState) => state.editOrcreate.capsule);

//   const formattedDate =
//     capsuleDate && privateType === 'خصوصی زمان‌دار'
//       ? (() => {
//           const date = new Date(capsuleDate.access?.unlockAt);
//           const { jy, jm, jd } = jalaali.toJalaali(date);
//           const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

//           return `${jd} ${months[jm - 1]} ${jy}`;
//         })()
//       : '';

  return (
    <div className="flex w-full p-8 h-full flex-col">
      <div className="flex flex-col min-h-screen justify-between gap-6">
        {/* عنوان */}
        <div>
          <div className="space-y-1">
            <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">وضعیت کپسول</h4>
            <p className="text-foreground/80">
              در این قسمت میتونین مشخص کنین که کپسول شما عمومی باشه یا خصوصی.
              <span className="text-foreground/60 underline underline-offset-4"> کپسول‌های زمان‌دار به‌صورت خصوصی ذخیره می‌شوند.</span>
            </p>
          </div>

          {/* انتخاب اصلی */}
          <RadioGroup
            dir="rtl"
            value={selected}
            onValueChange={(value) => {
              setSelected(value);
              setPrivateType('');
            }}
            className="flex flex-wrap items-center justify-center gap-4 mt-16"
          >
            {['کپسول عمومی', 'کپسول خصوصی'].map((item) => (
              <Label
                key={item}
                className={`cursor-pointer rounded-full px-6 py-3 border text-lg transition-colors flex justify-center
                ${selected === item ? 'bg-primary text-primary-foreground border-primary' : 'border-foreground/20 hover:border-primary'}`}
              >
                <RadioGroupItem value={item} className="hidden" />
                {item}
              </Label>
            ))}
          </RadioGroup>

          {/* زیرمجموعه خصوصی */}
          {selected === 'کپسول خصوصی' && (
            <RadioGroup dir="rtl" value={privateType} onValueChange={(value) => setPrivateType(value)} className="flex flex-wrap items-center justify-center gap-4 mt-6">
              {['خصوصی زمان‌دار', 'خصوصی بدون زمان'].map((item) => (
                <Label
                  key={item}
                  className={`cursor-pointer rounded-full px-6 py-2 border text-base transition-colors flex justify-center
                  ${privateType === item ? 'bg-secondary text-secondary-foreground border-secondary' : 'border-foreground/20 hover:border-secondary'}`}
                >
                  <RadioGroupItem value={item} className="hidden" />
                  {item}
                </Label>
              ))}
            </RadioGroup>
          )}

          {/* تقویم شمسی فقط وقتی زمان‌دار انتخاب شده */}
          {privateType === 'خصوصی زمان‌دار' && (
            <div className="flex justify-center mt-6">
              <CalendarHijri />
            </div>
          )}
        </div>

        <div>
          {/* نمایش خلاصه فقط وقتی خصوصی زمان‌دار یا عمومی */}
          <div className="flex gap-2 w-full p-6 border border-foreground/20 rounded-lg">
            <div className="space-x-4">
              <span className="text-foreground/90 font-bold">نوع کپسول :</span>
              {/* <span className="text-foreground/70 font-light">
                {selected} {selected === 'کپسول خصوصی' ? '/' : ''} {selected === 'کپسول خصوصی' ? privateType : ''} {privateType === 'خصوصی زمان‌دار' && formattedDate ? `/ زمان کپسول : ${formattedDate}` : ''}
              </span> */}
            </div>
          </div>

          {/* دکمه ثبت */}
          <div className="w-full flex justify-center mt-8">
            <Button className="cursor-pointer w-1/3 py-6 text-lg" disabled={!selected || (selected === 'کپسول خصوصی' && !privateType)}>
              ثبت
            </Button>
          </div>
          <div className="flex flex-col gap-4 lg:p-4 lg:px-6">
            <span className="text-foreground text-xl pr-4 relative font-bold after:content-[''] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2">توجه</span>
            <div className="flex gap-2 items-center py-4 px-2 border border-foreground/20 rounded-lg w-full">
              <Image src="/images/cartoon-question.png" alt="question" width={100} height={100} />
              <div className="flex flex-col gap-1">
                <p className="lg:text-lg text-base font-bold text-foreground/80">شما میتونین بعد از ساخت کپسول حالت اون رو از خصوصی به عمومی و بالعکس تغییر بدین ، اما کپسول های خصوصی زمان دار تا فرارسیدن تاریخ مدنظر در دسترس نمیباشند.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

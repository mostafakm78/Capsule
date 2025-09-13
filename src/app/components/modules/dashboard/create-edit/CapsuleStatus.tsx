'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CalendarHijri } from './TimePicker';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import jalaali from 'jalaali-js';
import Image from 'next/image';
import { useAppDispatch } from '@/app/hooks/hook';
import { setCapsule } from '@/app/store/editOrcreateSlice';
import { Lock, Visibility } from '@/lib/types';
import useCustomToast from '@/app/hooks/useCustomToast';

export default function CapsuleStatus() {
  const dispatch = useAppDispatch();
  const capsule = useSelector((state: RootState) => state.editOrcreate);
  const [selected, setSelected] = useState<Visibility | ''>('');
  const [privateType, setPrivateType] = useState<Lock | ''>('');
  const showToast = useCustomToast();

  useEffect(() => {
    if (capsule.mode === 'edit' && capsule.capsule) {
      const v = capsule.capsule.access?.visibility as Visibility | undefined;
      const l = capsule.capsule.access?.lock as Lock | undefined;
      setSelected(v ?? '');
      setPrivateType(v === 'private' ? l ?? '' : '');
    }
  }, [capsule]);

  const formattedDate =
    capsule?.capsule?.access?.unlockAt && privateType === 'timed'
      ? (() => {
          const date = new Date(capsule.capsule.access?.unlockAt);
          const { jy, jm, jd } = jalaali.toJalaali(date);
          const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

          return `${jd} ${months[jm - 1]} ${jy}`;
        })()
      : '';

  const visOptions = [
    { id: 'vis-public', value: 'public' as const, label: 'کپسول عمومی' },
    { id: 'vis-private', value: 'private' as const, label: 'کپسول خصوصی' },
  ] as const;

  const lockOptions = [
    { id: 'lock-timed', value: 'timed' as const, label: 'خصوصی زمان‌دار' },
    { id: 'lock-none', value: 'none' as const, label: 'خصوصی بدون زمان' },
  ] as const;

  const handleSubmit = () => {
    if (!selected) {
      return showToast({ message: 'وارد کردن نوع کپسول اجباری میباشد ❌', bg: 'bg-red-200' });
    }
    if (selected === 'private' && !privateType) {
      return showToast({ message: 'وارد کردن حالت کپسول خصوصی اجباری میباشد ❌', bg: 'bg-red-200' });
    }
    if (selected === 'private' && privateType && !capsule.capsule?.access?.unlockAt) {
      return showToast({ message: 'وارد کردن زمان کپسول در کپسول خصوصی زمان دار اجباری میباشد ❌', bg: 'bg-red-200' });
    }
    showToast('تنظیمات کپسول شما ثبت شد ✅');
    dispatch(
      setCapsule({
        ...capsule.capsule,
      })
    );
  };

  return (
    <div className="flex w-full p-8 h-full flex-col">
      <div className="flex flex-col min-h-screen justify-between gap-6">
        {/* عنوان */}
        <div>
          <div className="space-y-1">
            <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">وضعیت کپسول</h4>
            <p className="text-foreground/80">
              در این قسمت می‌تونین مشخص کنین که کپسول شما عمومی باشه یا خصوصی.
              <span className="text-foreground/60 underline underline-offset-4"> کپسول‌های زمان‌دار به‌صورت خصوصی ذخیره می‌شوند.</span>
            </p>
          </div>

          {/* انتخاب اصلی (public/private) */}
          <RadioGroup
            dir="rtl"
            value={selected}
            onValueChange={(val: Visibility) => {
              setSelected(val);
              // اگر public شد، حالت خصوصی رو پاک کن
              const nextAccess = val === 'public' ? { visibility: 'public' as const, lock: 'none' as const, unlockAt: undefined } : { visibility: 'private' as const, lock: (capsule.capsule?.access?.lock ?? 'none') as Lock, unlockAt: capsule.capsule?.access?.unlockAt };

              // reset زیرمجموعه وقتی سوئیچ می‌کنیم
              setPrivateType(val === 'private' ? (nextAccess.lock as Lock) : '');

              dispatch(
                setCapsule({
                  ...capsule.capsule,
                  access: {
                    ...(capsule.capsule?.access ?? {}),
                    ...nextAccess,
                  },
                })
              );
            }}
            className="flex flex-wrap items-center justify-center gap-4 mt-16"
          >
            {visOptions.map((opt) => (
              <div key={opt.id} className="inline-flex">
                <RadioGroupItem id={opt.id} value={opt.value} className="sr-only" />
                <Label
                  htmlFor={opt.id}
                  className={`cursor-pointer rounded-full px-6 py-3 border text-lg transition-colors flex justify-center
                    ${selected === opt.value ? 'bg-primary text-primary-foreground border-primary' : 'border-foreground/20 hover:border-primary'}`}
                >
                  {opt.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* زیرمجموعه خصوصی (timed/none) */}
          {selected === 'private' && (
            <RadioGroup
              dir="rtl"
              value={privateType}
              onValueChange={(val: Lock) => {
                setPrivateType(val);
                dispatch(
                  setCapsule({
                    ...capsule.capsule,
                    access: {
                      ...(capsule.capsule?.access ?? {}),
                      visibility: 'private',
                      lock: val,
                      ...(val === 'none' ? { unlockAt: undefined } : {}),
                    },
                  })
                );
              }}
              className="flex flex-wrap items-center justify-center gap-4 mt-6"
            >
              {lockOptions.map((opt) => (
                <div key={opt.id} className="inline-flex">
                  <RadioGroupItem id={opt.id} value={opt.value} className="sr-only" />
                  <Label
                    htmlFor={opt.id}
                    className={`cursor-pointer rounded-full px-6 py-2 border text-base transition-colors flex justify-center
                      ${privateType === opt.value ? 'bg-secondary text-secondary-foreground border-secondary' : 'border-foreground/20 hover:border-secondary'}`}
                  >
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {/* تقویم شمسی فقط وقتی زمان‌دار */}
          {selected === 'private' && privateType === 'timed' && (
            <div className="flex justify-center mt-6">
              <CalendarHijri />
            </div>
          )}
        </div>

        <div>
          <div className="flex gap-2 w-full p-6 border border-foreground/20 rounded-lg">
            <div className="space-x-4">
              <span className="text-foreground/90 font-bold">نوع کپسول :</span>
              <span className="text-foreground/70 font-light">
                {/* نمایش فارسی از روی state انگلیسی */}
                {selected === 'public' ? 'کپسول عمومی' : selected === 'private' ? 'کپسول خصوصی' : ''}
                {selected === 'private' ? ' / ' : ''}
                {selected === 'private' ? (privateType === 'timed' ? 'خصوصی زمان‌دار' : privateType === 'none' ? 'خصوصی بدون زمان' : '') : ''}
                {privateType === 'timed' && formattedDate ? ` / زمان کپسول : ${formattedDate}` : ''}
              </span>
            </div>
          </div>

          {/* دکمه ثبت */}
          <div className="w-full flex justify-center mt-8">
            <Button onClick={handleSubmit} className="cursor-pointer w-1/3 py-6 text-lg" disabled={!selected || (selected === 'private' && !privateType)}>
              ثبت
            </Button>
          </div>

          <div className="flex flex-col gap-4 lg:p-4 lg:px-6">
            <span className="text-foreground text-xl pr-4 relative font-bold after:content-[''] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2">توجه</span>
            <div className="flex gap-2 items-center py-4 px-2 border border-foreground/20 rounded-lg w-full">
              <Image src="/images/cartoon-question.png" alt="question" width={100} height={100} />
              <div className="flex flex-col gap-1">
                <p className="lg:text-lg text-base font-bold text-foreground/80">می‌تونید بعد از ساخت کپسول حالتش رو تغییر بدین؛ اما کپسول‌های خصوصیِ زمان‌دار تا زمان تعیین‌شده در دسترس نیستند.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

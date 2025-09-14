'use client';

import { ClockLoader } from 'react-spinners';
import jalaali from 'jalaali-js';
import { useMemo } from 'react';

export default function IsTimePassed({ time }: { time: string }) {
  const dateLabel = useMemo(() => {
    const d = new Date(time);
    if (isNaN(d.getTime())) return 'تاریخ نامعتبر';

    const { jy, jm, jd } = jalaali.toJalaali(d);

    const persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    const persianWeekDays = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];

    const persianDayOfWeekIndex = (d.getDay() + 6) % 7;

    const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const toFa = (s: string | number) => String(s).replace(/\d/g, (n) => faDigits[Number(n)]);

    return `${persianWeekDays[persianDayOfWeekIndex]}، ${toFa(jd)} ${persianMonths[jm - 1]} ${toFa(jy)}`;
  }, [time]);

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-full">
      <ClockLoader size={40} speedMultiplier={0.3} />
      <span className="text-lg font-kalmeh md:text-xl">زمان باز شدن کپسول نرسیده!</span>
      <div className="flex items-center gap-2">
        <span>زمان باز شدن در تاریخ :</span>
        <span className="text-base" suppressHydrationWarning>
          {dateLabel}
        </span>
      </div>
    </div>
  );
}

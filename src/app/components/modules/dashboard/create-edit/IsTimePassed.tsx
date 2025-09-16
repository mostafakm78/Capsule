'use client';

import { ClockLoader } from 'react-spinners';
import jalaali from 'jalaali-js';
import { useEffect, useMemo, useState } from 'react';
import { Progress } from '@/components/ui/progress';

export default function IsTimePassed({ time, createdAt }: { time: string; createdAt: string }) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const toFaDateLabel = (iso: string) => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return 'تاریخ نامعتبر';
    const { jy, jm, jd } = jalaali.toJalaali(d);
    const persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    const persianWeekDays = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    const persianDayOfWeekIndex = (d.getDay() + 6) % 7;
    const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const toFa = (s: string | number) => String(s).replace(/\d/g, (n) => faDigits[Number(n)]);
    return `${persianWeekDays[persianDayOfWeekIndex]}، ${toFa(jd)} ${persianMonths[jm - 1]} ${toFa(jy)}`;
  };

  const openDateLabel = useMemo(() => toFaDateLabel(time), [time]);
  const createdDateLabel = useMemo(() => toFaDateLabel(createdAt), [createdAt]);

  const { progress, remainingMs, hasPassed, invalid } = useMemo(() => {
    const start = new Date(createdAt).getTime();
    const target = new Date(time).getTime();

    if (isNaN(start) || isNaN(target)) {
      return { progress: 0, remainingMs: NaN, hasPassed: false, invalid: true };
    }

    const duration = target - start;
    const remaining = Math.max(target - now, 0);
    const passed = Math.max(now - start, 0);

    if (duration <= 0) {
      return {
        progress: now >= target ? 100 : 0,
        remainingMs: remaining,
        hasPassed: now >= target,
        invalid: false,
      };
    }

    const rawPct = Math.min(100, Math.max(0, (Math.min(passed, duration) / duration) * 100));
    const displayPct = rawPct > 0 && rawPct < 1 ? 1 : rawPct;

    return {
      progress: displayPct,
      remainingMs: remaining,
      hasPassed: now >= target,
      invalid: false,
    };
  }, [now, time, createdAt]);

  const countdownLabel = useMemo(() => {
    if (Number.isNaN(remainingMs)) return '—';
    const totalSeconds = Math.floor(remainingMs / 1000);
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const toFa = (n: number) => String(n).replace(/\d/g, (ch) => faDigits[Number(ch)]);
    const parts: string[] = [];
    if (d > 0) parts.push(`${toFa(d)} روز`);
    parts.push(`${toFa(h)} ساعت`, `${toFa(m)} دقیقه`, `${toFa(s)} ثانیه`);
    return parts.join(' و ');
  }, [remainingMs]);

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-full">
      <ClockLoader size={40} speedMultiplier={0.3} />

      <span className="text-lg font-kalmeh md:text-xl">{invalid ? 'تاریخ نامعتبر' : hasPassed ? 'زمان باز شدن رسیده!' : 'زمان باز شدن کپسول نرسیده!'}</span>

      {!invalid && (
        <>
          <div className="flex items-center gap-2">
            <span>تاریخ ساخت کپسول:</span>
            <span className="text-base" suppressHydrationWarning>
              {createdDateLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>زمان باز شدن در تاریخ:</span>
            <span className="text-base" suppressHydrationWarning>
              {openDateLabel}
            </span>
          </div>

          {!hasPassed && (
            <div className="flex items-center gap-2">
              <span>زمان باقی‌مانده:</span>
              <span className="font-medium text-sm" suppressHydrationWarning>
                {countdownLabel}
              </span>
            </div>
          )}

          <div className="w-1/3 max-w-md">
            <Progress value={progress} aria-label="پیشرفت از زمان ساخت تا باز شدن" />
            <div className="mt-1 text-xs text-muted-foreground" suppressHydrationWarning>
              {Math.round(progress)}٪ سپری‌شده از زمان ساخت
            </div>
          </div>
        </>
      )}
    </div>
  );
}

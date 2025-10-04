'use client';

import { ClockLoader } from 'react-spinners';
import jalaali from 'jalaali-js';
import { useEffect, useMemo, useState } from 'react';
import { Progress } from '@/components/ui/progress';

export default function IsTimePassed({ time, createdAt }: { time: string; createdAt: string }) {
  // Live "now" timestamp (ms). Updated every second to drive countdown and progress.
  const [now, setNow] = useState<number>(() => Date.now());

  // Tick "now" every 1000ms; clean up interval on unmount.
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Convert ISO date string to a Persian (Jalali) human-readable label with Persian digits.
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

  // Memoized formatted labels for the open date and creation date.
  const openDateLabel = useMemo(() => toFaDateLabel(time), [time]);
  const createdDateLabel = useMemo(() => toFaDateLabel(createdAt), [createdAt]);

  // Compute progress (0–100), remaining time (ms), and validity flags.
  // - progress: percentage elapsed from creation to unlock time
  // - remainingMs: ms remaining until unlock (clamped to 0)
  // - hasPassed: whether the unlock time is in the past relative to "now"
  // - invalid: whether input dates are invalid
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
    // Guarantee a visible sliver on the progress bar for very small values.
    const displayPct = rawPct > 0 && rawPct < 1 ? 1 : rawPct;

    return {
      progress: displayPct,
      remainingMs: remaining,
      hasPassed: now >= target,
      invalid: false,
    };
  }, [now, time, createdAt]);

  // Human-readable countdown string in Persian (days/hours/minutes/seconds).
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
    /* Semantic wrapper for the time-lock status widget */
    <section className="flex flex-col gap-3 items-center justify-center h-full">
      {/* Animated loader for visual feedback while counting down */}
      <ClockLoader size={40} speedMultiplier={0.3} color="oklch(0.75 0.19 270)" />

      {/* Status headline: invalid input, reached unlock time, or still waiting */}
      <span className="text-lg font-kalmeh md:text-xl">{invalid ? 'تاریخ نامعتبر' : hasPassed ? 'زمان باز شدن رسیده!' : 'زمان باز شدن کپسول نرسیده!'}</span>

      {/* Details panel: dates, countdown (if applicable), and progress bar */}
      {!invalid && (
        <>
          {/* Capsule creation date (formatted in fa-IR / Jalali) */}
          <div className="flex items-center gap-2">
            <span>تاریخ ساخت کپسول:</span>
            <span className="text-base" suppressHydrationWarning>
              {createdDateLabel}
            </span>
          </div>

          {/* Unlock date (formatted in fa-IR / Jalali) */}
          <div className="flex items-center gap-2">
            <span>زمان باز شدن در تاریخ:</span>
            <span className="text-base" suppressHydrationWarning>
              {openDateLabel}
            </span>
          </div>

          {/* Live countdown only while unlock time is in the future */}
          {!hasPassed && (
            <div className="flex items-center gap-2">
              <span>زمان باقی‌مانده:</span>
              <span className="font-medium text-sm" suppressHydrationWarning>
                {countdownLabel}
              </span>
            </div>
          )}

          {/* Linear progress from creation to unlock time with a numeric indicator */}
          <div className="w-1/3 max-w-md">
            <Progress value={progress} aria-label="پیشرفت از زمان ساخت تا باز شدن" />
            <div className="mt-1 text-xs text-muted-foreground" suppressHydrationWarning>
              {Math.round(progress)}٪ سپری‌شده از زمان ساخت
            </div>
          </div>
        </>
      )}
    </section>
  );
}

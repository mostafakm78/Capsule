'use client'; // Marks this component as a Client Component for Next.js (enables hooks, browser APIs)

import { useEffect, useState } from 'react';
import * as jalaali from 'jalaali-js';

// Mapping of ASCII digits to Persian digits for display
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

// Convert any ASCII digits in a string to Persian digits (UI-facing)
const toPersianDigits = (input: string) => input.replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
// Convert Persian digits in a string to ASCII digits (logic/validation)
const toEnglishDigits = (input: string) => input.replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)));

// Get number of days for a given Jalaali (Persian) month/year
const daysInMonth = (month: number, year: number) => jalaali.jalaaliMonthLength(year, month);

// Component props interface
interface Props {
  birthday: string | Date | '';
  setBirthday: (val: string) => void; // Callback to update parent component's birthday value
}

// Controlled inputs for a Jalaali (Persian) birth date with conversion to ISO (Gregorian)
export default function BirthDateInputs({ birthday, setBirthday }: Props) {
  // Local state for day/month/year (stored as ASCII digits; rendered as Persian)
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Allowed year range (Jalaali)
  const MIN_YEAR = 1250;
  const MAX_YEAR = 1404;

  // Sync incoming `birthday` prop into local day/month/year state (supports Date or ISO string)
  useEffect(() => {
    if (!birthday) {
      setDay('');
      setMonth('');
      setYear('');
      return;
    }

    try {
      let dt: Date;
      if (birthday instanceof Date) dt = birthday;
      else dt = new Date(birthday);

      // If the date parses correctly, convert to Jalaali parts and populate state
      if (!isNaN(dt.getTime())) {
        const { jy, jm, jd } = jalaali.toJalaali(dt);
        setYear(String(jy));
        setMonth(String(jm));
        setDay(String(jd));
      }
    } catch {
      // Reset on parse/convert failure
      setDay('');
      setMonth('');
      setYear('');
    }
  }, [birthday]);

  // Helper: strip non-digits after normalizing to ASCII digits
  const onlyNumbers = (val: string) => toEnglishDigits(val).replace(/\D/g, '');

  // Push the combined Jalaali date up to parent as an ISO (Gregorian) string (UTC @ midnight)
  const updateBirthday = (d: number, m: number, y: number) => {
    try {
      const { gy, gm, gd } = jalaali.toGregorian(y, m, d);
      const isoWithZ = new Date(Date.UTC(gy, gm - 1, gd)).toISOString().replace('.000', '');
      setBirthday(isoWithZ); // Update parent only; local state remains Jalaali-formatted
    } catch (err) {
      console.error('convert jalaali->gregorian failed', err);
    }
  };

  // Day input change: clamp to [1, daysInMonth], update parent if all parts present
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = onlyNumbers(e.target.value).slice(0, 2);
    let val = Number(v || 0);
    if (month && year) {
      const maxDays = daysInMonth(Number(month), Number(year));
      if (val > maxDays) val = maxDays;
    }
    if (val < 1) val = 1;
    setDay(val ? val.toString() : '');
    if (val && month && year) updateBirthday(val, Number(month), Number(year));
  };

  // Month input change: clamp to [1, 12], adjust day if it exceeds month length, update parent if complete
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = onlyNumbers(e.target.value).slice(0, 2);
    let val = Number(v || 0);
    if (val < 1) val = 1;
    if (val > 12) val = 12;
    setMonth(val ? val.toString() : '');
    if (day && val && year) {
      const maxDays = daysInMonth(val, Number(year));
      if (Number(day) > maxDays) setDay(maxDays.toString());
      updateBirthday(Number(day), val, Number(year));
    }
  };

  // Year input change: accept up to 4 digits, validate range when full; adjust day if needed; update parent if complete
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = onlyNumbers(e.target.value).slice(0, 4);
    setYear(v);
    if (v.length === 4 && day && month) {
      const y = Number(v);
      if (y >= MIN_YEAR && y <= MAX_YEAR) {
        const maxDays = daysInMonth(Number(month), y);
        if (Number(day) > maxDays) setDay(maxDays.toString());
        updateBirthday(Number(day), Number(month), y);
      }
    }
  };

  // On blur: clear invalid year values outside the allowed range
  const handleYearBlur = () => {
    if (!year) return;
    const y = Number(year);
    if (isNaN(y) || y < MIN_YEAR || y > MAX_YEAR) setYear('');
  };

  return (
    // Semantic wrapper for the three birthdate inputs (keeps existing styles intact)
    <section className="flex w-full items-center justify-center gap-2 border border-primary rounded-lg p-2">
      {/* Day input (numeric, shows Persian digits but stores ASCII internally) */}
      <input type="text" inputMode="numeric" value={day ? toPersianDigits(day) : ''} onChange={handleDayChange} placeholder="روز" className="w-full text-center bg-transparent outline-none" />
      <span>/</span>
      {/* Month input */}
      <input type="text" inputMode="numeric" value={month ? toPersianDigits(month) : ''} onChange={handleMonthChange} placeholder="ماه" className="w-full text-center bg-transparent outline-none" />
      <span>/</span>
      {/* Year input with range validation on blur */}
      <input type="text" inputMode="numeric" value={year ? toPersianDigits(year) : ''} onChange={handleYearChange} onBlur={handleYearBlur} placeholder="سال" className="w-full text-center bg-transparent outline-none" />
    </section>
  );
}

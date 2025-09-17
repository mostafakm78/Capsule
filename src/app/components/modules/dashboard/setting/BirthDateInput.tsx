'use client';
import { useEffect, useState } from 'react';
import * as jalaali from 'jalaali-js';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

const toPersianDigits = (input: string) => input.replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
const toEnglishDigits = (input: string) => input.replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)));

const daysInMonth = (month: number, year: number) => jalaali.jalaaliMonthLength(year, month);

interface Props {
  birthday: string | Date | '';
  setBirthday: (val: string) => void; // prop کامپوننت پدر
}

export default function BirthDateInputs({ birthday, setBirthday }: Props) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const MIN_YEAR = 1250;
  const MAX_YEAR = 1404;

  // تبدیل prop به state داخلی
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

      if (!isNaN(dt.getTime())) {
        const { jy, jm, jd } = jalaali.toJalaali(dt);
        setYear(String(jy));
        setMonth(String(jm));
        setDay(String(jd));
      }
    } catch {
      setDay('');
      setMonth('');
      setYear('');
    }
  }, [birthday]);

  const onlyNumbers = (val: string) => toEnglishDigits(val).replace(/\D/g, '');

  const updateBirthday = (d: number, m: number, y: number) => {
    try {
      const { gy, gm, gd } = jalaali.toGregorian(y, m, d);
      const isoWithZ = new Date(Date.UTC(gy, gm - 1, gd)).toISOString().replace('.000', '');
      setBirthday(isoWithZ); // آپدیت فقط کامپوننت پدر
    } catch (err) {
      console.error('convert jalaali->gregorian failed', err);
    }
  };

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

  const handleYearBlur = () => {
    if (!year) return;
    const y = Number(year);
    if (isNaN(y) || y < MIN_YEAR || y > MAX_YEAR) setYear('');
  };

  return (
    <div className="flex w-full items-center justify-center gap-2 border border-primary rounded-lg p-2">
      <input type="text" inputMode="numeric" value={day ? toPersianDigits(day) : ''} onChange={handleDayChange} placeholder="روز" className="w-full text-center bg-transparent outline-none" />
      <span>/</span>
      <input type="text" inputMode="numeric" value={month ? toPersianDigits(month) : ''} onChange={handleMonthChange} placeholder="ماه" className="w-full text-center bg-transparent outline-none" />
      <span>/</span>
      <input type="text" inputMode="numeric" value={year ? toPersianDigits(year) : ''} onChange={handleYearChange} onBlur={handleYearBlur} placeholder="سال" className="w-full text-center bg-transparent outline-none" />
    </div>
  );
}

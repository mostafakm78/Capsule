'use client';
import { useState } from 'react';

// تابع برای بررسی کبیسه بودن
const isLeapYear = (year: number) => {
  const mod = year % 33;
  return [1, 5, 9, 13, 17, 22, 26, 30].includes(mod);
};

// تعداد روزهای هر ماه شمسی
const daysInMonth = (month: number, year: number) => {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  return isLeapYear(year) ? 30 : 29;
};

export default function BirthDateInputs() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // فقط عدد بگیره
  const onlyNumbers = (value: string) => value.replace(/\D/g, '');

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(onlyNumbers(e.target.value));
    if (month && year) {
      const maxDays = daysInMonth(Number(month), Number(year));
      if (value > maxDays) value = maxDays;
    }
    if (value < 1) value = 1;
    setDay(value ? value.toString() : '');
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(onlyNumbers(e.target.value));
    if (value < 1) value = 1;
    if (value > 12) value = 12;
    setMonth(value ? value.toString() : '');

    if (day && year) {
      const maxDays = daysInMonth(value, Number(year));
      if (Number(day) > maxDays) {
        setDay(maxDays.toString());
      }
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(onlyNumbers(e.target.value));
    if (value < 1250) value = 1320;
    if (value > 1404) value = 1404;
    setYear(value ? value.toString() : '');

    if (day && month) {
      const maxDays = daysInMonth(Number(month), value);
      if (Number(day) > maxDays) {
        setDay(maxDays.toString());
      }
    }
  };

  return (
    <div className="flex w-full items-center justify-center gap-2 border border-primary rounded-lg p-2">
      <input
        type="text"
        inputMode="numeric"
        value={day}
        onChange={handleDayChange}
        placeholder="روز"
        className="w-full text-center bg-transparent outline-none"
      />
      <span>/</span>
      <input type="text" inputMode="numeric" value={month} onChange={handleMonthChange} placeholder="ماه" className="w-full text-center bg-transparent outline-none" />
      <span>/</span>
      <input type="text" inputMode="numeric" value={year} onChange={handleYearChange} placeholder="سال" className="w-full text-center bg-transparent outline-none" />
    </div>
  );
}

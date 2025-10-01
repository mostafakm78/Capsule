'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
    setIsDark(!isDark);
  };

  return (
    <div aria-label="تم سایت" dir="ltr" className={cn('flex w-16 lg:h-8 h-7 p-1 rounded-md cursor-pointer transition-all duration-300', isDark ? 'bg-secondary' : 'bg-secondary', className)} onClick={toggleTheme} role="button" tabIndex={0}>
      <div className="flex justify-between items-center w-full">
        <div className={cn('flex justify-center items-center lg:w-6 w-5 lg:h-6 h-5 rounded-full transition-transform duration-300', isDark ? 'transform translate-x-0 bg-accent' : 'transform translate-x-8 bg-gray-200')}>
          {isDark ? <Moon className="w-4 h-4 text-white" strokeWidth={1.5} /> : <Sun className="w-4 h-4 text-gray-700" strokeWidth={1.5} />}
        </div>
        <div className={cn('flex justify-center items-center lg:w-6 w-5 lg:h-6 h-5 rounded-full transition-transform duration-300', isDark ? 'bg-transparent' : 'transform -translate-x-8')}>
          {isDark ? <Sun className="w-4 h-4 text-background" strokeWidth={1.5} /> : <Moon className="w-4 h-4 text-black" strokeWidth={1.5} />}
        </div>
      </div>
    </div>
  );
}

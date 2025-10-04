'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

/**
 * ThemeToggle
 * -----------
 * Purpose: A compact toggle for switching between light and dark themes.
 * State: Tracks `isDark` to reflect/drive the UI and the underlying theme.
 * Accessibility:
 *  - Uses role="switch" and aria-checked to expose binary toggle semantics.
 *  - Persian aria-label matches the site’s primary language.
 *  - Icons are decorative (aria-hidden), since the switch state is conveyed by aria-checked.
 * Semantics:
 *  - The wrapper acts as the interactive control; it’s focusable via tabIndex.
 *  - `dir="ltr"` limits any bidirectional quirks within this control only.
 */
export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme(); // next-themes hook for reading/applying the theme
  const [isDark, setIsDark] = useState(false); // local mirror of the theme for immediate UI feedback

  // Sync local state with the resolved theme mode (light/dark)
  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme); // tell next-themes to switch
    setIsDark(!isDark); // optimistic local update for snappy UI
  };

  return (
    <div aria-label="تم سایت" dir="ltr" className={cn('flex w-16 lg:h-8 h-7 p-1 rounded-md cursor-pointer transition-all duration-300', isDark ? 'bg-secondary' : 'bg-secondary', className)} onClick={toggleTheme} role="switch" aria-checked={isDark} tabIndex={0} title="تغییر تم">
      {/* Track: horizontal container showing two endpoints (dark/light) */}
      <div className="flex justify-between items-center w-full">
        {/* Knob (left position indicates dark).
            A11y: icons are purely visual; marked aria-hidden to avoid duplication. */}
        <div className={cn('flex justify-center items-center lg:w-6 w-5 lg:h-6 h-5 rounded-full transition-transform duration-300', isDark ? 'transform translate-x-0 bg-accent' : 'transform translate-x-8 bg-gray-200')}>
          {isDark ? <Moon className="w-4 h-4 text-white" strokeWidth={1.5} aria-hidden="true" /> : <Sun className="w-4 h-4 text-gray-700" strokeWidth={1.5} aria-hidden="true" />}
        </div>

        {/* Opposite endpoint indicator (visual only).
            A11y: decorative icons; aria-hidden to prevent extra announcements. */}
        <div className={cn('flex justify-center items-center lg:w-6 w-5 lg:h-6 h-5 rounded-full transition-transform duration-300', isDark ? 'bg-transparent' : 'transform -translate-x-8')}>
          {isDark ? <Sun className="w-4 h-4 text-background" strokeWidth={1.5} aria-hidden="true" /> : <Moon className="w-4 h-4 text-black" strokeWidth={1.5} aria-hidden="true" />}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

export function usePersistedCountdown(key: string) {
  // Remaining seconds left in the countdown
  const [left, setLeft] = useState(0);

  useEffect(() => {
    // Compute the remaining seconds based on persisted "until" timestamp
    const tick = () => {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      const untilMs = raw ? Number(raw) : 0;

      // Guard: if invalid number, reset to zero
      if (!Number.isFinite(untilMs)) {
        setLeft(0);
        return;
      }

      // Clamp to [0, ∞); round down to full seconds
      const diffSec = Math.max(0, Math.floor((untilMs - Date.now()) / 1000));
      setLeft(diffSec);
    };

    // Initialize immediately, then update every second
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [key]);

  // Start a new countdown for `seconds` and persist the target end time
  function start(seconds: number) {
    const untilMs = Date.now() + seconds * 1000;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, String(untilMs));
    }
    setLeft(seconds);
  }

  // Clear any persisted countdown and reset state
  function clear() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
    setLeft(0);
  }

  // Return countdown API: current seconds left + controls
  return { left, start, clear };
}

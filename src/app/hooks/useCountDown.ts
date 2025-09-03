import { useEffect, useState } from 'react';

export function usePersistedCountdown(key: string) {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const tick = () => {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      const untilMs = raw ? Number(raw) : 0;


      if (!Number.isFinite(untilMs)) {
        setLeft(0);
        return;
      }

      const diffSec = Math.max(0, Math.floor((untilMs - Date.now()) / 1000));
      setLeft(diffSec);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [key]);

  function start(seconds: number) {
    const untilMs = Date.now() + seconds * 1000;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, String(untilMs));
    }
    setLeft(seconds);
  }

  function clear() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
    setLeft(0);
  }

  return { left, start, clear };
}

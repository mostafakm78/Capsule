import { useEffect, useState } from 'react';

export default function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateSize = () => setIsMobile(window.innerWidth < 1024);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
}

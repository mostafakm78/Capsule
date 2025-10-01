'use client';

import { useEffect, useState } from 'react';
import AboutUsDesktop from './About-Us-Desktop';
import AboutUsMobile from './About-Us-Mobile';

export default function AboutUsWrapper() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 1024);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      {!isMobile && <AboutUsDesktop />}
      {isMobile && <AboutUsMobile />}
    </>
  );
}

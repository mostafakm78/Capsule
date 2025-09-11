'use client';

import { useRef, useEffect } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { usePathname } from 'next/navigation';

export default function ProgressBarLoading() {
  const ref = useRef<LoadingBarRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) {
      ref.current.continuousStart();
      setTimeout(() => ref.current?.complete(), 500);
    }
  }, [pathname]);

  return <LoadingBar color="#f39e60" height={3} ref={ref} />;
}

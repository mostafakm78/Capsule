'use client';

import { cn } from '@/lib/utils';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(({ children, className, ...props }, ref) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!buttonRef.current) return;


    gsap.fromTo(buttonRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'power2.out' });

    gsap.fromTo(
      buttonRef.current,
      { '--x': '100%' },
      {
        '--x': '-100%',
        duration: 2,
        repeat: -1,
        ease: 'linear',
      }
    );

    const handleMouseDown = () => {
      gsap.to(buttonRef.current, { scale: 0.95, duration: 0.15, ease: 'power2.out' });
    };
    const handleMouseUp = () => {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.15, ease: 'power2.out' });
    };

    const el = buttonRef.current;
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mouseleave', handleMouseUp);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mouseleave', handleMouseUp);
    };
  }, []);

  return (
    <button
      ref={(node) => {
        buttonRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }}
      className={cn(
        'relative cursor-pointer rounded-lg px-6 py-2 font-medium backdrop-blur-xl border border-secondary transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,var(--primary)/10%_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_var(--primary)/10%]',
        className
      )}
      style={{
        ['--x' as keyof React.CSSProperties]: '100%',
      }}
      {...props}
    >
      <span
        className="relative block size-full text-xl uppercase tracking-wide dark:font-light text-[rgb(255,255,255,90%)]"
        style={{
          maskImage: 'linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))',
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
          WebkitMask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
          backgroundImage: 'linear-gradient(-75deg,var(--primary)/10% calc(var(--x)+20%),var(--primary)/50% calc(var(--x)+25%),var(--primary)/10% calc(var(--x)+100%))',
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] p-px"
      />
    </button>
  );
});

ShinyButton.displayName = 'ShinyButton';

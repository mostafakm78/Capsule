'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import gsap from 'gsap';

type SpotlightProps = {
  active: boolean;
  onClose?: () => void;
  radius?: number;
  softness?: number;
  darkness?: number;
  anchorEl?: HTMLElement | null;
};

export default function Spotlight({ active, onClose, radius = 160, softness = 24, darkness = 0.85, anchorEl }: SpotlightProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    el.style.setProperty('--r', `${radius}px`);
    el.style.setProperty('--s', `${softness}px`);

    const setPos = (x: number, y: number) => {
      el.style.setProperty('--x', `${x}px`);
      el.style.setProperty('--y', `${y}px`);
    };

    if (active) {
      const rect = anchorEl?.getBoundingClientRect();
      if (rect) setPos(rect.left + rect.width / 2, rect.top + rect.height / 2);
      else setPos(window.innerWidth / 2, window.innerHeight / 2);
    }
  }, [active, radius, softness, anchorEl]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    if (active) {
      gsap.to(el, { opacity: 1, duration: 0.35, delay: 0.2, ease: 'power2.out' });
      document.documentElement.classList.add('overflow-hidden');
    } else {
      gsap.to(el, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      document.documentElement.classList.remove('overflow-hidden');
    }
    return () => {
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, [active]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !active) return;

    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const x = e.clientX;
      const y = e.clientY;
      rafRef.current = requestAnimationFrame(() => {
        el.style.setProperty('--x', `${x}px`);
        el.style.setProperty('--y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('keydown', onKey);
    };
  }, [active, onClose]);

  const style: CSSProperties = {
    background: `radial-gradient(circle at var(--x) var(--y),
      rgba(0,0,0,0) 0,
      rgba(0,0,0,0) calc(var(--r) - var(--s)),
      rgba(0,0,0,${darkness}) var(--r),
      rgba(0,0,0,${darkness}) 100%)`,
    willChange: 'opacity, background',
    transition: 'opacity 0.25s ease',
  };

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[40] opacity-0 pointer-events-none"
      style={style}
    />
  );
}

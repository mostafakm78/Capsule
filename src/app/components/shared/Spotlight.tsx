'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import gsap from 'gsap';

type SpotlightProps = {
  active: boolean; // Whether the overlay is visible/animated in
  onClose?: () => void; // Optional callback invoked on ESC key
  radius?: number; // Spotlight radius in pixels
  softness?: number; // Feathering size (edge softness) in pixels
  darkness?: number; // Backdrop opacity (0 - 1)
  anchorEl?: HTMLElement | null; // Optional element to center the spotlight on when opening
};

export default function Spotlight({ active, onClose, radius = 160, softness = 24, darkness = 0.85, anchorEl }: SpotlightProps) {
  const rootRef = useRef<HTMLDivElement>(null); // Ref to the overlay root element
  const rafRef = useRef<number | null>(null); // Stores requestAnimationFrame id for cursor tracking

  // Initialize CSS custom properties and set initial position of the spotlight
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Configure spotlight size/feathering via CSS variables
    el.style.setProperty('--r', `${radius}px`);
    el.style.setProperty('--s', `${softness}px`);

    // Helper to set the current center position of the spotlight
    const setPos = (x: number, y: number) => {
      el.style.setProperty('--x', `${x}px`);
      el.style.setProperty('--y', `${y}px`);
    };

    // On open, center spotlight on the anchor element (if provided) or viewport center
    if (active) {
      const rect = anchorEl?.getBoundingClientRect();
      if (rect) setPos(rect.left + rect.width / 2, rect.top + rect.height / 2);
      else setPos(window.innerWidth / 2, window.innerHeight / 2);
    }
  }, [active, radius, softness, anchorEl]);

  // Animate fade in/out with GSAP and lock/unlock page scrolling when active
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Ensure previous tweens are cancelled before starting a new one
    gsap.killTweensOf(el);

    if (active) {
      // Smoothly fade in the overlay; slight delay improves perceived polish
      gsap.to(el, { opacity: 1, duration: 0.35, delay: 0.2, ease: 'power2.out' });
      // Prevent background scroll while spotlight is active
      document.documentElement.classList.add('overflow-hidden');
    } else {
      // Fade out the overlay and re-enable scrolling
      gsap.to(el, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      document.documentElement.classList.remove('overflow-hidden');
    }

    // Cleanup: always remove scroll lock if component unmounts or deps change
    return () => {
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, [active]);

  // Interactive behavior: follow mouse pointer and close on ESC
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !active) return;

    // On mouse move, schedule CSS var updates via rAF for better performance
    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const x = e.clientX;
      const y = e.clientY;
      rafRef.current = requestAnimationFrame(() => {
        el.style.setProperty('--x', `${x}px`);
        el.style.setProperty('--y', `${y}px`);
      });
    };

    // Attach listeners: passive mousemove for smoother scrolling; keydown for ESC
    document.addEventListener('mousemove', onMove, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);

    // Cleanup listeners on deactivation/unmount
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('keydown', onKey);
    };
  }, [active, onClose]);

  // Inline style defines the radial-gradient "spotlight" using CSS variables
  const style: CSSProperties = {
    background: `radial-gradient(circle at var(--x) var(--y),
      rgba(0,0,0,0) 0,
      rgba(0,0,0,0) calc(var(--r) - var(--s)),
      rgba(0,0,0,${darkness}) var(--r),
      rgba(0,0,0,${darkness}) 100%)`,
    willChange: 'opacity, background', // Hint browser for upcoming changes
    transition: 'opacity 0.25s ease', // Fallback transition for quick opacity tweaks
  };

  return (
    // Decorative fullscreen overlay:
    // - aria-hidden="true": not exposed to assistive tech (no meaningful content)
    // - role="presentation": indicates purely presentational layer
    // - pointer-events-none: avoids intercepting clicks behind the overlay
    <div ref={rootRef} aria-hidden="true" role="presentation" className="fixed inset-0 z-[40] opacity-0 pointer-events-none" style={style} />
  );
}

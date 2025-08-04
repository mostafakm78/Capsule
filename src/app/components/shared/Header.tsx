'use client';

import Link from 'next/link';
import { ThemeToggle } from './Theme';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface Logo {
  bungee: { className: string };
}

export default function Header({ bungee }: Logo) {
  const timeline = gsap.timeline();

  useGSAP(() => {
    timeline
      .fromTo(
        '.header',
        {
          opacity: 0,
          y: -50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        }
      )
      .fromTo(
        '.brand',
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
        }
      )
      .fromTo(
        '.nav-link',
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          ease: 'power2.out',
          stagger: 0.1,
        }
      )
      .fromTo(
        '.theme',
        {
          opacity: 0,
          y: -50,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          stagger: 0.1,
        }
      )
      .to('.logo', {
        rotation: 10,
        repeat: 10,
        yoyo: true,
        duration: 0.1,
        ease: 'power1.inOut',
      });
  }, []);

  return (
    <header className="flex w-full bg-foreground/20 items-center justify-center">
      <nav className="header bg-accent py-6 w-10/12 px-10 mt-8 flex items-center shadow-lg justify-around rounded-xl gap-4">
        <div className="brand flex text-5xl text-muted items-center gap-2 justify-center px-12">
          <Image className="logo" src="/images/Logo.png" alt="Logo" width={50} height={50} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </div>
        <Link className="nav-link text-foreground text-lg" href="/">
          صفحه اصلی
        </Link>
        <Link className="nav-link text-foreground text-lg" href="">
          ورود به حساب
        </Link>
        <Link className="nav-link text-foreground text-lg" href="">
          کپسول های عمومی
        </Link>
        <Link className="nav-link text-foreground text-lg" href="">
          درباره کپسول
        </Link>
        <Link className="nav-link rounded-full ring-2 ring-foreground/50 text-lg" href="">
          <Image className="rounded-full" src="/images/default.png" alt="default profile photo" width={45} height={45} />
        </Link>
        <div className="theme">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

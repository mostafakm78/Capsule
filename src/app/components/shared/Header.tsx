'use client';

import Link from 'next/link';
import { ThemeToggle } from './Theme';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(useGSAP);

interface Logo {
  bungee: { className: string };
}

export default function Header({ bungee }: Logo) {
  const pathname = usePathname();
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
    <header className={`flex w-full ${pathname === '/' ? 'bg-foreground/20' : 'bg-background'} items-center justify-center  `}>
      <nav className="header w-11/12 z-10 lg:w-10/12 bg-accent py-6 px-10 mt-8 flex items-center shadow-lg justify-around rounded-xl gap-4">
        <div className="brand flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center lg:px-12">
          <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </div>
        <Link className="nav-link hidden md:block text-foreground text-lg" href="/">
          صفحه اصلی
        </Link>
        <Link className="nav-link hidden md:block text-foreground text-lg" href="/login">
          ورود به حساب
        </Link>
        <Link className="nav-link hidden md:block text-foreground text-lg" href="/capsules">
          کپسول های عمومی
        </Link>
        <Link className="nav-link hidden xl:block text-foreground text-lg" href="/about">
          درباره کپسول
        </Link>
        <Link className="nav-link hidden rounded-full ring-2 ring-foreground/50 text-lg" href="">
          <Image className="rounded-full" src="/images/default.png" alt="default profile photo" width={45} height={45} />
        </Link>
        <div className="theme">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

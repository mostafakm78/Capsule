'use client';

import { ThemeToggle } from './Theme';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import LoginButton from './LoginButton';
import HeaderLink from './HeaderLink';
import { LinkProps } from '@/lib/types';
import UserPopover from './UserPopover';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

gsap.registerPlugin(useGSAP);

interface Logo {
  bungee: { className: string };
}

const headerLinks: LinkProps[] = [
  { link: '/', title: 'صفحه اصلی' },
  { link: '/capsules', title: 'کپسول های عمومی' },
  { link: '/about-us', title: 'درباره ما' },
  { link: '/contact-us', title: 'ارتباط با ما' },
];

export default function Header({ bungee }: Logo) {
  const pathname = usePathname();
  const scope = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 480;

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo('.header-main', { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.3 })
        .fromTo('.brand-anim', { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 })
        .fromTo('.nav-link-anim', isMobile ? { opacity: 0, y: -50 } : { opacity: 0, x: -50 }, { opacity: 1, x: 0, y: 0, stagger: 0.1 });

      if (!isMobile) {
        tl.fromTo('.theme-anim', { opacity: 0, y: -50 }, { opacity: 1, y: 0, stagger: 0.1 });
      }

      tl.to('.logo', {
        rotation: 10,
        repeat: 10,
        yoyo: true,
        duration: 0.1,
        ease: 'power1.inOut',
      });

      // نکته‌ی مهم: پاک کردن ترنسفورم‌ها پس از پایان اینترو
      tl.add(() => {
        gsap.set(['.header-main', '.brand-anim', '.nav-link-anim', '.theme-anim'], { clearProps: 'transform' });
      });

      return () => tl.kill();
    },
    { scope }
  );

  return (
    <header
      ref={scope}
      className={`flex z-10 flex-col relative w-full ${
        pathname === '/' ? 'bg-foreground/20' : 'bg-background pb-10 after:bg-linear-to-b after:from-foreground/30 after:to-foreground/10 after:content-[""] after:w-full after:h-full after:absolute dark:after:opacity-45 after:opacity-80 after:z-[1] after:blur-2xl after:pointer-events-none'
      } items-center justify-center`}
    >
      <nav className="header-main relative w-11/12 z-10 lg:w-10/12 bg-background py-6 px-3 sm:px-6 md:px-10 mt-8 flex items-center shadow-lg justify-around rounded-xl gap-2 md:gap-4">
        <div className="nav-link-anim lg:hidden text-4xl cursor-pointer">
          <Sidebar />
        </div>

        <div className="brand-anim flex xl:text-5xl md:text-4xl text-2xl text-muted items-center gap-2 justify-center">
          <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="theme-anim hidden lg:block">
            <ThemeToggle />
          </div>
          <div className="nav-link-anim flex items-center">{user.email ? <UserPopover user={user}/> : <LoginButton />}</div>
        </div>
      </nav>

      <div className="sub-header z-[9] shadow-md lg:block hidden bg-accent w-8/12 py-5 rounded-b-xl">
        <div className="lg:flex items-center justify-center gap-10 hidden">
          {headerLinks.map((links, i) => (
            <div key={i} className="theme-anim hidden lg:block">
              <HeaderLink text={links.title} link={links.link} />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

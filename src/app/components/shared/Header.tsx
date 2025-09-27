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
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hook';
import { fetchMe } from '@/app/store/userThunk';
import { IoIosSearch } from 'react-icons/io';
import { Input } from '@/components/ui/input';
import Spotlight from './Spotlight';

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
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState(false);

  const scope = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapRef = useRef<HTMLDivElement>(null); // ← درست: بدون | null در جنریک

  const { user, loading } = useAppSelector((s) => s.user);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchMe()).unwrap();
      } catch {}
    })();
  }, [dispatch]);

  useGSAP(
    () => {
      gsap.defaults({ overwrite: 'auto' });
      const isMobile = window.innerWidth < 480;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.55 } });

      tl.from('.header-main', { autoAlpha: 0, y: -24 }).from(['.brand-anim', '.nav-link-anim'], { autoAlpha: 0, y: -16, stagger: 0.06 }, '-=0.25');

      if (!isMobile) tl.from('.theme-anim', { autoAlpha: 0, y: -16 }, '<');

      tl.add(() => {
        gsap.set(['.header-main', '.brand-anim', '.nav-link-anim', '.theme-anim'], { clearProps: 'transform' });
      });

      return () => tl.kill();
    },
    { scope }
  );

  // اسکیل ظریف باکس سرچ
  useEffect(() => {
    const box = inputWrapRef.current;
    gsap.to(box, { duration: 0.28, ease: 'power2.out', scale: search ? 1.07 : 1 });
  }, [search]);

  return (
    <header
      ref={scope}
      className={`flex z-10 flex-col relative w-full ${
        pathname === '/' ? 'bg-foreground/20' : 'bg-background pb-10 after:bg-linear-to-b after:from-foreground/30 after:to-foreground/10 after:content-[""] after:w-full after:h-full after:absolute dark:after:opacity-45 after:opacity-80 after:z-[1] after:blur-2xl after:pointer-events-none'
      } items-center justify-center`}
    >
      {/* Spotlight: به‌جای ref، خودِ المنت را می‌دهیم */}
      <Spotlight
        active={search}
        onClose={() => {
          inputRef.current?.blur();
          setSearch(false);
        }}
        radius={170}
        softness={28}
        darkness={0.82}
        anchorEl={inputWrapRef.current}
      />

      <nav className="header-main relative w-11/12 z-[60] lg:w-10/12 bg-background py-6 px-3 sm:px-6 md:px-10 mt-8 flex items-center shadow-lg justify-around rounded-xl gap-2 md:gap-4 will-change-transform">
        <div className="nav-link-anim lg:hidden text-4xl cursor-pointer will-change-transform">
          <Sidebar />
        </div>

        <div className="brand-anim flex xl:text-5xl md:text-4xl text-2xl text-muted items-center gap-2 justify-center will-change-transform">
          <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </div>

        {/* جعبه‌ی سرچ */}
        <div ref={inputWrapRef} className="md:flex 2xl:w-2/5 w-1/3 relative hidden items-center will-change-transform">
          <Input ref={inputRef} onFocus={() => setSearch(true)} onBlur={() => setSearch(false)} className="bg-white dark:bg-slate-900" type="text" placeholder="کپسول مورد نظر خودت رو جستجو کن" />
          <div className="bg-primary absolute left-0 h-full rounded-l-lg flex items-center justify-center shadow-inner shadow-foreground/50">
            <IoIosSearch className="text-3xl cursor-pointer hover:animate-caret-blink mx-2 text-foreground/70" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="theme-anim hidden lg:block will-change-transform">
            <ThemeToggle />
          </div>
          {loading ? <div /> : <div className="nav-link-anim flex items-center will-change-transform">{user ? <UserPopover /> : <LoginButton />}</div>}
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

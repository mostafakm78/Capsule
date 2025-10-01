'use client';

import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LinkProps } from '@/lib/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hook';
import { fetchMe } from '@/app/store/userThunk';
import { IoIosSearch } from 'react-icons/io';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { IoWarningOutline } from 'react-icons/io5';
import { Separator } from '@/components/ui/separator';

const HeaderLink = dynamic(() => import('./HeaderLink'));
const UserPopover = dynamic(() => import('./UserPopover'), { ssr: false });
const Spotlight = dynamic(() => import('./Spotlight'), { ssr: false });
const LoginButton = dynamic(() => import('./LoginButton'));
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });
const ThemeToggle = dynamic(() => import('./Theme'), { ssr: false });

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [bannedAlert, setBannedAlert] = useState<boolean>(false);
  const logoClassName = useMemo(() => bungee.className, [bungee]);

  const scope = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapRef = useRef<HTMLDivElement>(null);

  const { user, loading } = useAppSelector((s) => s.user);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchMe()).unwrap();
      } catch (error) {
        if (error === 403) {
          setBannedAlert(true);
        }
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 1024);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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

  useEffect(() => {
    const box = inputWrapRef.current;
    gsap.to(box, { duration: 0.28, ease: 'power2.out', scale: search ? 1.07 : 1 });
  }, [search]);

  const pushWithParams = useCallback(
    (mutator: (p: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutator(params);
      const qs = params.toString();
      router.push(qs ? `/capsules?${qs}` : `/capsules`);
    },
    [router, searchParams]
  );

  const performSearchAction = useCallback(() => {
    const q = searchInput.trim();

    if (q.length > 0) {
      pushWithParams((params) => {
        params.set('q', q);
        params.set('page', '1');
      });
      setSearchInput('');
      return;
    }

    if (searchParams.get('q')) {
      pushWithParams((params) => {
        params.delete('q');
        params.set('page', '1');
      });
      setSearchInput('');
      return;
    }
  }, [pushWithParams, searchInput, searchParams]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (!e.nativeEvent.isComposing && e.key === 'Enter') {
        setSearch(false);
        performSearchAction();
      }
    },
    [performSearchAction]
  );

  const renderHeaderLinks = useMemo(() => {
    {
      return headerLinks.map((links, i) => (
        <div key={i} className="theme-anim hidden lg:block">
          <HeaderLink text={links.title} link={links.link} />
        </div>
      ));
    }
  }, []);

  return (
    <header
      ref={scope}
      role="banner"
      aria-label="هدر سایت"
      className={`flex z-10 flex-col relative w-full ${
        pathname === '/' ? 'bg-foreground/20' : 'bg-background pb-10 after:bg-linear-to-b after:from-foreground/30 after:to-foreground/10 after:content-[""] after:w-full after:h-full after:absolute dark:after:opacity-45 after:opacity-80 after:z-[1] after:blur-2xl after:pointer-events-none'
      } items-center justify-center`}
    >
      {bannedAlert && (
        <div className="w-full lg:h-[100px] flex items-center justify-center mt-4 lg:p-2 p-4">
          <div className="text-white/90 flex lg:flex-wrap flex-col items-center lg:justify-center break-words p-4 lg:w-2/3 w-full h-full bg-red-700/70 dark:bg-red-900 shadow-xl rounded-lg">
            <IoWarningOutline className="text-3xl" />
            <Separator orientation="horizontal" className="bg-foreground/80 my-2 lg:hidden" />
            <Separator orientation="vertical" className="bg-foreground/80 hidden lg:block" />
            <p className="leading-relaxed">
              حساب شما توسط ادمین سایت بن شده ، برای اطلاعات بیشتر میتونین از صفحه{' '}
              <Link href="/contact-us" className="underline underline-offset-1 mx-1.5">
                ارتباط با ما
              </Link>{' '}
              با ادمین های سایت در ارتباط باشید.
            </p>
          </div>
        </div>
      )}
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

      <nav className="header-main relative w-11/12 z-[60] lg:w-10/12 bg-background py-6 px-3 sm:px-6 md:px-10 mt-8 flex items-center shadow-lg justify-around rounded-xl gap-2 md:gap-4 will-change-transform" role="navigation" aria-label="منوی اصلی">
        <div className="nav-link-anim lg:hidden text-4xl cursor-pointer will-change-transform" aria-label="منوی کناری" role="button" tabIndex={0}>
          {isMobile && <Sidebar />}
        </div>

        <div className="brand-anim flex xl:text-5xl md:text-4xl text-2xl text-muted items-center gap-2 justify-center will-change-transform" aria-label="لوگوی سایت">
          <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
          <h1 className={`${logoClassName}`}>Capsule</h1>
        </div>

        <div ref={inputWrapRef} className="md:flex 2xl:w-3/6 w-2/5 relative hidden items-center will-change-transform" role="search">
          <Input
            aria-label="جستجوی کپسول"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onFocus={() => setSearch(true)}
            onBlur={() => setSearch(false)}
            className="bg-white dark:bg-slate-900"
            type="text"
            placeholder="کپسول مورد نظر خودت رو جستجو کن"
          />
          <div className="bg-primary absolute left-0 h-full rounded-l-lg flex items-center justify-center shadow-inner shadow-foreground/50" role="button" tabIndex={0} aria-label="جستجو">
            <IoIosSearch onClick={performSearchAction} className="text-3xl cursor-pointer hover:animate-caret-blink mx-2 text-foreground/70" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="theme-anim hidden lg:block will-change-transform" aria-label="تغییر تم سایت">
            <ThemeToggle />
          </div>

          <div className="nav-link-anim flex items-center will-change-transform" aria-label="بخش کاربری">
            {loading ? <LoginButton /> : user ? <UserPopover /> : <LoginButton />}
          </div>
        </div>
      </nav>

      <div className="sub-header z-[9] shadow-md lg:block hidden bg-accent w-8/12 py-5 rounded-b-xl" aria-label="منوی فرعی">
        <div className="lg:flex items-center justify-center gap-10 hidden">{renderHeaderLinks}</div>
      </div>
    </header>
  );
}

'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Image from 'next/image';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutUsDesktop() {
  const pathRef = useRef<SVGPathElement | null>(null);

  useGSAP(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();

    if (window.innerWidth > 1024) {
      gsap.set(pathRef.current, {
        strokeDasharray: length,
      });
    }

    if (window.innerWidth > 1024) {
      gsap.fromTo(
        pathRef.current,
        {
          strokeDashoffset: length,
          opacity: 0.2,
        },
        {
          strokeDashoffset: 0,
          duration: 10,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.dotted',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );
    }

    gsap.fromTo(
      '.box-one',
      { opacity: 0, x: 200 },
      {
        opacity: 1,
        x: 0,
        delay: 0.3,
        duration: 0.3,
        scrollTrigger: { trigger: '.box-one', start: 'top 80%' },
      }
    );

    gsap.fromTo('.box-two', { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: 0.3, scrollTrigger: { trigger: '.box-two', start: 'top 80%' } });

    gsap.fromTo('.box-three', { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.3, scrollTrigger: { trigger: '.box-three', start: 'top 80%' } });
    gsap.fromTo('.box-four', { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: 0.3, scrollTrigger: { trigger: '.box-four', start: 'top 80%' } });
    gsap.fromTo('.box-five', { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: 0.3, scrollTrigger: { trigger: '.box-five', start: 'top 80%' } });
    gsap.fromTo('.box-six', { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.3, scrollTrigger: { trigger: '.box-six', start: 'top 100%' } });
  }, []);

  return (
    <section className="dotted lg:block hidden my-16" aria-label="About us section">
      <div className="py-10 bg-background relative px-10 gap-56 flex flex-col items-center justify-center">
        <svg
          className="absolute flex items-center justify-center h-full w-full top-0 left-1/2 -translate-x-1/2 pointer-events-none text-foreground/50 z-[5]"
          width="3000"
          height="1440"
          viewBox="0 0 1440 3000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Decorative SVG background line"
        >
          <path
            ref={pathRef}
            d="M40.8287 1C24.1142 147.623 64.9944 257.096 172.396 353.327C305.59 472.667 453.203 450.239 620.373 394.146C734.06 355.999 761.976 255.337 876.444 219.824C990.913 184.31 1072.71 170.232 1182.26 219.824C1300.56 273.377 1355.43 352.963 1399.18 479.465C1440.16 597.963 1444.5 597.5 1379 752C1313.5 906.5 1208.58 958.307 1065.11 961.614C946.965 964.337 865.848 903.506 776.959 865.245C688.07 826.985 657.549 701.812 545.907 661.153C416.772 614.124 314.844 621.981 197.12 694.606C102.854 752.76 39.6845 812.591 19.3423 920.795C-1 1029 -3.45583 1115.16 40.8287 1224.94C78.7191 1318.87 108.109 1386.66 197.12 1428.72C326.841 1490.03 545.907 1317.62 545.907 1317.62C545.907 1317.62 714.322 1217.87 833.766 1195.17C980.392 1167.3 1085.34 1147.1 1214.34 1224.94C1341.37 1301.59 1426.96 1394.47 1427.73 1547.5C1428.52 1701.71 1337.18 1787.85 1214.34 1873.74C1139.14 1926.31 1087.83 1954.07 997.416 1959.06C866.32 1966.28 812.881 1864.31 688.07 1821.87C575.317 1783.53 510.036 1728.55 392.853 1747.6C277.74 1766.31 210.765 1813.35 136.782 1907.19C47.9848 2019.82 13.422 2123.91 40.8287 2266.88C60.7123 2370.61 85.9754 2445.04 172.396 2500.44C239.738 2543.61 292.628 2539.32 371.661 2537.57C503.434 2534.66 572.699 2481.57 688.07 2415.12C763.255 2371.81 787.82 2313.38 869.38 2285.3C985.886 2245.18 1074.2 2254.47 1182.26 2315.07C1267.03 2362.6 1326.06 2404.08 1352.97 2500.44C1385.65 2617.43 1347.2 2715.45 1260.55 2797.21C1171.3 2881.44 1078.01 2873.04 958.269 2860.13C863.055 2849.86 727.217 2774.81 727.217 2774.81C727.217 2774.81 597.785 2724.56 545.907 2774.81C498.537 2820.69 486.162 2888.59 520.888 2945.45C539.546 2976 592.117 3001 592.117 3001"
            stroke="currentColor"
            strokeWidth="7"
          />
        </svg>

        <div className="flex w-10/12 z-20 items-center justify-center gap-20">
          <div className="box-one flex shadow-lg flex-col items-center bg-accent rounded-xl p-4 gap-6" role="region" aria-labelledby="story-header">
            <h3 id="story-header" className="text-8xl font-kalmeh text-foreground">
              داستان آغاز
            </h3>
            <p className="text-justify text-lg text-foreground/80">
              ایده کپسول از یک دغدغه شخصی شروع شد: «چطور می‌شه لحظاتی که دوست نداریم از یاد برن، برای همیشه نگه داشت؟» ما به این فکر کردیم که ثبت خاطرات فقط نوشتن نیست. گاهی یک عکس، یک صدای کوتاه، یا حتی یک ویدیو ساده می‌تونه دنیایی از حس و خاطره رو زنده کنه. این شد که کپسول متولد شد.
            </p>
          </div>
          <div className="w-1/2 lg:h-[200px] xl:h-[300px] block transform rotate-90">
            <Image src="/images/Logo.png" alt="Capsule logo" width={300} height={300} />
          </div>
        </div>

        <div className="flex items-center justify-between w-10/12 gap-6 z-20">
          <div className="w-1/2 block"></div>
          <div className="box-two flex flex-col shadow-lg items-center bg-accent rounded-xl p-4 gap-6" role="region" aria-labelledby="mission-header">
            <h3 id="mission-header" className="text-5xl font-kalmeh text-foreground">
              مأموریت ما
            </h3>
            <p className="text-justify text-lg text-foreground/80">در دنیای پرسرعت امروز، لحظات خاص به‌سرعت فراموش می‌شوند. مأموریت ما در کپسول خاطره این است که بستری امن، ساده و ماندگار برای ثبت و نگهداری خاطرات ارزشمند فراهم کنیم؛ تا هیچ لحظه‌ای گم نشود.</p>
          </div>
        </div>

        <div className="flex items-center justify-between w-10/12 gap-6 z-20">
          <div className="box-three flex flex-col shadow-lg items-center bg-accent rounded-xl p-4 gap-6" role="region" aria-labelledby="privacy-header">
            <h3 id="privacy-header" className="text-5xl font-kalmeh text-foreground">
              امنیت و حریم خصوصی
            </h3>
            <p className="text-justify text-lg text-foreground/80">ما باور داریم که خاطرات شما خصوصی و ارزشمند هستند. کپسول با استفاده از استانداردهای بالای امنیتی، از محتوای شما به‌شکل کاملاً رمزگذاری‌شده نگهداری می‌کند. فقط شما تصمیم می‌گیرید چه زمانی و با چه کسی آن‌ها را به اشتراک بگذارید.</p>
          </div>
          <div className="w-1/2 block"></div>
        </div>

        <div className="flex items-center justify-between w-10/12 gap-6 z-20">
          <div className="w-1/2 block"></div>
          <div className="box-four flex flex-col shadow-lg items-center bg-accent rounded-xl p-4 gap-6" role="region" aria-labelledby="future-header">
            <h3 id="future-header" className="text-5xl font-kalmeh text-foreground">
              برای حال، برای آینده
            </h3>
            <p className="text-justify text-lg text-foreground/80">چه بخواهید یک روز خاص را برای خودتان ذخیره کنید، چه بخواهید برای فرزندتان یک خاطره بسازید که در آینده آن را ببیند — کپسول همراه شماست.</p>
          </div>
        </div>

        <div className="flex items-center justify-between w-10/12 gap-6 z-20">
          <div className="box-five flex flex-col shadow-lg items-center bg-accent rounded-xl p-4 gap-6" role="region" aria-labelledby="users-header">
            <h3 id="users-header" className="text-5xl font-kalmeh text-foreground">
              همراهی با کاربران
            </h3>
            <p className="text-justify text-lg text-foreground/80">ما همواره در حال یادگیری از کاربران‌مان هستیم. هر بازخورد، هر پیشنهاد، و هر خاطره‌ای که با ما به اشتراک می‌گذارید، به رشد کپسول کمک می‌کند.</p>
          </div>
          <div className="w-1/2 block"></div>
        </div>

        <div className="flex items-center justify-center w-10/12 gap-6 z-20">
          <div className="box-six flex flex-col shadow-lg items-center bg-accent rounded-xl p-4 gap-6" role="region" aria-labelledby="vision-header">
            <h3 id="vision-header" className="text-5xl font-kalmeh text-foreground">
              چشم‌انداز
            </h3>
            <p className="text-justify text-lg text-foreground/80">ما می‌خواهیم کپسول، جایی باشد که نسل‌ها از آن استفاده کنند؛ جایی برای ساختن، نگهداری، و مرور خاطرات — مثل یک گنج دیجیتالی خانوادگی.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

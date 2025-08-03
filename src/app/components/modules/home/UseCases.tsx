'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Image from 'next/image';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function UseCases() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const divTwoRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const layers = gsap.utils.toArray('.layer');

    gsap.to('.spinning-gradient', {
      duration: 7,
      repeat: -1,
      ease: 'none',
      '--angle': '+=360deg',
    });

    gsap.to('.spinning-gradient', {
      duration: 7,
      repeat: -1,
      ease: 'none',
      '--angleTwo': '+=360deg',
    });

    const dots = gsap.utils.toArray('.dot');

    dots.forEach((dot) => {
      gsap.fromTo(
        dot as HTMLElement,
        {
          x: -20,
        },
        {
          x: 20,
          duration: 0.9,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: 0.3,
        }
      );
    });

    layers.forEach((layer, i) => {
      const element = layer as HTMLElement;
      const isFadeOnly = element.classList.contains('fade-layer');
      const isRightOnly = element.classList.contains('right-layer');

      let fromVars: gsap.TweenVars = {};
      let toVars: gsap.TweenVars = { opacity: 1 };

      if (isFadeOnly) {
        fromVars = { ...fromVars, x: -500, opacity: 0 };
        toVars = { ...toVars, x: 0 };
      } else if (isRightOnly) {
        fromVars = { ...fromVars, x: 500, opacity: 0 };
        toVars = { ...toVars, x: 0 };
      } else {
        fromVars = { ...fromVars, y: 1000, opacity: 0.7 };
        toVars = { ...toVars, y: 0 };
      }

      gsap.fromTo(element, fromVars, {
        ...toVars,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#pinned-section',
          start: () => `top+=${i * window.innerHeight} top`,
          end: () => `+=${window.innerHeight}`,
          toggleActions: 'play none none reverse',
          scrub: false,
        },
      });
    });

    ScrollTrigger.create({
      trigger: '#pinned-section',
      start: 'center center',
      end: () => `+=${layers.length * window.innerHeight}`,
      pin: true,
      pinSpacing: true,
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement | null>) => {
    const div = ref.current;
    if (!div) return;

    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(div.offsetTop);

    gsap.to(div, {
      duration: 0.3,
      delay: 0.1,
      ease: 'power2.out',
      '--x': `${x}px`,
      '--y': `${y}px`,
    });
  };

  return (
    <section id="pinned-section" className="h-[700px]">
      <div className="flex h-full w-full px-10 gap-10">
        <div
          ref={divRef}
          onMouseMove={(e) => handleMouseMove(e, divRef)}
          className={`h-full relative p-20 z-[1] w-[50%] bg-foreground/10 py-6 rounded-xl overflow-hidden flex flex-col justify-around items-center gap-10 before:content-[''] before:absolute before:bg-[radial-gradient(var(--color-primary))] before:w-[800px] before:h-[800px] before:top-[var(--y)] before:left-[var(--x)] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:opacity-0 hover:before:opacity-100 before:blur-2xl after:content-[''] after:absolute after:inset-0.5 after:rounded-lg after:bg-background/85`}
        >
          <div className="w-[90%] absolute h-[90%] shadow-md flex-col layer z-10 bg-[#CC66DA] flex justify-around items-center rounded-lg">
            {/* لایه‌ی گرادیان پس‌زمینه به‌جای after */}
            <div className={`spinning-gradient absolute inset-0 -z-10 rounded-lg p-[2.5px] bg-[conic-gradient(from_var(--angle),transparent_70%,var(--color-foreground))] opacity-50`}>
              <div className="w-full h-full rounded-md bg-[#CC66DA]"></div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Image src="/images/question.png" alt="think" width={200} height={200} className="drop-shadow-xl" />
              <h3 className="text-foreground text-3xl font-kalmeh">به چه دردی میخوره ؟</h3>
              <p className="text-foreground/70 text-xl">کاربرد ها</p>
            </div>
            <ul className="list-disc text-xl text-foreground/90">
              <li>برای خودت در آینده</li>
              <li>برای فرزندت در ۱۰ سال بعد</li>
              <li>برای عاشقانه‌ای که هنوز نیومده</li>
              <li>تولد، سالگرد، یادبود...</li>
            </ul>
          </div>
          <div className="w-[90%] absolute h-[90%] shadow-md flex-col layer z-10 bg-secondary flex justify-around items-center rounded-lg">
            {/* لایه‌ی گرادیان پس‌زمینه به‌جای after */}
            <div className={`spinning-gradient absolute inset-0 -z-10 rounded-lg p-[2.5px] bg-[conic-gradient(from_var(--angle),transparent_70%,var(--color-foreground))] opacity-50`}>
              <div className="w-full h-full rounded-md bg-secondary"></div>
            </div>
            <div className="flex flex-col text-justify items-center gap-4">
              <Image src="/images/think.png" alt="think" width={200} height={200} className="drop-shadow-xl" />
              <h3 className="text-foreground text-3xl font-kalmeh">چطور کار میکنه ؟</h3>
              <p className="text-foreground/70 text-xl">مراحل ساخت کپسول در 3 قدم</p>
            </div>
            <ul className="list-disc text-xl text-foreground/90">
              <li>مرحله ۱: انتخاب محتوا (متن، صدا، تصویر)</li>
              <li>مرحله ۲: تعیین زمان ارسال</li>
              <li>مرحله ۳: ارسال و انتظار برای باز شدن</li>
            </ul>
          </div>
          <div className="w-[90%] absolute h-[90%] shadow-md flex-col layer z-10 bg-primary flex justify-around items-center rounded-lg">
            {/* لایه‌ی گرادیان پس‌زمینه به‌جای after */}
            <div className={`spinning-gradient absolute inset-0 -z-10 rounded-lg p-[2.5px] bg-[conic-gradient(from_var(--angle),transparent_70%,var(--color-foreground))] opacity-50`}>
              <div className="w-full h-full rounded-md bg-primary"></div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Image src="/images/think.png" alt="think" width={200} height={200} className="drop-shadow-xl" />
              <h3 className="text-foreground text-3xl font-kalmeh">امنیت و حریم خصوصی داره ؟</h3>
              <p className="text-foreground/70 text-xl">بله خیلی مهمه چون کاربر داده شخصی می‌ده</p>
            </div>
            <ul className="list-disc text-xl text-foreground/90">
              <li>رمزگذاری انتها به انتها</li>
              <li>فقط گیرنده بهش دسترسی داره</li>
              <li>روی سرورهای امن نگهداری می‌شه</li>
            </ul>
          </div>
        </div>
        <div
          ref={divTwoRef}
          onMouseMove={(e) => handleMouseMove(e, divTwoRef)}
          className={`h-full relative p-20 z-[1] w-[50%] bg-foreground/10 py-6 rounded-xl overflow-hidden flex flex-col justify-around items-center gap-10 before:content-[''] before:absolute before:bg-[radial-gradient(var(--color-secondary))] before:w-[800px] before:h-[800px] before:top-[var(--y)] before:left-[var(--x)] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:opacity-0 hover:before:opacity-100 before:blur-2xl after:content-[''] after:absolute after:inset-0.5 after:rounded-lg after:bg-background/85`}
        >
          <div className="w-[90%] h-[50%] flex flex-col layer z-10 justify-around items-center rounded-lg">
            <h3 className="text-foreground text-5xl text-center font-bold leading-snug">خاطره هات رو در کپسول زمان ذخیره کن!</h3>
          </div>
          <div className="w-[90%] layer z-10 flex gap-6 justify-center items-center rounded-lg opacity-0 fade-layer">
            <div className="dot w-5 h-5 rounded-full bg-secondary"></div>
            <div className="dot w-5 h-5 rounded-full bg-secondary"></div>
            <div className="dot w-5 h-5 rounded-full bg-secondary"></div>
          </div>
          <div className="w-[90%] h-[50%] flex-col layer z-10 flex justify-around items-center rounded-lg right-layer">
            <p className="text-foreground/80 text-xl text-justify">
              کپسول خاطره یک پلتفرم آنلاین است که به شما امکان می‌دهد خاطرات و لحظات مهم زندگی خود را در قالب کپسول‌های دیجیتال ذخیره کنید. این کپسول‌ها می‌توانند شامل متن، عکس، ویدئو و صدا باشند. با استفاده از این پلتفرم، شما می‌توانید خاطرات خود را به صورت امن نگهداری کنید و در آینده به آن‌ها
              دسترسی داشته باشید.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

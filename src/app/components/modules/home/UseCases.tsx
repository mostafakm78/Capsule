'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function UseCases() {
  // Refs used for cursor-follow radial gradients; must stay attached to <div> for typing compatibility
  const divRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add('(min-width: 1000px)', () => {
          const layers = gsap.utils.toArray<HTMLElement>('.layer');
          const total = layers.length;

          layers.forEach((el, i) => {
            gsap.fromTo(
              el,
              { y: 1000, opacity: 0.7 },
              {
                y: 0,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: '#pinned-section',
                  start: () => `top+=${i * window.innerHeight} top`,
                  end: () => `+=${window.innerHeight}`,
                  toggleActions: 'play none none reverse',
                  scrub: 1,
                },
              }
            );
          });

          const heights = ['0px', '200px', '450px', '100vh'];
          ScrollTrigger.create({
            trigger: '#pinned-section',
            start: 'top top',
            end: () => `+=${total * window.innerHeight}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate(self) {
              const step = Math.min(total, Math.max(0, Math.round(self.progress * total)));
              const h = heights[step] ?? heights[heights.length - 1];
              if (divRef.current) {
                gsap.to(divRef.current, {
                  ['--before-h' as string]: h,
                  duration: 0.3,
                  ease: 'power2.out',
                  overwrite: 'auto',
                });
              }
            },
          });

          requestAnimationFrame(() => ScrollTrigger.refresh());
        });
      });

      return () => ctx.revert();
    },
    { scope: divRef }
  );

  return (
    // Main pinned section for "What does Capsule do?"
    <section aria-label="کپسول چیکار میکنه ؟" id="pinned-section" className="lg:h-screen p-4">
      {/* Keep as <div> due to attached ref typing (HTMLDivElement) */}
      <div
        ref={divRef}
        className={`before-target h-full relative p-8 z-[1] w-full bg-foreground/10 rounded-xl overflow-hidden flex lg:flex-row flex-col justify-around items-center gap-10
        before:content-[''] before:absolute before:bg-foreground dark:before:bg-secondary before:w-full before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:opacity-80 before:blur-lg
        after:content-[''] after:absolute after:inset-0.5 after:rounded-lg after:bg-background/90`}
        style={{ ['--before-h' as string]: '0px' }}
      >
        <style jsx>{`
          .before-target::before {
            height: var(--before-h, 0px);
          }
        `}</style>

        <div className="absolute inset-0.5 rounded-lg dark:bg-background/70 bg-background/50" />
        <div className="lg:w-1/2 w-full h-full flex flex-col items-center justify-around gap-4 z-10">
          <div className="flex items-center justify-center w-full gap-3">
            <Image src="/images/Logo.png" alt="site Logo" width={500} height={500} className="lg:w-[100px] lg:h-[100px] w-[70px] h-[70px]" />
            <h1 className="lg:text-4xl text-2xl font-kalmeh">کپسول چیکار میکنه ؟</h1>
          </div>
          <p className="text-xl relative text-foreground/80 pr-4 before:content-[''] before:absolute before:h-full before:w-0.5 before:right-0 before:top-0 before:bg-foreground/50">
            <strong className="underline-offset-4 underline">کپسول یه جور زمان‌نگهداره.</strong> خاطره‌هات رو با صدا، عکس یا نوشته می‌ذاری توش، زمان باز شدنش رو مشخص می‌کنی، و بعد... می‌مونه تا روزی که برگردی و دوباره بخونیش. برای خودت، برای یه عزیز، یا حتی واسه کسی که هنوز پیداش نکردی.
          </p>
          <p className="text-xl relative text-foreground/80 pr-4 before:content-[''] before:absolute before:h-full before:w-0.5 before:right-0 before:top-0 before:bg-foreground/50">
            با کپسول میتونی خاطرات ، تجربه ها و حتی هدف های خودت با دیگران در <strong className="underline-offset-4 underline">کپسول های عمومی</strong> به اشتراک بزاری. میتونی برای خودت نگه داری و اطمینان داشته باشی از اینکه نوشته هات همیشه دردسترس هست و هروقت بخوای میتونی تغییرشون بدی.
          </p>
        </div>

        <Separator orientation="vertical" className="bg-foreground/20 z-10 hidden lg:block" />
        <Separator className="bg-foreground/30 z-10 lg:hidden" />

        <div className="lg:w-1/2 w-full h-full z-10 flex flex-col items-center justify-between">
          {/* Card 1: Use-case overview */}
          <article className="p-2 relative w-full layer z-10 bg-transparent flex flex-col justify-between items-center gap-2 rounded-lg">
            {/* Card header: icon/title/subtitle */}
            <header className="flex items-center justify-center gap-6">
              <Image src="/images/question.png" alt="think" width={200} height={200} className="drop-shadow-xl w-20 h-20" />
              <h3 className="text-foreground lg:text-3xl md:text-2xl text-xl font-kalmeh">به چه دردی میخوره ؟</h3>
            </header>
            <p className="text-foreground/70 lg:text-xl md:text-lg text-base">کاربرد ها</p>

            {/* Bullet list of use cases */}
            <ul className="list-disc flex flex-wrap items-center justify-center gap-x-8 gap-y-1 text-base text-foreground/90">
              <li>برای خودت در آینده</li>
              <li>برای فرزندت در ۱۰ سال بعد</li>
              <li>برای عاشقانه‌ای که هنوز نیومده</li>
              <li>تولد، سالگرد، یادبود...</li>
            </ul>
          </article>

          {/* Card 2: How it works (3 steps) */}
          <article className="p-2 relative w-full layer z-10 bg-transparent flex flex-col justify-between items-center gap-2 rounded-lg">
            {/* Card header: icon/title/subtitle */}
            <header className="flex items-center justify-center gap-6">
              <Image src="/images/think.png" alt="think" width={200} height={200} className="drop-shadow-xl w-17 h-25" />
              <h3 className="text-foreground lg:text-2xl text-xl font-kalmeh">چطور کار میکنه ؟</h3>
            </header>
            <p className="text-foreground/70 lg:text-xl md:text-lg text-base">مراحل ساخت کپسول در 3 قدم</p>

            {/* Bullet list of steps */}
            <ul className="list-disc flex flex-wrap items-center justify-center gap-x-8 gap-y-1 text-base text-foreground/90">
              <li>مرحله ۱: انتخاب محتوا (متن، صدا، تصویر)</li>
              <li>مرحله ۲: تعیین زمان ارسال</li>
              <li>مرحله ۳: ارسال و انتظار برای باز شدن</li>
            </ul>
          </article>

          {/* Card 3: Privacy & security */}
          <article className="p-2 relative w-full layer z-10 bg-transparent flex flex-col justify-between items-center gap-2 rounded-lg">
            {/* Card header: icon/title/subtitle */}
            <header className="flex items-center justify-center gap-6">
              <Image src="/images/privacy.png" alt="think" width={200} height={200} className="drop-shadow-xl w-25 h-20" />
              <h3 className="text-foreground lg:text-2xl text-xl font-kalmeh">امنیت و حریم خصوصی داره ؟</h3>
            </header>

            <p className="text-foreground/70 lg:text-xl md:text-lg text-base">بله خیلی مهمه چون کاربر داده شخصی می‌ده</p>

            {/* Bullet list of security claims */}
            <ul className="list-disc flex flex-wrap items- justify-center gap-x-8 gap-y-1 text-base text-foreground/90">
              <li>رمزگذاری انتها به انتها</li>
              <li>فقط گیرنده بهش دسترسی داره</li>
              <li>روی سرورهای امن نگهداری می‌شه</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

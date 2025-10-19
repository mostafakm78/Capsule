'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Image from 'next/image';

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
              { y: 150, opacity: 0 },
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

          ScrollTrigger.create({
            trigger: '#pinned-section',
            start: 'top top',
            end: () => `+=${total * window.innerHeight}`,
            pin: true,
            anticipatePin: 1,
          });
        });
      });

      return () => ctx.revert();
    },
    { scope: divRef }
  );

  return (
    // Main pinned section for "What does Capsule do?"
    <div className="container mx-auto">
      <section aria-label="کپسول چیکار میکنه ؟" id="pinned-section" className="p-4">
        {/* Keep as <div> due to attached ref typing (HTMLDivElement) */}
        <div ref={divRef} className={`h-full relative lg:p-8 z-[1] w-full bg-transparent rounded-xl overflow-hidden flex flex-col justify-around items-center gap-24`}>
          <h1 className="lg:text-5xl text-3xl z-20 font-kalmeh w-full flex items-center justify-center text-center">کــــپــــســـــول چـــیـــکـــار مـــیـــکـــنـــه ؟</h1>
          <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-4 z-10">
            <div className="lg:w-2/4 w-full lg:px-10">
              <p className="text-xl relative text-foreground/80 pr-4 before:content-[''] before:absolute before:h-full before:w-0.5 before:right-0 before:top-0 before:bg-foreground/50">
                <strong className="underline-offset-4 underline">کپسول یه جور زمان‌نگهداره.</strong> خاطره‌هات رو با صدا، عکس یا نوشته می‌ذاری توش، زمان باز شدنش رو مشخص می‌کنی، و بعد... می‌مونه تا روزی که برگردی و دوباره بخونیش. برای خودت، برای یه عزیز، یا حتی واسه کسی که هنوز پیداش نکردی.
              </p>
            </div>
            <div className="lg:w-2/4 w-full lg:px-10">
              <p className="text-xl relative text-foreground/80 pr-4 before:content-[''] before:absolute before:h-full before:w-0.5 before:right-0 before:top-0 before:bg-foreground/50">
                با کپسول میتونی خاطرات ، تجربه ها و حتی هدف های خودت با دیگران در <strong className="underline-offset-4 underline">کپسول های عمومی</strong> به اشتراک بزاری. میتونی برای خودت نگه داری و اطمینان داشته باشی از اینکه نوشته هات همیشه دردسترس هست و هروقت بخوای میتونی تغییرشون بدی.
              </p>
            </div>
          </div>

          <div className="w-full h-full z-10 flex flex-col lg:flex-row lg:gap-12 gap-20 items-center justify-center">
            {/* Card 1: Use-case overview */}
            <article className="p-4 pt-12 bg-white dark:bg-slate-900 shadow-lg relative w-full lg:w-1/3 layer z-10 flex flex-col lg:h-[220px] justify-between items-center gap-2 lg:gap-1 rounded-lg">
              {/* Card header: icon/title/subtitle */}
              <h3 className="text-foreground lg:text-3xl md:text-2xl text-xl font-kalmeh">به چه دردی میخوره ؟</h3>
              <header className="flex items-center justify-center gap-6">
                <Image src="/images/question.png" alt="think" width={200} height={200} className="drop-shadow-xl w-20 h-20 absolute -top-10" />
              </header>
              <p className="text-foreground/70 lg:text-xl md:text-lg text-base">کاربرد ها</p>

              {/* Bullet list of use cases */}
              <ul className="list-disc flex flex-wrap items-center justify-center gap-x-8 gap-y-2 lg:gap-y-1 text-base text-foreground/90">
                <li>برای خودت در آینده</li>
                <li>برای فرزندت در ۱۰ سال بعد</li>
                <li>برای عاشقانه‌ای که هنوز نیومده</li>
                <li>تولد، سالگرد، یادبود...</li>
              </ul>
            </article>

            {/* Card 2: How it works (3 steps) */}
            <article className="p-4 pt-12 bg-white dark:bg-slate-900 shadow-lg relative w-full lg:w-1/3 layer z-10 flex flex-col lg:h-[220px] justify-between items-center gap-2 lg:gap-1 rounded-lg">
              {/* Card header: icon/title/subtitle */}
              <header className="flex items-center justify-center gap-6">
                <Image src="/images/think.png" alt="think" width={200} height={200} className="drop-shadow-xl w-17 h-25 absolute -top-16" />
                <h3 className="text-foreground lg:text-2xl text-xl font-kalmeh">چطور کار میکنه ؟</h3>
              </header>
              <p className="text-foreground/70 lg:text-xl md:text-lg text-base">مراحل ساخت کپسول در 3 قدم</p>

              {/* Bullet list of steps */}
              <ul className="list-disc flex flex-wrap items-center justify-center gap-x-8 gap-y-2 lg:gap-y-1 text-base text-foreground/90 xl:px-10">
                <li>مرحله ۱: انتخاب محتوا</li>
                <li>مرحله ۲: تعیین زمان ارسال</li>
                <li>مرحله ۳: ارسال و انتظار برای باز شدن</li>
              </ul>
            </article>

            {/* Card 3: Privacy & security */}
            <article className="p-4 pt-12 bg-white dark:bg-slate-900 shadow-lg relative w-full lg:w-1/3 layer z-10 flex flex-col lg:h-[220px] justify-between items-center gap-2 lg:gap-1 rounded-lg">
              <header className="flex items-center justify-center gap-6">
                <Image src="/images/privacy.png" alt="think" width={200} height={200} className="drop-shadow-xl w-25 h-20 absolute -top-10" />
                <h3 className="text-foreground lg:text-2xl text-xl font-kalmeh">امنیت و حریم خصوصی داره ؟</h3>
              </header>

              <p className="text-foreground/70 lg:text-xl md:text-lg text-base">بله خیلی مهمه چون کاربر داده شخصی می‌ده</p>

              <ul className="list-disc flex flex-wrap items- justify-center gap-x-8 gap-y-2 lg:gap-y-1 text-base text-foreground/90">
                <li>رمزگذاری انتها به انتها</li>
                <li>فقط گیرنده بهش دسترسی داره</li>
                <li>روی سرورهای امن نگهداری می‌شه</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

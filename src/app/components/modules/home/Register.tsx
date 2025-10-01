'use client';

import { ShinyButton } from '@/app/components/shared/shiny-button';
import { IoLockClosedOutline } from 'react-icons/io5';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Register() {
  const router = useRouter();

  useGSAP(() => {
    gsap.fromTo(
      '.section-one',
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.2,
        delay: 0.2,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.section-one',
          start: 'top 80%',
        },
      }
    );
    gsap.fromTo(
      '.section-two',
      {
        opacity: 0,
        y: -50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        delay: 0.2,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.section-two',
          start: 'top 80%',
        },
      }
    );
  }, []);
  return (
    <section aria-label="ثبت نام در سایت" className="flex flex-col mb-20 px-4 md:px-6 lg:px-10 justify-center lg:mt-44 mt-20 items-center">
      <div className="flex lg:flex-row flex-col gap-10 justify-center items-center">
        <div className="w-full space-y-6">
          <div className="section-one flex text-center md:text-right items-center">
            <svg className="text-foreground lg:ml-4 lg:flex hidden mt-2" width="37" height="34" viewBox="0 0 37 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="24" r="10" fill="currentColor"></circle>
              <circle cx="30" cy="13" r="7" fill="currentColor" fillOpacity="0.4"></circle>
              <circle cx="15" cy="4" r="4" fill="currentColor" fillOpacity="0.7"></circle>
            </svg>
            <h4 className="section-one lg:text-4xl lg:text-right text-xl md:text-2xl mx-auto lg:mx-0 font-kalmeh text-foreground">خاطرات امروز، گنجینه فردای تو هستند</h4>
          </div>
          <p className="section-one lg:text-xl  md:text-right text-sm md:text-base text-foreground/70 mx-auto lg:mx-0 w-full lg:w-2/3 lg:mr-14 ">متن، عکس، ویدئو یا صدایی که امروز ثبت می‌کنی، فردا ممکنه باارزش‌ترین چیزی باشه که داری</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <h4 className="section-two lg:text-2xl text-lg text-center md:text-xl md:text-right">همین حالا اولین کپسول خاطره‌ات رو بساز!</h4>
          <div className="section-two flex items-center justify-center gap-2 lg:text-2xl text-xl">
            <span className="relative z-[2] after:content-[''] after:absolute after:w-[20px] after:h-[20px] lg:after:h-[30px] lg:after:w-[30px] lg:after:top-2 after:top-1 lg:after:left-3 after:left-2 after:rounded-full after:bg-yellow-500/25">
              <IoLockClosedOutline className="text-yellow-500" />
            </span>
            <h4 className="text-foreground/70">امن، شخصی، برای همیشه</h4>
          </div>
          <ShinyButton onClick={() => router.push('/login')} className="w-full bg-secondary hover:bg-primary hover:border-primary shadow-lg py-4">
            شروع رایگان
          </ShinyButton>
        </div>
      </div>
    </section>
  );
}

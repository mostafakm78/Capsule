'use client';

import Lottie from 'lottie-react';
import typingAnimation from '../../../../../public/svg/Guy.json';
import { ShinyButton } from '@/components/magicui/shiny-button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const timeline = gsap.timeline();

  useGSAP(() => {
    timeline
      .fromTo(
        '.title-one',
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.7,
          delay: 1,
          stagger: 0.3,
        }
      )
      .fromTo(
        '.title-two',
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 1,
          stagger: 0.3,
        }
      )
      .fromTo(
        '.title-three',
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 1,
          stagger: 0.3,
        }
      )
      .fromTo(
        '.start',
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: 'power2.out',
        }
      );
  }, []);
  return (
    <header className="flex flex-col relative mb-6 bg-linear-to-b from-foreground/20 to-background justify-center lg:pt-16 pt-6 items-center">
      <div className="flex lg:flex-row flex-col-reverse px-10 items-center py-6 gap-8 rounded-lg w-full">
          <div className="flex flex-col lg:w-1/2 w-full gap-10 justify-center items-center">
            <div className="text-center">
              <h2 className="title-one text-5xl font-kalmeh text-foreground">خاطره بساز</h2>
              <p className="title-one text-lg text-muted/80 font-light mt-3">لحظه‌هات رو با صدا، تصویر یا متن ثبت کن</p>
            </div>
            <div className="text-center">
              <h2 className="title-two text-5xl font-kalmeh text-foreground">کپسول کن</h2>
              <p className="title-two text-lg text-muted/80 font-light mt-3">بهش زمان بده تا در آینده باز بشه</p>
            </div>
            <div className="text-center">
              <h2 className="title-three text-5xl font-kalmeh text-foreground">بفرست</h2>
              <p className="title-three text-lg text-muted/80 font-light mt-3">برای خودت یا کسی که دوستش داری</p>
            </div>
            <ShinyButton className="md:w-2/3 w-full bg-secondary hover:bg-primary hover:border-primary shadow-lg py-4">
              <Link className='start' href="">شروع رایگان</Link>
            </ShinyButton>
          </div>
          <div className="px-10 relative h-[300px] w-full md:w-2/3 lg:w-1/2">
            <svg className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" id="character-background-area" viewBox="0 0 550 520" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                opacity="0.5"
                d="M51.1106 140.823C55.3792 113.059 78.8827 92.4646 106.966 91.5975C150.364 90.2575 214.276 88.963 261.947 90.8933C308.471 92.7773 370.164 98.9734 413.214 103.774C442.528 107.042 464.78 131.482 465.326 160.973C467.106 257.034 464.32 326.677 454.913 420.963C451.926 450.905 426.877 473.683 396.785 473.919C353.601 474.258 292.51 474.271 246.498 472.407C199.354 470.498 136.591 465.347 93.4387 461.482C64.8438 458.921 42.1923 436.225 40.1612 407.599C33.1808 309.221 36.0823 238.57 51.1106 140.823Z"
                stroke="#F8B259"
                strokeWidth="1.26326"
              />
              <path
                opacity="0.47"
                d="M79.2298 107.62C88.3548 81.0534 115.138 64.9539 142.93 69.0812C185.878 75.4592 249.006 85.52 295.579 95.8744C341.031 105.979 400.648 123.019 442.163 135.378C470.433 143.794 487.998 171.792 483.305 200.913C468.02 295.767 452.927 363.812 426.948 454.935C418.698 483.873 390.006 501.847 360.349 496.742C317.789 489.417 257.665 478.595 212.713 468.601C166.654 458.361 105.8 442.159 64.0174 430.703C36.33 423.111 18.0628 396.758 21.1407 368.225C31.7186 270.169 47.1041 201.152 79.2298 107.62Z"
                stroke="#F8B259"
                strokeWidth="1.26326"
              />
            </svg>

            <div className="absolute inset-0 flex justify-center items-center">
              <Lottie animationData={typingAnimation} loop={false} />
            </div>
          </div>
      </div>
    </header>
  );
}

'use client';

import { Bungee } from 'next/font/google';
import Image from 'next/image';
import StepTwoForm from './StepTwoForm';
import StepOneForm from './StepOneForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import StepThreeForm from './StepThreeForm';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const bungee = Bungee({
  weight: '400',
});

export default function LoginOrSignup() {
  const stepRef = useRef(null);
  const step = useSelector((state: RootState) => state.auth.step);

  useLayoutEffect(() => {
    if (stepRef.current) {
      gsap.fromTo(
        '.anime',
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.3,
        }
      );
    }
  }, [step]);

  return (
    <section className="flex md:flex-row flex-col md:gap-6 items-center min-h-screen justify-center">
      <div className="md:w-2/5 lg:w-1/2 flex flex-col pt-6 md:pt-0 px-2 md:gap-4 gap-1 items-center justify-center text-2xl md:text-3xl lg:text-5xl xl:text-7xl text-foreground/85">
        <div className='flex items-center justify-center gap-2'>
          <Image className="logo h-[40px] w-[40px] md:h-[60px] md:w-[60px] xl:w-[100px] xl:h-[100px]" src="/images/Logo.png" alt="Logo" width={500} height={500} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </div>
        <p className="lg:text-xl md:text-base text-sm font-light text-foreground/80">به سایت کپسول خوش آمدید</p>
      </div>
      <div className="flex flex-1 w-full md:min-h-screen flex-col md:w-2/5 lg:w-1/2 lg:p-6 p-4 h-full gap-4 md:bg-accent items-center justify-around">
        <div></div>
        <div ref={stepRef} className="anime bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-black/5 lg:py-8 py-4 lg:px-10 px-6 xl:w-8/12 lg:w-11/12 w-full">
          {step === 1 && <StepOneForm anime={'anime'} />}
          {step === 2 && <StepTwoForm anime={'anime'} />}
          {step === 3 && <StepThreeForm anime={'anime'} />}
        </div>
        <span className="text-sm text-foreground/50 self-center mb-4">همه حقوق برای کپسول محفوظ است</span>
      </div>
    </section>
  );
}

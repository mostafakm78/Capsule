'use client';

import { Bungee } from 'next/font/google';
import Image from 'next/image';
import StepTwoForm from './StepTwoForm';
import StepOneForm from './StepOneForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Button } from '@/components/ui/button';
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
    if(stepRef.current) {
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
    <section className="flex gap-6 items-center h-screen justify-center">
      <div className="w-1/2 flex flex-col gap-4 items-center justify-center text-2xl lg:text-5xl xl:text-7xl text-foreground/85">
        <Image className="logo h-[30px] w-[30px] lg:h-[60px] lg:w-[60px] xl:w-[100px] xl:h-[100px]" src="/images/Logo.png" alt="Logo" width={500} height={500} />
        <h1 className={`${bungee.className}`}>Capsule</h1>
        <p className="text-xl font-light text-foreground/80">به سایت کپسول خوش آمدید</p>
      </div>
      <div className="flex flex-col w-1/2 h-full bg-accent items-center justify-around">
        <div></div>
        <div ref={stepRef} className="anime bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-black/5 lg:py-8 py-4 md:px-10 px-6 md:w-8/12 w-11/12">
          {step === 1 && <StepOneForm anime={'anime'}/>}
          {step === 2 && <StepTwoForm anime={'anime'}/>}
          {step === 3 && <StepThreeForm anime={'anime'}/>}
        </div>
        <span className="text-sm text-foreground/50 self-center">همه حقوق برای کپسول محفوظ است</span>
      </div>
    </section>
  );
}

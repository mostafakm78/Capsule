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

/* Initialize the Bungee font (400 weight) */
const bungee = Bungee({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export default function LoginOrSignup() {
  /*
    Ref used as a presence flag to ensure GSAP runs after the node is mounted.
    (We don't actually animate the ref target; we animate elements with the ".anime" class.)
  */
  const stepRef = useRef(null);

  /* Read the current auth step (1, 2, or 3) from Redux store */
  const step = useSelector((state: RootState) => state.authStepOne.step);

  /*
    Run GSAP animation on step changes:
    - Fades and slides elements with class ".anime" from x=50 to x=0
    - Staggered appearance for a smooth step transition
  */
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
    <main aria-label="ورود/ثبت‌نام" className="flex md:flex-row flex-col md:gap-6 items-center min-h-screen justify-center">
      {/* Branding / Hero area */}
      <header className="md:w-2/5 lg:w-1/2 flex flex-col pt-6 md:pt-0 px-2 md:gap-4 gap-1 items-center justify-center text-2xl md:text-3xl lg:text-5xl xl:text-7xl text-foreground/85">
        {/* Logo + Product Name */}
        <div className="flex items-center justify-center gap-2">
          {/* Optimized Logo (more descriptive alt text for accessibility) */}
          <Image className="logo h-[40px] w-[40px] md:h-[60px] md:w-[60px] xl:w-[100px] xl:h-[100px]" src="/images/Logo.png" alt="Capsule logo" width={500} height={500} />
          {/* Product/Brand Title (top-level heading of this page) */}
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </div>

        {/* Short welcome/lead text */}
        <p className="lg:text-xl md:text-base text-sm font-light text-foreground/80">به سایت کپسول خوش آمدید</p>
      </header>

      {/* Interactive area that hosts the multi-step auth forms */}
      <section aria-label="فرم ورود/ثبت‌نام" className="flex flex-1 w-full md:min-h-screen flex-col md:w-2/5 lg:w-1/2 lg:p-6 p-4 h-full gap-4 md:bg-accent items-center justify-around">
        {/* Spacer (could be removed if not needed) */}
        <div aria-hidden="true"></div>

        {/* Animated card that swaps between steps */}
        <div ref={stepRef} role="region" aria-live="polite" className="anime bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-black/5 lg:py-8 py-4 lg:px-10 px-6 xl:w-8/12 lg:w-11/12 w-full">
          {/* Conditional rendering of step forms
              NOTE: Each StepXForm receives the "anime" class to participate in GSAP transitions.
              A11Y: Ensure each StepXForm contains its own heading and labeled fields. */}
          {step === 1 && <StepOneForm anime={'anime'} />}
          {step === 2 && <StepTwoForm anime={'anime'} />}
          {step === 3 && <StepThreeForm anime={'anime'} />}
        </div>

        {/* Footer note */}
        <footer className="self-center mb-4">
          <small className="text-sm text-foreground/50">همه حقوق برای کپسول محفوظ است</small>
        </footer>
      </section>
    </main>
  );
}

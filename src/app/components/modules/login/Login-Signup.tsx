'use client';

import { Bungee } from 'next/font/google';
import Image from 'next/image';
import StepTwoForm from './StepTwoForm';
import StepOneForm from './StepOneForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

const bungee = Bungee({
  weight: '400',
});

export default function LoginOrSignup() {
  const step = useSelector((state: RootState) => state.auth.step);

  return (
    <section className="flex flex-col gap-6 items-center h-screen justify-center">
      <div className="w-4/12 flex items-center justify-center gap-2 text-5xl">
        <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
        <h1 className={`${bungee.className}`}>Capsule</h1>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl gap-2 shadow-black/5 lg:py-8 py-4 md:px-12 px-6 flex flex-col lg:w-[30%] w-11/12 md:w-6/12 items-center justify-center">
        <h4 className="text-2xl text-foreground/80 self-start font-bold">ورود/ثبت نام</h4>
        {step === 1 && <StepOneForm />}
        {step === 2 && <StepTwoForm />}
      </div>
        <span className="text-sm text-foreground/50">همه حقوق برای کپسول محفوظ است</span>
    </section>
  );
}

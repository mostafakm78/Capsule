'use client';

import { Separator } from '@/components/ui/separator';
import { BsCapsule } from 'react-icons/bs';
import { IoPeopleSharp } from 'react-icons/io5';
import { GrFormView } from 'react-icons/gr';
import { IoWarningOutline } from 'react-icons/io5';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

import Image from 'next/image';
import SliderHomePageDashboard from './SliderHomePaga';

type SwiperApi = {
  slidePrev: () => void;
  slideNext: () => void;
};

export default function HomePagePanel() {
  const [swiperApi, setSwiperApi] = useState<SwiperApi | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  return (
    <section className="flex flex-col justify-center h-full gap-10">
      <div className="grid grid-cols-12 w-full p-1 md:p-4 gap-2">
        <div className="border-emerald-500 dark:border-emerald-500/60 xl:col-span-3 md:col-span-6 col-span-12 flex items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className="bg-emerald-500 p-2 rounded-full">
            <BsCapsule className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation="vertical" className="bg-foreground/20" />
          <div className="flex flex-col items-start text-foreground/80 2xl:text-xl md:text-base text-sm justify-around">
            <span className='font-medium'>کپسول های ساخته شده</span>
            <span>52</span>
          </div>
        </div>
        <div className="border-purple-500 dark:border-purple-500/60 flex xl:col-span-3 md:col-span-6 col-span-12 items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className="bg-purple-500 p-2 rounded-full">
            <IoPeopleSharp className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation="vertical" className="bg-foreground/20" />
          <div className="flex flex-col items-start text-foreground/80 2xl:text-xl md:text-base text-sm justify-around">
            <span className='font-medium'>کپسول های عمومی شما</span>
            <span>15</span>
          </div>
        </div>
        <div className="border-rose-500 dark:border-rose-500/60 flex xl:col-span-3 md:col-span-6 col-span-12 items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className="bg-rose-500 p-2 rounded-full">
            <IoWarningOutline className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation="vertical" className="bg-foreground/20" />
          <div className="flex flex-col items-start text-foreground/80 2xl:text-xl md:text-base text-sm justify-around">
            <span className='font-medium'>کپسول های بن شده</span>
            <span>1</span>
          </div>
        </div>
        <div className="border-yellow-500 dark:border-yellow-500/60 xl:col-span-3 md:col-span-6 col-span-12 flex items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className="bg-yellow-500 p-2 rounded-full">
            <GrFormView className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation="vertical" className="bg-foreground/20" />
          <div className="flex flex-col items-start text-foreground/80 2xl:text-xl md:text-base text-sm justify-around">
            <span className='font-medium'>آخرین بازدید</span>
            <span>دیروز</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full p-4">
        <div className="flex flex-col lg:px-0 px-2 lg:flex-row lg:items-center justify-between w-full">
          <div className="flex items-center lg:justify-center justify-between gap-4">
            <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>آخرین کپسول های ساخته شده</span>
            <div className="flex gap-1 items-center text-3xl">
              <FaLongArrowAltRight onClick={() => swiperApi?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${isBeginning ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
              <FaLongArrowAltLeft onClick={() => swiperApi?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${isEnd ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
            </div>
          </div>
          <Link className="flex group items-center gap-2 lg:mt-0 mt-6 text-base" href="/dashboard/user-capsules">
            <span className="text-foreground/80 group-hover:text-primary/80 duration-300">مشاهده تمامی کپسول ها</span>
            <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
          </Link>
        </div>
        <SliderHomePageDashboard setSwiperApi={setSwiperApi} setIsBeginning={setIsBeginning} setIsEnd={setIsEnd}/>
      </div>
      <div className="flex flex-col gap-4 p-4 px-6">
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کپسول جدید</span>
        <div className="flex gap-2 items-center py-4 px-2 border border-foreground/20 rounded-lg lg:w-2/3 w-full">
          <Image src="/images/cartoon-question.png" alt="question" width={100} height={100} />
          <div className="flex flex-col gap-1">
            <p className="lg:text-lg text-base font-bold text-foreground/80">شما میتونین از این قسمت یا از پنل سمت راست کپسول جدید بسازید.</p>
            <Link className="flex group items-center gap-2 lg:mt-0 mt-2 text-base" href="/dashboard/create-capsule">
            <span className="text-foreground/80 group-hover:text-primary/80 duration-300">ساخت کپسول جدید</span>
            <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

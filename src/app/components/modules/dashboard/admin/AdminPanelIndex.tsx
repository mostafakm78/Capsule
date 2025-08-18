'use client';

import { Separator } from '@/components/ui/separator';
import { BsCapsule } from 'react-icons/bs';
import { IoPeopleSharp } from 'react-icons/io5';
import { GrFormView } from 'react-icons/gr';
import { IoWarningOutline } from 'react-icons/io5';
import { PiUsersBold } from 'react-icons/pi';
import { IoToday } from 'react-icons/io5';
import { IoBan } from 'react-icons/io5';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import CapsuleSliderAdmin from './CapsuleSliderAdminPage';
import UserSliderAdmin from './UserSliderAdminPage';
import { UsersChart } from './UsersChart';
import { CapsulesChart } from './CapsulesChart';
import { IconType } from 'react-icons/lib';

type SwiperApi = {
  slidePrev: () => void;
  slideNext: () => void;
};

type statsProps = {
  title: string;
  value: number | string;
  border: string;
  bg: string;
  icon: IconType;
};

const stats: statsProps[] = [
  {
    title: 'کپسول‌های ساخته‌شده',
    value: 52,
    border: 'border-emerald-500 dark:border-emerald-500/60',
    bg: 'bg-emerald-500',
    icon: BsCapsule,
  },
  {
    title: 'کاربرای سایت',
    value: 15,
    border: 'border-amber-500 dark:border-amber-500/60',
    bg: 'bg-amber-500',
    icon: PiUsersBold,
  },
  {
    title: 'کپسول‌های عمومی',
    value: 15,
    border: 'border-purple-500 dark:border-purple-500/60',
    bg: 'bg-purple-500',
    icon: IoPeopleSharp,
  },
  {
    title: 'کپسول‌های خصوصی',
    value: 1,
    border: 'border-teal-500 dark:border-teal-500/60',
    bg: 'bg-teal-500',
    icon: RiGitRepositoryPrivateFill,
  },
  {
    title: 'کپسول‌های امروز',
    value: 1,
    border: 'border-neutral-500 dark:border-neutral-500/60',
    bg: 'bg-neutral-500',
    icon: IoToday,
  },
  {
    title: 'کپسول های بن شده',
    value: 1,
    border: 'border-rose-500 dark:border-rose-500/60',
    bg: 'bg-rose-500',
    icon: IoWarningOutline,
  },
  {
    title: 'کاربرای بن شده',
    value: 1,
    border: 'border-pink-500 dark:border-pink-500/60',
    bg: 'bg-pink-500',
    icon: IoBan,
  },
  {
    title: 'آخرین بازدید',
    value: 'دیروز',
    border: 'border-yellow-500 dark:border-yellow-500/60',
    bg: 'bg-yellow-500',
    icon: GrFormView,
  },
];

export default function AdminPanelIndex() {
  const [capsuleSwiper, setCapsuleSwiper] = useState<SwiperApi | null>(null);
  const [capsuleIsBeginning, setCapsuleIsBeginning] = useState(true);
  const [capsuleIsEnd, setCapsuleIsEnd] = useState(false);

  const [userSwiper, setUserSwiper] = useState<SwiperApi | null>(null);
  const [userIsBeginning, setUserIsBeginning] = useState(true);
  const [userIsEnd, setUserIsEnd] = useState(false);

  return (
    <section className="flex flex-col justify-center h-full gap-10">
      <div className="grid grid-cols-12 w-full p-1 md:p-4 gap-2">
        {stats.map(({ title, value, border, bg, icon: Icon }, idx) => (
          <div key={idx} className={`${border} xl:col-span-3 md:col-span-6 col-span-12 flex items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2`}>
            <div className={`${bg} p-2 rounded-full`}>
              <Icon className="lg:text-3xl text-xl text-background" />
            </div>
            <Separator orientation="vertical" className="bg-foreground/20" />
            <div className="flex flex-col items-start text-foreground/80 2xl:text-xl md:text-base text-sm justify-around">
              <span className="font-medium">{title}</span>
              <span>{value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col px-1 sm:px-2 md:px-4 lg:flex-row w-full items-center gap-6">
        <UsersChart />
        <CapsulesChart />
      </div>
      <div className="flex flex-col w-full p-1 sm:p-2 md:p-4">
        <div className="flex flex-col lg:px-0 px-2 lg:flex-row lg:items-center justify-between w-full">
          <div className="flex items-center lg:justify-center justify-between gap-4">
            <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>آخرین کپسول های ساخته شده</span>
            <div className="flex gap-1 items-center text-3xl">
              <FaLongArrowAltRight onClick={() => capsuleSwiper?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${capsuleIsBeginning ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
              <FaLongArrowAltLeft onClick={() => capsuleSwiper?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${capsuleIsEnd ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
            </div>
          </div>
          <Link className="flex group items-center gap-2 lg:mt-0 mt-6 text-base" href="/dashboard/admin/capsules">
            <span className="text-foreground/80 group-hover:text-primary/80 duration-300">مشاهده تمامی کپسول ها</span>
            <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
          </Link>
        </div>
        <CapsuleSliderAdmin setSwiperApi={setCapsuleSwiper} setIsBeginning={setCapsuleIsBeginning} setIsEnd={setCapsuleIsEnd} />
      </div>
      <div className="flex flex-col w-full p-4">
        <div className="flex flex-col lg:px-0 px-2 lg:flex-row lg:items-center justify-between w-full">
          <div className="flex items-center lg:justify-center justify-between gap-4">
            <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>آخرین کاربران ثبت نام کرده</span>
            <div className="flex gap-1 items-center text-3xl">
              <FaLongArrowAltRight onClick={() => userSwiper?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${userIsBeginning ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
              <FaLongArrowAltLeft onClick={() => userSwiper?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${userIsEnd ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
            </div>
          </div>
          <Link className="flex group items-center gap-2 lg:mt-0 mt-6 text-base" href="/dashboard/admin/users">
            <span className="text-foreground/80 group-hover:text-primary/80 duration-300">مشاهده مشاهده تمامی کاربران</span>
            <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
          </Link>
        </div>
        <UserSliderAdmin setSwiperApi={setUserSwiper} setIsBeginning={setUserIsBeginning} setIsEnd={setUserIsEnd} />
      </div>
      <div className="flex flex-col gap-4 p-4 px-6">
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کپسول های سایت</span>
        <div className="flex gap-2 items-center py-4 px-2 border border-foreground/20 rounded-lg lg:w-2/3 w-full">
          <Image src="/images/cartoon-question.png" alt="question" width={100} height={100} />
          <div className="flex flex-col gap-1">
            <p className="lg:text-lg text-base font-bold text-foreground/80">ادمین عزیز شما میتونین از بخش کپسول های سایت تمام کپسول های ساخته شده رو ببینین.</p>
            <Link className="flex group items-center gap-2 lg:mt-0 mt-2 text-base" href="/dashboard/create-capsule">
              <span className="text-foreground/80 group-hover:text-primary/80 duration-300">ساخت کپسول های سایت</span>
              <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

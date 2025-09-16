'use client';

import { Separator } from '@/components/ui/separator';
import { BsCapsule } from 'react-icons/bs';
import { IoClose, IoPeopleSharp } from 'react-icons/io5';
import { GrFormView } from 'react-icons/gr';
import { IoWarningOutline, IoAlert } from 'react-icons/io5';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { GetCapsulesResponse } from '@/lib/types';
import { useAppSelector } from '@/app/hooks/hook';
import Loadings from '@/app/components/shared/loadings';
import { useState } from 'react';
const SliderHomePageDashboard = dynamic(() => import('./SliderHomePaga'), { ssr: false });

type Props = {
  capsules: GetCapsulesResponse;
};

export default function HomePagePanel({ capsules }: Props) {
  const { user } = useAppSelector((state) => state.user);
  const [userAlert, setuserAlert] = useState<string[]>(['name', 'flag', 'avatar']);

  const alerts = [
    {
      id: 'name',
      show: !user?.name,
      title: 'اسمت رو وارد کن!',
      desc: (
        <Link className="underline underline-offset-3 hover:opacity-70 hover:no-underline duration-300" href="/dashboard/setting">
          برای تکمیل حساب وارد تنظیمات حساب بشین
        </Link>
      ),
    },
    {
      id: 'flag',
      show: user?.flag === 'review' || user?.flag === 'sus' || user?.flag === 'violation',
      title: user?.flag === 'review' ? 'حساب شما دردست بررسی میباشد' : user?.flag === 'sus' ? 'حساب شما مشکوک است' : user?.flag === 'violation' ? 'حساب شما محدود میباشد' : '',
      desc: <span>لطفا با پشتیبانی تماس بگیرید</span>,
    },
    {
      id: 'avatar',
      show: !user?.avatar,
      title: 'پروفایل خودت رو با عکس تکمیل کن!',
      desc: (
        <Link className="underline underline-offset-3 hover:opacity-70 hover:no-underline duration-300" href="/dashboard/setting">
          برای تکمیل حساب وارد تنظیمات حساب بشین
        </Link>
      ),
    },
  ];

  if (capsules === undefined) {
    return <Loadings />;
  }

  const publicCapsules = capsules.items.filter((item) => item?.access?.visibility === 'public');

  let userFlag = null;

  if (user?.flag === 'none') {
    userFlag = 'معمولی';
  } else if (user?.flag === 'sus') {
    userFlag = 'مشکوک';
  } else if (user?.flag === 'review') {
    userFlag = 'نیاز به بررسی';
  } else if (user?.flag === 'violation') {
    userFlag = 'محدود';
  }

  const lastSeen = user?.updatedAt;

  const persianDate = lastSeen
    ? new Date(lastSeen).toLocaleDateString('fa-IR', {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <section className="flex flex-col justify-center h-full gap-10 overflow-hidden">
      {alerts.some((alert) => alert.show && userAlert.includes(alert.id)) && (
        <div className="p-1 space-y-2 md:p-4">
          {alerts.map(
            (alert) =>
              alert.show &&
              userAlert.includes(alert.id) && (
                <Alert key={alert.id} className="bg-red-100 dark:bg-slate-900 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <IoAlert className="text-xl" />
                    <div>
                      <AlertTitle>{alert.title}</AlertTitle>
                      <AlertDescription>{alert.desc}</AlertDescription>
                    </div>
                  </div>
                  <div onClick={() => setuserAlert((prev) => prev.filter((id) => id !== alert.id))} className="text-xl cursor-pointer hover:opacity-50 duration-300">
                    <IoClose />
                  </div>
                </Alert>
              )
          )}
        </div>
      )}
      <div className="grid grid-cols-12 w-full p-1 md:p-4 gap-2">
        <div className="border-emerald-500 dark:border-emerald-500/60 xl:col-span-3 md:col-span-6 col-span-12 flex items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className="bg-emerald-500 p-2 rounded-full">
            <BsCapsule className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation="vertical" className="bg-foreground/20" />
          <div className="flex flex-col items-start text-foreground/80 2xl:text-xl md:text-base text-sm justify-around">
            <span className="font-medium">کپسول های ساخته شده</span>
            <span>{capsules?.items.length}</span>
          </div>
        </div>
        <div className="border-purple-500 dark:border-purple-500/60 flex xl:col-span-3 md:col-span-6 col-span-12 items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className="bg-purple-500 p-2 rounded-full">
            <IoPeopleSharp className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation="vertical" className="bg-foreground/20" />
          <div className="flex flex-col items-start text-foreground/80 2xl:text-xl md:text-base text-sm justify-around">
            <span className="font-medium">کپسول های عمومی شما</span>
            <span>{publicCapsules?.length}</span>
          </div>
        </div>
        <div className="border-rose-500 dark:border-rose-500/60 flex xl:col-span-3 md:col-span-6 col-span-12 items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className="bg-rose-500 p-2 rounded-full">
            <IoWarningOutline className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation="vertical" className="bg-foreground/20" />
          <div className="flex flex-col items-start text-foreground/80 2xl:text-xl md:text-base text-sm justify-around">
            <span className="font-medium">وضعیت کاربر</span>
            <span>{userFlag}</span>
          </div>
        </div>
        <div className="border-yellow-500 dark:border-yellow-500/60 xl:col-span-3 md:col-span-6 col-span-12 flex items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className="bg-yellow-500 p-2 rounded-full">
            <GrFormView className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation="vertical" className="bg-foreground/20" />
          <div className="flex flex-col items-start text-foreground/80 2xl:text-xl md:text-base text-sm justify-around">
            <span className="font-medium">آخرین بازدید</span>
            <span>{persianDate}</span>
          </div>
        </div>
      </div>
      <div className={`flex flex-col w-full ${capsules ? '' : 'flex flex-col w-full items-center justify-center min-h-[300px] p-4'} min-h-[300px] p-4 overflow-visible`}>
        {capsules ? <SliderHomePageDashboard capsules={capsules.items} /> : <span className="text-2xl">شما هنوز کپسولی ندارین !</span>}
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

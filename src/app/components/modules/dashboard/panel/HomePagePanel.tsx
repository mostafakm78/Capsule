'use client'; // Enable client-side interactivity (hooks, effects) in Next.js

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

// Lazy-load the dashboard slider (client-only) to reduce initial JS bundle
const SliderHomePageDashboard = dynamic(() => import('./SliderHomePaga'), { ssr: false });

type Props = {
  capsules: GetCapsulesResponse;
};

export default function HomePagePanel({ capsules }: Props) {
  // Read authenticated user from global store
  const { user } = useAppSelector((state) => state.user);

  // Track which alert types the user has dismissed (by id)
  const [userAlert, setuserAlert] = useState<string[]>(['name', 'flag', 'avatar']);

  // List of potential account alerts to show conditionally
  const alerts = [
    {
      id: 'name',
      show: !user?.name, // Show when user name is missing
      title: 'اسمت رو وارد کن!',
      desc: (
        // Link to settings to complete profile (kept as-is to preserve styles)
        <Link className="underline underline-offset-3 hover:opacity-70 hover:no-underline duration-300" href="/dashboard/setting">
          برای تکمیل حساب وارد تنظیمات حساب بشین
        </Link>
      ),
    },
    {
      id: 'flag',
      // Show when account has any special flag requiring attention
      show: user?.flag === 'review' || user?.flag === 'sus' || user?.flag === 'violation',
      title: user?.flag === 'review' ? 'حساب شما دردست بررسی میباشد' : user?.flag === 'sus' ? 'حساب شما مشکوک است' : user?.flag === 'violation' ? 'حساب شما محدود میباشد' : '',
      desc: <span>لطفا با پشتیبانی تماس بگیرید</span>,
    },
    {
      id: 'avatar',
      show: !user?.avatar, // Show when profile image is missing
      title: 'پروفایل خودت رو با عکس تکمیل کن!',
      desc: (
        <Link className="underline underline-offset-3 hover:opacity-70 hover:no-underline duration-300" href="/dashboard/setting">
          برای تکمیل حساب وارد تنظیمات حساب بشین
        </Link>
      ),
    },
  ];

  // While capsules data is not provided, show loading placeholder
  if (capsules === undefined) {
    return <Loadings />;
  }

  // Derive count of user's public capsules
  const publicCapsules = capsules.items.filter((item) => item?.access?.visibility === 'public');

  // Map internal user flag to a localized label for display
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

  // Format the user's last update time as a Persian (fa-IR) date/time string
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
    // Main dashboard section for the user panel home
    <section className="flex flex-col justify-center h-full gap-10 overflow-hidden">
      {/* Dismissible alerts area (only renders alerts that are both active and not dismissed) */}
      {alerts.some((alert) => alert.show && userAlert.includes(alert.id)) && (
        <div className="p-1 space-y-2 md:p-4">
          {alerts.map(
            (alert) =>
              alert.show &&
              userAlert.includes(alert.id) && (
                // Alert card with title, description, and close icon
                <Alert key={alert.id} className="bg-red-100 dark:bg-red-900/40 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <IoAlert className="text-xl" />
                    <div>
                      <AlertTitle>{alert.title}</AlertTitle>
                      <AlertDescription>{alert.desc}</AlertDescription>
                    </div>
                  </div>
                  {/* Dismiss button: removes this alert id from the list */}
                  <div onClick={() => setuserAlert((prev) => prev.filter((id) => id !== alert.id))} className="text-xl cursor-pointer hover:opacity-50 duration-300">
                    <IoClose />
                  </div>
                </Alert>
              )
          )}
        </div>
      )}

      {/* KPI summary grid: total capsules, public capsules, user status, last seen */}
      <div className="grid grid-cols-12 w-full p-1 md:p-4 gap-2">
        {/* Total capsules card */}
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

        {/* User's public capsules count card */}
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

        {/* User status (flag) card */}
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

        {/* Last seen card */}
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

      {/* Slider area: shows user's capsules in a carousel or a fallback text if none */}
      <div className={`flex flex-col w-full ${capsules ? '' : 'flex flex-col w-full items-center justify-center min-h-[300px] p-4'} min-h-[300px] p-4 overflow-visible`}>
        {capsules ? <SliderHomePageDashboard capsules={capsules.items} /> : <span className="text-2xl">شما هنوز کپسولی ندارین !</span>}
      </div>

      {/* Quick CTA block to create a new capsule */}
      <div className="flex flex-col gap-4 p-4 px-6">
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کپسول جدید</span>
        <div className="flex gap-2 items-center py-4 px-2 border border-foreground/20 rounded-lg lg:w-2/3 w-full">
          {/* Decorative/illustrative image next to CTA copy */}
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

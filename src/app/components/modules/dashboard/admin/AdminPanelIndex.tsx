'use client';

import { Separator } from '@/components/ui/separator';
import { BsCapsule } from 'react-icons/bs';
import { IoPeopleSharp } from 'react-icons/io5';
import { PiUsersBold } from 'react-icons/pi';
import { IoToday } from 'react-icons/io5';
import { IoBan } from 'react-icons/io5';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import CapsuleSliderAdmin from './CapsuleSliderAdminPage';
import UserSliderAdmin from './UserSliderAdminPage';
import { IconType } from 'react-icons/lib';
import callApi from '@/app/services/callApi';
import { Capsule, UserSafe } from '@/lib/types';
import Loadings from '@/app/components/shared/loadings';
import { CapsulesChart } from './CapsulesChart';
import { UsersChart } from './UsersChart';

type statsProps = {
  title: string;
  value: number | string;
  border: string;
  bg: string;
  icon: IconType;
};

export default function AdminPanelIndex() {
  // Local state for admin dashboard datasets
  const [users, setUsers] = useState<UserSafe[]>([]);
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch users and capsules for admin overview on mount
  useEffect(() => {
    (async () => {
      try {
        // Load all users for admin panel widgets/charts
        const res = await callApi().get('/admin/users');
        setUsers(res.data.items);
      } catch (error) {
        console.error(error);
        setUsers([]); // fallback to empty on error
      } finally {
        setLoading(false); // stop loading for this request
      }
    })();

    (async () => {
      try {
        // Load all capsules for admin panel widgets/charts
        const res = await callApi().get('/admin/capsules');
        setCapsules(res.data.items);
      } catch (error) {
        console.error(error);
        setCapsules([]); // fallback to empty on error
      } finally {
        setLoading(false); // stop loading for this request
      }
    })();
  }, []);

  // Derived datasets for KPIs
  const userBanned = users.filter((user) => user.isBanned === true); // banned users count
  const publicCapsules = capsules.filter((capsule) => capsule.access?.visibility === 'public'); // public capsules count
  const privateCapsules = capsules.filter((capsule) => capsule.access?.visibility === 'private'); // private capsules count

  // Capsules created "today" in local time
  const todayCapsules = capsules.filter((capsule) => {
    const createdAt = new Date(capsule.createdAt as string);
    const today = new Date();
    return createdAt.getFullYear() === today.getFullYear() && createdAt.getMonth() === today.getMonth() && createdAt.getDate() === today.getDate();
  });

  console.log(publicCapsules);

  // KPI cards configuration (title, value, colors, and icon)
  const stats: statsProps[] = [
    {
      title: 'کپسول‌های ساخته‌شده',
      value: capsules.length,
      border: 'border-emerald-500 dark:border-emerald-500/60',
      bg: 'bg-emerald-500',
      icon: BsCapsule,
    },
    {
      title: 'کاربرای سایت',
      value: users.length,
      border: 'border-amber-500 dark:border-amber-500/60',
      bg: 'bg-amber-500',
      icon: PiUsersBold,
    },
    {
      title: 'کپسول‌های عمومی',
      value: publicCapsules.length,
      border: 'border-purple-500 dark:border-purple-500/60',
      bg: 'bg-purple-500',
      icon: IoPeopleSharp,
    },
    {
      title: 'کپسول‌های خصوصی',
      value: privateCapsules.length,
      border: 'border-teal-500 dark:border-teal-500/60',
      bg: 'bg-teal-500',
      icon: RiGitRepositoryPrivateFill,
    },
    {
      title: 'کپسول‌های امروز',
      value: todayCapsules.length,
      border: 'border-neutral-500 dark:border-neutral-500/60',
      bg: 'bg-neutral-500',
      icon: IoToday,
    },
    {
      title: 'کاربرای بن شده',
      value: userBanned.length,
      border: 'border-pink-500 dark:border-pink-500/60',
      bg: 'bg-pink-500',
      icon: IoBan,
    },
  ];

  // Loading skeleton while fetching admin datasets
  if (loading) return <Loadings />;

  return (
    // Semantic landmark for the admin dashboard page
    <section className="flex flex-col justify-center h-full gap-10">
      {/* KPIs row: small stat cards with icons */}
      <div className="grid grid-cols-12 w-full p-1 md:p-4 gap-2">
        {stats.map(({ title, value, border, bg, icon: Icon }, idx) => (
          <article key={idx} className={`${border} xl:col-span-3 md:col-span-6 col-span-12 flex items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2`}>
            {/* KPI icon with colored background */}
            <div className={`${bg} p-2 rounded-full`}>
              <Icon className="lg:text-3xl text-xl text-background" />
            </div>
            <Separator orientation="vertical" className="bg-foreground/20" />
            {/* KPI label and value */}
            <div className="flex flex-col items-start text-foreground/80 2xl:text-xl md:text-base text-sm justify-around">
              <span className="font-medium">{title}</span>
              <span>{value}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Charts row: capsules by type (pie) + users by month (bar) */}
      <section className="flex flex-col px-1 sm:px-2 md:px-4 lg:flex-row w-full items-center gap-6">
        {/* Pie chart of this month's capsules (public/private/timed) */}
        <CapsulesChart capsules={capsules} />
        {/* Vertical bar chart of signups in last 6 jalaali months */}
        <UsersChart users={users} />
      </section>

      {/* Capsules slider (recent capsules preview) */}
      <section className="flex flex-col w-full p-1 sm:p-2 md:p-4">
        <CapsuleSliderAdmin capsules={capsules} />
      </section>

      {/* Users slider (recent users preview) */}
      <section className="flex flex-col w-full p-4">
        <UserSliderAdmin users={users} />
      </section>

      {/* Helper block: CTA to navigate to capsules list in admin area */}
      <section className="flex flex-col gap-4 p-4 px-6">
        <h2 className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کپسول های سایت</h2>
        <div className="flex gap-2 items-center py-4 px-2 border border-foreground/20 rounded-lg lg:w-2/3 w-full">
          {/* Decorative/illustrative image next to the helper text */}
          <Image src="/images/cartoon-question.png" alt="question" width={100} height={100} />
          <div className="flex flex-col gap-1">
            <p className="lg:text-lg text-base font-bold text-foreground/80">ادمین عزیز شما میتونین از بخش کپسول های سایت تمام کپسول های ساخته شده رو ببینین.</p>
            <Link className="flex group items-center gap-2 lg:mt-0 mt-2 text-base" href="/dashboard/create-capsule">
              <span className="text-foreground/80 group-hover:text-primary/80 duration-300">دیدن کپسول های سایت</span>
              <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

'use client';

import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { FaLongArrowAltLeft, FaLongArrowAltRight, FaUser } from 'react-icons/fa';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { UserSafe } from '@/lib/types';

type Props = {
  users: UserSafe[];
};

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function UserSliderAdmin({ users }: Props) {
  // Keep a reference to the Swiper instance for programmatic navigation
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  // Track whether the carousel is at the first/last slide to toggle arrow states
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  // When data or instance changes, ask Swiper to recalc sizes/positions
  useEffect(() => {
    swiper?.update();
  }, [swiper, users]);

  return (
    // Semantic wrapper for the whole users slider section
    <section>
      {/* Header row: title + manual navigation arrows + link to all users */}
      <header className="flex flex-col lg:px-0 px-2 lg:flex-row lg:items-center justify-between w-full">
        {/* Section title and left/right controls */}
        <div className="flex items-center lg:justify-center justify-between gap-4">
          <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>آخرین کاربران ثبت نام کرده</span>
          <div className="flex gap-1 items-center text-3xl">
            {/* Go to previous slide (disabled look when at beginning) */}
            <FaLongArrowAltRight onClick={() => swiper?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${isBeginning ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
            {/* Go to next slide (disabled look when at end) */}
            <FaLongArrowAltLeft onClick={() => swiper?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${isEnd ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
          </div>
        </div>

        {/* Link to the full users list (admin view) */}
        <Link className="flex group items-center gap-2 lg:mt-0 mt-6 text-base" href="/dashboard/admin/users">
          <span className="text-foreground/80 group-hover:text-primary/80 duration-300">مشاهده مشاهده تمامی کاربران</span>
          <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
        </Link>
      </header>

      {/* Slider region: responsive container for Swiper and slides */}
      <section className="w-full lg:px-4 mx-auto max-w-[250px] sm:max-w-[250px] md:max-w-[730px] lg:max-w-[730px] xl:max-w-4xl 2xl:max-w-7xl overflow-x-hidden">
        {users.length > 0 && (
          <Swiper
            dir="rtl"
            observeParents={true}
            observer={true}
            // Capture the Swiper instance and initialize edge states
            onSwiper={(s) => {
              setSwiper(s);
              setIsBeginning(s.isBeginning);
              setIsEnd(s.isEnd);
            }}
            // Update edge states when slide changes
            onSlideChange={(s) => {
              setIsBeginning(s.isBeginning);
              setIsEnd(s.isEnd);
            }}
            className="overflow-x-auto"
            slidesPerView={'auto'}
            slidesPerGroup={1}
            spaceBetween={20}
            // Responsive breakpoints for number of visible slides and spacing
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 'auto',
                spaceBetween: 20,
              },
            }}
          >
            {/* Render up to 10 latest users as slides */}
            {users.slice(0, 10).map((user) => {
              return (
                <SwiperSlide key={user._id} className="pt-10 lg:max-w-[300px] shrink-0">
                  {/* Each slide links to the admin's user detail page */}
                  <Link href={`/dashboard/admin/users/${user._id}`} className="flex flex-col bg-white dark:bg-slate-900 rounded-lg items-center justify-center gap-6 h-[200px] border-none">
                    {/* User avatar with fallback */}
                    <div>
                      <Avatar className="h-20 w-20 ring-2 ring-secondary">
                        <AvatarImage className="object-cover" src={user?.avatar ? `${baseURL}/images/${user.avatar}` : '/images/default.png'} />
                        <AvatarFallback>...</AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Username / email display with icon */}
                    <div className="flex items-center justify-center gap-2">
                      <FaUser />
                      <span className="font-light text-2xl text-foreground/80">{user.name ?? user.email}</span>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </section>
    </section>
  );
}

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

export default function UserSliderAdmin({ users }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useEffect(() => {
    swiper?.update();
  }, [swiper, users]);

  return (
    <>
      <div className="flex flex-col lg:px-0 px-2 lg:flex-row lg:items-center justify-between w-full">
        <div className="flex items-center lg:justify-center justify-between gap-4">
          <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>آخرین کاربران ثبت نام کرده</span>
          <div className="flex gap-1 items-center text-3xl">
            <FaLongArrowAltRight onClick={() => swiper?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${isBeginning ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
            <FaLongArrowAltLeft onClick={() => swiper?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${isEnd ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
          </div>
        </div>
        <Link className="flex group items-center gap-2 lg:mt-0 mt-6 text-base" href="/dashboard/admin/users">
          <span className="text-foreground/80 group-hover:text-primary/80 duration-300">مشاهده مشاهده تمامی کاربران</span>
          <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
        </Link>
      </div>
      <div className="w-full lg:px-4 mx-auto max-w-[250px] sm:max-w-[250px] md:max-w-[730px] lg:max-w-[730px] xl:max-w-4xl 2xl:max-w-7xl overflow-x-hidden">
        {users.length > 0 && (
          <Swiper
            dir="rtl"
            observeParents={true}
            observer={true}
            onSwiper={(s) => {
              setSwiper(s);
              setIsBeginning(s.isBeginning);
              setIsEnd(s.isEnd);
            }}
            onSlideChange={(s) => {
              setIsBeginning(s.isBeginning);
              setIsEnd(s.isEnd);
            }}
            className="overflow-x-auto"
            slidesPerView={'auto'}
            slidesPerGroup={1}
            spaceBetween={20}
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
            {users.slice(0, 10).map((user) => {
              return (
                <SwiperSlide key={user._id} className="pt-10 lg:max-w-[300px] shrink-0">
                  <Link href="" className="flex flex-col bg-white dark:bg-slate-900 rounded-lg items-center justify-center gap-6 h-[200px] border-none">
                    <div>
                      <Avatar className="h-20 w-20 ring-2 ring-secondary">
                        <AvatarImage className='object-cover' src={user?.avatar ? `http://localhost:8080/images/${user.avatar}` : '/images/default.png'} />
                        <AvatarFallback>...</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <FaUser />
                      <span className="font-light text-2xl text-foreground/80">مصطفی کمری</span>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </>
  );
}

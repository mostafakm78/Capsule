'use client';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

import 'swiper/css';

interface CardProps {
  setSwiperApi: (swiper: SwiperClass) => void;
  setIsEnd: (value: boolean) => void;
  setIsBeginning: (value: boolean) => void;
}

export default function UserSliderAdmin({ setSwiperApi, setIsBeginning, setIsEnd }: CardProps) {
  return (
    <div
      className="w-full lg:px-4 mx-auto
                max-w-[250px]
                sm:max-w-[250px]
                md:max-w-[730px]
                lg:max-w-[730px]
                xl:max-w-4xl
                2xl:max-w-7xl
                overflow-x-hidden"
    >
      <Swiper
        dir="rtl"
        onSwiper={(swiper) => {
          setSwiperApi(swiper);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
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
        <SwiperSlide className="pt-10 lg:max-w-[300px] shrink-0">
          <Link href="" className="flex flex-col bg-white dark:bg-slate-900 rounded-lg items-center justify-center gap-6 h-[200px] border-none">
            <div>
              <Avatar className="h-20 w-20 ring-2 ring-secondary">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CP</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FaUser />
              <span className="font-light text-2xl text-foreground/80">مصطفی کمری</span>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="pt-10 lg:max-w-[300px] shrink-0">
          <Link href="" className="flex flex-col bg-white dark:bg-slate-900 rounded-lg items-center justify-center gap-6 h-[200px] border-none">
            <div>
              <Avatar className="h-20 w-20 ring-2 ring-secondary">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CP</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FaUser />
              <span className="font-light text-2xl text-foreground/80">مصطفی کمری</span>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="pt-10 lg:max-w-[300px] shrink-0">
          <Link href="" className="flex flex-col bg-white dark:bg-slate-900 rounded-lg items-center justify-center gap-6 h-[200px] border-none">
            <div>
              <Avatar className="h-20 w-20 ring-2 ring-secondary">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CP</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FaUser />
              <span className="font-light text-2xl text-foreground/80">مصطفی کمری</span>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="pt-10 lg:max-w-[300px] shrink-0">
          <Link href="" className="flex flex-col bg-white dark:bg-slate-900 rounded-lg items-center justify-center gap-6 h-[200px] border-none">
            <div>
              <Avatar className="h-20 w-20 ring-2 ring-secondary">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CP</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FaUser />
              <span className="font-light text-2xl text-foreground/80">مصطفی کمری</span>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="pt-10 lg:max-w-[300px] shrink-0">
          <Link href="" className="flex flex-col bg-white dark:bg-slate-900 rounded-lg items-center justify-center gap-6 h-[200px] border-none">
            <div>
              <Avatar className="h-20 w-20 ring-2 ring-secondary">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CP</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FaUser />
              <span className="font-light text-2xl text-foreground/80">مصطفی کمری</span>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="pt-10 lg:max-w-[300px] shrink-0">
          <Link href="" className="flex flex-col bg-white dark:bg-slate-900 rounded-lg items-center justify-center gap-6 h-[200px] border-none">
            <div>
              <Avatar className="h-20 w-20 ring-2 ring-secondary">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CP</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FaUser />
              <span className="font-light text-2xl text-foreground/80">مصطفی کمری</span>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

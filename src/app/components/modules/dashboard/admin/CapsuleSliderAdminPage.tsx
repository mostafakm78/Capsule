'use client';

import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import 'swiper/css';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Capsule } from '@/lib/types';

type Props = {
  capsules: Capsule[];
};

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function CapsuleSliderAdmin({ capsules }: Props) {
  // Keep a reference to the Swiper instance to control it programmatically
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  // Track whether the carousel is at the beginning or end (for disabling arrows)
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  // When data or swiper instance changes, ensure Swiper recalculates sizes
  useEffect(() => {
    swiper?.update();
  }, [swiper, capsules]);

  return (
    <>
      {/* Top toolbar: title + navigation arrows + link to all capsules */}
      <header className="flex flex-col lg:px-0 px-2 lg:flex-row lg:items-center justify-between w-full">
        <div className="flex items-center lg:justify-center justify-between gap-4">
          <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>آخرین کپسول های ساخته شده کاربران</span>
          {/* Carousel previous/next controls */}
          <div className="flex gap-1 items-center text-3xl">
            <FaLongArrowAltRight onClick={() => swiper?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${isBeginning ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} aria-label="نمایش اسلاید قبلی" />
            <FaLongArrowAltLeft onClick={() => swiper?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${isEnd ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} aria-label="نمایش اسلاید بعدی" />
          </div>
        </div>
        {/* Link to the full capsules admin page */}
        <Link className="flex group items-center gap-2 lg:mt-0 mt-6 text-base" href="/dashboard/admin/capsules">
          <span className="text-foreground/80 group-hover:text-primary/80 duration-300">مشاهده تمامی کپسول ها</span>
          <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
        </Link>
      </header>

      {/* Slider region: holds the Swiper and its slides */}
      <section className="relative overflow-visible w-full lg:px-4 mx-auto max-w-[400px] md:max-w-[430px] lg:max-w-[530px] xl:max-w-4xl 2xl:max-w-6xl min-h-[400px]">
        {capsules.length > 0 && (
          <Swiper
            dir="rtl"
            observeParents={true}
            observer={true}
            onSwiper={(s) => {
              // Store swiper instance and initialize boundary states
              setSwiper(s);
              setIsBeginning(s.isBeginning);
              setIsEnd(s.isEnd);
            }}
            onSlideChange={(s) => {
              // Update boundary states on slide change
              setIsBeginning(s.isBeginning);
              setIsEnd(s.isEnd);
            }}
            className="overflow-x-auto"
            slidesPerView={'auto'} // Auto-width slides for a responsive carousel
            slidesPerGroup={1} // Move one slide per navigation
            spaceBetween={20} // Gap between slides
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
            {/* Render up to 6 latest capsules as slides */}
            {capsules.slice(0, 6).map((capsule) => {
              return (
                <SwiperSlide key={capsule._id} className="pt-10 lg:max-w-[300px] shrink-0">
                  {/* Capsule summary card */}
                  <Card className="flex flex-col justify-between relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                    <CardHeader>
                      {/* Owner avatar floating above the card header */}
                      <div className="absolute -top-[8%] left-1/2 -translate-x-1/2">
                        <Avatar className="h-12 w-12 ring-2 ring-secondary">
                          <AvatarImage className="object-cover" src={capsule.owner?.avatar ? `${baseURL}/images/${capsule.owner.avatar}` : '/images/default.png'} />
                          <AvatarFallback>...</AvatarFallback>
                        </Avatar>
                      </div>
                      {/* Capsule visibility label */}
                      <CardTitle className="text-center text-xl mt-2 text-foreground">{capsule.access?.visibility === 'private' ? 'کپسول خصوصی' : 'کپسول عمومی'}</CardTitle>
                      {/* Owner and title meta */}
                      <CardDescription className="text-center text-base text-foreground/80">
                        <span className="text-sm line-clamp-2">{capsule.owner?.name ?? capsule.owner?.email}</span>
                        <p className="text-sm">
                          موضوع : <span>{capsule.title}</span>
                        </p>
                      </CardDescription>
                    </CardHeader>

                    {/* Divider between header and content */}
                    <Separator className="bg-foreground/20" />

                    {/* Short description preview */}
                    <CardContent>
                      <p className="line-clamp-3 h-[50px]">{capsule.description}</p>
                    </CardContent>

                    {/* Divider between content and footer */}
                    <Separator className="bg-foreground/20" />

                    {/* Call-to-action to view capsule (kept as placeholder target as in source) */}
                    <CardFooter className="flex py-4 items-center justify-center">
                      <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href="">
                        <span>دیدن کپسول</span>
                        <FaLongArrowAltLeft className="text-2xl" />
                      </Link>
                    </CardFooter>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </section>
    </>
  );
}

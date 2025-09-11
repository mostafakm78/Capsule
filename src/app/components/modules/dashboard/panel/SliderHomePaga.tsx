'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { useEffect, useMemo, useState } from 'react';
import { GetCapsulesResponse } from '@/lib/types';

interface CardProps {
  capsules: GetCapsulesResponse | undefined;
}

export default function SliderHomePageDashboard({ capsules }: CardProps) {
  const userCapsules = useMemo(() => capsules?.items ?? [], [capsules]);

  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useEffect(() => {
    if (!swiper) return;
    requestAnimationFrame(() => swiper.update());
    if (document?.fonts?.ready) {
      document.fonts.ready.then(() => swiper.update());
    }
  }, [swiper]);

  return (
    <>
      <div className="flex items-center md:flex-row flex-col justify-between md:gap-4 gap-1">
        <div className='flex items-center gap-2'>
          <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>آخرین کپسول های ساخته شده</span>
          <div className="flex gap-1 items-center text-3xl">
            <FaLongArrowAltRight onClick={() => swiper?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${isBeginning ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
            <FaLongArrowAltLeft onClick={() => swiper?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${isEnd ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
          </div>
        </div>
        <Link className="flex group items-center gap-2 lg:mt-0 mt-6 text-base" href="/dashboard/user-capsules">
          <span className="text-foreground/80 group-hover:text-primary/80 duration-300">مشاهده تمامی کپسول ها</span>
          <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
        </Link>
      </div>

      <div className="w-full lg:px-4 mx-auto max-w-[250px] sm:max-w-[250px] md:max-w-[630px] lg:max-w-[730px] xl:max-w-4xl 2xl:max-w-7xl">
        <Swiper
          dir="rtl"
          observer
          observeParents
          observeSlideChildren
          onSwiper={(s) => {
            setSwiper(s);
            setIsBeginning(s.isBeginning);
            setIsEnd(s.isEnd);
            requestAnimationFrame(() => s.update());
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
            320: { slidesPerView: 1, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 'auto', spaceBetween: 20 },
          }}
        >
          {userCapsules?.slice(0, 5)?.map((item) => (
            <SwiperSlide key={item._id} className="pt-10 lg:max-w-[300px] shrink-0">
              <Card className="flex flex-col relative justify-between bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-center text-xl mt-2 text-foreground">{item?.access?.visibility === 'public' ? 'کپسول عمومی' : 'کپسول خصوصی'}</CardTitle>
                  <CardDescription className="text-center text-base text-foreground/80">
                    <span>{item?.owner?.name ?? item?.owner?.email}</span>
                    <p>
                      موضوع : <span>{item.title}</span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <Separator className="bg-foreground/20" />
                <CardContent>
                  <p className="line-clamp-3">{item.description}</p>
                </CardContent>
                <Separator className="bg-foreground/20" />
                <CardFooter className="flex py-4 items-center justify-center">
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href={`/dashboard/user-capsules/${item._id}`}>
                    <span>دیدن کپسول</span>
                    <FaLongArrowAltLeft className="text-2xl" />
                  </Link>
                </CardFooter>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

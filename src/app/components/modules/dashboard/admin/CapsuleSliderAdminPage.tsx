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

export default function CapsuleSliderAdmin({ capsules }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useEffect(() => {
    swiper?.update();
  }, [swiper, capsules]);

  return (
    <>
      <div className="flex flex-col lg:px-0 px-2 lg:flex-row lg:items-center justify-between w-full">
        <div className="flex items-center lg:justify-center justify-between gap-4">
          <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>آخرین کپسول های ساخته شده کاربران</span>
          <div className="flex gap-1 items-center text-3xl">
            <FaLongArrowAltRight onClick={() => swiper?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${isBeginning ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
            <FaLongArrowAltLeft onClick={() => swiper?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${isEnd ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
          </div>
        </div>
        <Link className="flex group items-center gap-2 lg:mt-0 mt-6 text-base" href="/dashboard/admin/capsules">
          <span className="text-foreground/80 group-hover:text-primary/80 duration-300">مشاهده تمامی کپسول ها</span>
          <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
        </Link>
      </div>
      <div className="relative overflow-visible w-full lg:px-4 mx-auto max-w-[400px] md:max-w-[430px] lg:max-w-[530px] xl:max-w-4xl 2xl:max-w-6xl min-h-[400px]">
        {capsules.length > 0 && (
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
            {capsules.slice(0, 6).map((capsule) => {
              return (
                <SwiperSlide key={capsule._id} className="pt-10 lg:max-w-[300px] shrink-0">
                  <Card className="flex flex-col justify-between relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                    <CardHeader>
                      <div className="absolute -top-[8%] left-1/2 -translate-x-1/2">
                        <Avatar className="h-12 w-12 ring-2 ring-secondary">
                          <AvatarImage src={capsule.owner?.avatar ? `http://localhost:8080/images/${capsule.owner.avatar}` : '/images/default.png'} />
                          <AvatarFallback>...</AvatarFallback>
                        </Avatar>
                      </div>
                      <CardTitle className="text-center text-xl mt-2 text-foreground">{capsule.access?.visibility === 'private' ? 'کپسول خصوصی' : 'کپسول عمومی'}</CardTitle>
                      <CardDescription className="text-center text-base text-foreground/80">
                        <span className="text-sm line-clamp-2">{capsule.owner?.name ?? capsule.owner?.email}</span>
                        <p className="text-sm">
                          موضوع : <span>{capsule.title}</span>
                        </p>
                      </CardDescription>
                    </CardHeader>
                    <Separator className="bg-foreground/20" />
                    <CardContent>
                      <p className="line-clamp-3 h-[50px]">{capsule.description}</p>
                    </CardContent>
                    <Separator className="bg-foreground/20" />
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
      </div>
    </>
  );
}

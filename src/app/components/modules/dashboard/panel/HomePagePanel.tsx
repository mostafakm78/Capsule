'use client';

import { Separator } from '@/components/ui/separator';
import { BsCapsule } from 'react-icons/bs';
import { IoPeopleSharp } from 'react-icons/io5';
import { GrFormView } from 'react-icons/gr';
import { IoWarningOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

import 'swiper/css';
import Image from 'next/image';

type SwiperApi = {
  slidePrev: () => void;
  slideNext: () => void;
};

export default function HomePagePanel() {
  const [swiperApi, setSwiperApi] = useState<SwiperApi | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="flex flex-col justify-center h-full gap-10">
      <div className="grid grid-cols-12 w-full p-4 gap-2">
        <div className="border-emerald-500 dark:border-emerald-500/60 xl:col-span-3 col-span-6 flex items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className="bg-emerald-500 p-2 rounded-full">
            <BsCapsule className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation="vertical" className="bg-foreground/20" />
          <div className="flex flex-col items-start text-foreground 2xl:text-xl md:text-base text-sm justify-around">
            <span>کپسول های ساخته شده</span>
            <span>52</span>
          </div>
        </div>
        <div className="border-purple-500 dark:border-purple-500/60 flex xl:col-span-3 col-span-6 items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className="bg-purple-500 p-2 rounded-full">
            <IoPeopleSharp className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation="vertical" className="bg-foreground/20" />
          <div className="flex flex-col items-start text-foreground 2xl:text-xl md:text-base text-sm justify-around">
            <span>کپسول های عمومی شما</span>
            <span>15</span>
          </div>
        </div>
        <div className="border-rose-500 dark:border-rose-500/60 flex xl:col-span-3 col-span-6 items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className="bg-rose-500 p-2 rounded-full">
            <IoWarningOutline className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation="vertical" className="bg-foreground/20" />
          <div className="flex flex-col items-start text-foreground 2xl:text-xl md:text-base text-sm justify-around">
            <span>کپسول های بن شده</span>
            <span>1</span>
          </div>
        </div>
        <div className="border-yellow-500 dark:border-yellow-500/60 xl:col-span-3 col-span-6 flex items-center gap-2 bg-white dark:bg-slate-900 border-2 rounded-lg py-4 px-2">
          <div className="bg-yellow-500 p-2 rounded-full">
            <GrFormView className="lg:text-3xl text-xl text-background" />
          </div>
          <Separator orientation="vertical" className="bg-foreground/20" />
          <div className="flex flex-col items-start text-foreground 2xl:text-xl md:text-base text-sm justify-around">
            <span>آخرین بازدید</span>
            <span>دیروز</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full p-4">
        <div className="flex flex-col lg:px-0 px-2 lg:flex-row lg:items-center justify-between w-full">
          <div className="flex items-center lg:justify-center justify-between gap-4">
            <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>آخرین کپسول های ساخته شده</span>
            <div className="flex gap-1 items-center text-3xl">
              <FaLongArrowAltRight onClick={() => swiperApi?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${isBeginning ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
              <FaLongArrowAltLeft onClick={() => swiperApi?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${isEnd ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
            </div>
          </div>
          <Link className="flex group items-center gap-2 lg:mt-0 mt-6 text-base" href="/dashboard/user-capsules">
            <span className="text-foreground/80 group-hover:text-primary/80 duration-300">مشاهده تمامی کپسول ها</span>
            <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
          </Link>
        </div>
        <div
          className="w-full lg:px-4 mx-auto
                max-w-md
                sm:max-w-xl
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
              <Card className="flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <div className="absolute -top-[8%] left-1/2 -translate-x-1/2">
                    <Avatar className="h-12 w-12 ring-2 ring-secondary">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CP</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-center text-xl mt-2 text-foreground">کپسول خصوصی</CardTitle>
                  <CardDescription className="text-center text-base text-foreground/80">
                    <span>مصطفی کمری</span>
                    <p>
                      موضوع : <span>تصادف مرگبار</span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <Separator className="bg-foreground/20" />
                <CardContent>
                  <p className="line-clamp-3">من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم!</p>
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
            <SwiperSlide className="pt-10 lg:max-w-[300px] shrink-0">
              <Card className="flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <div className="absolute -top-[8%] left-1/2 -translate-x-1/2">
                    <Avatar className="h-12 w-12 ring-2 ring-secondary">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CP</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-center text-xl mt-2 text-foreground">کپسول خصوصی</CardTitle>
                  <CardDescription className="text-center text-base text-foreground/80">
                    <span>مصطفی کمری</span>
                    <p>
                      موضوع : <span>تصادف مرگبار</span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <Separator className="bg-foreground/20" />
                <CardContent>
                  <p className="line-clamp-3">من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم!</p>
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
            <SwiperSlide className="pt-10 lg:max-w-[300px] shrink-0">
              <Card className="flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <div className="absolute -top-[8%] left-1/2 -translate-x-1/2">
                    <Avatar className="h-12 w-12 ring-2 ring-secondary">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CP</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-center text-xl mt-2 text-foreground">کپسول خصوصی</CardTitle>
                  <CardDescription className="text-center text-base text-foreground/80">
                    <span>مصطفی کمری</span>
                    <p>
                      موضوع : <span>تصادف مرگبار</span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <Separator className="bg-foreground/20" />
                <CardContent>
                  <p className="line-clamp-3">من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم!</p>
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
            <SwiperSlide className="pt-10 lg:max-w-[300px] shrink-0">
              <Card className="flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <div className="absolute -top-[8%] left-1/2 -translate-x-1/2">
                    <Avatar className="h-12 w-12 ring-2 ring-secondary">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CP</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-center text-xl mt-2 text-foreground">کپسول خصوصی</CardTitle>
                  <CardDescription className="text-center text-base text-foreground/80">
                    <span>مصطفی کمری</span>
                    <p>
                      موضوع : <span>تصادف مرگبار</span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <Separator className="bg-foreground/20" />
                <CardContent>
                  <p className="line-clamp-3">من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم!</p>
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
            <SwiperSlide className="pt-10 lg:max-w-[300px] shrink-0">
              <Card className="flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <div className="absolute -top-[8%] left-1/2 -translate-x-1/2">
                    <Avatar className="h-12 w-12 ring-2 ring-secondary">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CP</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-center text-xl mt-2 text-foreground">کپسول خصوصی</CardTitle>
                  <CardDescription className="text-center text-base text-foreground/80">
                    <span>مصطفی کمری</span>
                    <p>
                      موضوع : <span>تصادف مرگبار</span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <Separator className="bg-foreground/20" />
                <CardContent>
                  <p className="line-clamp-3">من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم!</p>
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
          </Swiper>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 px-6">
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کپسول جدید</span>
        <div className="flex gap-2 items-center py-4 px-2 border border-foreground/20 rounded-lg lg:w-2/3 w-full">
          <Image src="/images/cartoon-question.png" alt="question" width={100} height={100} />
          <div className="flex flex-col gap-1">
            <p className="lg:text-lg text-base font-bold text-foreground/80">شما میتونین از این قسمت یا از پنل سمت راست کپسول جدید بسازید.</p>
            <Link className="flex group items-center gap-2 lg:mt-0 mt-2 text-base" href="">
            <span className="text-foreground/80 group-hover:text-primary/80 duration-300">ساخت کپسول جدید</span>
            <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

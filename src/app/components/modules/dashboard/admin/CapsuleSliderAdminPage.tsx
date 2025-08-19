'use client';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import 'swiper/css';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';

interface CardProps {
  setSwiperApi: (swiper: SwiperClass) => void;
  setIsEnd: (value: boolean) => void;
  setIsBeginning: (value: boolean) => void;
}

export default function CapsuleSliderAdmin({ setSwiperApi, setIsBeginning, setIsEnd }: CardProps) {
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
  );
}

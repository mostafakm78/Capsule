'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

import callApi from '@/app/services/callApi';
import { Capsule } from '@/lib/types';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export default function LastCapsules() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [capsules, setCapsules] = useState<Capsule[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // fetch only once on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await callApi().get('/public/capsules');
        if (res.status === 200) {
          setCapsules(res.data.items);
        } else {
          setCapsules([]);
        }
      } catch {
        setCapsules([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // update swiper when data/instance ready
  useEffect(() => {
    if (swiper && capsules) swiper.update();
  }, [swiper, capsules]);

  return (
    <main className="flex h-[400px] items-center justify-center">
      <div className="lg:px-10 px-4 flex flex-col lg:w-[90%] w-full justify-center items-center">
        {/* Header */}
        <header className="flex flex-col mt-12 lg:px-0 px-2 lg:flex-row lg:items-center justify-center w-full">
          <div className="flex items-center lg:justify-center justify-between gap-4">
            <span className='text-foreground lg:text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2 text-sm'>آخرین کپسول های ساخته شده مشابه</span>
            <div className="flex gap-1 items-center text-3xl">
              <FaLongArrowAltRight onClick={() => swiper?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${capsules && capsules.length > 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`} aria-label="Previous" />
              <FaLongArrowAltLeft onClick={() => swiper?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${capsules && capsules.length > 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`} aria-label="Next" />
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="w-full max-w-[1200px] mx-auto">
          {!loading && capsules && capsules.length === 0 && <div className="h-[300px] w-full flex items-center justify-center border border-foreground/50 rounded-lg mt-2 text-3xl">کپسولی ساخته نشده!</div>}

          {capsules && capsules.length > 0 && (
            <Swiper dir="rtl" slidesPerView="auto" autoHeight spaceBetween={30} observeParents observer rewind={capsules.length <= 1} modules={[Autoplay]} autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }} onSwiper={setSwiper}>
              {capsules.slice(0, 8).map((item) => (
                <SwiperSlide key={item._id} className="flex-shrink-0 w-auto sm:w-64">
                  <Card className="flex flex-col relative bg-white py-0 hover:shadow-2xl hover:scale-[101%] hover:shadow-foreground/20 duration-300 dark:bg-slate-900 h-[420px] border-none shadow-sm ring-2 ring-primary/20">
                    <CardHeader className="px-0">
                      {/* avatar */}
                      <div className="absolute z-[50] -top-[5%] left-1/2 -translate-x-1/2">
                        <Avatar className="h-12 w-12 ring-2 ring-secondary">
                          <AvatarImage className="object-cover" src={item.owner?.avatar ? `${baseURL}/images/${item.owner.avatar}` : '/images/default.png'} alt={`${item.owner?.name ?? 'User'} avatar`} />
                          <AvatarFallback>...</AvatarFallback>
                        </Avatar>
                      </div>

                      {/* image wrapper: relative + fixed height */}
                      <div className="relative w-full h-48 rounded-t-md overflow-hidden">
                        <Image src={item.image ? `${baseURL}/images/${item.image}` : '/images/def.jpg'} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" priority />
                      </div>

                      <CardDescription className="text-center text-sm text-foreground/80">
                        <p>
                          از کاربر : <span>{item?.owner?.name ?? item.owner?.email}</span>
                        </p>
                        <p>
                          موضوع : <span>{item.title}</span>
                        </p>
                      </CardDescription>
                    </CardHeader>

                    <Separator className="bg-foreground/20" />

                    <CardContent className="h-[50px]">
                      <p className="line-clamp-2 w-full h-full break-words">{item.description}</p>
                    </CardContent>

                    <Separator className="bg-foreground/20" />

                    <CardFooter className="flex py-4 items-center justify-center">
                      <Link className="flex py-1 group px-2 rounded-md items-center justify-center gap-2 w-2/3 h-[50px] text-lg text-background relative" href={`/capsules/${item._id}`}>
                        <div className="w-full relative h-full flex items-center">
                          <div className="bg-background dark:bg-foreground relative after:content-[''] after:absolute after:h-full after:w-full after:border-6 after:border-accent dark:after:border-accent/10 after:border-l-0 after:rounded-r-full border-2 border-black h-full w-2/2 rounded-r-full group-hover:translate-x-8 group-hover:rotate-6 duration-300">
                            <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-foreground dark:text-background">دیدن</span>
                          </div>
                          <div className="bg-red-400/80 relative after:content-[''] after:absolute after:h-full after:w-full after:border-6 after:border-red-400/70 after:border-r-0 after:rounded-l-full border-2 border-black h-full w-2/2 rounded-l-full group-hover:-translate-x-8 duration-300">
                            <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-foreground dark:text-background">کپسول</span>
                          </div>
                        </div>
                        <FaLongArrowAltLeft className="text-4xl absolute text-foreground opacity-0 group-hover:opacity-100 duration-200" aria-hidden="true" />
                      </Link>
                    </CardFooter>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </section>
      </div>
    </main>
  );
}

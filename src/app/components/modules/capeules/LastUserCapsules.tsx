'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Capsule, UserSafe } from '@/lib/types';
import { Autoplay } from 'swiper/modules';
import callApi from '@/app/services/callApi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

type Props = { userId: UserSafe | undefined; capsuleId: string | undefined };

export default function LastUserCapsules({ userId, capsuleId }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [capsules, setCapsules] = useState<Capsule[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const isObjectId = (v?: string): v is string => !!v && /^[0-9a-fA-F]{24}$/.test(v);
      if (!isObjectId(userId?._id)) return;
      try {
        const res = await callApi().get(`/public/usercapsules/${userId?._id}`);
        if (res.status === 200) {
          setCapsules(res.data.items);
          setLoading(false);
        } else {
          setCapsules(null);
          setLoading(false);
        }
      } catch {
        setCapsules(null);
        setLoading(false);
      }
    })();
  }, [userId?._id]);

  useEffect(() => {
    swiper?.update();
  }, [swiper, capsules]);

  const filterCapsules = capsules?.filter((capsule) => capsule._id !== capsuleId);

  return (
    <>
      {loading ? (
        <div>در حال بارگزاری</div>
      ) : (
        <>
          <div className="flex flex-col mt-12 lg:px-0 px-2 lg:flex-row lg:items-center justify-center w-full">
            <div className="flex items-center lg:justify-center justify-between gap-4">
              <span className='text-foreground lg:text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2 text-sm'>آخرین کپسول های ساخته شده {userId?.name ?? ''}</span>
              <div className="flex gap-1 items-center text-3xl">
                <FaLongArrowAltRight onClick={() => swiper?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${capsules && capsules.length > 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`} />
                <FaLongArrowAltLeft onClick={() => swiper?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${capsules && capsules.length > 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`} />
              </div>
            </div>
          </div>
          <div className="relative overflow-visible w-full lg:px-4 mx-auto max-w-[400px] md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl min-h-[400px]">
            {filterCapsules && filterCapsules.length <= 0 && <div className="h-[300px] w-full flex items-center justify-center border border-foreground/50 rounded-lg mt-2 text-3xl">کپسولی دیگه پیدا نشده !</div>}
            {filterCapsules && filterCapsules.length > 0 && (
              <Swiper
                dir="rtl"
                slidesPerView="auto"
                spaceBetween={30}
                observeParents
                observer
                rewind={filterCapsules.length <= 1}
                modules={[Autoplay]}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                onSwiper={(s) => {
                  setSwiper(s);
                }}
              >
                {filterCapsules?.slice(0, 8)?.map((item) => (
                  <SwiperSlide key={item._id} className="!w-[276px] shrink-0 pt-10">
                    <Card key={item._id} className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white py-0 hover:shadow-2xl hover:scale-[101%] hover:shadow-foreground/20 duration-300 dark:bg-slate-900 h-[420px] border-none shadow-sm ring-2 ring-primary/20">
                      <CardHeader className="px-0">
                        <div className="absolute z-[50] -top-[5%] left-1/2 -translate-x-1/2">
                          <Avatar className="h-12 w-12 ring-2 ring-secondary">
                            <AvatarImage className="object-cover" src={item.owner?.avatar ? `http://localhost:8080/images/${item.owner.avatar}` : '/images/default.png'} />
                            <AvatarFallback>...</AvatarFallback>
                          </Avatar>
                        </div>
                        <Image className="object-cover w-full h-[130px] mb-2 p-0.5 rounded-t-md rounded-b-sm shadow-secondary/30" src={item.image ? `http://localhost:8080/images/${item.image}` : '/images/def.jpg'} alt="capsule image" width={500} height={500} unoptimized />
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
                        <Link className="flex py-1 group px-2 rounded-md items-center justify-center gap-2 w-2/3 h-[50px] text-lg text-background" href={`/capsules/${item._id}`}>
                          <div className="w-full relative h-full flex items-center">
                            <div className="bg-background dark:bg-foreground relative after:content-[''] after:absolute after:h-full after:w-full after:border-6 after:border-accent dark:after:border-accent/10 after:border-l-0 after:rounded-r-full border-2 border-black h-full w-2/2 rounded-r-full group-hover:translate-x-8 group-hover:rotate-6 duration-300">
                              <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-foreground dark:text-background">دیدن</span>
                            </div>
                            <div className="bg-red-400/80 relative after:content-[''] after:absolute after:h-full after:w-full after:border-6 after:border-red-400/70 after:border-r-0 after:rounded-l-full border-2 border-black h-full w-2/2 rounded-l-full group-hover:-translate-x-8 duration-300">
                              <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-foreground dark:text-background">کپسول</span>
                            </div>
                          </div>
                          <FaLongArrowAltLeft className="text-4xl absolute text-foreground opacity-0 group-hover:opacity-100 duration-200" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </>
      )}
    </>
  );
}

'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { useEffect, useMemo, useState } from 'react';
import { Capsule, UserSafe } from '@/lib/types';
import { Autoplay } from 'swiper/modules';
import callApi from '@/app/services/callApi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

type Props = { userId: UserSafe | undefined; capsuleId: string | undefined };

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function LastUserCapsules({ userId, capsuleId }: Props) {
  // Hold Swiper instance to control navigation programmatically
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  // Fetched list of the user's capsules
  const [capsules, setCapsules] = useState<Capsule[] | null>(null);
  // Loading state while fetching
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch capsules for the given user (guarding for valid Mongo ObjectId)
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

  // Ensure Swiper re-measures layout when data/instance updates
  useEffect(() => {
    swiper?.update();
  }, [swiper, capsules]);

  // Exclude the currently viewed capsule from the list
  const filterCapsules = useMemo(() => {
    return capsules?.filter((capsule) => capsule._id !== capsuleId);
  }, [capsuleId, capsules]);

  return (
    <>
      {/* Loading feedback (polite for screen readers) */}
      {loading ? (
        <div aria-live="polite">در حال بارگزاری</div>
      ) : (
        <>
          {/* Header bar: section title + previous/next controls (semantic header; classes unchanged) */}
          <header className="flex flex-col mt-12 lg:px-0 px-2 lg:flex-row lg:items-center justify-center w-full" aria-label={`Last capsules of user ${userId?.name ?? ''}`}>
            <div className="flex items-center lg:justify-center justify-between gap-4">
              {/* Section heading with decorative dot via ::after */}
              <span
                className='text-foreground lg:text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2 text-sm'
                aria-label={`Heading for last capsules of user ${userId?.name ?? ''}`}
              >
                آخرین کپسول های ساخته شده {userId?.name ?? ''}
              </span>

              {/* Carousel navigation controls (RTL): prev/next */}
              <div className="flex gap-1 items-center text-3xl" role="group" aria-label="Carousel navigation">
                <FaLongArrowAltRight onClick={() => swiper?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${capsules && capsules.length > 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`} aria-label="Previous capsule" />
                <FaLongArrowAltLeft onClick={() => swiper?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${capsules && capsules.length > 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`} aria-label="Next capsule" />
              </div>
            </div>
          </header>

          {/* Carousel region: container for user's last capsules (semantic section; classes unchanged) */}
          <section className="relative overflow-visible w-full lg:px-4 mx-auto max-w-[400px] md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl min-h-[400px]" role="region" aria-label={`Carousel of last capsules by ${userId?.name ?? ''}`}>
            {/* Empty-state notice when no more capsules exist */}
            {filterCapsules && filterCapsules.length <= 0 && (
              <div className="h-[300px] w-full flex items-center justify-center border border-foreground/50 rounded-lg mt-2 text-3xl" aria-live="polite">
                کپسولی دیگه پیدا نشده !
              </div>
            )}

            {/* Autoplaying Swiper slider when there are capsules to show */}
            {filterCapsules && filterCapsules.length > 0 && (
              <Swiper
                dir="rtl" // RTL layout for Persian
                slidesPerView="auto" // Automatically fits multiple slides
                spaceBetween={30} // Spacing between slides
                observeParents // Recompute on parent size changes
                observer // Observe mutations for updates
                rewind={filterCapsules.length <= 1} // Allow rewind if single slide
                modules={[Autoplay]} // Autoplay module
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                onSwiper={(s) => {
                  // Capture swiper instance to use with arrow icons above
                  setSwiper(s);
                }}
                aria-label={`Swiper slider for last capsules by ${userId?.name ?? ''}`}
              >
                {/* Render up to 8 slides from filtered list */}
                {filterCapsules?.slice(0, 8)?.map((item) => (
                  <SwiperSlide key={item._id} className="!w-[276px] shrink-0 pt-10" aria-label={`Capsule titled ${item.title}`}>
                    {/* Capsule card with avatar, cover image, and meta */}
                    <Card
                      key={item._id}
                      className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white py-0 hover:shadow-2xl hover:scale-[101%] hover:shadow-foreground/20 duration-300 dark:bg-slate-900 h-[420px] border-none shadow-sm ring-2 ring-primary/20"
                      aria-label={`Capsule card titled ${item.title} by ${item.owner?.name ?? item.owner?.email}`}
                    >
                      {/* Card header: owner avatar, cover image, and details */}
                      <CardHeader className="px-0">
                        {/* Owner avatar floating above the cover image */}
                        <div className="absolute z-[50] -top-[5%] left-1/2 -translate-x-1/2">
                          <Avatar className="h-12 w-12 ring-2 ring-secondary" aria-label={`Owner avatar: ${item.owner?.name ?? 'User'}`}>
                            <AvatarImage className="object-cover" src={item.owner?.avatar ? `${baseURL}/images/${item.owner.avatar}` : '/images/default.png'} alt={`${item.owner?.name ?? 'User'} avatar`} />
                            <AvatarFallback>...</AvatarFallback>
                          </Avatar>
                        </div>

                        {/* Cover image (with default fallback) */}
                        <Image className="object-cover w-full h-[130px] mb-2 p-0.5 rounded-t-md rounded-b-sm shadow-secondary/30" src={item.image ? `${baseURL}/images/${item.image}` : '/images/def.jpg'} alt={`${item.title} image`} width={500} height={500} priority />

                        {/* Meta info: owner and title */}
                        <CardDescription className="text-center text-sm text-foreground/80">
                          <p>
                            از کاربر : <span>{item?.owner?.name ?? item.owner?.email}</span>
                          </p>
                          <p>
                            موضوع : <span>{item.title}</span>
                          </p>
                        </CardDescription>
                      </CardHeader>

                      {/* Divider */}
                      <Separator className="bg-foreground/20" />

                      {/* Short description (two-line clamp) */}
                      <CardContent className="h-[50px]">
                        <p className="line-clamp-2 w-full h-full break-words">{item.description}</p>
                      </CardContent>

                      {/* Divider */}
                      <Separator className="bg-foreground/20" />

                      {/* CTA: navigate to capsule details page */}
                      <CardFooter className="flex py-4 items-center justify-center">
                        <Link className="flex py-1 group px-2 rounded-md items-center justify-center gap-2 w-2/3 h-[50px] text-lg text-background" href={`/capsules/${item._id}`} aria-label={`View capsule titled ${item.title}`}>
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
        </>
      )}
    </>
  );
}

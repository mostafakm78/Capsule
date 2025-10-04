'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { useEffect, useMemo, useState } from 'react';
import { Capsule } from '@/lib/types';
import { Autoplay } from 'swiper/modules';
import callApi from '@/app/services/callApi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

type Props = {
  singleCapsule: Capsule | undefined;
};

type WithId = { _id: string };
type IdLike = string | WithId | null | undefined;

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function LastRelatedCapsules({ singleCapsule }: Props) {
  // Swiper instance for programmatic navigation
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  // All capsules fetched from the public API (to compute related items)
  const [capsules, setCapsules] = useState<Capsule[] | null>(null);

  // Fetch latest public capsules on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await callApi().get(`/public/capsules`);
        if (res.status === 200) {
          setCapsules(res.data.items);
        } else {
          setCapsules(null);
        }
      } catch {
        setCapsules(null);
      }
    })();
  }, []);

  // Update Swiper layout whenever data or instance changes
  useEffect(() => {
    swiper?.update();
  }, [swiper, capsules]);

  // Helper to normalize an id-like value to a string id
  const getId = (v: IdLike): string | undefined => (typeof v === 'string' ? v : v?._id);

  // Current capsule's category id to filter related items
  const currentCatId = getId(singleCapsule?.categoryItem);

  // Compute related capsules by matching category and excluding the current capsule
  const related = useMemo(() => {
    if (!currentCatId) return [];
    return (capsules ?? []).filter((c) => getId(c.categoryItem) === currentCatId).filter((c) => c._id !== singleCapsule?._id);
  }, [capsules, currentCatId, singleCapsule?._id]);

  return (
    <>
      {/* Header bar: title + carousel navigation controls (prev/next) */}
      <header className="flex flex-col mt-12 lg:px-0 px-2 lg:flex-row lg:items-center justify-center w-full" aria-label="Related Capsules Section">
        <div className="flex items-center lg:justify-center justify-between gap-4">
          {/* Section heading with a decorative dot (via ::after) */}
          <span className='text-foreground lg:text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2 text-sm' aria-label="Last related capsules heading">
            آخرین کپسول های ساخته شده مشابه
          </span>

          {/* Carousel manual controls (RTL): previous / next */}
          <div className="flex gap-1 items-center text-3xl" role="group" aria-label="Carousel navigation">
            <FaLongArrowAltRight onClick={() => swiper?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${capsules && capsules.length > 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`} aria-label="Previous capsule" />
            <FaLongArrowAltLeft onClick={() => swiper?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${capsules && capsules.length > 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`} aria-label="Next capsule" />
          </div>
        </div>
      </header>

      {/* Carousel container: region landmark for related capsules list */}
      <section className="relative overflow-visible w-full lg:px-4 mx-auto max-w-[400px] md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl min-h-[400px]" role="region" aria-label="Related capsules carousel">
        {/* Empty state when no related capsules exist */}
        {related && related.length <= 0 && (
          <div className="h-[300px] w-full flex items-center justify-center border border-foreground/50 rounded-lg mt-2 text-3xl" aria-live="polite">
            کپسولی ساخته نشده !
          </div>
        )}

        {/* Autoplaying Swiper when related items are available */}
        {related && related.length > 0 && (
          <Swiper
            dir="rtl" // RTL layout for Persian
            slidesPerView="auto" // Adaptive number of visible slides
            spaceBetween={30} // Gap between slides
            observeParents // Recalculate on parent resize
            observer // Observe mutations
            rewind={related.length <= 1} // Loop back if only one slide
            modules={[Autoplay]} // Enable autoplay
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSwiper={(s) => {
              // Capture swiper instance for programmatic controls
              setSwiper(s);
            }}
            aria-label="Related capsules slider"
          >
            {/* Render up to 8 related capsules as slides */}
            {related?.slice(0, 8)?.map((item) => (
              <SwiperSlide key={item._id} className="!w-[276px] shrink-0 pt-10" aria-label={`Capsule titled ${item.title}`}>
                {/* Each card is a self-contained content item */}
                <Card
                  key={item._id}
                  className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white py-0 hover:shadow-2xl hover:scale-[101%] hover:shadow-foreground/20 duration-300 dark:bg-slate-900 h-[420px] border-none shadow-sm ring-2 ring-primary/20"
                  aria-label={`Capsule card titled ${item.title} by ${item.owner?.name ?? item.owner?.email}`}
                >
                  {/* Card header with avatar, cover image, and meta */}
                  <CardHeader className="px-0">
                    {/* Owner avatar, visually floating above the cover image */}
                    <div className="absolute z-[50] -top-[5%] left-1/2 -translate-x-1/2">
                      <Avatar className="h-12 w-12 ring-2 ring-secondary" aria-label={`Owner avatar: ${item.owner?.name ?? 'User'}`}>
                        <AvatarImage className="object-cover" src={item.owner?.avatar ? `${baseURL}/images/${item.owner.avatar}` : '/images/default.png'} alt={`${item.owner?.name ?? 'User'} avatar`} />
                        <AvatarFallback>...</AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Cover image (falls back to default) */}
                    <Image className="object-cover w-full h-[130px] mb-2 p-0.5 rounded-t-md rounded-b-sm shadow-secondary/30" src={item.image ? `${baseURL}/images/${item.image}` : '/images/def.jpg'} alt={`${item.title} image`} width={500} height={500} priority />

                    {/* Meta: owner name/email and capsule title */}
                    <CardDescription className="text-center text-sm text-foreground/80">
                      <p>
                        از کاربر : <span>{item?.owner?.name ?? item.owner?.email}</span>
                      </p>
                      <p>
                        موضوع : <span>{item.title}</span>
                      </p>
                    </CardDescription>
                  </CardHeader>

                  {/* Visual divider */}
                  <Separator className="bg-foreground/20" />

                  {/* Short description (clamped to 2 lines) */}
                  <CardContent className="h-[50px]">
                    <p className="line-clamp-2 w-full h-full break-words">{item.description}</p>
                  </CardContent>

                  {/* Visual divider */}
                  <Separator className="bg-foreground/20" />

                  {/* CTA: go to capsule details */}
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
  );
}

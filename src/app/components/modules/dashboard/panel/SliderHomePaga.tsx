'use client'; // Ensure this component runs on the client (hooks, effects, browser-only libs)

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { MdOutlineAccessTime } from 'react-icons/md';
import { Capsule } from '@/lib/types';

type Props = { capsules: Capsule[] };

export default function SliderHomePageDashboard({ capsules }: Props) {
  // Hold a reference to the Swiper instance to control it programmatically
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  // Track whether the carousel is at the beginning or end (for disabling nav arrows)
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  // Whenever data or the instance changes, ask Swiper to recalc sizes/positions
  useEffect(() => {
    swiper?.update();
  }, [swiper, capsules]);

  return (
    <>
      {/* Header row: title + carousel navigation (prev/next) + "view all" link */}
      <div className="flex flex-col lg:px-0 px-2 lg:flex-row lg:items-center justify-between w-full">
        {/* Section title and inline arrow controls */}
        <div className="flex items-center lg:justify-center justify-between gap-4">
          <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>آخرین کپسول های ساخته شده</span>
          {/* Prev/Next buttons: become disabled (pointer-events-none) at bounds */}
          <div className="flex gap-1 items-center text-3xl">
            <FaLongArrowAltRight onClick={() => swiper?.slidePrev()} className={`cursor-pointer transition-opacity duration-300 ${isBeginning ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
            <FaLongArrowAltLeft onClick={() => swiper?.slideNext()} className={`cursor-pointer transition-opacity duration-300 ${isEnd ? 'opacity-40 pointer-events-none' : 'opacity-100'}`} />
          </div>
        </div>

        {/* Link to see all capsules (kept outside the slider) */}
        <Link className="flex group items-center gap-2 lg:mt-0 mt-6 text-base" href="/dashboard/admin/capsules">
          <span className="text-foreground/80 group-hover:text-primary/80 duration-300">مشاهده تمامی کپسول ها</span>
          <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
        </Link>
      </div>

      {/* Slider container with responsive max widths */}
      <div className="relative overflow-visible w-full lg:px-4 mx-auto max-w-[400px] md:max-w-[430px] lg:max-w-[530px] xl:max-w-4xl 2xl:max-w-5xl min-h-[400px]">
        {/* Empty state when there are no capsules to display */}
        {capsules.length <= 0 && <div className="flex items-center w-full h-full justify-center text-2xl lg:text-3xl text-foreground/80">شما هنوز کپسولی نساختین!</div>}

        {/* Swiper carousel when items exist */}
        {capsules.length > 0 && (
          <Swiper
            dir="rtl" // RTL layout for Persian UI
            slidesPerView="auto" // Let slides size themselves (fixed width via CSS)
            spaceBetween={30} // Gap between slides
            observeParents={true} // Recalculate when parent size changes
            observer={true} // Observe the slider itself for DOM changes
            onSwiper={(s) => {
              // Save instance and initialize edge states
              setSwiper(s);
              setIsBeginning(s.isBeginning);
              setIsEnd(s.isEnd);
            }}
            onSlideChange={(s) => {
              // Update edge states on slide movement (used to toggle nav button states)
              setIsBeginning(s.isBeginning);
              setIsEnd(s.isEnd);
            }}
          >
            {/* Slides wrapper (kept inside Swiper for correct layout) */}
            <div className="w-full h-full">
              {capsules?.slice(0, 5)?.map((item) => (
                // Each slide: a fixed-width card with capsule info and action
                <SwiperSlide key={item._id} className="!w-[276px] shrink-0 pt-10">
                  <Card className="flex flex-col relative justify-between bg-white dark:bg-slate-900 h-[380px] border-none">
                    {/* Card header: visibility + optional unlock time + meta */}
                    <CardHeader>
                      <CardTitle className="text-center text-xl flex items-center justify-center gap-2 text-foreground">
                        {item?.access?.visibility === 'public' ? 'کپسول عمومی' : 'کپسول خصوصی'}
                        {/* Show lock/clock icon when unlockAt exists */}
                        {item.access?.unlockAt && <span className="text-2xl text-secondary">{item.access?.unlockAt ? <MdOutlineAccessTime /> : null}</span>}
                      </CardTitle>
                      <CardDescription className="text-center">
                        <p className="text-foreground font-medium">
                          از کاربر : <span className="text-sm text-foreground/80 font-light">{item?.owner?.name ?? item?.owner?.email}</span>
                        </p>
                        <p className="text-foreground font-medium">
                          موضوع : <span className="text-sm text-foreground/80 font-light">{item.title}</span>
                        </p>
                      </CardDescription>
                    </CardHeader>

                    {/* Divider */}
                    <Separator className="bg-foreground/20" />

                    {/* Truncated description (3 lines) */}
                    <CardContent>
                      <p className="line-clamp-3 text-center text-foreground/80 font-light min-h-[50px]">{item.description}</p>
                    </CardContent>

                    {/* Divider */}
                    <Separator className="bg-foreground/20" />

                    {/* Footer with CTA to open the capsule details (dashboard path) */}
                    <CardFooter className="flex py-4 items-center justify-center">
                      <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href={`/dashboard/user-capsules/${item._id}`}>
                        <span>دیدن کپسول</span>
                        <FaLongArrowAltLeft className="text-2xl" />
                      </Link>
                    </CardFooter>
                  </Card>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        )}
      </div>
    </>
  );
}

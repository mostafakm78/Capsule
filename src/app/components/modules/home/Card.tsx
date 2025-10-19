'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';

import './styles.css';

import { EffectCards } from 'swiper/modules';
import Image from 'next/image';

import { Swiper as SwiperClass } from 'swiper/types';

interface CardProps {
  // Exposes the Swiper instance to the parent component
  setSwiperApi: (swiper: SwiperClass) => void;
  // Notifies parent when the swiper is at the last slide
  isEnd: (value: boolean) => void;
  // Notifies parent when the swiper is at the first slide
  isBegining: (value: boolean) => void;
}

export default function Card({ setSwiperApi, isEnd, isBegining }: CardProps) {
  return (
    <>
      <section aria-labelledby="testimonials-heading">
        {/* Section heading; improves structure and discoverability */}
        <Swiper
          aria-label="نظرات کاربران"
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          onSwiper={(swiper) => setSwiperApi(swiper)}
          onSlideChange={(swiper) => {
            isEnd(swiper.isEnd);
            isBegining(swiper.isBeginning);
          }}
          className="mySwiper"
        >
          {/* === Slide 1 === */}
          <SwiperSlide>
            {/* Each testimonial is a self-contained piece, so <article> is appropriate */}
            <article className="w-full relative h-full text-background/90 dark:text-foreground/90 flex flex-col p-6 items-center justify-center gap-4">
              {/* Quote content wrapped in <blockquote> for proper citation semantics */}
              <blockquote>
                <p className="md:text-lg text-base font-light text-center">هر روز از پسرم یه عکس می‌گیرم و با چند خط توضیح توی کپسول ثبتش می‌کنم. دلم می‌خواد وقتی بزرگ شد، ببینه مامانش چقدر براش لحظه‌به‌لحظه خاطره ساخته</p>
              </blockquote>

              <figure className="flex items-center justify-center gap-6">
                <Image className="rounded-full w-[50px] h-[50px]" src="/images/default.png" alt="default profile photo" width={50} height={50} />
                <figcaption className="text-lg font-medium">
                  <cite>الناز احمدی</cite>
                </figcaption>
              </figure>
            </article>
          </SwiperSlide>

          {/* === Slide 2 === */}
          <SwiperSlide>
            <article className="w-full h-full flex flex-col text-background/90 dark:text-foreground/90 p-6 items-center justify-center gap-4">
              <blockquote>
                <p className="md:text-lg text-base font-light text-center">قبل از اینکه از ایران برم، چندتا ویدئو و یادداشت از خونواده‌م توی کپسول گذاشتم. تو غربت هروقت دلم تنگ می‌شه، یه سر به خاطره‌هام می‌زنم</p>
              </blockquote>

              <figure className="flex items-center justify-center gap-6">
                <Image className="rounded-full w-[50px] h-[50px]" src="/images/default.png" alt="default profile photo" width={50} height={50} />
                <figcaption className="text-lg font-medium">
                  <cite>فرید موسوی</cite>
                </figcaption>
              </figure>
            </article>
          </SwiperSlide>

          {/* === Slide 3 === */}
          <SwiperSlide>
            <article className="w-full h-full flex flex-col text-background/90 dark:text-foreground/90 p-6 items-center justify-center gap-4">
              <blockquote>
                <p className="md:text-lg text-base font-light text-center">تولد ۳۰ سالگیمو کامل توی یه کپسول ثبت کردم: عکس، ویدئو، متنِ دوستام. وقتی برگشتم و دیدمش، اشکم دراومد. کپسول مثل یک آلبوم دیجیتالِ زنده‌ست</p>
              </blockquote>

              <figure className="flex items-center justify-center gap-6">
                <Image className="rounded-full w-[50px] h-[50px]" src="/images/default.png" alt="default profile photo" width={50} height={50} />
                <figcaption className="text-lg font-medium">
                  <cite>سارا نعمتی</cite>
                </figcaption>
              </figure>
            </article>
          </SwiperSlide>

          {/* === Slide 4 === */}
          <SwiperSlide>
            <article className="w-full h-full flex flex-col text-background/90 dark:text-foreground/90 p-6 items-center justify-center gap-4">
              <blockquote>
                <p className="md:text-lg text-base font-light text-center">من یه کپسول ساختم برای روزی که ازدواج کنم. هر وقت حسی خاصی دارم، یه صدای کوتاه ضبط می‌کنم و می‌ذارمش اون تو. یه روزی می‌خوام با همسرم بازش کنیم</p>
              </blockquote>

              <figure className="flex items-center justify-center gap-6">
                <Image className="rounded-full w-[50px] h-[50px]" src="/images/default.png" alt="default profile photo" width={50} height={50} />
                <figcaption className="text-lg font-medium">
                  <cite>محمدرضا تاج‌الدینی</cite>
                </figcaption>
              </figure>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}

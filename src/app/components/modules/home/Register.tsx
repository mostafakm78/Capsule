'use client';

import { ShinyButton } from '@/components/magicui/shiny-button';
import Link from 'next/link';
import { IoLockClosedOutline } from 'react-icons/io5';

export default function Register() {
  return (
    <section className="flex flex-col mb-16 px-10 justify-center mt-44 items-center">
      <div className="flex gap-10 justify-center items-center">
        <div className="w-full space-y-6">
          <div className="flex items-center">
            <svg className="text-foreground lg:ml-4 lg:flex hidden mt-2" width="37" height="34" viewBox="0 0 37 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="24" r="10" fill="currentColor"></circle>
              <circle cx="30" cy="13" r="7" fill="currentColor" fillOpacity="0.4"></circle>
              <circle cx="15" cy="4" r="4" fill="currentColor" fillOpacity="0.7"></circle>
            </svg>
            <h4 className="text-4xl font-kalmeh text-foreground">خاطرات امروز، گنجینه فردای تو هستند.</h4>
          </div>
          <p className="text-xl text-foreground/70 w-2/3 ">متن، عکس، ویدئو یا صدایی که امروز ثبت می‌کنی، فردا ممکنه باارزش‌ترین چیزی باشه که داری</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <h4 className="text-2xl">همین حالا اولین کپسول خاطره‌ات رو بساز!</h4>
          <div className="flex items-center justify-center gap-2 text-2xl">
            <span className="relative z-[2] after:content-[''] after:absolute after:w-[30px] after:h-[30px] after:top-2 after:left-3 after:rounded-full after:bg-yellow-500/25">
              <IoLockClosedOutline className="text-yellow-500" />
            </span>
            <h4 className="text-foreground/70">امن، شخصی، برای همیشه</h4>
          </div>
          <ShinyButton className="w-full bg-secondary hover:bg-primary hover:border-primary shadow-lg py-4">
            <Link href="">شروع رایگان</Link>
          </ShinyButton>
        </div>
      </div>
    </section>
  );
}

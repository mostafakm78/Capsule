// app/capsules/loading.tsx
'use client';

import { Skeleton } from '@/components/ui/skeleton';

function CapsulesCategorySkeleton() {
  return (
    <div className="lg:col-span-3 lg:block md:flex md:justify-center md:gap-10 w-full space-y-4 lg:place-self-start">
      {/* مرتب‌سازی */}
      <div className="bg-white md:w-full h-[90px] overflow-hidden rounded-lg shadow-md dark:bg-slate-900 flex flex-col p-8">
        <div className="flex items-center justify-between">
          <h6 className="text-xl font-semibold">مرتب سازی بر اساس</h6>
          <div className="cursor-pointer lg:hidden">
            <Skeleton className="h-6 w-6 rounded" />
          </div>
        </div>
        <div className="w-full bg-foreground/20 my-4 h-px" />
        <div className="flex flex-col gap-5" dir="rtl">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* فیلتر */}
      <div className="bg-white md:w-full h-[90px] overflow-hidden rounded-lg shadow-md dark:bg-slate-900 flex flex-col p-8">
        <div className="flex items-center justify-between">
          <h6 className="text-xl font-semibold">فیلتر بر اساس</h6>
          <div className="cursor-pointer lg:hidden">
            <Skeleton className="h-6 w-6 rounded" />
          </div>
        </div>
        <div className="w-full bg-foreground/20 my-4 h-px" />
        <div className="flex flex-col gap-5" dir="rtl">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-36" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CapsuleCardSkeleton() {
  return (
    <div className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white py-0 dark:bg-slate-900 h-[420px] border-none shadow-sm rounded-md overflow-hidden">

      {/* Header (کاور + توضیحات وسط‌چین) */}
      <div className="px-0">
        <Skeleton className="object-cover w-full h-[130px] mb-2 rounded-t-md rounded-b-sm" />
        <div className="text-center px-4 space-y-2">
          <Skeleton className="h-4 w-48 mx-auto" />
          <Skeleton className="h-4 w-40 mx-auto" />
        </div>
      </div>

      {/* Separator */}
      <div className="bg-foreground/20 h-px mx-0 my-2" />

      {/* Content متن کوتاه */}
      <div className="px-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
      </div>

      {/* Separator */}
      <div className="bg-foreground/20 h-px mx-0 my-2" />

      {/* Footer دکمه‌های دوبخشی */}
      <div className="flex py-4 items-center justify-center px-4 mt-auto">
        <div className="flex py-1 px-2 rounded-md items-center justify-center gap-2 w-2/3 h-[50px]">
          <Skeleton className="h-full w-1/2 rounded-r-full" />
          <Skeleton className="h-full w-1/2 rounded-l-full" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <section className="flex items-center justify-center" dir="rtl">
      <div className="px-4 md:px-6 lg:px-10 flex flex-col lg:w-[90%] w-full justify-center items-center">
        {/* عنوان و توضیح (متن واقعی طبق صفحه اصلی) */}
        <div className="flex flex-col gap-3 self-start">
          <h4 className="text-4xl font-kalmeh text-foreground">کپسول های عمومی</h4>
          <p className="lg:text-lg text-base text-foreground/80">خاطره ها و تجربیاتی که کاربرای کپسول دوست داشتن با بقیه به اشتراک بزارن اینجاست!</p>
        </div>

        {/* شبکه اصلی: سایدبار + کارت‌ها (بدون pagination) */}
        <div className="grid lg:grid-cols-12 grid-cols-1 w-full gap-10 mt-14 place-items-center">
          <CapsulesCategorySkeleton />
          <div className="lg:col-span-9 w-full min-h-screen place-self-start">
            <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-y-10 gap-x-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CapsuleCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

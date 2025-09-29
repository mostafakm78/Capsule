'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <section className="flex items-center justify-center">
      <div className="lg:px-10 px-4 flex flex-col lg:w-[90%] w-full justify-center items-center">
        <Skeleton className="mt-4 flex relative items-center gap-2 bg-slate-900 rounded-t-lg w-full h-[400px]">
          <Skeleton className="absolute top-10 right-10 flex flex-col items-start gap-2">
            <Skeleton className="h-15 w-15 ring-2 rounded-full ring-foreground/20"></Skeleton>
            <Skeleton className="bg-foreground/20 p-1 rounded-md w-[70px]"></Skeleton>
          </Skeleton>
        </Skeleton>
        <Skeleton className="mt-4 flex relative items-center gap-2 bg-slate-900 rounded-b-lg w-full h-[400px]"></Skeleton>
      </div>
    </section>
  );
}

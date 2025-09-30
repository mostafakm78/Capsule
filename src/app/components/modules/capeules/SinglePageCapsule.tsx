'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Capsule } from '@/lib/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Loadings from '../../shared/loadings';
import LastUserCapsules from './LastUserCapsules';
import Link from 'next/link';
import LastRelatedCapsules from './LastRelatedCapsules copy';

type Props = {
  capsule: Capsule | undefined;
};

export default function SinglePageCapsule({ capsule }: Props) {
  const [singleCapsule, setSingleCapsule] = useState<Capsule | undefined>(undefined);

  useEffect(() => {
    if (!capsule) return;
    setSingleCapsule(capsule);
  }, [capsule]);

  if (capsule === undefined) {
    return <Loadings />;
  }

  const lastSeen = singleCapsule?.createdAt;

  const persianDate = lastSeen
    ? new Date(lastSeen).toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const color = singleCapsule?.color;
  let colorCode;
  if (!color || color === 'default') {
    colorCode = 'bg-white dark:bg-slate-900';
  } else if (color === 'blue') {
    colorCode = 'bg-blue-600/15 dark:bg-blue-800/50';
  } else if (color === 'green') {
    colorCode = 'bg-green-600/15 dark:bg-green-800/50';
  } else if (color === 'red') {
    colorCode = 'bg-red-600/15 dark:bg-red-800/50';
  } else if (color === 'yellow') {
    colorCode = 'bg-yellow-500/15 dark:bg-yellow-700/50';
  }

  return (
    <section className="flex items-center justify-center">
      <div className="lg:px-10 px-4 flex flex-col lg:w-[90%] w-full justify-center items-center">
        <div className="mt-4 flex relative items-center gap-2 bg-slate-900 rounded-t-lg w-full h-[400px]">
          <Image className="object-cover w-full h-full rounded-t-lg" src={singleCapsule?.image ? `http://localhost:8080/images/${singleCapsule?.image}` : '/images/def.jpg'} alt="capsule image" width={500} height={500} unoptimized />
          <div className="absolute top-10 right-10 flex flex-col items-start gap-2">
            <Avatar className="h-15 w-15 ring-2 ring-secondary">
              <AvatarImage className="object-cover" src={singleCapsule?.owner?.avatar ? `http://localhost:8080/images/${singleCapsule?.owner.avatar}` : '/images/default.png'} />
              <AvatarFallback>...</AvatarFallback>
            </Avatar>
            <div className="bg-secondary/80 p-1 rounded-md">
              از کاربر : <span>{singleCapsule?.owner?.name ?? 'بی نام'}</span>
            </div>
          </div>
        </div>
        <div className={`flex flex-col lg:p-10 p-3 gap-10 relative items-center ${colorCode} rounded-b-lg w-full`}>
          <span className="text-2xl self-start text-foreground/80 font-bold">موضوع : {singleCapsule?.title}</span>
          <div className="w-full flex flex-col lg:flex-row gap-10 items-center justify-center">
            <p className="text-lg text-foreground bg-background lg:w-1/2 w-full h-[400px] overflow-y-auto p-6 rounded-md break-words text-right">{singleCapsule?.description}</p>
            <p className="text-lg text-foreground bg-background lg:w-1/2 w-full h-[400px] overflow-y-auto p-6 rounded-md break-words text-right">{singleCapsule?.extra}</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <span className="text-foreground/80">دسته بندی کپسول :</span>
            <Link href={`/capsules?categoryItem=${singleCapsule?.categoryItem?._id}`} className="bg-background p-1 px-3 rounded-2xl hover:scale-105 duration-300 text-foreground/80">
              {singleCapsule?.categoryItem?.title}
            </Link>
          </div>
          <div className="self-start">
            <span className="text-foreground/80">
              ارسال شده در تاریخ : <span>{persianDate}</span>
            </span>
          </div>
        </div>
        <LastUserCapsules capsuleId={singleCapsule?._id} userId={singleCapsule?.owner} />
        <LastRelatedCapsules singleCapsule={singleCapsule} />
      </div>
    </section>
  );
}

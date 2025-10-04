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

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function SinglePageCapsule({ capsule }: Props) {
  // Local mirror of the incoming capsule prop to allow effects/transitions if needed
  const [singleCapsule, setSingleCapsule] = useState<Capsule | undefined>(undefined);

  // Hydrate local state when capsule prop becomes available/changes
  useEffect(() => {
    if (!capsule) return;
    setSingleCapsule(capsule);
  }, [capsule]);

  // Show loading state while capsule is undefined
  if (capsule === undefined) {
    return <Loadings aria-live="polite" />;
  }

  // Format capsule creation date in Persian calendar for display
  const lastSeen = singleCapsule?.createdAt;

  const persianDate = lastSeen
    ? new Date(lastSeen).toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // Choose background color based on capsule color theme
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
    // Main landmark for the capsule detail page (keeps classes intact)
    <main className="flex items-center justify-center" aria-label={`Capsule detail page for ${singleCapsule?.title}`}>
      <div className="lg:px-10 px-4 flex flex-col lg:w-[90%] w-full justify-center items-center">
        {/* Hero media area: capsule cover image with owner overlay (semantic figure) */}
        <figure className="mt-4 flex relative items-center gap-2 bg-slate-900 rounded-t-lg w-full h-[400px]" role="region" aria-label="Capsule image and owner">
          {/* Cover image (falls back to default) */}
          <Image className="object-cover w-full h-full rounded-t-lg" src={singleCapsule?.image ? `${baseURL}/images/${singleCapsule?.image}` : '/images/def.jpg'} alt={`${singleCapsule?.title} image`} width={500} height={500} priority />
          {/* Owner avatar + caption chip on the image */}
          <div className="absolute top-10 right-10 flex flex-col items-start gap-2">
            <Avatar className="h-15 w-15 ring-2 ring-secondary" aria-label={`Owner avatar: ${singleCapsule?.owner?.name ?? 'بی نام'}`}>
              <AvatarImage className="object-cover" src={singleCapsule?.owner?.avatar ? `${baseURL}/images/${singleCapsule?.owner.avatar}` : '/images/default.png'} alt={`${singleCapsule?.owner?.name ?? 'بی نام'} avatar`} />
              <AvatarFallback>...</AvatarFallback>
            </Avatar>
            <div className="bg-secondary/80 p-1 rounded-md" aria-label={`Owner name: ${singleCapsule?.owner?.name ?? 'بی نام'}`}>
              از کاربر : <span>{singleCapsule?.owner?.name ?? 'بی نام'}</span>
            </div>
          </div>
        </figure>

        {/* Main article content: title, description, extra text, meta */}
        <article className={`flex flex-col lg:p-10 p-3 gap-10 relative items-center ${colorCode} rounded-b-lg w-full`} role="region" aria-label={`Capsule content for ${singleCapsule?.title}`}>
          {/* Capsule title */}
          <span className="text-2xl self-start text-foreground/80 font-bold" aria-label={`Capsule title: ${singleCapsule?.title}`}>
            موضوع : {singleCapsule?.title}
          </span>

          {/* Two-column content: description & extra (semantic section wrapper) */}
          <section className="w-full flex flex-col lg:flex-row gap-10 items-center justify-center" role="group" aria-label="Capsule description and extra content">
            {/* Description panel (scrollable) */}
            <p className="text-lg text-foreground bg-background lg:w-1/2 w-full h-[400px] overflow-y-auto p-6 rounded-md break-words text-right" aria-label="Capsule description">
              {singleCapsule?.description}
            </p>
            {/* Extra content panel (scrollable) */}
            <p className="text-lg text-foreground bg-background lg:w-1/2 w-full h-[400px] overflow-y-auto p-6 rounded-md break-words text-right" aria-label="Capsule extra content">
              {singleCapsule?.extra}
            </p>
          </section>

          {/* Category badge linking to filtered list */}
          <div className="flex items-center justify-center gap-4" aria-label="Capsule category">
            <span className="text-foreground/80">دسته بندی کپسول :</span>
            <Link href={`/capsules?categoryItem=${singleCapsule?.categoryItem?._id}`} className="bg-background p-1 px-3 rounded-2xl hover:scale-105 duration-300 text-foreground/80" aria-label={`Category: ${singleCapsule?.categoryItem?.title}`}>
              {singleCapsule?.categoryItem?.title}
            </Link>
          </div>

          {/* Creation date (localized Persian string) */}
          <div className="self-start" aria-label={`Capsule created at: ${persianDate}`}>
            <span className="text-foreground/80">
              ارسال شده در تاریخ : <span>{persianDate}</span>
            </span>
          </div>
        </article>

        {/* Slider of the same user's latest capsules (component, unchanged) */}
        <LastUserCapsules capsuleId={singleCapsule?._id} userId={singleCapsule?.owner} />

        {/* Slider of related capsules by the same category (component, unchanged) */}
        <LastRelatedCapsules singleCapsule={singleCapsule} />
      </div>
    </main>
  );
}

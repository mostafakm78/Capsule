'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { LinkProps } from '@/lib/types';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import gsap from 'gsap';

const sortLinks: LinkProps[] = [
  { link: '/', title: 'همه کپسول ها' },
  { link: '/', title: 'جدید ترین' },
  { link: '/', title: 'قدیمی ترین' },
];

const filterLinks: LinkProps[] = [
  { link: '/', title: 'خوشحال‌کننده' },
  { link: '/', title: 'ناراحت‌کننده' },
  { link: '/', title: 'هیجان‌انگیز' },
  { link: '/', title: 'آرامش‌بخش' },
  { link: '/', title: 'ترسناک' },
  { link: '/', title: 'الهام‌بخش' },
  { link: '/', title: 'رویا' },
  { link: '/', title: 'سفر' },
  { link: '/', title: 'خانواده' },
  { link: '/', title: 'دوستان' },
  { link: '/', title: 'عشق' },
  { link: '/', title: 'کار' },
  { link: '/', title: 'چالش‌ها' },
  { link: '/', title: 'کودکی' },
  { link: '/', title: 'نوجوانی' },
  { link: '/', title: 'خاطره شخصی' },
  { link: '/', title: 'بزرگسالی' },
  { link: '/', title: 'مدرسه / دانشگاه' },
];

export default function CapsuelesAdminCategory() {
  const [openSections, setOpenSections] = useState({ sort: false, filter: false });
  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortIconRef = useRef<HTMLDivElement>(null);
  const filterIconRef = useRef<HTMLDivElement>(null);

  const toggleSection = (section: 'sort' | 'filter') => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderLinks = (links: LinkProps[]) => (
    <RadioGroup className="flex flex-col gap-5" dir="rtl" defaultValue="new">
      {links.map((links, i) => (
        <div key={i} className="flex items-center space-x-2">
          <RadioGroupItem className="border-none bg-accent dark:bg-foreground/80 focus:bg-foreground/70 cursor-pointer h-6 w-6" value="new" id={`link-${i}`} />
          <Label htmlFor={`link-${i}`}>
            <Link href={links.link} className="text-base text-foreground/80">
              {links.title}
            </Link>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 1024;

    if (sortRef.current) {
      gsap.to(sortRef.current, {
        height: isMobile ? (openSections.sort ? sortRef.current.scrollHeight : 90) : 'auto',
        duration: 0.5,
        ease: 'power2.out',
        overflow: openSections.sort ? 'visible' : 'hidden',
      });
      if (sortIconRef.current) gsap.to(sortIconRef.current, { rotate: openSections.sort ? 180 : 0, duration: 0.3 });
    }

    if (filterRef.current) {
      gsap.to(filterRef.current, {
        height: isMobile ? (openSections.filter ? filterRef.current.scrollHeight : 90) : 'auto',
        duration: 0.5,
        ease: 'power2.out',
        overflow: openSections.filter ? 'visible' : 'hidden',
      });
      if (filterIconRef.current) gsap.to(filterIconRef.current, { rotate: openSections.filter ? 180 : 0, duration: 0.3 });
    }
  }, [openSections]);

  return (
    <div className="lg:col-span-3 lg:block md:flex md:justify-center md:gap-10 w-full space-y-4 lg:place-self-start">
      {/* مرتب سازی */}
      <div ref={sortRef} className="bg-white md:w-full h-[90px] overflow-hidden rounded-lg shadow-md dark:bg-slate-900 flex flex-col p-8">
        <div className="flex items-center justify-between">
          <h6 className="text-xl font-semibold">مرتب سازی بر اساس</h6>
          <div ref={sortIconRef} className="cursor-pointer lg:hidden" onClick={() => toggleSection('sort')}>
            <FaCaretDown className="text-2xl" />
          </div>
        </div>
        <Separator className="w-full bg-foreground/20 my-4" />
        {renderLinks(sortLinks)}
      </div>

      {/* فیلتر */}
      <div ref={filterRef} className="bg-white md:w-full h-[90px] overflow-hidden rounded-lg shadow-md dark:bg-slate-900 flex flex-col p-8">
        <div className="flex items-center justify-between">
          <h6 className="text-xl font-semibold">فیلتر بر اساس</h6>
          <div ref={filterIconRef} className="cursor-pointer lg:hidden" onClick={() => toggleSection('filter')}>
            <FaCaretDown className="text-2xl" />
          </div>
        </div>
        <Separator className="w-full bg-foreground/20 my-4" />
        {renderLinks(filterLinks)}
      </div>
    </div>
  );
}

'use client';

import { Separator } from '@/components/ui/separator';
import { CategoryItem, LinkProps } from '@/lib/types';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import gsap from 'gsap';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import callApi from '@/app/services/callApi';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const sortLinks: LinkProps[] = [
  { link: `/capsules?sort=newest`, title: 'جدید ترین' },
  { link: `/capsules?sort=oldest`, title: 'قدیمی ترین' },
];

export default function CapsuelesCategory() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const [openSections, setOpenSections] = useState({ sort: false, filter: false });
  const [categoryItem, setCategoryItem] = useState<CategoryItem[] | null>(null);
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortIconRef = useRef<HTMLDivElement>(null);
  const filterIconRef = useRef<HTMLDivElement>(null);

  const toggleSection = (section: 'sort' | 'filter') => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  function parseCategoriesFromParams(sp: ReadonlyURLSearchParams): string[] {
    const multi = sp.getAll('categoryItem');
    const single = sp.get('categoryItem') || '';
    const fromComma = single
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const values = (multi.length ? multi : fromComma).map(String);
    return Array.from(new Set(values));
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await callApi().get('/public/categories');
        if (res.status === 200) setCategoryItem(res.data.categoryItems);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const pushWithParams = (mutator: (p: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const qs = params.toString();
    router.push(qs ? `/capsules?${qs}` : '/capsules');
  };

  const lastHrefRef = useRef<string>('');
  useEffect(() => {
    const hrefNow = `${pathName}?${searchParams.toString()}`;
    if (lastHrefRef.current === hrefNow) return;
    lastHrefRef.current = hrefNow;

    setSelectCategories(parseCategoriesFromParams(searchParams));
  }, [pathName, searchParams]);

  function toggleCategory(id: string, checked: boolean) {
    const idStr = String(id);
    setSelectCategories((prev) => (checked ? Array.from(new Set([...prev, idStr])) : prev.filter((x) => x !== idStr)));
  }

  const handleCategoryItem = () => {
    if (selectCategories.length === 0) {
      router.push('/capsules');
      return;
    }
    pushWithParams((params) => {
      params.delete('categoryItem');

      selectCategories.forEach((id) => params.append('categoryItem', id));
    });
  };

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

  const linkClasses = (href: string) => {
    const isSamePath = pathName === '/capsules' || pathName.startsWith('/capsules');
    const hrefSort = new URL(href, typeof window !== 'undefined' ? window.location.origin : 'http://localhost').searchParams.get('sort');
    const currentSort = searchParams.get('sort');
    const isActive = isSamePath && currentSort === hrefSort;

    return `
    text-foreground/90 pr-6 py-1 text-base
    relative hover:text-primary duration-300
    after:content-[''] after:bg-foreground/70 after:absolute
    after:right-2 after:h-2 after:w-2 after:rounded-full
    after:top-1/2 after:-translate-y-1/2
    hover:after:bg-primary after:duration-300
    ${isActive ? 'bg-primary rounded-md text-background' : ''}
  `;
  };

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
        <div className="flex flex-col gap-2">
          {sortLinks.map((item, i) => (
            <Link key={i} href={item.link} className={linkClasses(item.link)}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* فیلتر */}
      <div ref={filterRef} className="bg-white md:w-full h-[90px] overflow-hidden rounded-lg shadow-md dark:bg-slate-900 flex flex-col p-8">
        <div className="flex items-center justify-between">
          <h6 className="text-xl font-semibold">فیلتر بر اساس دسته‌بندی</h6>
          <div ref={filterIconRef} className="cursor-pointer lg:hidden" onClick={() => toggleSection('filter')}>
            <FaCaretDown className="text-2xl" />
          </div>
        </div>
        <Separator className="w-full bg-foreground/20 my-4" />
        <div className="flex flex-wrap gap-1 space-y-1.5">
          {categoryItem &&
            categoryItem.map((item) => {
              const checked = selectCategories.includes(item?._id);
              return (
                <label
                  key={item._id}
                  htmlFor={`cat-${item._id}`}
                  className={`
                        flex items-center gap-3 cursor-pointer rounded-md px-2 py-1${checked ? 'bg-primary/10' : 'hover:bg-foreground/5'}`}
                >
                  <Checkbox id={`cat-${item._id}`} className="cursor-pointer" checked={checked} onCheckedChange={(val) => toggleCategory(item._id, Boolean(val))} />
                  <span className="text-sm">{item.title}</span>
                </label>
              );
            })}
        </div>
        <Button onClick={handleCategoryItem} className="cursor-pointer mt-3">
          جستجو
        </Button>
      </div>
    </div>
  );
}

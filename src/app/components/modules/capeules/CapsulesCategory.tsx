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

// Static config: sort links and their labels
const sortLinks: LinkProps[] = [
  { link: `/capsules?sort=newest`, title: 'جدید ترین' },
  { link: `/capsules?sort=oldest`, title: 'قدیمی ترین' },
];

export default function CapsuelesCategory() {
  // Next.js routing + query helpers
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  // UI state: open/closed sections for accordion-like behavior on mobile
  const [openSections, setOpenSections] = useState({ sort: false, filter: false });

  // Remote data: categories fetched from API
  const [categoryItem, setCategoryItem] = useState<CategoryItem[] | null>(null);

  // Controlled selection state for category checkboxes
  const [selectCategories, setSelectCategories] = useState<string[]>([]);

  // Refs for animating height/rotation with GSAP
  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortIconRef = useRef<HTMLDivElement>(null);
  const filterIconRef = useRef<HTMLDivElement>(null);

  // Toggle handler for collapsible sections (sort/filter)
  const toggleSection = (section: 'sort' | 'filter') => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Parse selected categories from URLSearchParams (supports multi & comma-separated)
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

  // Fetch categories on mount
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

  // Push URL with mutated query params (preserves other params)
  const pushWithParams = (mutator: (p: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const qs = params.toString();
    router.push(qs ? `/capsules?${qs}` : '/capsules');
  };

  // Keep a snapshot of the last href to avoid redundant state updates
  const lastHrefRef = useRef<string>('');
  useEffect(() => {
    const hrefNow = `${pathName}?${searchParams.toString()}`;
    if (lastHrefRef.current === hrefNow) return;
    lastHrefRef.current = hrefNow;

    setSelectCategories(parseCategoriesFromParams(searchParams));
  }, [pathName, searchParams]);

  // Toggle a single category id in local selection state
  function toggleCategory(id: string, checked: boolean) {
    const idStr = String(id);
    setSelectCategories((prev) => (checked ? Array.from(new Set([...prev, idStr])) : prev.filter((x) => x !== idStr)));
  }

  // Apply selected categories to the URL (or reset to /capsules if none selected)
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

  // Animate collapsible sections on mobile (height + chevron rotation)
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

  // Utility: compute classes for sort links (adds active state based on current query)
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
    // Sidebar landmark wrapping categories & sorting (semantic aside; classes unchanged)
    <aside className="lg:col-span-3 lg:block md:flex md:justify-center md:gap-10 w-full space-y-4 lg:place-self-start" aria-label="Capsules Category and Sorting Section">
      {/* Sort section card (semantic section; layout/style preserved) */}
      <section ref={sortRef as React.RefObject<HTMLDivElement>} className="bg-white md:w-full h-[90px] overflow-hidden rounded-lg shadow-md dark:bg-slate-900 flex flex-col p-8" aria-label="Sort Section">
        {/* Section header: title + mobile toggle button */}
        <header className="flex items-center justify-between">
          <h6 className="text-xl font-semibold" aria-label="Sort by">
            مرتب سازی بر اساس
          </h6>
          <div ref={sortIconRef} className="cursor-pointer lg:hidden" onClick={() => toggleSection('sort')} aria-label="Toggle Sort Options" role="button" tabIndex={0}>
            <FaCaretDown className="text-2xl" aria-hidden="true" />
          </div>
        </header>

        {/* Divider */}
        <Separator className="w-full bg-foreground/20 my-4" />

        {/* Sort options (kept as list-like links; roles preserved) */}
        <div className="flex flex-col gap-2" role="list">
          {sortLinks.map((item, i) => (
            <Link key={i} href={item.link} className={linkClasses(item.link)} aria-label={`Sort by ${item.title}`} role="listitem">
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Filter section card (semantic section; layout/style preserved) */}
      <section ref={filterRef as React.RefObject<HTMLDivElement>} className="bg-white md:w-full h-[90px] overflow-hidden rounded-lg shadow-md dark:bg-slate-900 flex flex-col p-8" aria-label="Filter Section">
        {/* Section header: title + mobile toggle button */}
        <header className="flex items-center justify-between">
          <h6 className="text-xl font-semibold" aria-label="Filter by Category">
            فیلتر بر اساس دسته‌بندی
          </h6>
          <div ref={filterIconRef} className="cursor-pointer lg:hidden" onClick={() => toggleSection('filter')} aria-label="Toggle Filter Options" role="button" tabIndex={0}>
            <FaCaretDown className="text-2xl" aria-hidden="true" />
          </div>
        </header>

        {/* Divider */}
        <Separator className="w-full bg-foreground/20 my-4" />

        {/* Categories as a wrap list of checkbox labels */}
        <div className="flex flex-wrap gap-1 space-y-1.5" role="list">
          {categoryItem &&
            categoryItem.map((item) => {
              const checked = selectCategories.includes(item?._id);
              return (
                <label
                  key={item._id}
                  htmlFor={`cat-${item._id}`}
                  className={`
                        flex items-center gap-3 cursor-pointer rounded-md px-2 py-1${checked ? 'bg-primary/10' : 'hover:bg-foreground/5'}`}
                  aria-label={`Category ${item.title}`}
                  role="listitem"
                >
                  {/* Controlled checkbox bound to selection state */}
                  <Checkbox id={`cat-${item._id}`} className="cursor-pointer" checked={checked} onCheckedChange={(val) => toggleCategory(item._id, Boolean(val))} aria-checked={checked} />
                  <span className="text-sm">{item.title}</span>
                </label>
              );
            })}
        </div>

        {/* Apply selected categories to the query string */}
        <Button onClick={handleCategoryItem} className="cursor-pointer mt-3" aria-label="Search by selected categories">
          جستجو
        </Button>
      </section>
    </aside>
  );
}

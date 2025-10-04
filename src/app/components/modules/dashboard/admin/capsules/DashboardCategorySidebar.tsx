'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { IoFilterSharp } from 'react-icons/io5';
import { Bungee } from 'next/font/google';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CategoryItem, LinkProps } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import callApi from '@/app/services/callApi';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const bungee = Bungee({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

// Semantic: static list of sort links used in the sidebar "Sort by" section
const sortLinks: LinkProps[] = [
  { link: `/dashboard/admin/capsules?sort=newest`, title: 'جدید ترین' },
  { link: `/dashboard/admin/capsules?sort=oldest`, title: 'قدیمی ترین' },
];

// Semantic: radio options for capsule visibility filter
const capsuleType = [
  { title: 'عمومی', value: 'public' },
  { title: 'خصوصی', value: 'private' },
  { title: 'همه', value: 'all' },
] as const;

type CpType = (typeof capsuleType)[number]['value'] | '';

// Utility (pure): parse selected categories from URLSearchParams (supports multi & comma-separated)
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

// Component: Admin capsules filter sidebar (opens in a Sheet/Drawer)
export function DashboardCategorySidebar() {
  // Router/navigation helpers
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // State: list of all category items (fetched from API)
  const [categoryItem, setCategoryItem] = useState<CategoryItem[] | null>(null);
  // State: IDs of categories selected by the user (synced with URL)
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  // State: selected capsule visibility (public/private/all), synced with URL
  const [CpType, setCpType] = useState<CpType>('');

  // Effect: fetch categories for filter UI on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await callApi().get('/admin/categories');
        if (res.status === 200) setCategoryItem(res.data.categoryItems);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Ref: Track last href to avoid redundant state updates when URL doesn't change
  const lastHrefRef = useRef<string>('');
  useEffect(() => {
    const hrefNow = `${pathName}?${searchParams.toString()}`;
    if (lastHrefRef.current === hrefNow) return;
    lastHrefRef.current = hrefNow;

    // Sync selected categories from URL on route/query changes
    setSelectCategories(parseCategoriesFromParams(searchParams));

    // Sync visibility (CpType) from URL on route/query changes
    const vis = searchParams.get('visibility');
    setCpType(vis === 'public' || vis === 'private' ? vis : '');
  }, [pathName, searchParams]);

  // Handler: toggle a category id in local selection state
  function toggleCategory(id: string, checked: boolean) {
    const idStr = String(id);
    setSelectCategories((prev) => (checked ? Array.from(new Set([...prev, idStr])) : prev.filter((x) => x !== idStr)));
  }

  // Helper: construct a new query string by mutating current params then push to router
  const pushWithParams = (mutator: (p: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const qs = params.toString();
    router.push(qs ? `/dashboard/admin/capsules?${qs}` : '/dashboard/admin/capsules');
  };

  // Action: apply selected categories to URL (removes when none)
  const handleCategoryItem = () => {
    if (selectCategories.length === 0) {
      router.push('/dashboard/admin/capsules');
      return;
    }
    pushWithParams((params) => {
      params.delete('categoryItem');
      // Append each selected category as separate query entries
      selectCategories.forEach((id) => params.append('categoryItem', id));
    });
  };

  // Action: apply selected visibility to URL (delete when "all" or empty)
  const handleCpType = () => {
    pushWithParams((params) => {
      if (CpType === 'all' || CpType === '' || CpType == null) {
        params.delete('visibility');
      } else {
        params.set('visibility', CpType);
      }
      // Reset pagination when applying new filter
      params.set('page', '1');
    });
  };

  // UI helper: compute active state styling for sort links based on current URL
  const linkClasses = (href: string) => {
    const isSamePath = pathName === '/dashboard/admin/capsules';
    const hrefQuery = href.split('?')[1] || '';
    const hrefSort = new URLSearchParams(hrefQuery).get('sort');
    const currentSort = searchParams.get('sort');
    const isActive = isSamePath && (hrefSort ? currentSort === hrefSort : !currentSort);
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
    // Semantic container for the floating filters control in the page
    <aside>
      {/* Sheet (drawer) to show filters UI */}
      <Sheet>
        {/* Trigger button (filter icon) – opens the filters panel */}
        <SheetTrigger asChild>
          <IoFilterSharp className="text-2xl cursor-pointer" />
        </SheetTrigger>

        {/* Drawer content */}
        <SheetContent>
          {/* Drawer header with brand/logo (semantic header/title) */}
          <SheetHeader className="items-center mt-10">
            <SheetTitle>
              <div className="brand flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
                <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={50} height={50} />
                <h1 className={`${bungee.className}`}>Capsule</h1>
              </div>
            </SheetTitle>
          </SheetHeader>

          {/* Drawer body – scrollable filter sections */}
          <div className="flex flex-col overflow-y-auto text-foreground/85 py-8 px-5 gap-8">
            {/* Sort section (semantic subsection) */}
            <div>
              <h6 className="text-xl font-semibold">مرتب سازی بر اساس</h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              <div className="flex flex-col gap-2">
                {sortLinks.map((item, i) => (
                  <Link key={i} href={item.link} className={linkClasses(item.link)}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Category filter section */}
            <div className="flex flex-col">
              <h6 className="text-xl font-semibold">فیلتر بر اساس دسته‌بندی</h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              <div className="flex flex-wrap gap-4 pl-6">
                {categoryItem &&
                  categoryItem.map((item) => {
                    const checked = selectCategories.includes(item?._id);
                    return (
                      // Each category item with a checkbox, clickable label for better UX
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
              {/* Apply selected category filters */}
              <Button onClick={handleCategoryItem} className="cursor-pointer mt-3">
                جستجو
              </Button>
            </div>

            {/* Visibility filter section */}
            <div className="flex flex-col">
              <h6 className="text-xl font-semibold">فیلتر بر اساس نوع کپسول</h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              <div className="pl-6">
                {/* Radio group to choose between public/private/all */}
                <RadioGroup dir="rtl" value={CpType} onValueChange={(v) => setCpType(v as CpType)} className="flex flex-wrap gap-4">
                  {capsuleType.map((item, i) => {
                    return (
                      <div key={i} className="flex items-center gap-3 cursor-pointer rounded-md px-2 py-1 hover:bg-foreground/5">
                        <RadioGroupItem className="cursor-pointer" value={item.value} id={item.title} />
                        <Label htmlFor={item.title} className="text-sm cursor-pointer">
                          {item.title}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
              {/* Apply selected visibility filter */}
              <Button onClick={handleCpType} className="cursor-pointer mt-3">
                جستجو
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  );
}

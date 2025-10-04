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

/* Google font for the brand title */
const bungee = Bungee({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

/* Sort options: map to links that set ?sort=newest|oldest */
const sortLinks: LinkProps[] = [
  { link: `/dashboard/user-capsules?sort=newest`, title: 'جدید ترین' },
  { link: `/dashboard/user-capsules?sort=oldest`, title: 'قدیمی ترین' },
];

/* Capsule visibility filter options (public/private/all) */
const capsuleType = [
  { title: 'عمومی', value: 'public' },
  { title: 'خصوصی', value: 'private' },
  { title: 'همه', value: 'all' },
] as const;

type CpType = (typeof capsuleType)[number]['value'] | '';

/* Parse categoryItem(s) from URLSearchParams, supporting both repeated params
   (?categoryItem=a&categoryItem=b) and comma-separated single param (?categoryItem=a,b) */
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

/* Sidebar (Sheet) that exposes sorting and filtering controls for user capsules */
export function DashboardCategorySidebar() {
  /* Router + current route/query to reflect & update filters */
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  /* Categories fetched from API, selected category IDs, and selected visibility */
  const [categoryItem, setCategoryItem] = useState<CategoryItem[] | null>(null);
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [CpType, setCpType] = useState<CpType>('');

  /* Fetch available categories for the current user scope */
  useEffect(() => {
    (async () => {
      try {
        const res = await callApi().get('/capsules/categories');
        if (res.status === 200) setCategoryItem(res.data.categoryItems);
      } catch (error) {
        /* Fallback: keep categories null and log the error */
        console.error(error);
      }
    })();
  }, []);

  /* Track last href snapshot to avoid unnecessary state updates on re-renders */
  const lastHrefRef = useRef<string>('');
  useEffect(() => {
    const hrefNow = `${pathName}?${searchParams.toString()}`;
    if (lastHrefRef.current === hrefNow) return;
    lastHrefRef.current = hrefNow;

    /* Sync selected categories from URL into component state */
    setSelectCategories(parseCategoriesFromParams(searchParams));

    /* Sync visibility radio selection from URL (?visibility=public|private) */
    const vis = searchParams.get('visibility');
    setCpType(vis === 'public' || vis === 'private' ? vis : '');
  }, [pathName, searchParams]);

  /* Toggle a category ID in/out of the selected list */
  function toggleCategory(id: string, checked: boolean) {
    const idStr = String(id);
    setSelectCategories((prev) => (checked ? Array.from(new Set([...prev, idStr])) : prev.filter((x) => x !== idStr)));
  }

  /* Helper: build the next URL with updated query params and navigate */
  const pushWithParams = (mutator: (p: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const qs = params.toString();
    router.push(qs ? `/dashboard/user-capsules?${qs}` : '/dashboard/user-capsules');
  };

  /* Apply category filters:
     - If none selected, navigate to base route (clear filters)
     - Otherwise, clear existing categoryItem params and append current selections */
  const handleCategoryItem = () => {
    if (selectCategories.length === 0) {
      router.push('/dashboard/user-capsules');
      return;
    }
    pushWithParams((params) => {
      params.delete('categoryItem');
      selectCategories.forEach((id) => params.append('categoryItem', id));
    });
  };

  /* Apply capsule type (visibility) filter:
     - Remove ?visibility when set to "all"/empty
     - Otherwise set visibility=public|private
     - Reset paging to page 1 */
  const handleCpType = () => {
    pushWithParams((params) => {
      if (CpType === 'all' || CpType === '' || CpType == null) {
        params.delete('visibility');
      } else {
        params.set('visibility', CpType);
      }
      params.set('page', '1');
    });
  };

  /* Compute link classes for sort options; highlights active sort choice */
  const linkClasses = (href: string) => {
    const isSamePath = pathName === '/dashboard/user-capsules';
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
    /* Semantic container for the filters UI (invoked as a Sheet/drawer) */
    <aside>
      <Sheet>
        {/* Trigger button (filter icon) that opens the Sheet */}
        <SheetTrigger asChild>
          <IoFilterSharp className="text-2xl cursor-pointer" />
        </SheetTrigger>

        {/* Sheet content: brand header + sort & filter sections */}
        <SheetContent>
          <SheetHeader className="items-center mt-10">
            <SheetTitle>
              {/* Brand header (decorative/branding) */}
              <div className="brand flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
                <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={50} height={50} />
                <h1 className={`${bungee.className}`}>Capsule</h1>
              </div>
            </SheetTitle>
          </SheetHeader>

          {/* Scrollable body with sections: Sort, Category filter, Visibility filter */}
          <div className="flex flex-col overflow-y-auto text-foreground/85 py-8 px-5 gap-8">
            {/* Sort section: anchor links that update ?sort= */}
            <section>
              <h6 className="text-xl font-semibold">مرتب سازی بر اساس</h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              <div className="flex flex-col gap-2">
                {sortLinks.map((item, i) => (
                  <Link key={i} href={item.link} className={linkClasses(item.link)}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </section>

            {/* Category filter: checkboxes that build ?categoryItem=<ids> */}
            <section className="flex flex-col">
              <h6 className="text-xl font-semibold">فیلتر بر اساس دسته‌بندی</h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              <div className="flex flex-wrap gap-4 pl-6">
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
                        {/* Checkbox reflects selection; keeps local state only until "جستجو" is clicked */}
                        <Checkbox id={`cat-${item._id}`} className="cursor-pointer" checked={checked} onCheckedChange={(val) => toggleCategory(item._id, Boolean(val))} />
                        <span className="text-sm">{item.title}</span>
                      </label>
                    );
                  })}
              </div>
              {/* Apply category filters and sync to URL */}
              <Button onClick={handleCategoryItem} className="cursor-pointer mt-3">
                جستجو
              </Button>
            </section>

            {/* Visibility filter: radio group writes ?visibility=public|private (or clears) */}
            <section className="flex flex-col">
              <h6 className="text-xl font-semibold">فیلتر بر اساس نوع کپسول</h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              <div className="pl-6">
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
              {/* Apply visibility filter and reset pagination */}
              <Button onClick={handleCpType} className="cursor-pointer mt-3">
                جستجو
              </Button>
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  );
}

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

type Props = {
  userId: string | undefined;
};

// Capsule visibility filter options
const capsuleType = [
  { title: 'عمومی', value: 'public' },
  { title: 'خصوصی', value: 'private' },
  { title: 'همه', value: 'all' },
] as const;

type CpType = (typeof capsuleType)[number]['value'] | '';

/**
 * Parse "categoryItem" values from current search params.
 * Supports both repeated keys (?categoryItem=1&categoryItem=2) and comma-separated lists (?categoryItem=1,2).
 * Returns a unique, normalized list of category IDs (as strings).
 */
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

export function DashboardCategorySidebar({ userId }: Props) {
  // Router & URL helpers
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // Loaded categories from API
  const [categoryItem, setCategoryItem] = useState<CategoryItem[] | null>(null);

  // Currently selected filters (categories & capsule type)
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [CpType, setCpType] = useState<CpType>('');

  // Sorting links built with current user id context
  const sortLinks: LinkProps[] = [
    { link: `/dashboard/admin/users/${userId}?sort=newest`, title: 'جدید ترین' },
    { link: `/dashboard/admin/users/${userId}?sort=oldest`, title: 'قدیمی ترین' },
  ];

  /**
   * Fetch available category items once on mount.
   * Populates checkbox list for category filtering.
   */
  useEffect(() => {
    (async () => {
      try {
        const res = await callApi().get('/capsules/categories');
        if (res.status === 200) setCategoryItem(res.data.categoryItems);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Avoid repeated state updates when the URL hasn't actually changed
  const lastHrefRef = useRef<string>('');
  useEffect(() => {
    const hrefNow = `${pathName}?${searchParams.toString()}`;
    if (lastHrefRef.current === hrefNow) return;
    lastHrefRef.current = hrefNow;

    // Sync selected categories from the URL
    setSelectCategories(parseCategoriesFromParams(searchParams));

    // Sync visibility/capsule type from the URL
    const vis = searchParams.get('visibility');
    setCpType(vis === 'public' || vis === 'private' ? vis : '');
  }, [pathName, searchParams]);

  /**
   * Toggle a single category id in the local selected list.
   * Ensures uniqueness and removes when unchecked.
   */
  function toggleCategory(id: string, checked: boolean) {
    const idStr = String(id);
    setSelectCategories((prev) => (checked ? Array.from(new Set([...prev, idStr])) : prev.filter((x) => x !== idStr)));
  }

  /**
   * Helper: update the URL (push) by mutating a fresh URLSearchParams instance.
   * Keeps other params intact, only applies the provided changes.
   */
  const pushWithParams = (mutator: (p: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const qs = params.toString();
    router.push(qs ? `/dashboard/admin/users/${userId}?${qs}` : `/dashboard/admin/users/${userId}`);
  };

  /**
   * Apply selected categories:
   * - If none selected → navigate to base user page (clears filter)
   * - Else → rewrite all "categoryItem" query params with current selection
   */
  const handleCategoryItem = () => {
    if (selectCategories.length === 0) {
      router.push(`/dashboard/admin/users/${userId}`);
      return;
    }
    pushWithParams((params) => {
      params.delete('categoryItem');
      selectCategories.forEach((id) => params.append('categoryItem', id));
    });
  };

  /**
   * Apply capsule type filter:
   * - 'all' or empty → remove "visibility" from query
   * - 'public' / 'private' → set "visibility"
   * Always resets pagination to page 1.
   */
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

  /**
   * Compute link classes for sort links
   * Highlights the active sort tab based on current URL params
   */
  const linkClasses = (href: string) => {
    const isSamePath = pathName === `/dashboard/admin/users/${userId}`;
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
    // Semantic aside: floating filter sidebar trigger & panel
    <aside>
      <Sheet>
        {/* Trigger icon button that opens the filter sidebar */}
        <SheetTrigger asChild>
          <IoFilterSharp className="text-2xl cursor-pointer" />
        </SheetTrigger>

        {/* Sidebar panel content */}
        <SheetContent>
          {/* Header with brand identity */}
          <SheetHeader className="items-center mt-10">
            <SheetTitle>
              <div className="brand flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
                <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={50} height={50} />
                <h1 className={`${bungee.className}`}>Capsule</h1>
              </div>
            </SheetTitle>
          </SheetHeader>

          {/* Scrollable content area of the filters (semantic: section) */}
          <section className="flex flex-col overflow-y-auto text-foreground/85 py-8 px-5 gap-8">
            {/* Sort section */}
            <section aria-labelledby="sort-title">
              <h6 id="sort-title" className="text-xl font-semibold">
                مرتب سازی بر اساس
              </h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              <nav className="flex flex-col gap-2" aria-label="گزینه‌های مرتب‌سازی">
                {sortLinks.map((item, i) => (
                  <Link key={i} href={item.link} className={linkClasses(item.link)}>
                    {item.title}
                  </Link>
                ))}
              </nav>
            </section>

            {/* Category filter section */}
            <section aria-labelledby="category-filter-title" className="flex flex-col">
              <h6 id="category-filter-title" className="text-xl font-semibold">
                فیلتر بر اساس دسته‌بندی
              </h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              {/* Categories list as a group of checkboxes */}
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
                        <Checkbox id={`cat-${item._id}`} className="cursor-pointer" checked={checked} onCheckedChange={(val) => toggleCategory(item._id, Boolean(val))} />
                        <span className="text-sm">{item.title}</span>
                      </label>
                    );
                  })}
              </div>
              {/* Apply category filters */}
              <Button onClick={handleCategoryItem} className="cursor-pointer mt-3">
                جستجو
              </Button>
            </section>

            {/* Visibility filter section */}
            <section aria-labelledby="visibility-filter-title" className="flex flex-col">
              <h6 id="visibility-filter-title" className="text-xl font-semibold">
                فیلتر بر اساس نوع کپسول
              </h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              {/* Radio group for capsule type (public/private/all) */}
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
              {/* Apply visibility filter */}
              <Button onClick={handleCpType} className="cursor-pointer mt-3">
                جستجو
              </Button>
            </section>
          </section>
        </SheetContent>
      </Sheet>
    </aside>
  );
}

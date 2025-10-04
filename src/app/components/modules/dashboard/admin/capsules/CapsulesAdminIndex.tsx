'use client';

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { GetCapsulesResponse } from '@/lib/types';
import { DashboardCategorySidebar } from './DashboardCategorySidebar';
import { useEffect, useState } from 'react';
import callApi from '@/app/services/callApi';
import { MdOutlineAccessTime } from 'react-icons/md';
import { Input } from '@/components/ui/input';
import { IoIosSearch } from 'react-icons/io';
import { PulseLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { TbZoomQuestion } from 'react-icons/tb';

export default function CapsulesAdminIndex() {
  // Read URL query params (page, q, filters, etc.)
  const searchParams = useSearchParams();
  // Next.js router for navigation/pushing query updates
  const router = useRouter();

  // Server response containing capsules + pagination
  const [capsules, setCapsules] = useState<GetCapsulesResponse>();
  // Global loading state while fetching capsules list
  const [loading, setLoading] = useState<boolean>(true);
  // Local input state for search box
  const [search, setSearch] = useState<string>('');

  // Current page derived from query string (default 1)
  const currentPage = Number(searchParams.get('page') || 1);

  // Helper: push a modified query string to the same route
  const pushWithParams = (mutator: (p: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const qs = params.toString();
    router.push(qs ? `/dashboard/admin/capsules?${qs}` : `/dashboard/admin/capsules`);
  };

  // Build a compact page list with ellipses (for large page counts)
  const buildPageList = (total: number, curr: number): (number | '...')[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const res: (number | '...')[] = [];
    const add = (v: number | '...') => {
      if (res[res.length - 1] !== v) res.push(v);
    };

    add(1);
    if (curr > 4) add('...');
    for (let p = Math.max(2, curr - 1); p <= Math.min(total - 1, curr + 1); p++) add(p);
    if (curr < total - 3) add('...');
    add(total);
    return res;
  };

  // Navigate to a bounded page number (1..totalPages)
  const goToPage = (p: number) => {
    if (!capsules) return;
    const totalPages = capsules.pagination.pages;
    const target = Math.min(Math.max(1, p), totalPages);
    pushWithParams((params) => {
      params.set('page', String(target));
    });
  };

  // Move to next/previous pages
  const goNext = () => goToPage(currentPage + 1);
  const goPrev = () => goToPage(currentPage - 1);

  // Effect: fetch capsules whenever search params change
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(searchParams.toString());
        // Ensure a page param exists
        if (!params.get('page')) params.set('page', '1');

        // Fetch admin capsules with active filters/query
        const res = await callApi().get(`/admin/capsules?${params.toString()}`);
        if (!cancelled && res.status === 200) {
          setCapsules(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  // Trigger search (adds/removes `q` param) and resets page to 1
  const performSearchAction = () => {
    const q = search.trim();

    if (q.length > 0) {
      pushWithParams((params) => {
        params.set('q', q);
        params.set('page', '1');
      });
      setSearch('');
      return;
    }

    // If there is an active q param and input is empty, clear it
    if (searchParams.get('q')) {
      pushWithParams((params) => {
        params.delete('q');
        params.set('page', '1');
      });
      setSearch('');
      return;
    }
  };

  // Allow pressing Enter to trigger search
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!e.nativeEvent.isComposing && e.key === 'Enter') {
      performSearchAction();
    }
  };

  // Dynamic button label for search/clear action
  const getButtonLabel = () => {
    if (search.trim().length > 0) return 'جستجو';
    if (searchParams.get('q')) return 'پاک کردن';
    return 'جستجو';
  };

  // Loading skeleton while fetching
  if (loading)
    return (
      <section className="flex items-center justify-center gap-2 min-h-screen">
        <span>درحال بارگزاری</span>
        <PulseLoader size={7} />
      </section>
    );

  return (
    // Page wrapper for the admin capsules listing
    <section className="flex flex-col min-h-screen h-full gap-10">
      {/* Main content region */}
      <main className="flex flex-col h-full min-h-screen justify-start gap-10">
        {/* Header: title + search controls */}
        <header className="flex lg:flex-row flex-col justify-between lg:items-center gap-4">
          {/* Page title */}
          <h1 className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground  after:right-0 after:top-1/2 after:-translate-y-1/2'>کپسول های شما</h1>

          {/* Search bar + action button */}
          <div className="lg:w-2/3 relative flex gap-1 items-center">
            {/* Submit/clear search */}
            <Button onClick={performSearchAction} className="cursor-pointer">
              {getButtonLabel()}
            </Button>
            {/* Search input (press Enter to search) */}
            <Input value={search} onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} className="bg-white dark:bg-slate-900" type="text" placeholder="کپسول مورد نظر خودت رو جستجو کن" />
            {/* Clickable search icon */}
            <IoIosSearch onClick={performSearchAction} className="text-3xl cursor-pointer hover:animate-caret-blink absolute left-0 ml-3 text-foreground/70" />
          </div>
        </header>

        {/* Results area */}
        {capsules && capsules.items.length <= 0 ? (
          // Empty state when no capsules match filters/search
          <section className="flex flex-col items-center justify-center w-full h-full text-lg md:text-2xl text-foreground/50 gap-2">
            <TbZoomQuestion className="text-7xl" />
            <span>متاسفانه نتیجه‌ای برای جستجوی شما پیدا نشد</span>
          </section>
        ) : (
          // Capsules grid
          <section className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 w-full px-6 md:px-0 gap-10 place-items-center">
            {capsules?.items.map((item) => (
              // Each capsule card (summary info + link to view/edit)
              <Card
                key={item._id}
                className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white justify-between border-none dark:bg-slate-900 h-[380px] w-full shadow-sm after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[calc(100%+15px)] after:h-[calc(100%+15px)] after:border-[3px] after:border-transparent after:duration-300 hover:after:border-secondary/50 after:rounded-2xl after:pointer-events-none"
              >
                <CardHeader>
                  {/* Visibility status + timed icon */}
                  <CardTitle className="text-center text-xl flex items-center justify-center gap-2 text-foreground">
                    {item?.access?.visibility === 'public' ? 'کپسول عمومی' : 'کپسول خصوصی'}
                    {item.access?.unlockAt && (
                      <span className="text-2xl text-secondary">
                        <MdOutlineAccessTime />
                      </span>
                    )}
                  </CardTitle>

                  {/* Owner and title */}
                  <CardDescription className="text-center">
                    <p className="text-foreground font-medium">
                      از کاربر : <span className="text-sm text-foreground/80 font-light">{item?.owner?.name ?? item?.owner?.email}</span>
                    </p>
                    <p className="text-foreground font-medium">
                      موضوع : <span className="text-sm text-foreground/80 font-light">{item.title}</span>
                    </p>
                  </CardDescription>
                </CardHeader>

                <Separator className="bg-foreground/20" />

                {/* Capsule description preview */}
                <CardContent>
                  <p className="line-clamp-3 text-center text-foreground/80 font-light min-h-[50px]">{item.description}</p>
                </CardContent>

                <Separator className="bg-foreground/20" />

                {/* CTA: view/edit capsule */}
                <CardFooter className="flex py-4 items-center justify-center">
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background group hover:px-4 duration-300 transition-all" href={`/dashboard/admin/users/${item.owner?._id}/${item._id}`}>
                    <span className="group-hover:scale-105 duration-300">دیدن/ویرایش کپسول</span>
                    <FaLongArrowAltLeft className="text-2xl" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </section>
        )}

        {/* Pagination controls (render only if multiple pages) */}
        {capsules && capsules.pagination.pages > 1 && (
          // Navigation region for pagination (semantic)
          <nav className="self-center mt-auto" aria-label="pagination">
            <Pagination dir="rtl">
              <PaginationContent>
                {/* Prev button (hidden on first page) */}
                {currentPage !== 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={goPrev} className="bg-primary text-background hover:bg-foreground hover:text-background disabled:opacity-50" href="#" />
                  </PaginationItem>
                )}

                {/* Numbered pages + ellipses */}
                {buildPageList(capsules.pagination.pages, currentPage).map((p, idx) =>
                  p === '...' ? (
                    <PaginationItem key={`dots-${idx}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink onClick={() => goToPage(p)} aria-current={p === currentPage ? 'page' : undefined} className={`${p === currentPage ? 'bg-foreground text-background' : 'bg-primary text-background hover:bg-foreground hover:text-background'}`} href="#">
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                {/* Next button (hidden on last page) */}
                {currentPage !== capsules.pagination.pages && (
                  <PaginationItem>
                    <PaginationNext onClick={goNext} className="bg-primary text-background hover:bg-foreground hover:text-background disabled:opacity-50" href="#" />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </nav>
        )}
      </main>

      {/* Floating filters sidebar trigger (semantic aside wrapper) */}
      <aside className="fixed flex items-center justify-center text-3xl text-foreground/80 bg-primary shadow-xl ring ring-background w-12 h-12 rounded-full left-10 bottom-10 cursor-pointer hover:text-background/80">
        <DashboardCategorySidebar />
      </aside>
    </section>
  );
}

'use client';

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { GetCapsulesResponse } from '@/lib/types';
import { DashboardCategorySidebar } from './DashboardCategorySidebar';
import { useEffect, useState } from 'react';
import { MdOutlineAccessTime } from 'react-icons/md';
import { Input } from '@/components/ui/input';
import { IoIosSearch } from 'react-icons/io';
import { PulseLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { TbZoomQuestion } from 'react-icons/tb';

type Props = {
  capsules: GetCapsulesResponse | undefined;
  userId: string | undefined;
};

export default function SingleUserCapsulesAdmin({ capsules, userId }: Props) {
  // Read current URL query params (pagination, filters, search) and router for navigation
  const searchParams = useSearchParams();
  const router = useRouter();

  // Local loading state just for initial render when props land
  const [loading, setLoading] = useState<boolean>(true);

  // Local mirror of capsules to control UI state without mutating props
  const [userCapsules, setUserCapsules] = useState<GetCapsulesResponse | undefined>(undefined);

  // Controlled state for search input
  const [search, setSearch] = useState<string>('');

  // Initialize local state from incoming props once available
  useEffect(() => {
    if (capsules) {
      setUserCapsules(capsules);
      setLoading(false);
    }
  }, [capsules]);

  // Current page derived from querystring (default 1)
  const currentPage = Number(searchParams.get('page') || 1);

  // Total pages (fallback to 1 to avoid NaN)
  const totalPages = userCapsules?.pagination?.pages ?? 1;

  // Helper: push updated query params to route while preserving existing ones
  const pushWithParams = (mutator: (p: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const qs = params.toString();
    // Keep user context in path; fall back to capsules admin if somehow missing
    router.push(qs ? `/dashboard/admin/users/${userId}?${qs}` : `/dashboard/admin/capsules`);
  };

  // Build a compact pagination list with ellipses for large page counts
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

  // Change current page while clamping to valid range
  const goToPage = (p: number) => {
    const target = Math.min(Math.max(1, p), totalPages);
    pushWithParams((params) => {
      params.set('page', String(target));
    });
  };

  // Pagination handlers (next/prev)
  const goNext = () => goToPage(currentPage + 1);
  const goPrev = () => goToPage(currentPage - 1);

  // Execute search or clear it depending on current input/state
  const performSearchAction = () => {
    const q = search.trim();

    if (q.length > 0) {
      // Apply new search and reset pagination to page 1
      pushWithParams((params) => {
        params.set('q', q);
        params.set('page', '1');
      });
      setSearch('');
      return;
    }

    // If query exists but input is empty — clear search
    if (searchParams.get('q')) {
      pushWithParams((params) => {
        params.delete('q');
        params.set('page', '1');
      });
      setSearch('');
      return;
    }
  };

  // Submit search on Enter key
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!e.nativeEvent.isComposing && e.key === 'Enter') {
      performSearchAction();
    }
  };

  // Dynamic button label for search area
  const getButtonLabel = () => {
    if (search.trim().length > 0) return 'جستجو';
    if (searchParams.get('q')) return 'پاک کردن';
    return 'جستجو';
  };

  // Initial loading skeleton
  if (loading)
    return (
      // Semantic main: loader while content is being prepared
      <main className="flex items-center justify-center gap-2 min-h-screen">
        <span>درحال بارگزاری</span>
        <PulseLoader size={7} />
      </main>
    );

  return (
    // Page wrapper (semantic): entire user capsules view
    <section className="flex flex-col p-4 min-h-screen h-full gap-10">
      {/* Main vertical flow (semantic) */}
      <main className="flex flex-col h-full min-h-screen justify-start gap-10">
        {/* Header + search row */}
        <header className="flex lg:flex-row flex-col justify-between lg:items-center gap-4">
          {/* Section title */}
          <h1 className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground  after:right-0 after:top-1/2 after:-translate-y-1/2'>کپسول های شما</h1>

          {/* Search controls */}
          <form
            // Form semantics for better accessibility (no actual submit; actions handled by click/Enter)
            className="lg:w-2/3 relative flex gap-1 items-center"
            onSubmit={(e) => {
              e.preventDefault();
              performSearchAction();
            }}
          >
            <Button onClick={performSearchAction} className="cursor-pointer" type="button">
              {getButtonLabel()}
            </Button>
            <Input value={search} onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} className="bg-white dark:bg-slate-900" type="text" placeholder="کپسول مورد نظر خودت رو جستجو کن" aria-label="جستجو در کپسول‌ها" />
            <IoIosSearch onClick={performSearchAction} className="text-3xl cursor-pointer hover:animate-caret-blink absolute left-0 ml-3 text-foreground/70" aria-hidden />
          </form>
        </header>

        {/* Results area */}
        {userCapsules && userCapsules.items.length <= 0 ? (
          // Empty state (semantic): communicates that nothing matched the search
          <section className="flex flex-col items-center justify-center w-full h-full text-lg md:text-2xl text-foreground/50 gap-2">
            <TbZoomQuestion className="text-7xl" />
            <p>متاسفانه نتیجه‌ای برای جستجوی شما پیدا نشد</p>
          </section>
        ) : (
          // Cards grid (semantic): list of capsules as articles/cards
          <section className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 w-full px-6 md:px-0 gap-10 place-items-center">
            {userCapsules?.items.map((item) => (
              // Each capsule card as an article (self-contained preview)
              <article
                key={item._id}
                className="lg:col-span-6 xl:col-span-4 rounded-md flex flex-col relative bg-white justify-between border-none dark:bg-slate-900 h-[380px] w-full shadow-sm after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[calc(100%+15px)] after:h-[calc(100%+15px)] after:border-[3px] after:border-transparent after:duration-300 hover:after:border-secondary/50 after:rounded-2xl after:pointer-events-none"
              >
                {/* Card with structured content */}
                <Card className="flex flex-col relative bg-transparent border-none shadow-none h-full">
                  <CardHeader>
                    {/* Capsule type + timed lock indicator */}
                    <CardTitle className="text-center text-xl flex items-center justify-center gap-2 text-foreground">
                      {item?.access?.visibility === 'public' ? 'کپسول عمومی' : 'کپسول خصوصی'}
                      {item.access?.unlockAt && (
                        <span className="text-2xl text-secondary" aria-label="کپسول زمان‌دار">
                          <MdOutlineAccessTime />
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="text-center">
                      <p className="text-foreground font-medium">
                        موضوع : <span className="text-sm text-foreground/80 font-light">{item.title}</span>
                      </p>
                    </CardDescription>
                  </CardHeader>

                  <Separator className="bg-foreground/20" />

                  {/* Capsule summary/description */}
                  <CardContent>
                    <p className="line-clamp-3 text-center text-foreground/80 font-light min-h-[50px]">{item.description}</p>
                  </CardContent>

                  <Separator className="bg-foreground/20" />

                  {/* Detail/edit link */}
                  <CardFooter className="flex py-4 items-center justify-center">
                    <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background group hover:px-4 duration-300 transition-all" href={`/dashboard/admin/users/${userId}/${item._id}`}>
                      <span className="group-hover:scale-105 duration-300">دیدن/ویرایش کپسول</span>
                      <FaLongArrowAltLeft className="text-2xl" />
                    </Link>
                  </CardFooter>
                </Card>
              </article>
            ))}
          </section>
        )}

        {/* Pagination (semantic nav) */}
        {totalPages > 1 && (
          <nav className="self-center mt-auto" aria-label="صفحه‌بندی کپسول‌ها">
            <Pagination dir="rtl">
              <PaginationContent>
                {currentPage !== 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={goPrev} className="bg-primary text-background hover:bg-foreground hover:text-background disabled:opacity-50" href="#" />
                  </PaginationItem>
                )}

                {buildPageList(totalPages, currentPage).map((p, idx) =>
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

                {currentPage !== totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={goNext} className="bg-primary text-background hover:bg-foreground hover:text-background disabled:opacity-50" href="#" />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </nav>
        )}
      </main>

      {/* Floating filters sidebar trigger (semantic aside) */}
      <aside className="fixed flex items-center justify-center text-3xl text-foreground/80 bg-primary shadow-xl ring ring-background w-12 h-12 rounded-full left-10 bottom-10 cursor-pointer hover:text-background/80">
        <DashboardCategorySidebar userId={userId} />
      </aside>
    </section>
  );
}

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [userCapsules, setUserCapsules] = useState<GetCapsulesResponse | undefined>(undefined);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (capsules) {
      setUserCapsules(capsules);
      setLoading(false);
    }
  }, [capsules]);

  const currentPage = Number(searchParams.get('page') || 1);
  const totalPages = userCapsules?.pagination?.pages ?? 1;

  const pushWithParams = (mutator: (p: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const qs = params.toString();
    router.push(qs ? `/dashboard/admin/users/${userId}?${qs}` : `/dashboard/admin/capsules`);
  };

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

  const goToPage = (p: number) => {
    const target = Math.min(Math.max(1, p), totalPages);
    pushWithParams((params) => {
      params.set('page', String(target));
    });
  };

  const goNext = () => goToPage(currentPage + 1);
  const goPrev = () => goToPage(currentPage - 1);

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

    if (searchParams.get('q')) {
      pushWithParams((params) => {
        params.delete('q');
        params.set('page', '1');
      });
      setSearch('');
      return;
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!e.nativeEvent.isComposing && e.key === 'Enter') {
      performSearchAction();
    }
  };

  const getButtonLabel = () => {
    if (search.trim().length > 0) return 'جستجو';
    if (searchParams.get('q')) return 'پاک کردن';
    return 'جستجو';
  };

  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 min-h-screen">
        <span>درحال بارگزاری</span>
        <PulseLoader size={7} />
      </div>
    );

  return (
    <section className="flex flex-col p-4 min-h-screen h-full gap-10">
      <div className="flex flex-col h-full min-h-screen justify-start gap-10">
        {/* هدر و جستجو */}
        <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-4">
          <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground  after:right-0 after:top-1/2 after:-translate-y-1/2'>کپسول های شما</span>
          <div className="lg:w-2/3 relative flex gap-1 items-center">
            <Button onClick={performSearchAction} className="cursor-pointer">
              {getButtonLabel()}
            </Button>
            <Input value={search} onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} className="bg-white dark:bg-slate-900" type="text" placeholder="کپسول مورد نظر خودت رو جستجو کن" />
            <IoIosSearch onClick={performSearchAction} className="text-3xl cursor-pointer hover:animate-caret-blink absolute left-0 ml-3 text-foreground/70" />
          </div>
        </div>

        {/* نتایج */}
        {userCapsules && userCapsules.items.length <= 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full text-lg md:text-2xl text-foreground/50 gap-2">
            <TbZoomQuestion className="text-7xl" />
            <span>متاسفانه نتیجه‌ای برای جستجوی شما پیدا نشد</span>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 w-full px-6 md:px-0 gap-10 place-items-center">
            {userCapsules?.items.map((item) => (
              <Card
                key={item._id}
                className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white justify-between border-none dark:bg-slate-900 h-[380px] w-full shadow-sm after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[calc(100%+15px)] after:h-[calc(100%+15px)] after:border-[3px] after:border-transparent after:duration-300 hover:after:border-secondary/50 after:rounded-2xl after:pointer-events-none"
              >
                <CardHeader>
                  <CardTitle className="text-center text-xl flex items-center justify-center gap-2 text-foreground">
                    {item?.access?.visibility === 'public' ? 'کپسول عمومی' : 'کپسول خصوصی'}
                    {item.access?.unlockAt && (
                      <span className="text-2xl text-secondary">
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
                <CardContent>
                  <p className="line-clamp-3 text-center text-foreground/80 font-light min-h-[50px]">{item.description}</p>
                </CardContent>
                <Separator className="bg-foreground/20" />
                <CardFooter className="flex py-4 items-center justify-center">
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background group hover:px-4 duration-300 transition-all" href={`/dashboard/admin/users/${userId}/${item._id}`}>
                    <span className="group-hover:scale-105 duration-300">دیدن/ویرایش کپسول</span>
                    <FaLongArrowAltLeft className="text-2xl" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="self-center mt-auto">
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
          </div>
        )}
      </div>

      {/* فیلترها (sidebar شناور) */}
      <div className="fixed flex items-center justify-center text-3xl text-foreground/80 bg-primary shadow-xl ring ring-background w-12 h-12 rounded-full left-10 bottom-10 cursor-pointer hover:text-background/80">
        <DashboardCategorySidebar userId={userId} />
      </div>
    </section>
  );
}

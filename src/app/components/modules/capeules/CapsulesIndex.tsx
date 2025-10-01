'use client';

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import CapsuelesCategory from './CapsulesCategory';
import { Capsule, GetCapsulesResponse } from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useAppSelector } from '@/app/hooks/hook';
import { MdModeComment } from 'react-icons/md';
import { TbZoomQuestion } from 'react-icons/tb';

type Props = {
  capsules: GetCapsulesResponse;
};

export default function CapsulesIndex({ capsules }: Props) {
  const { user } = useAppSelector((state) => state.user);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [publicCapsules, setPublicCapsules] = useState<Capsule[] | null>(null);

  const currentPage = Number(searchParams.get('page') || 1);

  useEffect(() => {
    if (capsules) {
      setPublicCapsules(capsules.items);
    } else {
      setPublicCapsules(null);
    }
  }, [capsules]);

  const pushWithParams = useCallback(
    (mutator: (p: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutator(params);
      const qs = params.toString();
      router.push(qs ? `/capsules?${qs}` : `/capsules`);
    },
    [router, searchParams]
  );

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
    if (!capsules) return;
    const totalPages = capsules.pagination.pages;
    const target = Math.min(Math.max(1, p), totalPages);
    pushWithParams((params) => {
      params.set('page', String(target));
    });
  };

  const goNext = () => goToPage(currentPage + 1);
  const goPrev = () => goToPage(currentPage - 1);

  return (
    <section className="flex items-center justify-center" aria-label="Public Capsules Section">
      <div className="px-4 md:px-6 lg:px-10 flex flex-col lg:w-[90%] w-full justify-center items-center">
        <div className="flex flex-col gap-3 self-start">
          <h4 className="text-4xl font-kalmeh text-foreground" aria-label="Public Capsules Heading">
            کپسول های عمومی
          </h4>
          <p className="lg:text-lg text-base text-foreground/80" aria-label="Public Capsules Description">
            خاطره ها و تجربیاتی که کاربرای کپسول دوست داشتن با بقیه به اشتراک بزارن اینجاست!
          </p>
        </div>
        <div className="grid lg:grid-cols-12 grid-cols-1 w-full gap-10 mt-14 place-items-center">
          <CapsuelesCategory />
          <div className="lg:col-span-9 w-full min-h-screen place-self-start" aria-label="Capsules List">
            {publicCapsules && publicCapsules.length <= 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-screen text-lg md:text-2xl text-foreground/50 gap-2" aria-live="polite">
                <TbZoomQuestion className="text-7xl" aria-hidden="true" />
                <span>متاسفانه نتیجه‌ای برای جستجوی شما پیدا نشد</span>
              </div>
            ) : (
              <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-y-10 gap-x-6">
                {publicCapsules?.map((item) => (
                  <Card
                    key={item._id}
                    className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white py-0 hover:shadow-2xl hover:scale-[101%] hover:shadow-foreground/20 duration-300 dark:bg-slate-900 h-[420px] border-none shadow-sm ring-2 ring-primary/20"
                    aria-label={`Capsule titled ${item.title} by ${item.owner?.name ?? item.owner?.email}`}
                  >
                    <CardHeader className="px-0">
                      {user?._id === item.owner?._id ? (
                        <div className="absolute z-[1] p-1 rounded-md right-1 top-1 bg-primary border-2 text-xs flex items-center gap-1" aria-label="Your Capsule Badge">
                          <MdModeComment aria-hidden="true" />
                          کپسول شما
                        </div>
                      ) : null}

                      <div className="absolute z-[1] -top-[5%] left-1/2 -translate-x-1/2">
                        <Avatar className="h-12 w-12 ring-2 ring-secondary" aria-label={`Owner avatar: ${item.owner?.name ?? 'User'}`}>
                          <AvatarImage className="object-cover" src={item.owner?.avatar ? `http://localhost:8080/images/${item.owner.avatar}` : '/images/default.png'} alt={`${item.owner?.name ?? 'User'} avatar`} />
                          <AvatarFallback>...</AvatarFallback>
                        </Avatar>
                      </div>
                      <Image
                        className="object-cover w-full h-[130px] mb-2 p-0.5 rounded-t-md rounded-b-sm ring-secondary shadow-secondary/30"
                        src={item.image ? `http://localhost:8080/images/${item.image}` : '/images/def.jpg'}
                        alt={`${item.title} image`}
                        width={500}
                        height={500}
                        priority
                        unoptimized
                      />
                      <CardDescription className="text-center text-sm text-foreground/80">
                        <p>
                          از کاربر : <span>{item?.owner?.name ?? item.owner?.email}</span>
                        </p>
                        <p>
                          موضوع : <span>{item.title}</span>
                        </p>
                      </CardDescription>
                    </CardHeader>
                    <Separator className="bg-foreground/20" />
                    <CardContent className="h-[50px]">
                      <p className="line-clamp-2 w-full h-full break-words">{item.description}</p>
                    </CardContent>
                    <Separator className="bg-foreground/20" />
                    <CardFooter className="flex py-4 items-center justify-center">
                      <Link className="flex py-1 group px-2 rounded-md items-center justify-center gap-2 w-2/3 h-[50px] text-lg text-background" href={`/capsules/${item._id}`} target="_top" aria-label={`View capsule titled ${item.title}`}>
                        <div className="w-full relative h-full flex items-center">
                          <div className="bg-background dark:bg-foreground relative after:content-[''] after:absolute after:h-full after:w-full after:border-6 after:border-accent dark:after:border-accent/10 after:border-l-0 after:rounded-r-full border-2 border-black h-full w-2/2 rounded-r-full group-hover:translate-x-8 group-hover:rotate-6 duration-300">
                            <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-foreground dark:text-background">دیدن</span>
                          </div>
                          <div className="bg-red-400/80 relative after:content-[''] after:absolute after:h-full after:w-full after:border-6 after:border-red-400/70 after:border-r-0 after:rounded-l-full border-2 border-black h-full w-2/2 rounded-l-full group-hover:-translate-x-8 duration-300">
                            <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-foreground dark:text-background">کپسول</span>
                          </div>
                        </div>
                        <FaLongArrowAltLeft className="text-4xl absolute text-foreground opacity-0 group-hover:opacity-100 duration-200" aria-hidden="true" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-16" aria-label="Pagination Section">
          {capsules && capsules.pagination.pages > 1 && (
            <Pagination dir="rtl">
              <PaginationContent>
                {currentPage !== 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={goPrev} className="bg-primary text-background hover:bg-foreground hover:text-background disabled:opacity-50" href="#" aria-label="Go to previous page" />
                  </PaginationItem>
                )}

                {buildPageList(capsules.pagination.pages, currentPage).map((p, idx) =>
                  p === '...' ? (
                    <PaginationItem key={`dots-${idx}`}>
                      <PaginationEllipsis aria-hidden="true" />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink
                        onClick={() => goToPage(p)}
                        aria-current={p === currentPage ? 'page' : undefined}
                        className={`${p === currentPage ? 'bg-foreground text-background' : 'bg-primary text-background hover:bg-foreground hover:text-background'}`}
                        href="#"
                        aria-label={`Go to page ${p}`}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                {currentPage !== capsules.pagination.pages && (
                  <PaginationItem>
                    <PaginationNext onClick={goNext} className="bg-primary text-background hover:bg-foreground hover:text-background disabled:opacity-50" href="#" aria-label="Go to next page" />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </section>
  );
}

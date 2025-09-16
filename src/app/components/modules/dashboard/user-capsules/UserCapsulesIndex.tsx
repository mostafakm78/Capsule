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

export default function UserCapsulesIndex() {
  const params = useSearchParams();
  const router = useRouter();
  const [capsules, setCapsules] = useState<GetCapsulesResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    setLoading(true);

    async function fetchCapsules() {
      let res;
      try {
        if (search.trim() !== '' || params) {
          res = await callApi().get(`/capsules?${params}`);
        } else {
          res = await callApi().get(`/capsules`);
        }
        if (res.status === 200) {
          const capsules = res.data;
          setSearch('');
          setCapsules(capsules);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCapsules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, router]);


  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 min-h-screen">
        <span>درحال بارگزاری</span>
        <PulseLoader size={7} />
      </div>
    );

  const handleSearch = () => {
    if (search.trim() !== '') {
      router.push(`/dashboard/user-capsules?q=${search}`);
    } else if (search.trim() === '') {
      router.push(`/dashboard/user-capsules`);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!e.nativeEvent.isComposing && e.key === 'Enter' && search.trim() !== '') {
      router.push(`/dashboard/user-capsules?q=${search}`);
    }
  };

  return (
    <section className="flex flex-col h-full gap-10">
      <div className="flex flex-col h-full min-h-screen justify-start gap-10">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-4">
          <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground  after:right-0 after:top-1/2 after:-translate-y-1/2'>کپسول های شما</span>
          <div className="lg:w-2/3 relative flex gap-1 items-center">
            <Button onClick={handleSearch} className="cursor-pointer">
              {params.size !== 0 ? 'پاک کردن' : 'جستجو'}
            </Button>
            <Input value={search} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setSearch(e.target.value)} className="bg-white dark:bg-slate-900" type="text" placeholder="کپسول مورد نظر خودت رو جستجو کن" />
            <IoIosSearch onClick={handleSearch} className="text-3xl cursor-pointer hover:animate-caret-blink absolute left-0 ml-3 text-foreground/70" />
          </div>
        </div>
        {capsules && capsules?.items.length <= 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full text-lg md:text-2xl text-foreground/50 gap-2">
            <TbZoomQuestion className="text-7xl" />
            <span>متاسفانه نتیجه‌ای برای جستجوی شما پیدا نشد</span>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 w-full px-6 md:px-0 gap-10 place-items-center">
            {capsules?.items.map((item) => (
              <Card
                key={item._id}
                className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white justify-between border-none dark:bg-slate-900 h-[380px] w-full shadow-sm after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[calc(100%+15px)] after:h-[calc(100%+15px)] after:border-[3px] after:border-transparent after:duration-300 hover:after:border-secondary/50 dark:after:border-secondary/50 after:rounded-2xl after:pointer-events-none"
              >
                <CardHeader>
                  <CardTitle className="text-center text-xl flex items-center justify-center gap-2 text-foreground">
                    {item?.access?.visibility === 'public' ? 'کپسول عمومی' : 'کپسول خصوصی'}
                    {item.access?.unlockAt && <span className="text-2xl text-secondary">{item.access?.unlockAt ? <MdOutlineAccessTime /> : null}</span>}
                  </CardTitle>
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
                <CardContent>
                  <p className="line-clamp-3 text-center text-foreground/80 font-light min-h-[50px]">{item.description}</p>
                </CardContent>
                <Separator className="bg-foreground/20" />
                <CardFooter className="flex py-4 items-center justify-center">
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background group hover:px-4 duration-300 transition-all" href={`/dashboard/user-capsules/${item._id}`}>
                    <span className="group-hover:scale-105 duration-300">دیدن/ویرایش کپسول</span>
                    <FaLongArrowAltLeft className="text-2xl" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        <div className="self-center mt-auto">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationNext className="bg-primary dark:hover:text-foreground text-background hover:bg-foreground hover:text-background" href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem className="space-x-1">
                <PaginationLink className="bg-primary dark:hover:text-foreground text-background hover:bg-foreground hover:text-background" href="#">
                  1
                </PaginationLink>
                <PaginationLink className="bg-primary dark:hover:text-foreground text-background hover:bg-foreground hover:text-background" href="#">
                  2
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationPrevious className="bg-primary dark:hover:text-foreground text-background hover:bg-foreground hover:text-background" href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <div className="fixed flex items-center justify-center text-3xl text-foreground/80 bg-primary shadow-xl ring ring-background w-12 h-12 rounded-full left-10 bottom-10 cursor-pointer hover:text-background/80">
        <DashboardCategorySidebar />
      </div>
    </section>
  );
}

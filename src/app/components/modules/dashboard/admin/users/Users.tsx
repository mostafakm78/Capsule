'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UsersModal } from './UsersModal';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { PulseLoader } from 'react-spinners';
import callApi from '@/app/services/callApi';
import { useEffect, useState } from 'react';
import { GetUsersResponse } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { IoIosSearch } from 'react-icons/io';
import { UserBannedModal } from './UserBannedModal';
import { UserFlagModal } from './UserFlagModal';
import { UserTypeModal } from './UserTypeModal';
import { useAppSelector } from '@/app/hooks/hook';

type Sort = 'new' | 'old';
type Flag = 'all' | 'sus' | 'review' | 'violation' | 'none';

export default function Users() {
  // Read URL search params and router for navigation/state sync
  const searchParams = useSearchParams();
  const router = useRouter();

  // Current logged-in user (to exclude from admin list actions)
  const { user } = useAppSelector((state) => state.user);

  // Server response and local UI state
  const [users, setUsers] = useState<GetUsersResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  // Filter controls state (banned flag, review flag, sort order)
  const [banned, setBanned] = useState<'true' | 'false'>('false');
  const [flag, setFlag] = useState<Flag>('all');
  const [sort, setSort] = useState<Sort>('new');

  // Active page number (defaults to 1)
  const currentPage = Number(searchParams.get('page') || 1);

  // Initialize filters from URL parameters whenever they change
  useEffect(() => {
    const sp = searchParams;
    const spFlag = (sp.get('flag') as Flag) || 'all';
    setFlag(['all', 'none', 'sus', 'review', 'violation'].includes(spFlag) ? spFlag : 'all');

    const spBanned = sp.get('banned') === 'true' ? 'true' : 'false';
    setBanned(spBanned);

    setSort(sp.get('sort') === 'oldest' ? 'old' : 'new');
  }, [searchParams]);

  // Helper: mutate URL params and push (preserving other params)
  const pushWithParams = (mutator: (p: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const qs = params.toString();
    router.push(qs ? `/dashboard/admin/users?${qs}` : `/dashboard/admin/users`);
  };

  // Build a compact pagination model with ellipses (e.g. 1 … 5 6 7 … 20)
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

  // Go to specific page (clamped to range)
  const goToPage = (p: number) => {
    if (!users) return;
    const totalPages = users.pagination.pages;
    const target = Math.min(Math.max(1, p), totalPages);
    pushWithParams((params) => {
      params.set('page', String(target));
    });
  };

  // Pagination convenience handlers
  const goNext = () => goToPage(currentPage + 1);
  const goPrev = () => goToPage(currentPage - 1);

  // Fetch users list whenever URL params change
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(searchParams.toString());
        if (!params.get('page')) params.set('page', '1');

        const res = await callApi().get(`/admin/users?${params.toString()}`);
        if (!cancelled && res.status === 200) {
          setUsers(res.data);
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

  // Exclude the current admin from the list (to avoid self-actions)
  const filterUser = users?.items?.filter((singleUser) => singleUser._id !== user?._id);

  // Execute search: if input has value => set q param; else clear existing q
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

  // Allow pressing Enter to run search
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!e.nativeEvent.isComposing && e.key === 'Enter') {
      performSearchAction();
    }
  };

  // Dynamic label for the search button (search/clear)
  const getButtonLabel = () => {
    if (search.trim().length > 0) return 'جستجو';
    if (searchParams.get('q')) return 'پاک کردن';
    return 'جستجو';
  };

  // Reset filters to default by navigating to base path
  const handleRemove = () => {
    router.push('/dashboard/admin/users');
  };

  // Apply selected filters to URL params and reset to page 1
  const handleApply = () => {
    pushWithParams((params) => {
      if (flag === 'all') params.delete('flag');
      else params.set('flag', flag);

      if (banned === 'true') params.set('banned', 'true');
      else params.delete('banned');

      if (sort === 'old') params.set('sort', 'oldest');
      else params.delete('sort');

      params.set('page', '1');
    });
  };

  // Loading state (centered spinner)
  if (loading)
    return (
      <section className="flex items-center justify-center gap-2 min-h-screen">
        <span>درحال بارگزاری</span>
        <PulseLoader size={7} />
      </section>
    );

  return (
    <section>
      {/* Filters & Search Panel */}
      <section className="flex flex-col gap-6 md:p-8 p-3 bg-white dark:bg-slate-900 rounded-lg items-center justify-center w-full">
        {/* Search box and trigger */}
        <div className="lg:w-2/3 w-full relative">
          <div className="flex lg:flex-row flex-col justify-center lg:items-center gap-4">
            <div className="lg:w-3/3 relative flex gap-1 items-center">
              <Button onClick={performSearchAction} className="cursor-pointer">
                {getButtonLabel()}
              </Button>
              <Input value={search} onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} className="bg-white dark:bg-slate-900" type="text" placeholder="کاربر مورد نظر خودت رو جستجو کن" />
              <IoIosSearch onClick={performSearchAction} className="text-3xl cursor-pointer hover:animate-caret-blink absolute left-0 ml-3 text-foreground/70" />
            </div>
          </div>
        </div>

        {/* Banned flag & User flags */}
        <div className="w-full lg:text-base text-sm flex flex-col lg:flex-row items-center justify-center lg:justify-around gap-6">
          {/* Banned status filter */}
          <fieldset className="grid lg:grid-cols-[auto_1fr] place-items-center items-center gap-3" dir="rtl">
            <legend className="sr-only">بن بودن : </legend>
            <span className="relative pr-3 after:bg-foreground/80 after:w-2 after:h-2 after:absolute after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">بن بودن :</span>
            <RadioGroup aria-labelledby="banned-label" dir="rtl" value={banned} onValueChange={(v) => setBanned(v as 'true' | 'false')} className="flex items-center gap-3">
              <div className="flex text-foreground/80 items-center gap-1">
                <RadioGroupItem value="true" id="banned_true" />
                <Label htmlFor="banned_true">بله</Label>
              </div>
              <div className="flex text-foreground/80 items-center gap-1">
                <RadioGroupItem value="false" id="banned_false" />
                <Label htmlFor="banned_false">خیر</Label>
              </div>
            </RadioGroup>
          </fieldset>

          <Separator className="w-full lg:hidden bg-foreground/20" />

          {/* User flag filter (status) */}
          <fieldset className="grid lg:grid-cols-[auto_1fr] lg:grid-rows-1 grid-rows-2 place-items-center items-center gap-3" dir="rtl">
            <legend className="sr-only">پرچم‌گذاری :</legend>
            <span className="relative pr-3 after:bg-foreground/80 after:w-2 after:h-2 after:absolute after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">پرچم‌گذاری :</span>
            <RadioGroup aria-labelledby="flag-label" dir="rtl" value={flag} onValueChange={(v) => setFlag(v as Flag)} className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex text-foreground/80 items-center gap-1">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">همه</Label>
              </div>
              <div className="flex text-foreground/80 items-center gap-1">
                <RadioGroupItem value="none" id="flag_none" />
                <Label htmlFor="flag_none">معمولی</Label>
              </div>
              <div className="flex text-foreground/80 items-center gap-1">
                <RadioGroupItem value="sus" id="flag_sus" />
                <Label htmlFor="flag_sus">محتوای مشکوک</Label>
              </div>
              <div className="flex text-foreground/80 items-center gap-1">
                <RadioGroupItem value="review" id="flag_review" />
                <Label htmlFor="flag_review">نیازمند بازبینی</Label>
              </div>
              <div className="flex text-foreground/80 items-center gap-1">
                <RadioGroupItem value="violation" id="flag_violation" />
                <Label htmlFor="flag_violation">نقض قوانین</Label>
              </div>
            </RadioGroup>
          </fieldset>
        </div>

        <Separator className="w-full bg-foreground/20" />

        {/* Sort controls */}
        <fieldset className="grid lg:grid-cols-[auto_1fr] lg:grid-rows-1 grid-rows-2 place-items-center items-center gap-3" dir="rtl">
          <legend className="sr-only">مرتب‌سازی براساس :</legend>
          <span className="relative pr-3 after:bg-foreground/80 after:w-2 after:h-2 after:absolute after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">مرتب‌سازی براساس :</span>
          <RadioGroup aria-labelledby="sort-label" dir="rtl" value={sort} onValueChange={(v) => setSort(v as Sort)} className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex text-foreground/80 items-center gap-1">
              <RadioGroupItem value="newest" id="sort_new" />
              <Label htmlFor="sort_new">جدیدترین‌ها</Label>
            </div>
            <div className="flex text-foreground/80 items-center gap-1">
              <RadioGroupItem value="oldest" id="sort_old" />
              <Label htmlFor="sort_old">قدیمی‌ترین‌ها</Label>
            </div>
          </RadioGroup>
        </fieldset>

        {/* Filter actions */}
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleRemove} type="button" className="cursor-pointer">
            پاک‌کردن فیلترها
          </Button>
          <Button type="button" onClick={handleApply} className="cursor-pointer">
            اعمال فیلترها
          </Button>
        </div>
      </section>

      {/* Users table section */}
      <section className="flex flex-col mt-6 gap-6 lg:p-8 p-1 bg-white dark:bg-slate-900 rounded-lg items-center justify-start w-full min-h-screen pb-4">
        {/* Data table of users */}
        <Table dir="rtl">
          <TableCaption>لیست کاربران سایت کپسول</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ردیف</TableHead>
              <TableHead>کاربر</TableHead>
              <TableHead>ایمیل</TableHead>
              <TableHead className="hidden md:table-cell">وضعیت کاربر</TableHead>
              <TableHead className="hidden md:table-cell">وضعیت بن</TableHead>
              <TableHead className="hidden md:table-cell">نقش کاربر</TableHead>
              <TableHead className="hidden md:table-cell">کپسول‌های کاربر</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterUser?.map((user, i) => (
              <TableRow className={`${user.flag === 'sus' ? 'bg-orange-500/30' : user.flag === 'review' ? 'bg-orange-500/30' : user.flag === 'violation' ? 'bg-red-500/30' : ''}`} key={user._id}>
                {/* Row index */}
                <TableCell>{i + 1}</TableCell>

                {/* User name / modal trigger on mobile */}
                <TableCell className="md:font-medium">
                  <span className="md:hidden">
                    <UsersModal user={user} />
                  </span>
                  <span className="hidden md:block">{user.name ?? '...'}</span>
                </TableCell>

                {/* Email (wrapped for long addresses) */}
                <TableCell className="whitespace-normal break-all">{user.email}</TableCell>

                {/* User flag control (desktop) */}
                <TableCell className="hidden md:table-cell">
                  <UserFlagModal user={user} />
                </TableCell>

                {/* Ban/unban control (desktop) */}
                <TableCell className="hidden md:table-cell">
                  <UserBannedModal user={user} />
                </TableCell>

                {/* Role control (desktop) */}
                <TableCell className="hidden md:table-cell">
                  <UserTypeModal user={user} />
                </TableCell>

                {/* Link to user details page (desktop) */}
                <TableCell className="hidden md:table-cell">
                  <Link className="flex items-center gap-2 font-light text-base text-primary hover:text-foreground/80 duration-300" href={`/dashboard/admin/users/${user._id}`}>
                    دیدن
                    <FaLongArrowAltLeft className="text-lg" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination controls (shown only if multiple pages) */}
        {users && users.pagination.pages > 1 && (
          <nav className="self-center mt-auto" aria-label="pagination">
            <Pagination dir="rtl">
              <PaginationContent>
                {currentPage !== 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={goPrev} className="bg-primary text-background hover:bg-foreground hover:text-background disabled:opacity-50" href="#" />
                  </PaginationItem>
                )}

                {buildPageList(users.pagination.pages, currentPage).map((p, idx) =>
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

                {currentPage !== users.pagination.pages && (
                  <PaginationItem>
                    <PaginationNext onClick={goNext} className="bg-primary text-background hover:bg-foreground hover:text-background disabled:opacity-50" href="#" />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </nav>
        )}
      </section>
    </section>
  );
}

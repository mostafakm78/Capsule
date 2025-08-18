import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BsSearch } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

type Sort = '' | 'new' | 'old' | 'most';
type Role = '' | 'admin' | 'user';
type Flag = '' | 'sus' | 'review' | 'violation'; // محتوای مشکوک/نیازمند بازبینی/نقض قوانین

export default function SearchFilterUsers() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // مقداردهی اولیه از URL (برای لینک‌پذیری)
  const [q, setQ] = useState(searchParams.get('q') ?? '');
  const [role, setRole] = useState<Role>((searchParams.get('role') as Role) ?? '');
  const [flag, setFlag] = useState<Flag>((searchParams.get('flag') as Flag) ?? '');
  const [sort, setSort] = useState<Sort>((searchParams.get('sort') as Sort) ?? '');

  // debounce جستجو
  const [qDebounced, setQDebounced] = useState(q);
  useEffect(() => {
    const t = setTimeout(() => setQDebounced(q), 1000);
    return () => clearTimeout(t);
  }, [q]);

  // سینک به URL (و اینجا می‌تونی fetch هم بزنی)
  useEffect(() => {
    const params = new URLSearchParams();
    if (qDebounced) params.set('q', qDebounced);
    if (role) params.set('role', role);
    if (flag) params.set('flag', flag);
    if (sort) params.set('sort', sort);
    const qs = params.toString();
    router.replace(`/dashboard/admin/users${qs ? `?${qs}` : ''}`, { scroll: false });
    // TODO: fetch(`/api/admin/users?${qs}`)
  }, [qDebounced, role, flag, sort, router]);

  const resetFilters = () => {
    setQ('');
    setRole('');
    setFlag('');
    setSort('');
  };
  return (
    <div className="flex flex-col gap-6 md:p-8 p-3 bg-white dark:bg-slate-900 rounded-lg items-center justify-center w-full">
      {/* Search */}
      <div className="lg:w-2/3 w-full relative">
        <Input
          type="text"
          inputMode="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="md:placeholder:text-sm border-2 border-foreground focus:border-foreground focus-visible:border-foreground focus-visible:ring-foreground bg-accent py-5 pr-12"
          placeholder="نام کاربر یا ایمیل را جستجو کنید"
          dir="rtl"
          aria-label="جستجوی کاربر"
        />
        {/* آیکن سمت راست برای RTL */}
        <Button
          type="button"
          size="lg"
          className="absolute bg-transparent hover:bg-transparent hover:text-primary top-1/2 shadow-none cursor-pointer -translate-y-1/2 right-0"
          onClick={() => setQDebounced(q)} // تریگر دستی
          aria-label="جستجو"
        >
          <BsSearch className="size-full p-2" />
        </Button>
      </div>

      {/* Role & Flags (desktop) */}
      <div className="w-full lg:text-base text-sm flex flex-col lg:flex-row items-center justify-center lg:justify-around gap-6">
        {/* نقش */}
        <fieldset className="grid lg:grid-cols-[auto_1fr] place-items-center items-center gap-3" dir="rtl">
          <legend className="sr-only">سطح دسترسی :</legend>
          <span className="relative pr-3 after:bg-foreground/80 after:w-2 after:h-2 after:absolute after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">سطح دسترسی :</span>
          <RadioGroup dir="rtl" className="flex items-center gap-3" value={role} onValueChange={(v: Role) => setRole(v)}>
            <div className="flex text-foreground/80 items-center gap-1">
              <RadioGroupItem value="" id="role_all" />
              <Label htmlFor="role_all">همه</Label>
            </div>
            <div className="flex text-foreground/80 items-center gap-1">
              <RadioGroupItem value="admin" id="role_admin" />
              <Label htmlFor="role_admin">ادمین</Label>
            </div>
            <div className="flex text-foreground/80 items-center gap-1">
              <RadioGroupItem value="user" id="role_user" />
              <Label htmlFor="role_user">کاربر عادی</Label>
            </div>
          </RadioGroup>
        </fieldset>

        <Separator className="w-full lg:hidden bg-foreground/20" />

        {/* پرچم‌گذاری */}
        <fieldset className="grid lg:grid-cols-[auto_1fr] lg:grid-rows-1 grid-rows-2 place-items-center items-center gap-3" dir="rtl">
          <legend className="sr-only">پرچم‌گذاری :</legend>
          <span className="relative pr-3 after:bg-foreground/80 after:w-2 after:h-2 after:absolute after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">پرچم‌گذاری :</span>
          <RadioGroup dir="rtl" className="flex flex-wrap items-center justify-center gap-3" value={flag} onValueChange={(v: Flag) => setFlag(v)}>
            <div className="flex text-foreground/80 items-center gap-1">
              <RadioGroupItem value="" id="flag_all" />
              <Label htmlFor="flag_all">همه</Label>
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

      {/* Sort */}
      <fieldset className="grid lg:grid-cols-[auto_1fr] lg:grid-rows-1 grid-rows-2 place-items-center items-center gap-3" dir="rtl">
        <legend className="sr-only">مرتب‌سازی براساس :</legend>
        <span className="relative pr-3 after:bg-foreground/80 after:w-2 after:h-2 after:absolute after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">مرتب‌سازی براساس :</span>
        <RadioGroup dir="rtl" className="flex flex-wrap items-center justify-center gap-3" value={sort} onValueChange={(v: Sort) => setSort(v)}>
          <div className="flex text-foreground/80 items-center gap-1">
            <RadioGroupItem value="new" id="sort_new" />
            <Label htmlFor="sort_new">جدیدترین‌ها</Label>
          </div>
          <div className="flex text-foreground/80 items-center gap-1">
            <RadioGroupItem value="old" id="sort_old" />
            <Label htmlFor="sort_old">قدیمی‌ترین‌ها</Label>
          </div>
          <div className="flex text-foreground/80 items-center gap-1">
            <RadioGroupItem value="most" id="sort_most" />
            <Label htmlFor="sort_most">بیشترین کپسول</Label>
          </div>
        </RadioGroup>
      </fieldset>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="secondary" type="button" className="cursor-pointer" onClick={resetFilters}>
          پاک‌کردن فیلترها
        </Button>
        <Button type="button" className="cursor-pointer" onClick={() => setQDebounced(q)}>
          اعمال فیلترها
        </Button>
      </div>
    </div>
  );
}

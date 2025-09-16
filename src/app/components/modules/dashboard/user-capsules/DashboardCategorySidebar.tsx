'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { IoFilterSharp } from 'react-icons/io5';
import { Bungee } from 'next/font/google';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { usePathname, useRouter } from 'next/navigation';
import { CategoryItem, LinkProps } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import callApi from '@/app/services/callApi';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const bungee = Bungee({
  weight: '400',
});

const sortLinks: LinkProps[] = [
  { link: '/', title: 'همه کپسول ها' },
  { link: '/', title: 'جدید ترین' },
  { link: '/', title: 'قدیمی ترین' },
];

const capsuleType = [
  { title: 'عمومی', value: 'public' },
  { title: 'خصوصی', value: 'private' },
] as const;

type CpType = (typeof capsuleType)[number]['value'] | '';

export function DashboardCategorySidebar() {
  const router = useRouter();
  const pathName = usePathname();
  const [categoryItem, setCategoryItem] = useState<CategoryItem[] | null>(null);
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [CpType, setCpType] = useState<CpType>('');


  useEffect(() => {
    async function getCategories() {
      try {
        const res = await callApi().get('/capsules/categories');
        if (res.status === 200) {
          setCategoryItem(res.data.categoryItems);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getCategories();
  }, []);

  function toggleCategory(id: string, checked: boolean) {
    setSelectCategories((prev) => (checked ? [...new Set([...prev, id])] : prev.filter((x) => x !== id)));
  }

  const handleCategoryItem = () => {
    if (selectCategories.length !== 0) {
      router.push(`/dashboard/user-capsules?categoryItem=${selectCategories}`);
    }
  };

  const handleCpType = () => {
    if (CpType === 'private' || CpType === 'public') {
      router.push(`/dashboard/user-capsules?visibility=${CpType}`);
    }
  };

  const linkClasses = (href: string) => {
    const isActive = href === '/' ? pathName === '/' : pathName.startsWith(href);
    return `
      text-foreground/90 pr-4 py-1 text-base
      relative hover:text-primary duration-300
      after:content-[''] after:bg-foreground/70 after:absolute
      after:right-0 after:h-2 after:w-2 after:rounded-full
      after:top-1/2 after:-translate-y-1/2
      hover:after:bg-primary after:duration-300
      ${isActive ? 'bg-primary text-background' : ''}
    `;
  };

  return (
    <aside>
      <Sheet>
        <SheetTrigger asChild>
          <IoFilterSharp className="text-2xl cursor-pointer" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="items-center mt-10">
            <SheetTitle>
              <div className="brand flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
                <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={50} height={50} />
                <h1 className={`${bungee.className}`}>Capsule</h1>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col overflow-y-auto text-foreground/85 py-8 px-5 gap-8">
            {/* مرتب سازی */}
            <div>
              <h6 className="text-xl font-semibold">مرتب سازی بر اساس</h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto">
                {sortLinks.map((linkItem, i) => (
                  <Link key={i} href={linkItem.link} className={linkClasses(linkItem.link)}>
                    {linkItem.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* فیلتر */}
            <div className="flex flex-col">
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
                        <Checkbox id={`cat-${item._id}`} checked={checked} onCheckedChange={(val) => toggleCategory(item._id, Boolean(val))} />
                        <span className="text-sm">{item.title}</span>
                      </label>
                    );
                  })}
              </div>
              <Button onClick={handleCategoryItem} className="cursor-pointer mt-3">
                جستجو
              </Button>
            </div>

            <div className="flex flex-col">
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

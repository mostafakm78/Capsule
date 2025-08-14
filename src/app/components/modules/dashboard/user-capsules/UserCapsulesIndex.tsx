import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { LinkProps } from '@/lib/types';
import { DashboardCategorySidebar } from './DashboardCategorySidebar';

const sortLinks: LinkProps[] = [
  { link: '/', title: 'همه کپسول ها' },
  { link: '/', title: 'جدید ترین' },
  { link: '/', title: 'قدیمی ترین' },
];

const filterLinks: LinkProps[] = [
  { link: '/', title: 'خوشحال‌کننده' },
  { link: '/', title: 'ناراحت‌کننده' },
  { link: '/', title: 'هیجان‌انگیز' },
  { link: '/', title: 'آرامش‌بخش' },
  { link: '/', title: 'ترسناک' },
  { link: '/', title: 'الهام‌بخش' },
  { link: '/', title: 'رویا' },
  { link: '/', title: 'سفر' },
  { link: '/', title: 'خانواده' },
  { link: '/', title: 'دوستان' },
  { link: '/', title: 'عشق' },
  { link: '/', title: 'کار' },
  { link: '/', title: 'چالش‌ها' },
  { link: '/', title: 'دوستان' },
  { link: '/', title: 'کودکی' },
  { link: '/', title: 'نوجوانی' },
  { link: '/', title: 'خاطره شخصی' },
  { link: '/', title: 'بزرگسالی' },
  { link: '/', title: 'مدرسه / دانشگاه' },
];

export default function UserCapsulesIndex() {
  return (
    <section className="flex flex-col h-full gap-10">
      <div className="flex flex-col h-full justify-start gap-10">
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کپسول های شما</span>
        <div className="grid lg:grid-cols-12 grid-cols-1 w-full gap-10 place-items-center">
          <div className="lg:col-span-3 lg:block hidden space-y-4 w-full lg:place-self-start">
            <div className="bg-white rounded-lg shadow-md dark:bg-slate-900 flex flex-col p-8">
              <h6 className="text-xl font-semibold">مرتب سازی بر اساس</h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              <div className="flex flex-col gap-1">
                {sortLinks.map((links, i) => (
                  <Link
                    className='text-foreground/90 pr-4 relative hover:text-primary duration-300 after:content-[""] after:bg-foreground/70 after:absolute after:right-0 after:h-2 after:w-2 after:rounded-full after:top-1/2 after:-translate-y-1/2 hover:after:bg-primary after:duration-300'
                    key={i}
                    href={links.link}
                  >
                    {links.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md dark:bg-slate-900 flex flex-col p-8">
              <h6 className="text-xl font-semibold">فیلتر بر اساس</h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              <div className="flex flex-col gap-1.5">
                {filterLinks.map((links, i) => (
                  <Link
                    className='text-foreground/90 pr-4 relative hover:text-primary duration-300 after:content-[""] after:bg-foreground/70 after:absolute after:right-0 after:h-2 after:w-2 after:rounded-full after:top-1/2 after:-translate-y-1/2 hover:after:bg-primary after:duration-300'
                    key={i}
                    href={links.link}
                  >
                    {links.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-9 w-full min-h-screen place-self-start">
            <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-y-10 gap-x-6">
              <Card className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-center text-xl  text-foreground">کپسول عمومی</CardTitle>
                  <CardDescription className="text-center text-base text-foreground/80">
                    <p>
                      از کاربر : <span>مصطفی کمری</span>
                    </p>
                    <p>
                      موضوع : <span>تصادف مرگبار</span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <Separator className="bg-foreground/20" />
                <CardContent>
                  <p className="line-clamp-3 text-center">من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم!</p>
                </CardContent>
                <Separator className="bg-foreground/20" />
                <CardFooter className="flex py-4 items-center justify-center">
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href="/dashboard/user-capsules/1">
                    <span>دیدن/ویرایش کپسول</span>
                    <FaLongArrowAltLeft className="text-2xl" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-center text-xl text-foreground">کپسول عمومی</CardTitle>
                  <CardDescription className="text-center text-base text-foreground/80">
                    <p>
                      از کاربر : <span>مصطفی کمری</span>
                    </p>
                    <p>
                      موضوع : <span>تصادف مرگبار</span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <Separator className="bg-foreground/20" />
                <CardContent>
                  <p className="line-clamp-3 text-center">من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم!</p>
                </CardContent>
                <Separator className="bg-foreground/20" />
                <CardFooter className="flex py-4 items-center justify-center">
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href="">
                    <span>دیدن کپسول</span>
                    <FaLongArrowAltLeft className="text-2xl" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-center text-xl text-foreground">کپسول عمومی</CardTitle>
                  <CardDescription className="text-center text-base text-foreground/80">
                    <p>
                      از کاربر : <span>مصطفی کمری</span>
                    </p>
                    <p>
                      موضوع : <span>تصادف مرگبار</span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <Separator className="bg-foreground/20" />
                <CardContent>
                  <p className="line-clamp-3">من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم!</p>
                </CardContent>
                <Separator className="bg-foreground/20" />
                <CardFooter className="flex py-4 items-center justify-center">
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href="">
                    <span>دیدن کپسول</span>
                    <FaLongArrowAltLeft className="text-2xl" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-center text-xl text-foreground">کپسول عمومی</CardTitle>
                  <CardDescription className="text-center text-base text-foreground/80">
                    <p>
                      از کاربر : <span>مصطفی کمری</span>
                    </p>
                    <p>
                      موضوع : <span>تصادف مرگبار</span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <Separator className="bg-foreground/20" />
                <CardContent>
                  <p className="line-clamp-3">من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم!</p>
                </CardContent>
                <Separator className="bg-foreground/20" />
                <CardFooter className="flex py-4 items-center justify-center">
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href="">
                    <span>دیدن کپسول</span>
                    <FaLongArrowAltLeft className="text-2xl" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-center text-xl text-foreground">کپسول عمومی</CardTitle>
                  <CardDescription className="text-center text-base text-foreground/80">
                    <p>
                      از کاربر : <span>مصطفی کمری</span>
                    </p>
                    <p>
                      موضوع : <span>تصادف مرگبار</span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <Separator className="bg-foreground/20" />
                <CardContent>
                  <p className="line-clamp-3">من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم!</p>
                </CardContent>
                <Separator className="bg-foreground/20" />
                <CardFooter className="flex py-4 items-center justify-center">
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href="">
                    <span>دیدن کپسول</span>
                    <FaLongArrowAltLeft className="text-2xl" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        <div className="mt-16 self-center">
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
      <div className="lg:hidden fixed flex items-center justify-center text-3xl bg-primary shadow-lg ring w-13 h-13 rounded-full left-5 bottom-10 cursor-pointer">
        <DashboardCategorySidebar />
      </div>
    </section>
  );
}

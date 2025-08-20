import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CapsuelesAdminCategory from './CapsulesAdminCategory';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export default function CapsulesAdminIndex() {
  return (
    <section className="flex flex-col h-full gap-10">
      <div className="flex flex-col h-full justify-start gap-10">
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>کپسول‌های سایت</span>
        <div className="grid lg:grid-cols-12 grid-cols-1 w-full gap-10 mt-2 place-items-center">
          <CapsuelesAdminCategory />
          <div className="lg:col-span-9 w-full min-h-screen place-self-start">
            <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-y-10 gap-x-6">
              <Card className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <div className="absolute -top-[8%] left-1/2 -translate-x-1/2">
                    <Avatar className="h-12 w-12 ring-2 ring-secondary">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CP</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-center text-xl mt-2 text-foreground">کپسول عمومی</CardTitle>
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
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href="/dashboard/admin/users/1/1">
                    <span>دیدن کپسول/ویرایش</span>
                    <FaLongArrowAltLeft className="text-2xl" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <div className="absolute -top-[8%] left-1/2 -translate-x-1/2">
                    <Avatar className="h-12 w-12 ring-2 ring-secondary">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CP</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-center text-xl mt-2 text-foreground">کپسول عمومی</CardTitle>
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
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href="/capsules/1">
                    <span>دیدن کپسول</span>
                    <FaLongArrowAltLeft className="text-2xl" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <div className="absolute -top-[8%] left-1/2 -translate-x-1/2">
                    <Avatar className="h-12 w-12 ring-2 ring-secondary">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CP</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-center text-xl mt-2 text-foreground">کپسول عمومی</CardTitle>
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
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href="/capsules/1">
                    <span>دیدن کپسول</span>
                    <FaLongArrowAltLeft className="text-2xl" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="lg:col-span-6 xl:col-span-4 flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
                <CardHeader>
                  <div className="absolute -top-[8%] left-1/2 -translate-x-1/2">
                    <Avatar className="h-12 w-12 ring-2 ring-secondary">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CP</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-center text-xl mt-2 text-foreground">کپسول عمومی</CardTitle>
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
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href="/capsules/1">
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
    </section>
  );
}

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import CapsuelesCategory from './CapsulesCategory';

export default function CapsulesIndex() {
  return (
    <section className="flex items-center justify-center">
      <div className="px-4 md:px-6 lg:px-10 flex flex-col lg:w-[90%] w-full justify-center items-center">
        <div className="flex flex-col gap-3 self-start">
          <h4 className="text-4xl font-kalmeh text-foreground">کپسول های عمومی</h4>
          <p className="lg:text-lg text-base text-foreground/80">خاطره ها و تجربیاتی که کاربرای کپسول دوست داشتن با بقیه به اشتراک بزارن اینجاست!</p>
        </div>
        <div className="grid lg:grid-cols-12 grid-cols-1 w-full gap-10 mt-14 place-items-center">
          <CapsuelesCategory />
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
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href="/capsules/1">
                    <span>دیدن کپسول</span>
                    <FaLongArrowAltLeft className="text-2xl" />
                  </Link>
                </CardFooter>
              </Card>
              <div className="lg:col-span-6 xl:col-span-4 group hidden lg:flex flex-col items-center justify-center pr-2 2xl:px-8 bg-accent rounded-md relative shadow-lg gap-6">
                <div className="absolute -top-[10%] left-1/2 -translate-x-1/2">
                  <Avatar className="h-12 w-12 ring-2 ring-secondary">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CP</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 z-10 w-full opacity-0 left-[10%] shadow-xl p-2 rounded-lg text-center bg-slate-400 text-background group-hover:-top-32 group-hover:-translate-y-0 group-hover:opacity-100 group-hover:left-20 duration-300">
                  <div className="flex flex-col items-center">
                    <span className="font-medium">از کاربر :</span>
                    <span className="text-background/80">مصطفی کمری</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-medium">موضوع :</span>
                    <span className="text-background/80">مصطفی کمری</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-medium">خلاصه کپسول :</span>
                    <p className="text-background/80 line-clamp-2">من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم!</p>
                  </div>
                </div>
                <div className="w-1/3 relative h-2/3 flex flex-col items-center">
                  <div className="bg-background dark:bg-foreground relative after:content-[''] after:absolute after:h-full after:w-full after:border-6 after:border-accent dark:after:border-accent/10 after:border-b-0 after:rounded-t-full border-2 border-black h-1/2 w-2/2 rounded-t-full group-hover:-translate-y-2 group-hover:rotate-6 duration-300"></div>
                  <div className="bg-red-400/80 relative after:content-[''] after:absolute after:h-full after:w-full after:border-6 after:border-red-400/70 after:border-t-0 after:rounded-b-full border-2 border-black h-1/2 w-2/2 rounded-b-full group-hover:translate-y-2 group-hover:rotate-6 duration-300"></div>
                </div>
                <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background hover:scale-105 hover:opacity-80 duration-300" href="/capsules/1">
                  <span>دیدن کپسول</span>
                  <FaLongArrowAltLeft className="text-2xl" />
                </Link>
              </div>
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
                  <Link className="flex bg-secondary py-1 px-2 rounded-md items-center justify-center gap-2 text-lg text-background" href="">
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
        <div className="mt-16">
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

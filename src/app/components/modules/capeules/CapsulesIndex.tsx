import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export default function CapsulesIndex() {
  return (
    <section className="flex items-center justify-center">
      <div className="px-10 flex flex-col lg:w-[90%] w-full justify-center items-center">
        <div className="flex flex-col gap-3 self-start">
          <h4 className="text-4xl font-kalmeh text-foreground">کپسول های عمومی</h4>
          <p className="lg:text-lg text-base text-foreground/80">خاطره ها و تجربیاتی که کاربرای کپسول دوست داشتن با بقیه به اشتراک بزارن اینجاست!</p>
        </div>
        <div className="grid lg:grid-cols-12 grid-cols-1 w-full gap-10 mt-14 place-items-center">
          <div className="lg:col-span-3 w-full h-[300px] lg:place-self-start">
            <div className="bg-white rounded-lg  shadow-md dark:bg-slate-900 flex flex-col p-8">
              <h6 className="text-xl font-semibold">مرتب سازی بر اساس</h6>
              <Separator className="w-full bg-foreground/20 my-4" />
              <RadioGroup className="flex flex-col gap-5" dir="rtl" defaultValue="new">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="border-none bg-accent dark:bg-foreground/80 focus:bg-foreground/70 cursor-pointer h-6 w-6" value="new" id="new" />
                  <Label htmlFor="new">
                    <Link href="" className="text-base text-foreground/80">
                      جدید ترین
                    </Link>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="border-none bg-accent dark:bg-foreground/80 focus:bg-foreground/70 cursor-pointer h-6 w-6" value="trend" id="trend" />
                  <Label htmlFor="trend">
                    <Link href="" className="text-base text-foreground/80">
                      پربازدید ترین
                    </Link>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="border-none bg-accent dark:bg-foreground/80 focus:bg-foreground/70 cursor-pointer h-6 w-6" value="score" id="score" />
                  <Label htmlFor="score">
                    <Link href="" className="text-base text-foreground/80">
                      پرامتیاز ترین
                    </Link>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="border-none bg-accent dark:bg-foreground/80 focus:bg-foreground/70 cursor-pointer h-6 w-6" value="old" id="old" />
                  <Label htmlFor="old">
                    <Link href="" className="text-base text-foreground/80">
                      قدیمی ترین
                    </Link>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="lg:col-span-9 w-full min-h-screen">
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
              <Card className="flex flex-col relative bg-white dark:bg-slate-900 h-[350px] border-none shadow-sm">
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

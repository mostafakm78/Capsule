import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function SinglePageCapsule() {
  return (
    <section className="flex items-center justify-center">
      <div className="lg:px-10 px-4 flex gap-16 flex-col lg:w-[90%] w-full justify-center items-center">
        <div className="mt-4 flex items-center gap-2">
          <Avatar className="h-15 w-15 ring-2 ring-secondary">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CP</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <span className="text-xl text-foreground">مصطفی کمری</span>
          </div>
        </div>
        <Separator className="bg-foreground/20" />
        <div className="flex flex-col bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg shadow-black/10 gap-10 items-center lg:w-[80%]">
          <span className="text-2xl text-foreground/80 font-bold">موضوع : تصادف مرگبار</span>
          <p className="text-lg text-justify text-foreground">
            من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم! من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم! من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم! من یک خاطره بسیار
            جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم! من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم! من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم! من یک خاطره بسیار جالب از یک تصادف
            دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم!
          </p>
          <div className="w-full flex items-center justify-center h-[350px]">
            <Image src="/images/think.png" className='w-auto h-full' alt="capsule photo" width={100} height={100} />
          </div>
          <p className="text-lg text-justify text-foreground">
            من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم! من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم! من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم! من یک خاطره بسیار
            جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم! من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم! من یک خاطره بسیار جالب از یک تصادف دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم! من یک خاطره بسیار جالب از یک تصادف
            دارم که خیلی شوخی شوخی داشت جدی میشد و داشتیم میمردیم!
          </p>
          <div className="self-start">
            <span className="text-foreground/80">
              ارسال شده در تاریخ : <span>1404/5/15</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-xl">امتیاز شما به این کپسول</span>
          <div className="flex gap-2 text-lg">
            <span className="bg-primary py-2 px-4 rounded-lg shadow-sm text-background hover:bg-background hover:text-foreground duration-300 cursor-pointer">5</span>
            <span className="bg-primary py-2 px-4 rounded-lg shadow-sm text-background hover:bg-background hover:text-foreground duration-300 cursor-pointer">4</span>
            <span className="bg-primary py-2 px-4 rounded-lg shadow-sm text-background hover:bg-background hover:text-foreground duration-300 cursor-pointer">3</span>
            <span className="bg-primary py-2 px-4 rounded-lg shadow-sm text-background hover:bg-background hover:text-foreground duration-300 cursor-pointer">2</span>
            <span className="bg-primary py-2 px-4 rounded-lg shadow-sm text-background hover:bg-background hover:text-foreground duration-300 cursor-pointer">1</span>
          </div>
        </div>
      </div>
    </section>
  );
}

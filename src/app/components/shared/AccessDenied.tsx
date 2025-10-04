import Image from 'next/image';
import Link from 'next/link';
import { Bungee } from 'next/font/google';
import { FaLongArrowAltLeft } from 'react-icons/fa';

const bungee = Bungee({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export default function AccessDenied() {
  return (
    <section className="flex flex-col items-center bg-accent justify-around min-h-screen">
      <nav className="flex flex-col md:pt-10 lg:flex-row gap-4 lg:gap-0 items-center justify-between lg:w-3/4 w-full">
        <div className="flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
          <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={500} height={500} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </div>
      </nav>
      <div className="flex flex-col md:gap-10 gap-4 md:p-10 p-5 lg:p-0 items-center justify-center">
        <Image className="lg:h-[200px] lg:w-[300px] md:h-[200px] md:w-[300px] w-[200px] h-[120px]" src="/images/401.png" alt="401 Access Denied" width={500} height={500} />
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-red-400 md:text-4xl text-xl font-medium">شما اجازه دسترسی به این بخش را ندارید</h1>
          <h2 className="font-medium md:text-xl text-sm text-foreground/40">برای دسترسی به این بخش باید کاربر سایت باشد</h2>
          <div className="flex md:flex-row flex-col gap-2 items-center text-primary text-lg">
            <div className="flex items-center gap-2 bg-primary text-background/80 p-2 rounded-br-2xl rounded-tl-2xl rounded-bl-xs rounded-tr-xs cursor-pointer hover:rounded-sm duration-300 hover:text-background">
              <Link href="/">بازگشت به سایت</Link>
              <FaLongArrowAltLeft className="text-2xl" />
            </div>
            <div className="flex items-center gap-2 bg-primary text-background/80 p-2 rounded-br-2xl rounded-tl-2xl rounded-bl-xs rounded-tr-xs cursor-pointer hover:rounded-sm duration-300 hover:text-background">
              <Link href="/login">ورود/ثبت‌نام</Link>
              <FaLongArrowAltLeft className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

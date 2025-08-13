import Image from 'next/image';
import Link from 'next/link';
import { Bungee } from 'next/font/google';
import { FaLongArrowAltLeft } from 'react-icons/fa';
const bungee = Bungee({
  weight: '400',
});

export default function NotFound() {
  return (
    <section className="flex flex-col items-center bg-accent justify-center h-screen">
      <nav className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between lg:w-3/4 w-full">
        <div className="flex items-center gap-4 text-foreground/70">
          <Link className="lg:text-xl text-base font-medium hover:opacity-50 duration-150" href="/">
            صفحه اصلی
          </Link>
          <Link className="lg:text-xl text-base font-medium hover:opacity-50 duration-150" href="/capsules">
            کپسول های عمومی
          </Link>
          <Link className="lg:text-xl text-base font-medium hover:opacity-50 duration-150" href="/contact-us">
            ارتباط با ما
          </Link>
          <Link className="lg:text-xl text-base font-medium hover:opacity-50 duration-150" href="/about-us">
            درباره ما
          </Link>
        </div>
        <div className="flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
          <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </div>
      </nav>
      <div className="flex flex-col p-10 lg:p-0 items-center justify-center">
        <Image className="lg:h-[400px] lg:w-[400px] md:h-[300px] md:w-[300px] w-[250px] h-[250px]" src="/images/404.png" alt="404 not found" width={1000} height={1000} />
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-primary text-4xl font-medium">چنین صفحه‌ای پیدا نشد</h1>
          <h2 className="font-medium text-xl text-foreground/40">با عرض پوزش از شما، چنین صفحه‌ای در سایت وجود ندارد یا این صفحه از سایت پاک شده است.</h2>
          <div className='flex gap-2 items-center text-blue-600 text-lg'>
            <Link href="/">
              بازگشت به سایت
            </Link>
            <FaLongArrowAltLeft className='text-2xl'/>
          </div>
        </div>
      </div>
    </section>
  );
}

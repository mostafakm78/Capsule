import Image from 'next/image';
import { ShinyButton } from './components/shared/shiny-button';
import Link from 'next/link';
import { Bungee } from 'next/font/google';
const bungee = Bungee({
  weight: '400',
});

export default function NotFound() {
  return (
    <section className="flex flex-col items-center bg-accent justify-center h-screen">
      <nav className="flex items-center justify-between w-3/4">
        <div className="flex items-center gap-4 text-foreground/70">
          <Link className="text-xl font-medium hover:opacity-50 duration-150" href="/">
            صفحه اصلی
          </Link>
          <Link className="text-xl font-medium hover:opacity-50 duration-150" href="/capsules">
            کپسول های عمومی
          </Link>
          <Link className="text-xl font-medium hover:opacity-50 duration-150" href="/contact-us">
            ارتباط با ما
          </Link>
          <Link className="text-xl font-medium hover:opacity-50 duration-150" href="/about-us">
            درباره ما
          </Link>
        </div>
        <div className="flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
          <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center">
        <Image className="h-[400px] w-[400px]" src="/images/404.png" alt="404 not found" width={1000} height={1000} />
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-primary text-4xl font-medium">چنین صفحه‌ای پیدا نشد</h1>
          <h2 className="font-medium text-xl text-foreground/40">با عرض پوزش از شما، چنین صفحه‌ای در سایت وجود ندارد یا این صفحه از سایت پاک شده است.</h2>
          <ShinyButton className="bg-secondary">
            <Link href="/">بازگشت به سایت</Link>
          </ShinyButton>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Bungee } from 'next/font/google';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { LinkProps } from '@/lib/types';

// Load Bungee font at weight 400
const bungee = Bungee({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

// Top navigation links shown on the NotFound page
const headerLinks: LinkProps[] = [
  { link: '/', title: 'صفحه اصلی' },
  { link: '/capsules', title: 'کپسول های عمومی' },
  { link: '/contact-us', title: 'ارتباط با ما' },
  { link: '/about-us', title: 'درباره ما' },
];

export default function NotFound() {
  return (
    // Page section wrapper (visual container and background for the 404 page)
    <section className="flex flex-col items-center bg-accent justify-center min-h-screen">
      {/* Primary site navigation with brand on the right and links on the left (RTL layout) */}
      <nav className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between lg:w-3/4 w-full">
        {/* Header links (responsive stack on small screens) */}
        <div className="flex items-center gap-1.5 md:gap-4 pt-6 md:pt-0 text-foreground/70">
          {headerLinks.map((links, i) => (
            <Link key={i} className="lg:text-xl text-sm md:text-base font-medium hover:opacity-50 duration-150" href={links.link}>
              {links.title}
            </Link>
          ))}
        </div>

        {/* Brand block with logo and site title */}
        <div className="flex xl:text-5xl lg:text-4xl text-3xl text-muted items-center gap-2 justify-center">
          <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={20} height={20} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </div>
      </nav>

      {/* Main content area for the 404 message and illustration */}
      <main className="flex flex-col relative p-10 lg:p-0 items-center justify-center">
        {/* 404 illustration */}
        <Image className="lg:h-[400px] lg:w-[400px] md:h-[300px] md:w-[300px] w-[250px] h-[250px]" src="/images/404.png" alt="404 not found" width={1000} height={1000} />

        {/* Textual content: title, description, large faded 404 watermark, and a back-to-home link */}
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Page title (404 not found) */}
          <h1 className="text-primary md:text-4xl text-2xl font-medium">چنین صفحه‌ای پیدا نشد</h1>

          {/* Short explanation */}
          <h2 className="font-medium md:text-xl text-sm text-foreground/40">با عرض پوزش از شما، چنین صفحه‌ای در سایت وجود ندارد یا این صفحه از سایت پاک شده است.</h2>

          {/* Large translucent 404 watermark positioned behind main content */}
          <h3 className="text-foreground/20 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-9xl text-7xl">404</h3>

          {/* Back to home action */}
          <div className="flex gap-2 items-center text-primary text-lg">
            <Link href="/">بازگشت به سایت</Link>
            <FaLongArrowAltLeft className="text-2xl" />
          </div>
        </div>
      </main>
    </section>
  );
}

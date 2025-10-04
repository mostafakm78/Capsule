import Image from 'next/image';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export default function CapsuleNotFound() {
  return (
    /* Page section: full-height container for the 404 state */
    <section className="flex w-full md:p-8 p-2 h-full flex-col">
      {/* Centered content wrapper (kept relative for the big '404' absolute positioning) */}
      <section className="flex flex-col relative md:p-10 lg:p-0 items-center justify-center">
        {/* Illustration for 404 state */}
        <figure>
          <Image className="lg:h-[400px] lg:w-[400px] md:h-[300px] md:w-[300px] w-[250px] h-[250px]" src="/images/404.png" alt="404 not found" width={1000} height={1000} />
        </figure>

        {/* Message stack: titles, description, large decorative 404, and back link */}
        <header className="flex flex-col items-center justify-center gap-6">
          {/* Main title for the not found page */}
          <h1 className="text-primary md:text-4xl text-2xl font-medium">چنین صفحه‌ای پیدا نشد</h1>

          {/* Brief description of the error */}
          <h2 className="font-medium md:text-xl text-base text-center md:text-right text-foreground/40">با عرض پوزش از شما، چنین کپسولی پیدا نشد.</h2>

          {/* Large decorative 404 number overlayed in the center (absolute) */}
          <h3 className="text-foreground/20 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-9xl text-7xl">404</h3>

          {/* Navigation back to the user's capsules */}
          <nav className="flex gap-2 items-center text-primary text-lg">
            <Link href="/dashboard/user-capsules">بازگشت به کپسول‌های شما</Link>
            <FaLongArrowAltLeft className="text-2xl" />
          </nav>
        </header>
      </section>
    </section>
  );
}

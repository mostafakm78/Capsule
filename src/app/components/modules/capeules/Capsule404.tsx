import Image from 'next/image';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export default function CapsuleNotFound() {
  return (
    // Main landmark for the 404 capsule page; keeps original classes & alert role
    <main className="flex w-full md:p-8 p-2 h-screen flex-col items-center justify-center" role="alert" aria-label="Capsule Not Found Page">
      {/* Content section wrapping the illustration and message (layout preserved) */}
      <section className="flex flex-col relative md:p-10 lg:p-0 items-center justify-center">
        {/* Decorative/illustrative image grouped semantically in a <figure> */}
        <figure>
          <Image
            className="lg:h-[400px] lg:w-[400px] md:h-[300px] md:w-[300px] w-[250px] h-[250px]"
            src="/images/404.png"
            alt="404 not found illustration"
            width={1000}
            height={1000}
            aria-hidden="true" // decorative; announced via headings below
          />
        </figure>

        {/* Header block for the error title/description and the CTA link */}
        <header className="flex flex-col items-center justify-center gap-6" aria-label="Error Message Content">
          {/* Primary page title for the not-found state */}
          <h1 className="text-primary md:text-4xl text-2xl font-medium" aria-label="Page Not Found Title">
            چنین صفحه‌ای پیدا نشد
          </h1>

          {/* Short description clarifying the specific context (capsule not found) */}
          <h2 className="font-medium md:text-xl text-base text-center md:text-right text-foreground/40" aria-label="Page Not Found Description">
            با عرض پوزش از شما، چنین کپسولی پیدا نشد.
          </h2>

          {/* Large background 404 numeral; hidden from screen readers */}
          <h3 className="text-foreground/20 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-9xl text-7xl" aria-hidden="true">
            404
          </h3>

          {/* Inline navigation back to the Capsules list */}
          <nav className="flex gap-2 items-center text-primary text-lg" aria-label="Back Navigation">
            <Link href="/capsules" aria-label="Go back to Capsules page">
              بازگشت به صفحه کپسول ها
            </Link>
            <FaLongArrowAltLeft className="text-2xl" aria-hidden="true" />
          </nav>
        </header>
      </section>
    </main>
  );
}

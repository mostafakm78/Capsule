'use client';

import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaInstagram, FaTelegram, FaLinkedin, FaWhatsapp, FaArrowUp, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { useCallback, useMemo } from 'react';

interface Logo {
  bungee: { className: string };
}

export default function Footer({ bungee }: Logo) {
  /* Logic: memoize the font class to avoid re-computation on re-renders */
  const logoClassName = useMemo(() => bungee.className, [bungee]);

  /* Logic: smooth scroll handler to jump to the top of the page */
  const scrollToUp = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <footer className="flex flex-col pb-16 gap-12 bg-linear-to-b from-background to-foreground/20 justify-center pt-16 items-center" aria-label="پاورقی سایت" role="contentinfo">
      {/* UI Section: brand strip + social navigation */}
      <section className="flex lg:flex-row flex-col w-full lg:w-2/4 text-5xl text-muted items-center gap-10 justify-center px-12">
        {/* UI: brand/logo block; purely presentational text + image */}
        <div className="flex text-3xl md:text-5xl items-center gap-2">
          {/* UI: brand image with proper alt; decorative but still descriptive */}
          <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="لوگوی کپسول" width={50} height={50} />
          {/* UI: brand heading; visual headline for the brand in the footer */}
          <h1 className={`${logoClassName}`}>Capsule</h1>
        </div>

        {/* UI: visual divider between brand and social links (decorative) */}
        <Separator className="bg-foreground/15 mr-6 hidden lg:block" />

        {/* Semantics: social media navigation; localized aria-label */}
        <nav aria-label="شبکه‌های اجتماعی">
          {/* Semantics: list of social destinations (each item contains a link) */}
          <ul className="flex gap-2 items-center justify-center">
            {/* UI: Instagram item; icon marked aria-hidden within the link */}
            <li aria-label="اینستاگرام" className="bg-secondary/10 p-1 rounded-lg hover:bg-secondary text-secondary hover:text-background duration-300 text-3xl">
              <Link href="http://www.instagram.com/imyour_mosi" target="_blank" rel="noopener noreferrer">
                <FaInstagram aria-hidden="true" />
              </Link>
            </li>
            {/* UI: Telegram item */}
            <li className="bg-secondary/10 p-1 rounded-lg hover:bg-secondary text-secondary hover:text-background duration-300 text-3xl">
              <Link aria-label="تلگرام" href="https://t.me/Mostafakamari78" target="_blank" rel="noopener noreferrer">
                <FaTelegram aria-hidden="true" />
              </Link>
            </li>
            {/* UI: LinkedIn item */}
            <li className="bg-secondary/10 p-1 rounded-lg hover:bg-secondary text-secondary hover:text-background duration-300 text-3xl">
              <Link aria-label="لینکدین" href="http://linkedin.com/in/mostafa-kamari-b82450351" target="_blank" rel="noopener noreferrer">
                <FaLinkedin aria-hidden="true" />
              </Link>
            </li>
            {/* UI: WhatsApp item */}
            <li className="bg-secondary/10 p-1 rounded-lg hover:bg-secondary text-secondary hover:text-background duration-300 text-3xl">
              <Link aria-label="واتساپ" href="https://wa.me/989169799533" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp aria-hidden="true" />
              </Link>
            </li>
            {/* UI: Back-to-top control; button triggers smooth scroll */}
            <li className="cursor-pointer p-1 rounded-lg text-3xl">
              <Button className="hover:bg-secondary text-secondary hover:text-background duration-300 bg-secondary/10 cursor-pointer" onClick={scrollToUp} aria-label="رفتن به بالای صفحه">
                <FaArrowUp aria-hidden="true" />
              </Button>
            </li>
          </ul>
        </nav>
      </section>

      {/* UI Section: informational grid (about, site links, contacts) */}
      <section className="grid lg:grid-cols-12 lg:gap-0 gap-8 grid-cols-1 w-full px-4 md:px-12 place-items-center" aria-label="بخش‌های اطلاعاتی پاورقی">
        {/* UI: About block; descriptive text about the platform */}
        <section className="col-span-4 self-start flex flex-col lg:mr-28 text-right justify-between gap-4">
          {/* Semantics: section title as a subheading within footer */}
          <h2 className="font-kalmeh text-xl lg:self-start self-center text-foreground">درباره کپسول</h2>
          {/* UI: about paragraph; provides brief platform description */}
          <p className="text-base text-foreground/80 text-center md:text-right">
            کپسول خاطره یک پلتفرم آنلاین است که به شما امکان می‌دهد خاطرات و لحظات مهم زندگی خود را در قالب کپسول‌های دیجیتال ذخیره کنید. این کپسول‌ها می‌توانند شامل متن، عکس، ویدئو و صدا باشند. با استفاده از این پلتفرم، شما می‌توانید خاطرات خود را به صورت امن نگهداری کنید و در آینده به آن‌ها دسترسی
            داشته باشید.
          </p>
        </section>

        {/* Semantics: site navigation block; localized label for the list of links */}
        <nav className="col-span-4 self-start flex flex-col gap-2" aria-label="لینک‌های سایت">
          {/* UI: subheading for the group of navigational links */}
          <h2 className="font-kalmeh text-xl text-foreground">بخش های سایت</h2>
          {/* Semantics: list of important internal links */}
          <ul className="space-y-2">
            <li>
              {/* UI: link to public capsules; has Persian accessible name */}
              <Link
                aria-label="کپسول های عمومی"
                className='text-foreground/80 pr-4 relative before:content-[""] before:h-[10px] before:w-[10px] before:bg-foreground/50 before:rounded-full before:absolute before:top-1/2 before:right-0 before:-translate-y-1/2 hover:before:bg-primary hover:text-primary duration-300'
                href="/capsules"
              >
                کپسول های عمومی
              </Link>
            </li>
            <li>
              {/* UI: link to terms and conditions */}
              <Link
                aria-label="قوانین و مقررات"
                className='text-foreground/80 pr-4 relative before:content-[""] before:h-[10px] before:w-[10px] before:bg-foreground/50 before:rounded-full before:absolute before:top-1/2 before:right-0 before:-translate-y-1/2 hover:before:bg-primary hover:text-primary duration-300'
                href="/terms"
              >
                قوانین و مقررات
              </Link>
            </li>
            <li>
              {/* UI: link to about page */}
              <Link
                aria-label="درباره کپسول"
                className='text-foreground/80 pr-4 relative before:content-[""] before:h-[10px] before:w-[10px] before:bg-foreground/50 before:rounded-full before:absolute before:top-1/2 before:right-0 before:-translate-y-1/2 hover:before:bg-primary hover:text-primary duration-300'
                href="/about-us"
              >
                درباره کپسول
              </Link>
            </li>
            <li>
              {/* UI: link to contact page */}
              <Link
                aria-label="ارتباط با ما"
                className='text-foreground/80 pr-4 relative before:content-[""] before:h-[10px] before:w-[10px] before:bg-foreground/50 before:rounded-full before:absolute before:top-1/2 before:right-0 before:-translate-y-1/2 hover:before:bg-primary hover:text-primary duration-300'
                href="/contact-us"
              >
                ارتباط با ما
              </Link>
            </li>
          </ul>
        </nav>

        {/* Semantics: contact information; <address> is appropriate for contact details */}
        <address className="col-span-4 lg:ml-28 not-italic flex flex-col gap-4 self-start" aria-label="اطلاعات تماس">
          {/* UI: subheading for contact section */}
          <h2 className="font-kalmeh lg:self-start self-center text-xl">ارتباط با ما</h2>

          {/* UI: email row; icon is decorative via aria-hidden */}
          <div className="flex group items-center justify-center gap-10 text-lg">
            <div className="flex items-center justify-between gap-2">
              <span aria-hidden="true" className="relative group-hover:scale-120 duration-300 z-[2] after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:top-1 after:left-2 after:rounded-full after:bg-primary/20">
                <MdEmail className="text-primary" />
              </span>
              <h3 className="text-foreground/70">ایمیل:</h3>
            </div>
            {/* Semantics: mailto link with a clear Persian accessible label */}
            <Link aria-label="ارسال ایمیل به Mostafa" className="text-base group-hover:scale-105 duration-300" href="mailto:mostafamf555@gmail.com" target="_blank" rel="noopener noreferrer">
              Mostafa@gmail.com
            </Link>
          </div>

          {/* UI: GitHub row */}
          <div className="flex group items-center justify-center gap-10 text-lg">
            <div className="flex items-center justify-between gap-2">
              <span aria-hidden="true" className="relative group-hover:scale-120 duration-300 z-[2] after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:top-1 after:left-2 after:rounded-full after:bg-primary/20">
                <FaGithub className="text-primary" />
              </span>
              <h3 className="text-foreground/70">گیتهاب:</h3>
            </div>
            {/* Semantics: external profile link */}
            <Link aria-label="مشاهده گیتهاب Mostafa" className="text-base group-hover:scale-105 duration-300" href="https://github.com/mostafakm78" target="_blank" rel="noopener noreferrer">
              Mostafa kamari
            </Link>
          </div>

          {/* UI: Telegram row */}
          <div className="flex group items-center justify-center gap-10 text-lg">
            <div className="flex items-center justify-between gap-2">
              <span aria-hidden="true" className="relative group-hover:scale-120 duration-300 z-[2] after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:top-1 after:left-2 after:rounded-full after:bg-primary/20">
                <FaTelegram className="text-primary" />
              </span>
              <h3 className="text-foreground/70">تلگرام:</h3>
            </div>
            {/* Semantics: external messaging link */}
            <Link aria-label="چت در تلگرام با Mostafakamari78" className="text-base group-hover:scale-105 duration-300" href="https://t.me/Mostafakamari78" target="_blank" rel="noopener noreferrer">
              Mostafakamari78@
            </Link>
          </div>
        </address>
      </section>

      {/* UI: copyright notice; localized aria-label */}
      <p className="text-sm p-4" aria-label="کپی رایت">
        © {new Date().getFullYear()} کپسول خاطره با ❤️ برای حافظه‌ی لحظه‌ها ساخته شده.
      </p>
    </footer>
  );
}

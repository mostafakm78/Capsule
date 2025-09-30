'use client';

import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaInstagram, FaTelegram, FaLinkedin, FaWhatsapp, FaArrowUp, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Button } from '@/components/ui/button';

interface Logo {
  bungee: { className: string };
}

export default function Footer({ bungee }: Logo) {
  const scrollToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="flex flex-col pb-16 gap-12 bg-linear-to-b from-background to-foreground/20 justify-center pt-16 items-center">
      <div className="flex lg:flex-row flex-col w-full lg:w-2/4 text-5xl text-muted items-center gap-10 justify-center px-12">
        <div className="flex text-3xl md:text-5xl items-center gap-2">
          <Image className="logo h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] xl:w-[50px] xl:h-[50px]" src="/images/Logo.png" alt="Logo" width={50} height={50} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </div>
        <Separator className="bg-foreground/15 mr-6 hidden lg:block" />
        <div className="flex gap-2 items-center text-3xl">
          <Link className="bg-secondary/10 p-1 rounded-lg hover:bg-secondary text-secondary hover:text-background duration-300" href="http://www.instagram.com/imyour_mosi" target="_blank">
            <FaInstagram />
          </Link>
          <Link className="bg-secondary/10 p-1 rounded-lg hover:bg-secondary text-secondary hover:text-background duration-300" href="https://t.me/Mostafakamari78" target="_blank">
            <FaTelegram />
          </Link>
          <Link className="bg-secondary/10 p-1 rounded-lg hover:bg-secondary text-secondary hover:text-background duration-300" href="http://linkedin.com/in/mostafa-kamari-b82450351" target="_blank">
            <FaLinkedin />
          </Link>
          <Link className="bg-secondary/10 p-1 rounded-lg hover:bg-secondary text-secondary hover:text-background duration-300" href="https://wa.me/989169799533" target="_blank">
            <FaWhatsapp />
          </Link>
          <Button onClick={scrollToUp} className="bg-secondary/10 cursor-pointer p-1 rounded-lg hover:bg-secondary text-secondary hover:text-background duration-300">
            <FaArrowUp />
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-12 lg:gap-0 gap-8 grid-cols-1 w-full px-4 md:px-12 place-items-center">
        <div className="col-span-4 self-start flex flex-col lg:mr-28 text-right justify-between gap-4">
          <h4 className="font-kalmeh text-xl lg:self-start self-center text-foreground">درباره کپسول</h4>
          <p className="text-base text-foreground/80 text-center md:text-right">
            کپسول خاطره یک پلتفرم آنلاین است که به شما امکان می‌دهد خاطرات و لحظات مهم زندگی خود را در قالب کپسول‌های دیجیتال ذخیره کنید. این کپسول‌ها می‌توانند شامل متن، عکس، ویدئو و صدا باشند. با استفاده از این پلتفرم، شما می‌توانید خاطرات خود را به صورت امن نگهداری کنید و در آینده به آن‌ها دسترسی
            داشته باشید.
          </p>
        </div>
        <div className="col-span-4 self-start flex flex-col gap-2">
          <h4 className="font-kalmeh text-xl text-foreground">بخش های سایت</h4>
          <Link className='text-foreground/80 pr-4 relative before:content-[""] before:h-[10px] before:w-[10px] before:bg-foreground/50 before:rounded-full before:absolute before:top-1/2 before:right-0 before:-translate-y-1/2 hover:before:bg-primary hover:text-primary duration-300' href="/capsules">
            کپسول های عمومی
          </Link>
          <Link className='text-foreground/80 pr-4 relative before:content-[""] before:h-[10px] before:w-[10px] before:bg-foreground/50 before:rounded-full before:absolute before:top-1/2 before:right-0 before:-translate-y-1/2 hover:before:bg-primary hover:text-primary duration-300' href="/terms">
            قوانین و مقررات
          </Link>
          <Link className='text-foreground/80 pr-4 relative before:content-[""] before:h-[10px] before:w-[10px] before:bg-foreground/50 before:rounded-full before:absolute before:top-1/2 before:right-0 before:-translate-y-1/2 hover:before:bg-primary hover:text-primary duration-300' href="/about-us">
            درباره کپسول
          </Link>
          <Link
            className='text-foreground/80 pr-4 relative before:content-[""] before:h-[10px] before:w-[10px] before:bg-foreground/50 before:rounded-full before:absolute before:top-1/2 before:right-0 before:-translate-y-1/2 hover:before:bg-primary hover:text-primary duration-300'
            href="/contact-us"
          >
            ارتباط با ما
          </Link>
        </div>
        <div className="col-span-4 lg:ml-28 flex flex-col gap-4 self-start">
          <h4 className="font-kalmeh lg:self-start self-center text-xl">ارتباط با ما</h4>
          <div className="flex group items-center justify-center gap-10 text-lg">
            <div className="flex items-center justify-between gap-2">
              <span className="relative group-hover:scale-120 duration-300 z-[2] after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:top-1 after:left-2 after:rounded-full after:bg-primary/20">
                <MdEmail className="text-primary" />
              </span>
              <h4 className="text-foreground/70">ایمیل:</h4>
            </div>
            <Link className="text-base group-hover:scale-105 duration-300" href="mailto:mostafamf555@gmail.com" target="_blank">
              Mostafa@gmail.com
            </Link>
          </div>
          <div className="flex group items-center justify-center gap-10 text-lg">
            <div className="flex items-center justify-between gap-2">
              <span className="relative group-hover:scale-120 duration-300 z-[2] after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:top-1 after:left-2 after:rounded-full after:bg-primary/20">
                <FaGithub className="text-primary" />
              </span>
              <h4 className="text-foreground/70">گیتهاب:</h4>
            </div>
            <Link className="text-base group-hover:scale-105 duration-300" href="https://github.com/mostafakm78" target="_blank">
              Mostafa kamari
            </Link>
          </div>
          <div className="flex group items-center justify-center gap-10 text-lg">
            <div className="flex items-center justify-between gap-2">
              <span className="relative group-hover:scale-120 duration-300 z-[2] after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:top-1 after:left-2 after:rounded-full after:bg-primary/20">
                <FaTelegram className="text-primary" />
              </span>
              <h4 className="text-foreground/70">تلگرام:</h4>
            </div>
            <Link className="text-base group-hover:scale-105 duration-300" href="https://t.me/Mostafakamari78" target="_blank">
              Mostafakamari78@
            </Link>
          </div>
        </div>
      </div>
      <p className="text-sm p-4">© {new Date().getFullYear()} کپسول خاطره با ❤️ برای حافظه‌ی لحظه‌ها ساخته شده.</p>
    </footer>
  );
}

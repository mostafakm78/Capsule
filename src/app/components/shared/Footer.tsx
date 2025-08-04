import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaInstagram, FaTelegram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

interface Logo {
  bungee: { className: string };
}

export default function Footer({ bungee }: Logo) {
  return (
    <footer className="flex flex-col pb-16 gap-12 bg-linear-to-b from-background to-foreground/20 justify-center pt-16 items-center">
      <div className="flex w-2/4 text-5xl text-muted items-center gap-10 justify-center px-12">
        <div className="flex items-center gap-2">
          <Image className="" src="/images/Logo.png" alt="Logo" width={50} height={50} />
          <h1 className={`${bungee.className}`}>Capsule</h1>
        </div>
        <Separator className="bg-foreground/15 mr-6" />
        <div className="flex gap-2 items-center text-3xl">
          <Link className="bg-primary/10 p-1 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="">
            <FaInstagram />
          </Link>
          <Link className="bg-primary/10 p-1 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="">
            <FaTelegram />
          </Link>
          <Link className="bg-primary/10 p-1 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="">
            <FaLinkedin />
          </Link>
          <Link className="bg-primary/10 p-1 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="">
            <FaWhatsapp />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-12 w-full px-12 place-items-center">
        <div className="col-span-4 self-start flex flex-col mr-28 text-right justify-between gap-4">
          <h4 className="font-kalmeh text-xl text-foreground">درباره کپسول</h4>
          <p className="text-base text-foreground/80">
            کپسول خاطره یک پلتفرم آنلاین است که به شما امکان می‌دهد خاطرات و لحظات مهم زندگی خود را در قالب کپسول‌های دیجیتال ذخیره کنید. این کپسول‌ها می‌توانند شامل متن، عکس، ویدئو و صدا باشند. با استفاده از این پلتفرم، شما می‌توانید خاطرات خود را به صورت امن نگهداری کنید و در آینده به آن‌ها دسترسی
            داشته باشید.
          </p>
        </div>
        <div className="col-span-4 self-start flex flex-col gap-2">
          <h4 className="font-kalmeh text-xl text-foreground">بخش های سایت</h4>
          <Link className='text-foreground/80 pr-4 relative before:content-[""] before:h-[10px] before:w-[10px] before:bg-foreground/50 before:rounded-full before:absolute before:top-1/2 before:right-0 before:-translate-y-1/2' href="">
            کپسول های عمومی
          </Link>
          <Link className='text-foreground/80 pr-4 relative before:content-[""] before:h-[10px] before:w-[10px] before:bg-foreground/50 before:rounded-full before:absolute before:top-1/2 before:right-0 before:-translate-y-1/2' href="">
            قوانین و مقررات
          </Link>
          <Link className='text-foreground/80 pr-4 relative before:content-[""] before:h-[10px] before:w-[10px] before:bg-foreground/50 before:rounded-full before:absolute before:top-1/2 before:right-0 before:-translate-y-1/2' href="">
            درباره کپسول
          </Link>
          <Link className='text-foreground/80 pr-4 relative before:content-[""] before:h-[10px] before:w-[10px] before:bg-foreground/50 before:rounded-full before:absolute before:top-1/2 before:right-0 before:-translate-y-1/2' href="">
            ارتباط با ما
          </Link>
        </div>
        <div className="col-span-4 ml-28 flex flex-col gap-4 self-start">
          <h4 className="font-kalmeh text-xl">ارتباط با ما</h4>
          <div className="flex items-center justify-center gap-10 text-lg">
            <div className="flex items-center justify-between gap-2">
              <span className="relative z-[2] after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:top-1 after:left-2 after:rounded-full after:bg-primary/20">
                <MdEmail className="text-primary" />
              </span>
              <h4 className="text-foreground/70">ایمیل:</h4>
            </div>
            <Link className="text-base" href="">
              Mostafa@gmail.com
            </Link>
          </div>
          <div className="flex items-center justify-center gap-10 text-lg">
            <div className="flex items-center justify-between gap-2">
              <span className="relative z-[2] after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:top-1 after:left-2 after:rounded-full after:bg-primary/20">
                <FaTelegram className="text-primary" />
              </span>
              <h4 className="text-foreground/70">تلگرام:</h4>
            </div>
            <Link className="text-base" href="">
              Mostafakamari78@
            </Link>
          </div>
        </div>
      </div>
      <p className="text-sm">© 2025 کپسول خاطره با ❤️ برای حافظه‌ی لحظه‌ها ساخته شده.</p>
    </footer>
  );
}

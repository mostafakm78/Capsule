import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import ContactUsFrom from './ContactUs-From';

export default function ContactUsComponent() {
  return (
    <section className="my-16">
      <div className="px-10 flex flex-col items-center gap-20">
        <div className="flex flex-col items-center gap-6">
          <h3 className="lg:text-5xl text-4xl text-foreground font-kalmeh">ارتباط با ما</h3>
          <p className="text-foreground/70 lg:text-xl text-base">در این صفحه میتوانید اطلاعات ارتباطی کپسول را مشاهده کنید.</p>
        </div>
        <div className="flex lg:flex-row flex-col gap-10">
          <div className="flex flex-col gap-10">
            <h5 className="text-2xl text-foreground/70 font-bold">پل های ارتباطی</h5>
            <div className="flex text-3xl gap-6">
              <Link className="bg-primary/10 p-4 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="">
                <FaWhatsapp />
              </Link>
              <Link className="bg-primary/10 p-4 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="">
                <MdMail />
              </Link>
            </div>
          </div>
          <div>
            <Separator className="bg-foreground/30 h-full lg:block hidden" orientation="vertical" />
            <Separator className="bg-foreground/30 w-full lg:hidden block"/>
          </div>
          <div className="flex flex-col gap-10">
            <h5 className="text-2xl text-foreground/70 font-bold">شبکه های اجتماعی</h5>
            <div className="flex text-3xl gap-6">
              <Link className="bg-primary/10 p-4 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="">
                <FaInstagram />
              </Link>
              <Link className="bg-primary/10 p-4 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="">
                <FaTelegram />
              </Link>
              <Link className="bg-primary/10 p-4 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="">
                <FaLinkedin />
              </Link>
              <Link className="bg-primary/10 p-4 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="">
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
        <div className='bg-white dark:bg-slate-900 lg:w-10/12 w-full gap-4 p-10 rounded-lg shadow-md shadow-foreground/10 dark:shadow-black/10 flex flex-col'>
            <div className='flex flex-col gap-2 text-foreground/80 font-bold'>
                <h5 className='text-2xl text-primary relative after:content-[""] after:h-4 after:w-4 after:absolute after:top-1/2 pr-8 after:bg-primary after:right-0 after:rounded-full after:-translate-y-1/2'>شماره تماس :</h5>
                <span className='text-xl font-light text-foreground/50'>٠٩١٦٩٧٩٩٥٣٣</span>
            </div>
            <div className='flex flex-col gap-2 text-foreground/80 font-bold'>
                <h5 className='text-2xl text-primary relative after:content-[""] after:h-4 after:w-4 after:absolute after:top-1/2 pr-8 after:bg-primary after:right-0 after:rounded-full after:-translate-y-1/2'>ایمیل :</h5>
                <span className='text-xl font-light text-foreground/50'>Mostafamf555@gmail.com</span>
            </div>
        </div>
        <div className="flex flex-col items-center gap-6 mt-16">
          <h5 className="lg:text-5xl text-4xl font-kalmeh text-foreground">ارسال پیشنهادات و انتقادات</h5>
          <p className="text-foreground/70 lg:text-xl text-base lg:w-1/2 w-full">اگر مایل هستید که پیشنهادات یا انتقادات یا حتی سوال‌های خود را به شکل خصوصی برای ما ارسال کنید. میتوانید از فرم زیر استفاده نمایید.</p>
          <ContactUsFrom />
        </div>
      </div>
    </section>
  );
}

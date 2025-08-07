import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import ContactUsFrom from './ContactUs-From';

export default function ContactUsComponent() {
  return (
    <section className="dotted my-16">
      <div className="px-10 flex flex-col items-center gap-20">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-5xl text-foreground font-kalmeh">ارتباط با ما</h3>
          <p className="text-foreground/70 text-xl">در این صفحه میتوانید اطلاعات ارتباطی کپسول را مشاهده کنید.</p>
        </div>
        <div className="flex gap-10">
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
            <Separator className="bg-foreground/30 h-full" orientation="vertical" />
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
        <div className="flex flex-col items-center gap-6 mt-16">
          <h5 className="text-5xl font-kalmeh text-foreground">ارسال پیشنهادات و انتقادات</h5>
          <p className="text-foreground/70 text-xl w-1/2">اگر مایل هستید که پیشنهادات یا انتقادات یا حتی سوال‌های خود را به شکل خصوصی برای ما ارسال کنید. میتوانید از فرم زیر استفاده نمایید.</p>
          <ContactUsFrom />
        </div>
      </div>
    </section>
  );
}

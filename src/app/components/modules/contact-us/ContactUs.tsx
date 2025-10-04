import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import dynamic from 'next/dynamic';

// Dynamic import to avoid loading the form on initial bundle if not needed
const ContactUsFrom = dynamic(() => import('./ContactUs-From'));

export default function ContactUsComponent() {
  return (
    // Landmark region for the contact page area
    <section className="my-16" aria-label="Contact Us Section">
      {/* Page container with consistent horizontal padding */}
      <div className="px-4 md:px-6 lg:px-10 flex flex-col items-center gap-20">
        {/* Page header: title + subtitle */}
        <header className="flex flex-col items-center gap-6">
          <h3 className="lg:text-5xl text-4xl text-foreground font-kalmeh">ارتباط با ما</h3>
          <p className="text-foreground/70 lg:text-xl text-base">در این صفحه میتوانید اطلاعات ارتباطی کپسول را مشاهده کنید.</p>
        </header>

        {/* Two-column section: contact channels + social networks */}
        <section className="flex lg:flex-row flex-col gap-10">
          {/* Navigation block for direct contact methods (e.g., WhatsApp, Email) */}
          <nav className="flex flex-col gap-10" aria-label="Contact Methods">
            <h5 className="md:text-2xl text-xl text-foreground/70 font-bold">پل های ارتباطی</h5>
            {/* Icon links row */}
            <div className="flex md:text-3xl text-2xl gap-6">
              <Link aria-label="Contact via Whatsapp" className="bg-primary/10 md:p-4 p-2 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="https://wa.me/989169799533" target="_blank">
                <FaWhatsapp />
              </Link>
              <Link aria-label="Contact via Email" className="bg-primary/10 md:p-4 p-2 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="mailto:mostafamf555@gmail.com" target="_blank">
                <MdMail />
              </Link>
            </div>
          </nav>

          {/* Visual separator between the two columns */}
          <div>
            <Separator className="bg-foreground/30 h-full lg:block hidden" orientation="vertical" />
            <Separator className="bg-foreground/30 w-full lg:hidden block" />
          </div>

          {/* Navigation block for social profiles */}
          <nav className="flex flex-col gap-10" aria-label="Social Media Links">
            <h5 className="md:text-2xl text-xl text-foreground/70 font-bold">شبکه های اجتماعی</h5>
            {/* Icon links row */}
            <div className="flex md:text-3xl text-2xl gap-6">
              <Link aria-label="Instagram" className="bg-primary/10 md:p-4 p-2 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="http://www.instagram.com/imyour_mosi" target="_blank">
                <FaInstagram />
              </Link>
              <Link aria-label="Telegram" className="bg-primary/10 md:p-4 p-2 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="https://t.me/Mostafakamari78" target="_blank">
                <FaTelegram />
              </Link>
              <Link aria-label="LinkedIn" className="bg-primary/10 md:p-4 p-2 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="http://linkedin.com/in/mostafa-kamari-b82450351" target="_blank">
                <FaLinkedin />
              </Link>
              <Link aria-label="GitHub" className="bg-primary/10 md:p-4 p-2 rounded-lg hover:bg-primary text-primary hover:text-background duration-300" href="https://github.com/mostafakm78" target="_blank">
                <FaGithub />
              </Link>
            </div>
          </nav>
        </section>

        {/* Contact details card; <address> is the semantic container for contact info */}
        <address className="bg-white dark:bg-slate-900 lg:w-10/12 w-full gap-4 p-10 rounded-lg shadow-md shadow-foreground/10 dark:shadow-black/10 flex flex-col not-italic" aria-label="Contact Information">
          {/* Phone number block */}
          <div className="flex flex-col gap-2 text-foreground/80 font-bold">
            <h5 className='text-2xl text-primary relative after:content-[""] after:h-4 after:w-4 after:absolute after:top-1/2 pr-8 after:bg-primary after:right-0 after:rounded-full after:-translate-y-1/2'>شماره تماس :</h5>
            {/* Note: kept as plain text; could be a tel: link, but we are not altering behavior */}
            <span className="md:text-xl text-base font-light text-foreground/50" aria-label="Phone Number">
              ٠٩١٦٩٧٩٩٥٣٣
            </span>
          </div>

          {/* Email block */}
          <div className="flex flex-col gap-2 text-foreground/80 font-bold">
            <h5 className='text-2xl text-primary relative after:content-[""] after:h-4 after:w-4 after:absolute after:top-1/2 pr-8 after:bg-primary after:right-0 after:rounded-full after:-translate-y-1/2'>ایمیل :</h5>
            {/* Kept as text; behavior unchanged */}
            <span className="md:text-xl text-base font-light text-foreground/50" aria-label="Email Address">
              Mostafamf555@gmail.com
            </span>
          </div>
        </address>

        {/* Feedback/form area */}
        <section className="flex flex-col items-center gap-6 mt-16" aria-label="Feedback Form">
          {/* Local header for the form section */}
          <header className="flex flex-col items-center gap-2">
            <h5 className="lg:text-5xl text-4xl font-kalmeh text-foreground">ارسال پیشنهادات و انتقادات</h5>
            <p className="text-foreground/70 lg:text-xl text-base lg:w-1/2 w-full">اگر مایل هستید که پیشنهادات یا انتقادات یا حتی سوال‌های خود را به شکل خصوصی برای ما ارسال کنید. میتوانید از فرم زیر استفاده نمایید.</p>
          </header>

          {/* Dynamically loaded contact form component (kept as-is) */}
          <ContactUsFrom />
        </section>
      </div>
    </section>
  );
}

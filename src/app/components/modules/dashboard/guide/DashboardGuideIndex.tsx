import Image from 'next/image';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';

// Static help items shown on the dashboard guide page.
// Each item includes: short description, target link, and a CTA title.
const guides = [
  { desc: 'شما میتونین خلاصه فعالیت اخیر خودتون رو در صفحه اصلی پنل کاربری مشاهده کنین.', link: '/dashboard/panel', title: 'دیدن صفحه اصلی پنل کاربری' },
  { desc: 'چطور میتونم کپسول بسازم؟ شما میتونین از قسمت افزودن کپسول جدید ، کپسول خودتون رو بسازین', link: '/dashboard/create-capsule', title: 'دیدن صفحه ساخت کپسول' },
  { desc: 'کپسول های ساخته شده‌ی من کجاست ؟ شما میتونین کپسول های ساخته شده خودتون رو در بخش کپسول های شما مشاهده کنین.', link: '/dashboard/user-capsules', title: 'دیدن صفحه کپسول‌های شما' },
  { desc: 'آیا میتونم کپسول های ساخته شده رو ویرایش کنم ؟ بله در صفحه کپسول‌های شما روی هرکدوم از کپسول‌ها گزینه دیدن/ویرایش وجود داره.', link: '/dashboard/user-capsules', title: 'دیدن صفحه کپسول‌های شما' },
  { desc: 'برای ویرایش اسم یا عکس پروفایل و یا عوض کردن رمز عبور میتونین به بخش تنظیمات حساب مراجعه کنین.', link: '/dashboard/setting', title: 'دیدن صفحه تنظیمات حساب' },
];

export default function DashboardGuideIndex() {
  return (
    // Page landmark for the dashboard guide/help section
    <section className="flex flex-col h-full ">
      {/* Wrapper for page header and the list container */}
      <div className="flex flex-col h-full justify-start gap-10">
        {/* Page title with decorative dot (kept as-is for styling) */}
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>راهنمای استفاده</span>

        {/* Cards container: shows a list of guide items with an icon and link */}
        <div className="flex flex-col items-center gap-8 bg-white h-full w/full rounded-lg md:p-6 p-2 dark:bg-slate-900">
          {guides.map((guideItem, i) => (
            // Single guide row: illustration + description + CTA link
            <div key={i} className="flex gap-2 items-center py-4 px-2 border border-foreground/20 rounded-lg lg:w-2/3 w-full">
              {/* Illustrative image (decorative for context) */}
              <Image src="/images/cartoon-question.png" alt="question" width={100} height={100} />

              {/* Text block: description and navigation link */}
              <div className="flex flex-col gap-1">
                {/* Short help text for the current guide item */}
                <p className="lg:text-lg text-base pl-2 font-bold text-foreground/80">{guideItem.desc}</p>

                {/* Link to the relevant dashboard page with arrow icon */}
                <Link className="flex group items-center gap-2 lg:mt-0 mt-2 text-base" href={guideItem.link}>
                  <span className="text-foreground/80 group-hover:text-primary/80 duration-300">{guideItem.title}</span>
                  <FaLongArrowAltLeft className="text-2xl text-foreground group-hover:text-primary duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { dashboardCreateCapsuleCategories } from '@/lib/types';
import { AlertModal } from './AlertModal';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const categories: dashboardCreateCapsuleCategories[] = [
  { title: '🧠 دسته‌بندی‌های احساسی', items: ['خوشحال‌کننده', 'ناراحت‌کننده', 'هیجان‌انگیز', 'آرامش‌بخش', 'ترسناک', 'الهام‌بخش'] },
  { title: '📌 دسته‌بندی‌های موضوعی', items: ['خاطره شخصی', 'رویا', 'سفر', 'خانواده', 'دوستان', 'مدرسه / دانشگاه', 'عشق', 'کار', 'چالش‌ها'] },
  { title: '⏳ دسته‌بندی‌های زمانی', items: ['کودکی', 'نوجوانی', 'بزرگسالی'] },
];

export default function AdminCategoriesIndex() {
  return (
    <section className="flex flex-col h-full gap-10">
      <div className="flex flex-col h-full justify-start gap-10">
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>دسته‌بندی‌های سایت</span>
        <div className="flex flex-col gap-6 md:p-8 p-3 bg-white dark:bg-slate-900 rounded-lg items-center justify-center w-full">
          <div className="space-y-1 self-start">
            <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">ویرایش دسته‌بندی ها</h4>
            <p className="text-foreground/80">در این قسمت میتونین دسته بندی جدید وارد کنید و یا حذف کنید.</p>
          </div>
          <div dir="rtl" className="flex flex-col gap-8">
            {categories.map((group, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <h5 className="text-lg font-semibold">{group.title}</h5>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((item, i) => (
                    <div
                      key={i}
                      className={`cursor-pointer relative flex items-center rounded-full px-4 py-2 border transition-colors
                      hover:bg-red-400`}
                    >
                      <AlertModal />
                      <div className="hidden" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Separator className="bg-foreground/20 w-full my-4" />
          <div className="space-y-1 self-start">
            <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">افزودن دسته‌بندی جدید</h4>
          </div>
          <div className="w-full flex items-center justify-between gap-6 lg:px-10 md:px-6 px-4">
            <div className="flex flex-col w-full gap-2 items-start text-base text-foreground/80">
              <span className="font-medium">انتخاب عنوان دسته‌بندی</span>
              <Select dir="rtl">
                <SelectTrigger className="w-full border border-primary">
                  <SelectValue placeholder="احساسی" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-primary">
                  <SelectItem className="focus:bg-foreground/50 focus:text-white" value="light">
                    احساسی
                  </SelectItem>
                  <SelectItem className="focus:bg-foreground/50 focus:text-white" value="dark">
                    موضوعی
                  </SelectItem>
                  <SelectItem className="focus:bg-foreground/50 focus:text-white" value="system">
                    زمانی
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Label htmlFor="name" className="flex flex-col w-full items-start text-base text-foreground/80 font-medium">
              اسم دسته‌بندی جدید
              <Input className="md:placeholder:text-sm" id="name" type="text" placeholder="اسم دسته‌بندی" />
            </Label>
          </div>
          <div className="w-full flex justify-center mt-8">
            <Button disabled className="cursor-pointer w-1/3 py-6 text-lg">
              ثبت
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

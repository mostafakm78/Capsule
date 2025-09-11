'use client';

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { dashboardCreateCapsuleCategories } from '@/lib/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

const categories: dashboardCreateCapsuleCategories[] = [
  { title: '🧠 دسته‌بندی‌های احساسی', items: ['خوشحال‌کننده', 'ناراحت‌کننده', 'هیجان‌انگیز', 'آرامش‌بخش', 'ترسناک', 'الهام‌بخش'] },
  { title: '📌 دسته‌بندی‌های موضوعی', items: ['خاطره شخصی', 'رویا', 'سفر', 'خانواده', 'دوستان', 'مدرسه / دانشگاه', 'عشق', 'کار', 'چالش‌ها'] },
  { title: '⏳ دسته‌بندی‌های زمانی', items: ['کودکی', 'نوجوانی', 'بزرگسالی'] },
];

export default function CapsuleTags() {
  const editOrcreate = useSelector((state: RootState) => state.editOrcreate.capsule);
  const [selected, setSelected] = useState<string>(editOrcreate?.categoryItem || '');

  return (
    <div className="flex w-full p-8 h-full flex-col">
      <div className="flex flex-col gap-6">
        <div className="space-y-1">
          <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">دسته‌بندی</h4>
          <p className="text-foreground/80">در این قسمت میتونین دسته‌بندی کپسول خودتون رو مشخص کنین تا دسترسی آسون‌تری بهش داشته باشین.</p>
        </div>

        <RadioGroup dir="rtl" value={selected} onValueChange={setSelected} className="flex flex-col gap-8">
          {categories.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <h5 className="text-lg font-semibold">{group.title}</h5>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item, i) => (
                  <Label
                    key={i}
                    className={`cursor-pointer rounded-full px-4 py-2 border transition-colors
                      ${selected === item ? 'bg-primary text-primary-foreground border-primary' : 'border-foreground/20 hover:border-primary'}`}
                  >
                    <RadioGroupItem value={item} className="hidden" />
                    {item}
                  </Label>
                ))}
              </div>
            </div>
          ))}
        </RadioGroup>

        <div className="w-full flex justify-center mt-8">
          <Button className="cursor-pointer w-1/3 py-6 text-lg" disabled={!selected}>
            ثبت
          </Button>
        </div>

        <div className="flex flex-col gap-4 lg:p-4 lg:px-6">
          <span className="text-foreground text-xl pr-4 relative font-bold after:content-[''] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2">توجه</span>
          <div className="flex gap-2 items-center py-4 px-2 border border-foreground/20 rounded-lg w-full">
            <Image src="/images/cartoon-question.png" alt="question" width={100} height={100} />
            <div className="flex flex-col gap-1">
              <p className="lg:text-lg text-base font-bold text-foreground/80">شما میتونین از بین موضوع‌های دسته‌بندی فقط یک مورد رو انتخاب کنین</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

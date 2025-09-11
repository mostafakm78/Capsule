'use client';
import { useState } from 'react';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setColor } from '@/app/store/createCapsule';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { dashboardCreateCapsuleCategories, dashboardCreateCapsuleColorOption } from '@/lib/types';

const colors: dashboardCreateCapsuleColorOption[] = [
  { id: 'default', colorCode: 'bg-white dark:bg-slate-900' },
  { id: 'red', colorCode: 'bg-red-600/15 dark:bg-red-800/50' },
  { id: 'green', colorCode: 'bg-green-600/15 dark:bg-green-800/50' },
  { id: 'blue', colorCode: 'bg-blue-600/15 dark:bg-blue-800/50' },
  { id: 'yellow', colorCode: 'bg-yellow-500/15 dark:bg-yellow-700/50' },
];

const categories: dashboardCreateCapsuleCategories[] = [
  { title: '🧠 دسته‌بندی‌های احساسی', items: ['خوشحال‌کننده', 'ناراحت‌کننده', 'هیجان‌انگیز', 'آرامش‌بخش', 'ترسناک', 'الهام‌بخش'] },
  { title: '📌 دسته‌بندی‌های موضوعی', items: ['خاطره شخصی', 'رویا', 'سفر', 'خانواده', 'دوستان', 'مدرسه / دانشگاه', 'عشق', 'کار', 'چالش‌ها'] },
  { title: '⏳ دسته‌بندی‌های زمانی', items: ['کودکی', 'نوجوانی', 'بزرگسالی'] },
];

export default function CapsuleInfo() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  return (
    <>
      <Label className="flex flex-col items-start text-base text-foreground/80">
        اسم کپسول
        <Input type="text" placeholder="مثال : تولد برادرم" className="md:text-sm md:placeholder:text-sm" />
      </Label>
      <Label className="flex flex-col items-start text-base text-foreground/80">
        توضیحات شما
        <Textarea placeholder="نوشته های شما برای ذخیره در کپسول" className="md:text-sm md:placeholder:text-sm w-full h-[200px]" />
      </Label>
      <div className="flex flex-col gap-2">
        <span className="text-base text-foreground/80 font-medium">عکس</span>
        <Label className={`relative flex flex-col bg-background h-[200px] items-center justify-center border border-primary cursor-pointer rounded-lg text-base text-foreground/80 overflow-hidden`}>
          <span className={`text-lg`}>انتخاب عکس</span>
          <MdOutlineCameraAlt className={`text-4xl`} />
          {/* {preview && (
                <div className="relative w-full h-full">
                  <Image src='' alt="Preview" fill className="object-cover rounded-lg" />
                </div>
              )} */}
          <Input type="file" className="hidden" />
        </Label>
      </div>
      <Label className="flex flex-col items-start text-base text-foreground/80">
        توضیحات اضافی
        <Textarea placeholder="نوشته های شما برای ذخیره در کپسول" className="md:text-sm md:placeholder:text-sm w-full h-[200px]" />
      </Label>
      <div className="flex flex-col items-center gap-2">
        <span className="text-foreground/80 self-start text-base font-medium">رنگ پس زمینه کپسول شما</span>
        <p className="text-sm self-start text-foreground/70">شما میتونین برای نمایش کپسول خودتون چه در پنل خصوصی خودتون و چه در بخش عمومی از رنگ های زیر انتخاب کنین.</p>
        <div className="mt-4">
          <RadioGroup
            value={selected}
            onValueChange={(value: string) => {
              setSelected(value);
              const colorCode = colors.find((c) => c.id === value)?.colorCode;
              if (colorCode) dispatch(setColor(colorCode));
            }}
            className="flex gap-4"
          >
            {colors.map(({ id, colorCode }: dashboardCreateCapsuleColorOption) => (
              <label onClick={() => dispatch(setColor(colorCode))} key={id} htmlFor={id} className="cursor-pointer relative">
                <RadioGroupItem id={id} value={id} className="peer hidden" aria-label={id} />
                <div className={`${colorCode} ring ring-foreground h-5 w-5 md:w-10 md:h-10 rounded-full peer-checked:border-primary transition-all`} title={id} />
              </label>
            ))}
          </RadioGroup>
        </div>
      </div>
      <RadioGroup dir="rtl" value={selectedCategory} onValueChange={setSelectedCategory} className="flex flex-col gap-8">
        {categories.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <h5 className="text-lg font-semibold">{group.title}</h5>
            <div className="flex flex-wrap gap-3">
              {group.items.map((item, i) => (
                <Label
                  key={i}
                  className={`cursor-pointer rounded-full px-4 py-2 border transition-colors
                                ${selectedCategory === item ? 'bg-primary text-primary-foreground border-primary' : 'border-foreground/20 hover:border-primary'}`}
                >
                  <RadioGroupItem value={item} className="hidden" />
                  {item}
                </Label>
              ))}
            </div>
          </div>
        ))}
      </RadioGroup>
      <RadioGroup
        dir="rtl"
        value={selectedStatus}
        onValueChange={(value) => {
          setSelectedStatus(value);
        }}
        className="flex flex-wrap items-center justify-center gap-4 mt-16"
      >
        {['کپسول عمومی', 'کپسول خصوصی'].map((item) => (
          <Label
            key={item}
            className={`cursor-pointer rounded-full px-6 py-3 border text-lg transition-colors flex justify-center
                ${selectedStatus === item ? 'bg-primary text-primary-foreground border-primary' : 'border-foreground/20 hover:border-primary'}`}
          >
            <RadioGroupItem value={item} className="hidden" />
            {item}
          </Label>
        ))}
      </RadioGroup>
      <div className="w-full flex justify-center my-8 gap-2">
        <Button className="cursor-pointer md:w-1/3 w-2/4">ثبت</Button>
        <Button className="cursor-pointer md:w-1/3 w-2/4 bg-red-400 hover:bg-red-300">حذف کپسول</Button>
      </div>
    </>
  );
}

'use client';

import { setColor } from '@/app/store/capsuleColorSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useState } from 'react';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { useDispatch } from 'react-redux';

type ColorOption = {
  id: string;
  colorCode: string;
};

const colors: ColorOption[] = [
  { id: 'default', colorCode: 'bg-white dark:bg-slate-900' },
  { id: 'red', colorCode: 'bg-red-600/15 dark:bg-red-800/50' },
  { id: 'green', colorCode: 'bg-green-600/15 dark:bg-green-800/50' },
  { id: 'blue', colorCode: 'bg-blue-600/15 dark:bg-blue-800/50' },
  { id: 'yellow', colorCode: 'bg-yellow-500/15 dark:bg-yellow-700/50' },
];

export default function CapsuleInfo() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>('default');
  const dispatch = useDispatch()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex w-full p-8 h-full flex-col">
      <div className="flex flex-col gap-6">
        <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">عنوان کپسول</h4>
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
          <Label className={`relative flex flex-col bg-background h-[200px] items-center justify-center border border-primary cursor-pointer ${preview ? 'p-0' : 'p-4'} rounded-lg text-base text-foreground/80 overflow-hidden`}>
            <span className={`text-lg ${preview ? 'hidden' : ''}`}>انتخاب عکس</span>
            <MdOutlineCameraAlt className={`text-4xl ${preview ? 'hidden' : ''}`} />
            {preview && (
              <div className="relative w-full h-full">
                <Image src={preview} alt="Preview" fill className="object-cover rounded-lg" />
              </div>
            )}
            <Input onChange={handleFileChange} type="file" className="hidden" />
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
            <RadioGroup value={selected} onValueChange={(value: string) => setSelected(value)} className="flex gap-4">
              {colors.map(({ id, colorCode }: ColorOption) => (
                <label onClick={() => dispatch(setColor(colorCode))} key={id} htmlFor={id} className="cursor-pointer relative">
                  <RadioGroupItem id={id} value={id} className="peer hidden" aria-label={id} />
                  <div className={`${colorCode} ring ring-foreground w-10 h-10 rounded-full peer-checked:border-primary transition-all`} title={id} />
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>
        <div className='w-full flex justify-center mt-8'>
            <Button className='w-1/2 text-lg py-6 cursor-pointer bg-background text-foreground hover:bg-foreground hover:text-background'>ثبت</Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useAppDispatch, useAppSelector } from '@/app/hooks/hook';
import { setCapsule } from '@/app/store/editOrcreateSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { dashboardCreateCapsuleColorOption } from '@/lib/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdOutlineCameraAlt } from 'react-icons/md';

type Color = 'default' | 'red' | 'green' | 'blue' | 'yellow';

const colors: dashboardCreateCapsuleColorOption[] = [
  { id: 'default', colorCode: 'bg-white dark:bg-slate-900' },
  { id: 'red', colorCode: 'bg-red-600/15 dark:bg-red-800/50' },
  { id: 'green', colorCode: 'bg-green-600/15 dark:bg-green-800/50' },
  { id: 'blue', colorCode: 'bg-blue-600/15 dark:bg-blue-800/50' },
  { id: 'yellow', colorCode: 'bg-yellow-500/15 dark:bg-yellow-700/50' },
];

export default function CapsuleInfo() {
  const dispatch = useAppDispatch();
  const editOrcreate = useAppSelector((state) => state.editOrcreate);
  const capsule = editOrcreate.capsule;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [extra, setExtra] = useState('');
  const [selected, setSelected] = useState<Color>('default');
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (editOrcreate.mode === 'edit' && capsule) {
      setTitle(capsule.title || '');
      setDescription(capsule.description || '');
      setExtra(capsule.extra || '');
      setSelected(capsule.color || 'default');
      setPreview(capsule.avatar || null);
    }
  }, [capsule, editOrcreate.mode]);

  const handleSubmit = () => {
    dispatch(
      setCapsule({
        title,
        description,
        extra,
        color: selected,
        avatar: preview,
      })
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex w-full md:p-8 p-4 h-full flex-col">
      <div className="flex flex-col gap-6">
        <div className="space-y-1">
          <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">اطلاعات</h4>
          <p className="text-foreground/80">در این قسمت میتونین اسم ، یادداشت‌ها ، عکس و حتی رنگ کپسول خودتون رو مشخص کنین.</p>
        </div>

        <Label className="flex flex-col items-start text-base text-foreground/80">
          اسم کپسول
          <Input type="text" placeholder="مثال : تولد برادرم" value={title} onChange={(e) => setTitle(e.target.value)} className="md:text-sm md:placeholder:text-sm" />
        </Label>

        <Label className="flex flex-col items-start text-base text-foreground/80">
          توضیحات شما
          <Textarea placeholder="نوشته های شما برای ذخیره در کپسول" value={description} onChange={(e) => setDescription(e.target.value)} className="md:text-sm md:placeholder:text-sm w-full h-[200px]" />
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
          <Textarea placeholder="نوشته های شما برای ذخیره در کپسول" value={extra} onChange={(e) => setExtra(e.target.value)} className="md:text-sm md:placeholder:text-sm w-full h-[200px]" />
        </Label>

        <div className="flex flex-col items-center gap-2">
          <span className="text-foreground/80 self-start text-base font-medium">رنگ پس زمینه کپسول شما</span>
          <p className="text-sm self-start text-foreground/70">شما میتونین برای نمایش کپسول خودتون چه در پنل خصوصی خودتون و چه در بخش عمومی از رنگ های زیر انتخاب کنین.</p>
          <div className="mt-4">
            <RadioGroup
              value={selected}
              onValueChange={(value: Color) => {
                setSelected(value);
              }}
              className="flex gap-4"
            >
              <div className="mt-4 flex gap-4">
                {colors.map(({ id, colorCode }) => (
                  <div
                    key={id}
                    onClick={() => setSelected(id as Color)}
                    className={`
                    ${colorCode} h-5 w-5 md:h-10 md:w-10 rounded-full ring ring-foregroun transition-all ${selected === id ? 'ring-4 ring-primary' : ''} cursor-pointer`}
                    title={id}
                  />
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="w-full flex justify-center mt-8">
          <Button onClick={handleSubmit} disabled={!title && !description && !extra && !selected && !preview} className="cursor-pointer w-1/3 py-6 text-lg">
            ثبت
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import useCustomToast from '@/app/hooks/useCustomToast';
import callApi from '@/app/services/callApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type NotificatiosType = 'message' | 'alert' | 'news' | 'system' | '';

export default function CreateNotif() {
  const showToast = useCustomToast();
  const router = useRouter();

  const [type, setType] = useState<NotificatiosType>('');
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

  async function createNotification() {
    if (!type || type === null || !text || !text.trim() || !title || !title.trim()) {
      return showToast({ message: 'وارد کردن هر سه فیلد اجباری میباشد ❌', bg: 'bg-red-200' });
    }
    try {
      const res = await callApi().post('admin/notification', { text, title, type });
      if (res.status === 201) {
        showToast({ message: 'اعلان شما با موفقیت ساخته شد ✅', bg: 'bg-green-200' });
        router.push('/dashboard/admin');
        return;
      } else {
        return showToast({ message: 'خطایی در ساخت اعلان بوجود آمده ❌', bg: 'bg-red-200' });
      }
    } catch {
      return showToast({ message: 'خطایی در ساخت اعلان بوجود آمده ❌', bg: 'bg-red-200' });
    }
  }

  return (
    <>
      <span className='text-foreground text-xl pr-4 self-start relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>ساخت اعلان جدید</span>
      <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
        <div className="flex md:flex-row flex-col items-center justify-center w-full gap-6">
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="title" className="text-base text-foreground/80 font-medium">
              عنوان اعلان جدید
            </Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} id="title" type="text" placeholder="مثال: بخش جدید سایت" />
          </div>

          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="type" className="text-base text-foreground/80 font-medium">
              نوع اعلان
            </Label>
            <Select value={type} onValueChange={(val) => setType(val as NotificatiosType)} dir="rtl">
              <SelectTrigger id="type" className="w-full border border-primary">
                <SelectValue placeholder="انتخاب نوع اعلان" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-primary">
                <SelectItem value="message">پیام</SelectItem>
                <SelectItem value="alert">هشدار</SelectItem>
                <SelectItem value="news">اخبار</SelectItem>
                <SelectItem value="system">سیستم</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="text" className="text-base text-foreground/80 font-medium">
            متن اعلان جدید
          </Label>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="h-[200px]" id="text" placeholder="مثال: در بخش جدید شما می‌توانید ..." />
        </div>
        <Button disabled={!title || !text || !type} onClick={createNotification} className="cursor-pointer md:w-1/4 py-6 text-lg my-2">
          ساخت اعلان
        </Button>
      </div>
    </>
  );
}

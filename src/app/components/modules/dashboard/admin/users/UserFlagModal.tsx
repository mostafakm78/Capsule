'use client';

import useCustomToast from '@/app/hooks/useCustomToast';
import callApi from '@/app/services/callApi';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserSafe } from '@/lib/types';
import { useEffect, useState } from 'react';

type Props = { user: UserSafe };
type Flag = 'none' | 'sus' | 'violation' | 'review';

export function UserFlagModal({ user }: Props) {
  const [flag, setFlag] = useState<Flag>('none');
  const [draftFlag, setDraftFlag] = useState<Flag>('none');
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const showToast = useCustomToast();

  useEffect(() => {
    const f = (user.flag as Flag) ?? 'none';
    setFlag(f);
    setDraftFlag(f);
  }, [user._id, user.flag]);

  const handleOpenChange = (o: boolean) => {
    setOpen(o);
    if (o) setDraftFlag(flag);
  };

  const handleSave = async () => {
    if (draftFlag === flag) return;
    try {
      setSaving(true);
      const res = await callApi().patch(`/admin/users/${user._id}`, { flag: draftFlag });
      if (res.status === 200) {
        setFlag(draftFlag);
        showToast({ message: 'وضعیت کاربر با موفقیت تغییر یافت ✅', bg: 'bg-green-200' });
        setOpen(false);
      } else {
        showToast({ message: 'متاسفانه خطایی پیش آمده', bg: 'bg-red-200' });
      }
    } catch {
      showToast({ message: 'متاسفانه خطایی پیش آمده', bg: 'bg-red-200' });
    } finally {
      setSaving(false);
    }
  };

  const pillText = flag === 'none' ? 'معمولی' : flag === 'review' ? 'بازبینی' : flag === 'sus' ? 'مشکوک' : 'نقض قوانین';

  const pillBg = flag === 'none' ? 'bg-green-700' : flag === 'review' ? 'bg-yellow-700' : flag === 'sus' ? 'bg-orange-700' : 'bg-red-700';

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <span className={`cursor-pointer ${pillBg} p-2 rounded-md border border-foreground/50 w-full text-center`}>{pillText}</span>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex lg:flex-row flex-col justify-between items-center gap-3">
            <span>تغییر وضعیت کاربر: {user.name ?? user.email}</span>

            <Select dir="rtl" value={draftFlag} onValueChange={(v) => setDraftFlag(v as Flag)}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="انتخاب وضعیت کاربر" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>تغییر وضعیت کاربر</SelectLabel>
                  <SelectItem value="none">معمولی</SelectItem>
                  <SelectItem value="sus">محتوای مشکوک</SelectItem>
                  <SelectItem value="review">نیازمند بازبینی</SelectItem>
                  <SelectItem value="violation">نقض قوانین</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </AlertDialogTitle>

          <AlertDialogDescription>پس از زدن دکمه «تغییر وضعیت»، مقدار انتخاب‌شده ثبت می‌شود.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">انصراف</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave} disabled={saving || draftFlag === flag} className="cursor-pointer">
            {saving ? 'در حال ذخیره…' : 'تغییر وضعیت'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

'use client';

import useCustomToast from '@/app/hooks/useCustomToast';
import callApi from '@/app/services/callApi';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserSafe } from '@/lib/types';
import { useEffect, useState } from 'react';

type Props = { user: UserSafe | undefined };
type Flag = 'none' | 'sus' | 'violation' | 'review';

export function UserFlagModal({ user }: Props) {
  // Holds the persisted flag from server (the actual current status)
  const [flag, setFlag] = useState<Flag>('none');
  // Holds the in-dialog tentative selection before saving (draft state)
  const [draftFlag, setDraftFlag] = useState<Flag>('none');
  // Controls the dialog open/close state
  const [open, setOpen] = useState(false);
  // Loading indicator while saving to the server
  const [saving, setSaving] = useState(false);
  // Toast helper for success/error messages
  const showToast = useCustomToast();

  // Sync local states when the target user (or their flag) changes
  useEffect(() => {
    const f = (user?.flag as Flag) ?? 'none';
    setFlag(f);
    setDraftFlag(f);
  }, [user?._id, user?.flag]);

  // When dialog opens, reset draft to the current persisted flag
  const handleOpenChange = (o: boolean) => {
    setOpen(o);
    if (o) setDraftFlag(flag);
  };

  // Persist the selected draft flag to the backend (if changed)
  const handleSave = async () => {
    if (draftFlag === flag) return; // No-op if nothing changed
    try {
      setSaving(true);
      // PATCH the new flag for the user (admin-only endpoint)
      const res = await callApi().patch(`/admin/users/${user?._id}`, { flag: draftFlag });
      if (res.status === 200) {
        setFlag(draftFlag); // Reflect saved value locally
        showToast({ message: 'وضعیت کاربر با موفقیت تغییر یافت ✅', bg: 'bg-green-200' });
        setOpen(false); // Close dialog after success
      } else {
        showToast({ message: 'متاسفانه خطایی پیش آمده', bg: 'bg-red-200' });
      }
    } catch {
      // Generic failure feedback (network/server)
      showToast({ message: 'متاسفانه خطایی پیش آمده', bg: 'bg-red-200' });
    } finally {
      setSaving(false);
    }
  };

  // Map current flag to a short Persian label for the trigger pill
  const pillText = flag === 'none' ? 'معمولی' : flag === 'review' ? 'بازبینی' : flag === 'sus' ? 'مشکوک' : 'نقض قوانین';

  // Map current flag to a contextual background color class
  const pillBg = flag === 'none' ? 'bg-green-700' : flag === 'review' ? 'bg-yellow-700' : flag === 'sus' ? 'bg-orange-700' : 'bg-red-700';

  return (
    // Dialog wrapper (semantic container for the modal)
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      {/* Trigger chip that opens the modal; styled based on current flag */}
      <AlertDialogTrigger asChild>
        <span className={`cursor-pointer ${pillBg} p-2 rounded-md w-full text-center`}>{pillText}</span>
      </AlertDialogTrigger>

      {/* Modal content with title, selection control and actions */}
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* Title shows the user being modified + inline selector for new flag */}
          <AlertDialogTitle className="flex lg:flex-row flex-col justify-between items-center gap-3">
            <span>تغییر وضعیت کاربر: {user?.name ?? user?.email}</span>

            {/* Flag selector (draft value) */}
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

          {/* Short guidance about what happens on confirm */}
          <AlertDialogDescription>پس از زدن دکمه «تغییر وضعیت»، مقدار انتخاب‌شده ثبت می‌شود.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* Cancel closes the dialog without saving */}
          <AlertDialogCancel className="cursor-pointer">انصراف</AlertDialogCancel>
          {/* Confirm persists the draft selection (disabled while saving or when unchanged) */}
          <AlertDialogAction onClick={handleSave} disabled={saving || draftFlag === flag} className="cursor-pointer">
            {saving ? 'در حال ذخیره…' : 'تغییر وضعیت'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

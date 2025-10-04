'use client';

import { useEffect, useMemo, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import callApi from '@/app/services/callApi';
import { useAppDispatch } from '@/app/hooks/hook';
import { setCapsule } from '@/app/store/editOrcreateSlice';
import { PulseLoader } from 'react-spinners';
import useCustomToast from '@/app/hooks/useCustomToast';
import IsTimePassed from './IsTimePassed';
import checkUnlockAt from '@/app/hooks/checkUnlockAt';

// Types for categories fetched from API (grouped by parent group)
/*
  Group: grouping metadata returned by API
  CategoryItems: a concrete category item that belongs to a group
  GroupView: transformed, view-friendly structure for rendering
*/
type Group = {
  title: string;
  _id: string;
};

type CategoryItems = {
  createdAt: string;
  group: Group;
  title: string;
  updatedAt: string;
  _id: string;
};

type GroupView = { id: string; title: string; items: { id: string; title: string }[] };

export default function CapsuleTags() {
  // Redux helpers and global state access
  const dispatch = useAppDispatch();
  const { capsule, mode } = useSelector((state: RootState) => state.editOrcreate);

  // Toast for user feedback
  const showToast = useCustomToast();

  // Local UI state: currently selected category id
  const [selected, setSelected] = useState<string>(capsule?.categoryItem?._id || '');

  // Raw categories from API and loading flag
  const [categories, setCategories] = useState<CategoryItems[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // When capsule/mode changes, sync local "selected" from store
  useEffect(() => {
    if (!capsule) return;
    setSelected(capsule.categoryItem?._id || '');
  }, [mode, capsule]);

  // Fetch categories once on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await callApi().get('capsules/categories');
        if (res.status === 200) {
          setCategories(res.data.categoryItems);
          setLoading(false);
        }
      } catch {
        // Silently ignore errors; keep loading skeleton if needed
      }
    })();
  }, []);

  // Transform flat categories into grouped view model to render by group
  const groups: GroupView[] = useMemo(() => {
    if (!categories) return [];
    const map = new Map<string, GroupView>();
    for (const it of categories) {
      const gid = it.group._id;
      if (!map.has(gid)) {
        map.set(gid, { id: gid, title: it.group.title, items: [] });
      }
      map.get(gid)!.items.push({ id: it._id, title: it.title });
    }
    return Array.from(map.values());
  }, [categories]);

  // Persist the selected category into the global capsule state
  const handleSubmit = () => {
    if (!selected) {
      return showToast({ message: 'وارد کردن دسته بندی اجباری میباشد ❌', bg: 'bg-red-200' });
    }
    showToast('تنظیمات کپسول شما ثبت شد ✅');
    dispatch(
      setCapsule({
        ...capsule,
        categoryItem: { _id: selected },
      })
    );
  };

  // If capsule is time-locked and unlock time has passed, render notice component
  let isTimedPassed = false;
  if (capsule?.access?.unlockAt && capsule.createdAt) {
    isTimedPassed = checkUnlockAt(capsule.access.unlockAt);
    if (isTimedPassed === true) {
      return <IsTimePassed time={capsule.access.unlockAt} createdAt={capsule.createdAt} />;
    }
  }

  return (
    // Root semantic region for capsule category selection
    <section className="flex w-full p-8 h-full flex-col" aria-label="Capsule category selection">
      {/* Vertical stack wrapper for heading, list (or loader), actions and note */}
      <section className="flex flex-col gap-6">
        {/* Header: title and brief description */}
        <header className="space-y-1">
          <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">دسته‌بندی</h4>
          <p className="text-foreground/80">در این قسمت میتونین دسته‌بندی کپسول خودتون رو مشخص کنین تا دسترسی آسون‌تری بهش داشته باشین.</p>
        </header>

        {/* Loading state: spinner centered within a fixed-height container */}
        {loading ? (
          <div className="flex items-center justify-center gap-2 h-80">
            <span>درحال بارگزاری</span>
            <PulseLoader size={7} />
          </div>
        ) : (
          // Category groups rendered as a radio group (single-select)
          <RadioGroup dir="rtl" value={selected} onValueChange={setSelected} className="flex flex-col gap-8" aria-label="Select a category">
            {groups?.map((g) => (
              // One group block: title + its items as pill-like labels
              <section key={g.id} className="flex flex-col gap-4" aria-label={`Category group ${g.title}`}>
                <h5 className="text-lg font-semibold">{g.title}</h5>
                <div className="flex flex-wrap gap-3">
                  {g.items.map((it) => (
                    // Each item: hidden radio + clickable label styled as a pill
                    <Label
                      key={it.id}
                      className={`cursor-pointer rounded-full px-4 py-2 border transition-colors
                      ${selected === it.id ? 'bg-primary text-primary-foreground border-primary' : 'border-foreground/20 hover:border-primary'}`}
                    >
                      <RadioGroupItem value={it.id} className="hidden" />
                      {it.title}
                    </Label>
                  ))}
                </div>
              </section>
            ))}
          </RadioGroup>
        )}

        {/* Submit action: saves chosen category to global state */}
        <footer className="w-full flex justify-center mt-8" aria-label="Actions">
          <Button onClick={handleSubmit} className="cursor-pointer w-1/3 py-6 text-lg" disabled={!selected}>
            ثبت
          </Button>
        </footer>

        {/* Informational note below the selector */}
        <section className="flex flex-col gap-4 lg:p-4 lg:px-6" aria-label="Important note">
          <span className="text-foreground text-xl pr-4 relative font-bold after:content-[''] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2">توجه</span>
          <div className="flex gap-2 items-center py-4 px-2 border border-foreground/20 rounded-lg w-full">
            <Image src="/images/cartoon-question.png" alt="question" width={100} height={100} />
            <div className="flex flex-col gap-1">
              <p className="lg:text-lg text-base font-bold text-foreground/80">شما میتونین از بین موضوع‌های دسته‌بندی فقط یک مورد رو انتخاب کنین</p>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

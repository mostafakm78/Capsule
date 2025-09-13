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

// const categories: dashboardCreateCapsuleCategories[] = [
//   { title: '🧠 دسته‌بندی‌های احساسی', items: ['خوشحال‌کننده', 'ناراحت‌کننده', 'هیجان‌انگیز', 'آرامش‌بخش', 'ترسناک', 'الهام‌بخش'] },
//   { title: '📌 دسته‌بندی‌های موضوعی', items: ['خاطره شخصی', 'رویا', 'سفر', 'خانواده', 'دوستان', 'مدرسه / دانشگاه', 'عشق', 'کار', 'چالش‌ها'] },
//   { title: '⏳ دسته‌بندی‌های زمانی', items: ['کودکی', 'نوجوانی', 'بزرگسالی'] },
// ];

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
  const dispatch = useAppDispatch();
  const editOrcreate = useSelector((state: RootState) => state.editOrcreate);
  const capsule = editOrcreate.capsule;
  const showToast = useCustomToast();
  const [selected, setSelected] = useState<string>(capsule?.categoryItem?._id || '');
  const [categories, setCategories] = useState<CategoryItems[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (editOrcreate.mode === 'edit' && capsule) {
      setSelected(capsule.categoryItem?._id || '');
    }
  }, [editOrcreate, capsule]);

  useEffect(() => {
    (async () => {
      try {
        const res = await callApi().get('capsules/categories');
        if (res.status === 200) {
          setCategories(res.data.categoryItems);
          setLoading(false);
        }
      } catch {}
    })();
  }, []);

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

  return (
    <div className="flex w-full p-8 h-full flex-col">
      <div className="flex flex-col gap-6">
        <div className="space-y-1">
          <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">دسته‌بندی</h4>
          <p className="text-foreground/80">در این قسمت میتونین دسته‌بندی کپسول خودتون رو مشخص کنین تا دسترسی آسون‌تری بهش داشته باشین.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 h-80">
            <span>درحال بارگزاری</span>
            <PulseLoader size={7} />
          </div>
        ) : (
          <RadioGroup dir="rtl" value={selected} onValueChange={setSelected} className="flex flex-col gap-8">
            {groups?.map((g) => (
              <div key={g.id} className="flex flex-col gap-4">
                <h5 className="text-lg font-semibold">{g.title}</h5>
                <div className="flex flex-wrap gap-3">
                  {g.items.map((it) => (
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
              </div>
            ))}
          </RadioGroup>
        )}

        <div className="w-full flex justify-center mt-8">
          <Button onClick={handleSubmit} className="cursor-pointer w-1/3 py-6 text-lg" disabled={!selected}>
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

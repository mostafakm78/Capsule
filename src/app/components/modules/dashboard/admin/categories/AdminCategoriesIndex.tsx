'use client';

import { AlertModal } from './AlertModal';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useEffect, useMemo, useState } from 'react';
import callApi from '@/app/services/callApi';
import { PulseLoader } from 'react-spinners';
import Image from 'next/image';
import useCustomToast from '@/app/hooks/useCustomToast';
import { useRouter } from 'next/navigation';

type GroupView = { id: string; title: string; items: { id: string; title: string }[] };
type Group = { title: string; _id: string };
type CategoryItems = { createdAt: string; group: Group; title: string; updatedAt: string; _id: string };

export default function AdminCategoriesIndex() {
  const showToast = useCustomToast();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryItems[] | null>(null);
  const [categoryGroup, setCategoryGroup] = useState<string>('');
  const [categoryItem, setCategoryItem] = useState<string>('');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [newCategoryItem, setNewCategoryItem] = useState<string>('');

  useEffect(() => {
    setSelectedItemId('');
  }, [selectedGroupId]);

  useEffect(() => {
    (async () => {
      try {
        const res = await callApi().get('admin/categories');
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
      if (!map.has(gid)) map.set(gid, { id: gid, title: it.group.title, items: [] });
      map.get(gid)!.items.push({ id: it._id, title: it.title });
    }
    return Array.from(map.values());
  }, [categories]);

  const filteredItems = useMemo(() => groups.find((g) => g.id === selectedGroupId)?.items ?? [], [groups, selectedGroupId]);

  async function createCategory() {
    if (categoryGroup === '' || !categoryGroup || !categoryGroup.trim() || !categoryItem || categoryItem === '' || !categoryItem.trim()) {
      return showToast({ message: 'لطفا برای ساخت دسته‌بندی جدید عنوان و اسم رو وارد کنید ❌', bg: 'bg-red-200' });
    }
    try {
      const res = await callApi().post(`/admin/categories/${categoryGroup}`, { categoryItem });
      if (res.status === 201) {
        showToast({ message: 'دسته بندی شما با موفقیت ساخته شد ✅', bg: 'bg-green-200' });
        router.push('/dashboard/admin');
        return;
      } else {
        return showToast({ message: 'خطایی در ساخت دسته بندی بوجود آمده ❌', bg: 'bg-red-200' });
      }
    } catch {
      return showToast({ message: 'خطایی در ساخت دسته بندی بوجود آمده ❌', bg: 'bg-red-200' });
    }
  }

  async function editCategory() {
    if (newCategoryItem === '' || !newCategoryItem || !newCategoryItem.trim() || !selectedGroupId || selectedGroupId === '' || !selectedGroupId.trim() || !selectedItemId || selectedItemId === '' || !selectedItemId.trim()) {
      return showToast({ message: 'لطفا برای ویرایش دسته‌بندی هر سه فیلد را کامل کنید ❌', bg: 'bg-red-200' });
    }
    try {
      const res = await callApi().patch(`/admin/categories/${selectedGroupId}/${selectedItemId}`, { categoryItem: newCategoryItem });
      if (res.status === 200) {
        showToast({ message: 'دسته بندی شما با موفقیت ویرایش شد ✅', bg: 'bg-green-200' });
        router.push('/dashboard/admin');
        return;
      } else {
        return showToast({ message: 'خطایی در ویرایش دسته بندی بوجود آمده ❌', bg: 'bg-red-200' });
      }
    } catch {
      return showToast({ message: 'خطایی در ویرایش دسته بندی بوجود آمده ❌', bg: 'bg-red-200' });
    }
  }

  return (
    <section className="flex flex-col h-full gap-10">
      <div className="flex flex-col h-full justify-start gap-10">
        <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>دسته‌بندی‌های سایت</span>
        <div className="flex flex-col gap-6 md:p-8 p-3 bg-white dark:bg-slate-900 rounded-lg items-center justify-center w-full">
          <div className="space-y-1 self-start">
            <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">دسته‌بندی ها</h4>
            <p className="text-foreground/80">در این قسمت میتونین دسته بندی جدید وارد کنید و یا حذف کنید.</p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center gap-2 h-80">
              <span>درحال بارگزاری</span>
              <PulseLoader size={7} />
            </div>
          ) : (
            <div dir="rtl" className="flex flex-col gap-8">
              {groups.map((group, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  <h5 className="text-lg font-semibold">{group.title}</h5>
                  <div className="flex flex-wrap gap-3">
                    {group.items.map((item, i) => (
                      <div
                        key={i}
                        className={`cursor-pointer relative flex items-center rounded-full px-4 py-2 border transition-colors
                      hover:bg-red-400`}
                      >
                        <AlertModal item={item} groupId={group.id}/>
                        <div className="hidden" />
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Separator className="bg-foreground/20 w-full my-4" />
          <div className="space-y-1 self-start">
            <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">افزودن دسته‌بندی جدید</h4>
          </div>
          <div className="w-full flex-col flex items-center justify-between gap-6 lg:px-10 md:px-6 px-4">
            <div className="w-full flex gap-6">
              <div className="flex flex-col w-full gap-2 items-start text-base text-foreground/80">
                <span className="font-medium">انتخاب عنوان دسته‌بندی</span>
                <Select value={categoryGroup} onValueChange={(val) => setCategoryGroup(val)} dir="rtl">
                  <SelectTrigger className="w-full border border-primary">
                    <SelectValue placeholder="یک عنوان دسته‌بندی انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-primary">
                    {groups.map((group) => (
                      <SelectItem key={group.id} className="focus:bg-foreground/50 focus:text-white" value={group.id}>
                        {group.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Label htmlFor="name" className="flex flex-col w-full items-start text-base text-foreground/80 font-medium">
                اسم دسته‌بندی جدید
                <Input value={categoryItem} onChange={(e) => setCategoryItem(e.target.value)} className="md:placeholder:text-sm" id="name" type="text" placeholder="اسم دسته‌بندی" />
              </Label>
            </div>
            <Button disabled={!categoryItem && !categoryGroup} onClick={createCategory} className="cursor-pointer w-1/3 py-6 text-lg">
              ثبت
            </Button>
          </div>
          <div className="space-y-1 self-start">
            <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">ویرایش دسته‌بندی های موجود</h4>
          </div>
          <div className="w-full flex items-center justify-between gap-6 lg:px-10 md:px-6 px-4">
            <div className="flex flex-col w-full gap-2 items-start text-base text-foreground/80">
              <span className="font-medium">انتخاب عنوان دسته‌بندی</span>
              <Select value={selectedGroupId} onValueChange={setSelectedGroupId} dir="rtl">
                <SelectTrigger className="w-full border border-primary">
                  <SelectValue placeholder="یک عنوان دسته‌بندی انتخاب کنید" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-primary">
                  {groups.map((group) => (
                    <SelectItem key={group.id} className="focus:bg-foreground/50 focus:text-white" value={group.id}>
                      {group.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* انتخاب دسته‌بندی (آیتمِ زیرمجموعه‌ی گروه انتخاب‌شده) */}
              <Select value={selectedItemId} onValueChange={setSelectedItemId} dir="rtl" disabled={!selectedGroupId}>
                <SelectTrigger className="w-full border border-primary">
                  <SelectValue placeholder={selectedGroupId ? 'یک دسته‌بندی انتخاب کنید' : 'ابتدا یک عنوان دسته‌بندی انتخاب کنید'} />
                </SelectTrigger>
                <SelectContent className="bg-background border border-primary">
                  {filteredItems.map((item) => (
                    <SelectItem key={item.id} className="focus:bg-foreground/50 focus:text-white" value={item.id}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Label htmlFor="name" className="flex flex-col w-full items-start text-base text-foreground/80 font-medium">
              اسم دسته‌بندی جدید
              <Input value={newCategoryItem} onChange={(e) => setNewCategoryItem(e.target.value)} className="md:placeholder:text-sm" id="name" type="text" placeholder="اسم دسته‌بندی" />
            </Label>
          </div>
          <Button onClick={editCategory} disabled={!newCategoryItem} className="cursor-pointer w-1/3 py-6 text-lg">
            ثبت
          </Button>
          <div className="w-full flex justify-center mt-8"></div>
        </div>
        <div className="flex gap-2 items-center py-4 px-2 border border-foreground/20 rounded-lg lg:w-2/3 w-full">
          <Image src="/images/cartoon-question.png" alt="question" width={100} height={100} />
          <div className="flex flex-col gap-1">
            <p className="lg:text-lg text-base font-bold text-foreground/80">ادمین عزیز شما میتونین با کلیک روی دسته‌بندی های موجود اون رو حذف کنین و یا از قسمت های پایین دسته بندی های موجود ، دسته بندی جدید اضافه کنین یا دسته بندی رو ویرایش کنین.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

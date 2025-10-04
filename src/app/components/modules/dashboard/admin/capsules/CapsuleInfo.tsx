'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { ApiError, Capsule, dashboardCreateCapsuleColorOption } from '@/lib/types';
import useCustomToast from '@/app/hooks/useCustomToast';
import Image from 'next/image';
import callApi from '@/app/services/callApi';
import { PulseLoader } from 'react-spinners';
import { IoClose } from 'react-icons/io5';
import IsTimePassed from '../../create-edit/IsTimePassed';
import checkUnlockAt from '@/app/hooks/checkUnlockAt';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

type Props = { singleCapsule: Capsule | undefined };
type Color = 'default' | 'red' | 'green' | 'blue' | 'yellow';

type GroupView = { id: string; title: string; items: { id: string; title: string }[] };
type Group = { title: string; _id: string };
type CategoryItems = { createdAt: string; group: Group; title: string; updatedAt: string; _id: string };

/* Color palette for capsule background selection */
const colors: dashboardCreateCapsuleColorOption[] = [
  { id: 'default', colorCode: 'bg-white dark:bg-slate-900' },
  { id: 'red', colorCode: 'bg-red-600/15 dark:bg-red-800/50' },
  { id: 'green', colorCode: 'bg-green-600/15 dark:bg-green-800/50' },
  { id: 'blue', colorCode: 'bg-blue-600/15 dark:bg-blue-800/50' },
  { id: 'yellow', colorCode: 'bg-yellow-500/15 dark:bg-yellow-700/50' },
];

/* Visibility options for the capsule */
const statusOptions = [
  { id: 'public', value: 'public' as const, label: 'کپسول عمومی' },
  { id: 'private', value: 'private' as const, label: 'کپسول خصوصی' },
];

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function CapsuleInfo({ singleCapsule }: Props) {
  /* Toast and router hooks */
  const showToast = useCustomToast();
  const router = useRouter();

  /* Form state */
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [extra, setExtra] = useState('');
  const [color, setColor] = useState<Color>('default');

  /* Image handling state */
  const [rmvImage, setRmvImage] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const lastBlobUrl = useRef<string | null>(null);
  const fileRef = useRef<File | null>(null);
  const [fileChanged, setFileChanged] = useState(false);

  /* Categories and selection state */
  const [categories, setCategories] = useState<CategoryItems[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<'public' | 'private'>('public');

  /* Snapshot of initial values to detect unsaved changes */
  const initialRef = useRef<{
    title: string;
    description: string;
    extra: string;
    color: Color;
    categoryId: string;
    visibility: 'public' | 'private';
    hadImage: boolean;
  } | null>(null);

  /* Callback to receive selected file (kept in ref to avoid rerenders) */
  const onFileSelected = useCallback((file: File | null) => {
    fileRef.current = file;
  }, []);

  /* Populate form with the provided capsule (admin editing existing capsule) */
  useEffect(() => {
    if (!singleCapsule) return;

    // Determine category id whether it's populated or just an id string
    const catId = typeof (singleCapsule as Capsule).categoryItem === 'string' ? (singleCapsule as Capsule).categoryItem : singleCapsule.categoryItem?._id ?? '';

    // Map visibility to a safe union
    const vis = singleCapsule.access?.visibility === 'private' ? 'private' : 'public';

    // Hydrate local state
    setTitle(singleCapsule.title || '');
    setDescription(singleCapsule.description || '');
    setExtra(singleCapsule.extra || '');
    setColor((singleCapsule?.color as Color) || 'default');
    setSelectedCategory(catId as string);
    setSelectedStatus(vis);
    setFileChanged(false);
    fileRef.current = null;

    // Show existing image if not flagged for removal
    if (singleCapsule.image && !rmvImage) {
      setPreview(`${baseURL}/images/${singleCapsule.image}`);
    } else {
      setPreview(null);
    }

    // Cache initial values to detect "dirty" changes later
    initialRef.current = {
      title: singleCapsule.title || '',
      description: singleCapsule.description || '',
      extra: singleCapsule.extra || '',
      color: (singleCapsule?.color as Color) || 'default',
      categoryId: catId as string,
      visibility: vis,
      hadImage: !!singleCapsule.image,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleCapsule]);

  /* Cleanup any leftover blob URLs on unmount */
  useEffect(() => {
    return () => {
      if (lastBlobUrl.current) {
        URL.revokeObjectURL(lastBlobUrl.current);
        lastBlobUrl.current = null;
      }
    };
  }, [onFileSelected]);

  /* Fetch all category items (grouped later) */
  useEffect(() => {
    (async () => {
      try {
        const res = await callApi().get('capsules/categories');
        console.log(res);

        if (res.status === 200) {
          setCategories(res.data.categoryItems);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  /* Build groups -> items view model for categories */
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

  /* Handle file input change: preview + mark dirty + store in ref */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRmvImage(false);
    setFileChanged(true);
    onFileSelected?.(file);

    const url = URL.createObjectURL(file);
    setPreview(url);
    e.target.value = '';
  };

  /* Compute if form has unsaved changes compared to initial snapshot */
  const isDirty = useMemo(() => {
    const init = initialRef.current;
    if (!init) return false;

    const basicChanged = title !== init.title || description !== init.description || extra !== init.extra || color !== init.color || selectedCategory !== init.categoryId || selectedStatus !== init.visibility;

    const imageChanged = fileChanged || (rmvImage && init.hadImage);

    return basicChanged || imageChanged;
  }, [title, description, extra, color, selectedCategory, selectedStatus, fileChanged, rmvImage]);

  /* If capsule is time-locked and time already passed, show the time-passed component */
  let isTimedPassed = false;
  if (singleCapsule?.access?.unlockAt && singleCapsule.createdAt) {
    isTimedPassed = checkUnlockAt(singleCapsule.access.unlockAt);
    if (isTimedPassed === true) {
      return <IsTimePassed time={singleCapsule.access.unlockAt} createdAt={singleCapsule.createdAt} />;
    }
  }

  /* Submit handler: builds multipart form-data and sends PATCH to admin endpoint */
  const handleSubmit = async () => {
    if (submitting || !singleCapsule) return;
    setSubmitting(true);

    try {
      const fd = new FormData();

      // Helper: append common primitives conditionally
      const appendIf = (key: string, val: unknown) => {
        if (val === undefined || val === null || val === '') return;
        if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
          fd.append(key, String(val));
          return;
        }
        if (val instanceof Date) {
          fd.append(key, val.toISOString());
          return;
        }
        if (val instanceof File || val instanceof Blob) {
          fd.append(key, val);
          return;
        }
        fd.append(key, JSON.stringify(val));
      };

      // Append text fields and selections
      appendIf('title', title);
      appendIf('description', description);
      appendIf('extra', extra);
      appendIf('color', color);
      appendIf('categoryItem', selectedCategory);

      // Image removal flag
      if (rmvImage) appendIf('removeImage', true);

      // New image file (if any)
      const file = fileRef.current;
      if (file) {
        fd.append('image', file);
      }

      // Access payload (visibility; lock forced to 'none' in this view)
      fd.append('access', JSON.stringify({ visibility: selectedStatus, lock: 'none' }));

      // PATCH request to update capsule by admin
      const res = await callApi().patch(`/admin/users/${singleCapsule.owner?._id}/${singleCapsule._id}`, fd);
      if (res.status === 200) {
        showToast({ message: 'کپسول با موفقیت بروزرسانی شد ✅', bg: 'bg-green-300' });
        router.push(`/dashboard/admin/users/${singleCapsule.owner?._id}`);
      }
    } catch (error) {
      // Error handling based on API error metadata
      const err = error as AxiosError<ApiError>;
      console.log(err);

      const payload = err.response?.data?.data;
      if (err.response?.data?.message === 'File too large') {
        showToast({ message: 'حجم فایل وارد شده زیاد است ❌', bg: 'bg-red-200' });
      } else if (err.response?.status === 500) {
        showToast({ message: 'وارد کردن فیلد عنوان ، توضیحات ، دسته‌بندی و نوع کپسول اجباری میباشد ❌', bg: 'bg-red-200' });
      } else if (err.response?.status === 422 && Array.isArray(payload)) {
        payload.forEach(({ message }) => showToast({ message, bg: 'bg-red-200' }));
      } else if (err.response?.status === 415) {
        showToast({ message: err.response.data.message });
      } else {
        showToast({ message: 'خطایی رخ داد، دوباره تلاش کنید' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Title field */}
      <Label className="flex flex-col items-start text-base text-foreground/80">
        اسم کپسول
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثال : تولد برادرم" className="md:text-sm md:placeholder:text-sm" />
      </Label>

      {/* Description field */}
      <Label className="flex flex-col items-start text-base text-foreground/80">
        توضیحات
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="نوشته ها برای ذخیره در کپسول" className="md:text-sm md:placeholder:text-sm w-full h-[200px]" />
      </Label>

      {/* Image upload section */}
      <section className="flex flex-col gap-2">
        <span className="text-base text-foreground/80 font-medium">
          <span className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              عکس<span className="text-red-500 text-xs underline underline-offset-2">حداکثر 5Mb</span>
            </div>
            {preview && (
              <span
                onClick={() => {
                  // Remove image: reset flags, revoke blob URL, clear file ref
                  setRmvImage(true);
                  setPreview(null);
                  setFileChanged(false);
                  fileRef.current = null;

                  if (lastBlobUrl.current) {
                    URL.revokeObjectURL(lastBlobUrl.current);
                    lastBlobUrl.current = null;
                  }
                  onFileSelected?.(null);
                }}
                className="flex items-center text-xs cursor-pointer hover:scale-105 duration-300 bg-red-400 text-background rounded-lg p-1"
              >
                حذف عکس
                <IoClose className="text-base" />
              </span>
            )}
          </span>
        </span>

        {/* Click target for file selection + live preview */}
        <Label className={`relative flex flex-col bg-background h-[200px] items-center justify-center border border-primary cursor-pointer ${preview ? 'p-0' : 'p-4'} rounded-lg text-base text-foreground/80 overflow-hidden`}>
          <span className={`text-lg ${preview ? 'hidden' : ''}`}>انتخاب عکس</span>
          <MdOutlineCameraAlt className={`text-4xl ${preview ? 'hidden' : ''}`} />

          {preview && (
            <div className="relative w-full h-full">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover rounded-lg"
                onLoad={() => {
                  // Revoke previous blob URL once the new preview loads
                  if (lastBlobUrl.current && lastBlobUrl.current !== preview) {
                    URL.revokeObjectURL(lastBlobUrl.current);
                  }
                  // Track current preview if it is a blob URL
                  lastBlobUrl.current = preview.startsWith('blob:') ? preview : null;
                }}

              />
            </div>
          )}
          <Input onChange={handleFileChange} type="file" name="image" accept="image/*" className="hidden" />
        </Label>
      </section>

      {/* Extra description field */}
      <Label className="flex flex-col items-start text-base text-foreground/80">
        توضیحات اضافی
        <Textarea value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="نوشته های اضافی برای ذخیره در کپسول" className="md:text-sm md:placeholder:text-sm w-full h-[200px]" />
      </Label>

      {/* Color selection section */}
      <section className="flex flex-col items-center gap-2">
        <span className="text-foreground/80 self-start text-base font-medium">رنگ پس زمینه کپسول</span>
        <p className="text-sm self-start text-foreground/70">شما میتونین برای نمایش کپسول خودتون چه در پنل خصوصی خودتون و چه در بخش عمومی از رنگ های زیر انتخاب کنین.</p>
        <div className="mt-4">
          {/* Radios for color (visualized as colored dots) */}
          <RadioGroup value={color} onValueChange={(value: Color) => setColor(value)} className="flex gap-4">
            <div className="mt-4 flex gap-4">
              {colors.map(({ id, colorCode }) => (
                <div key={id} onClick={() => setColor(id as Color)} className={`${colorCode} h-8 w-8 md:h-10 md:w-10 rounded-full transition-all ${color === id ? 'ring-4 ring-primary' : 'ring ring-foreground/30'} cursor-pointer`} title={id} />
              ))}
            </div>
          </RadioGroup>
        </div>
      </section>

      {/* Categories (grouped) or loading state */}
      {loading ? (
        <div className="flex items-center justify-center gap-2 h-80">
          <span>درحال بارگزاری</span>
          <PulseLoader size={7} />
        </div>
      ) : (
        // Category group list rendered as radio pills
        <section>
          <RadioGroup dir="rtl" value={selectedCategory} onValueChange={setSelectedCategory} className="flex flex-col gap-8">
            {groups?.map((g) => (
              <article key={g.id} className="flex flex-col gap-4">
                <h5 className="text-lg font-semibold">{g.title}</h5>
                <div className="flex flex-wrap gap-3">
                  {g.items.map((it) => (
                    <Label key={it.id} className={`cursor-pointer rounded-full px-4 py-2 border transition-colors ${selectedCategory === it.id ? 'bg-primary text-primary-foreground border-primary' : 'border-foreground/20 hover:border-primary'}`}>
                      <RadioGroupItem value={it.id} className="hidden" />
                      {it.title}
                    </Label>
                  ))}
                </div>
              </article>
            ))}
          </RadioGroup>
        </section>
      )}

      {/* Visibility selection (public/private) */}
      <section aria-label="visibility-options">
        <RadioGroup dir="rtl" value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as 'public' | 'private')} className="flex flex-wrap items-center justify-center gap-4 mt-16">
          {statusOptions.map((opt) => (
            <div key={opt.value} className="inline-flex">
              <RadioGroupItem id={`status-${opt.value}`} value={opt.value} className="sr-only" />
              <Label htmlFor={`status-${opt.value}`} className={`cursor-pointer rounded-full px-6 py-3 border text-lg transition-colors flex justify-center ${selectedStatus === opt.value ? 'bg-primary text-primary-foreground border-primary' : 'border-foreground/20 hover:border-primary'}`}>
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </section>

      {/* Form actions */}
      <footer className="w-full flex justify-center my-8 gap-2">
        <Button onClick={handleSubmit} disabled={!isDirty || submitting} className="cursor-pointer md:w-1/3 w-2/4 py-6 text-lg">
          {submitting ? 'در حال ثبت…' : 'ثبت'}
        </Button>
      </footer>
    </>
  );
}

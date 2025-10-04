'use client';

import checkUnlockAt from '@/app/hooks/checkUnlockAt';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hook';
import useCustomToast from '@/app/hooks/useCustomToast';
import { setCapsule } from '@/app/store/editOrcreateSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { dashboardCreateCapsuleColorOption } from '@/lib/types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineCameraAlt } from 'react-icons/md';
import IsTimePassed from './IsTimePassed';
import { IoClose } from 'react-icons/io5';

type Color = 'default' | 'red' | 'green' | 'blue' | 'yellow';

// Available background color options (used for preview ring highlight)
/* Each option maps an id to the corresponding Tailwind class */
const colors: dashboardCreateCapsuleColorOption[] = [
  { id: 'default', colorCode: 'bg-white dark:bg-slate-900' },
  { id: 'red', colorCode: 'bg-red-600/15 dark:bg-red-800/50' },
  { id: 'green', colorCode: 'bg-green-600/15 dark:bg-green-800/50' },
  { id: 'blue', colorCode: 'bg-blue-600/15 dark:bg-blue-800/50' },
  { id: 'yellow', colorCode: 'bg-yellow-500/15 dark:bg-yellow-700/50' },
];

type Props = {
  onFileSelected?: (file: File | null) => void;
};

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function CapsuleInfo({ onFileSelected }: Props) {
  // Redux and helpers
  const dispatch = useAppDispatch();
  const { mode, capsule } = useAppSelector((state) => state.editOrcreate);
  const showToast = useCustomToast();

  // Local UI state for form fields
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [extra, setExtra] = useState<string>('');
  const [selected, setSelected] = useState<Color>('default');
  const [inputKey, setInputKey] = useState(0); // forces file input reset

  // Image selection / preview handling
  const [rmvImage, setRmvImage] = useState<boolean>(false); // flag to remove existing server image on edit
  const [preview, setPreview] = useState<string | null>(null); // preview URL (blob or server)
  const [hasLocalImage, setHasLocalImage] = useState<boolean>(false); // prevents server preview override after local selection
  const lastBlobUrl = useRef<string | null>(null); // tracks the last blob URL to revoke on cleanup

  // Initialize form fields from Redux capsule; keep preview unless user just picked a local file
  useEffect(() => {
    if (!capsule) return;

    setTitle(capsule.title || '');
    setDescription(capsule.description || '');
    setExtra(capsule.extra || '');
    setSelected((capsule?.color as Color) || 'default');

    // If user has selected a local file, do not override the local preview with server image
    if (hasLocalImage) return;

    if (rmvImage) {
      setPreview(null);
    } else if (capsule.image) {
      setPreview(`${baseURL}/images/${capsule.image}`);
    } else {
      setPreview(null);
    }
  }, [mode, capsule, rmvImage, hasLocalImage]);

  // Revoke blob URLs on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (lastBlobUrl.current && lastBlobUrl.current.startsWith('blob:')) {
        URL.revokeObjectURL(lastBlobUrl.current);
      }
      lastBlobUrl.current = null;
    };
  }, [onFileSelected]);

  // Handle selecting a new image file; create a preview blob URL and notify parent via callback
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRmvImage(false);
    setHasLocalImage(true);
    onFileSelected?.(file);

    const url = URL.createObjectURL(file);
    setPreview(url);
    lastBlobUrl.current = url; // store immediately so it's tracked even before onLoad

    // Reset the input so the same file can be selected again if needed
    setInputKey((k) => k + 1);
  };

  // Remove currently previewed image (local or server) and mark for removal on submit (when editing)
  const handleRemoveImage = () => {
    setRmvImage(true);
    setHasLocalImage(false);
    setPreview(null);

    if (lastBlobUrl.current && lastBlobUrl.current.startsWith('blob:')) {
      URL.revokeObjectURL(lastBlobUrl.current);
    }
    lastBlobUrl.current = null;

    onFileSelected?.(null);

    // Reset file input
    setInputKey((k) => k + 1);
  };

  // Persist current form values to Redux; basic validation for required fields
  const handleSubmit = () => {
    if (submitting) return;
    setSubmitting(true);

    if (!title || !description) {
      showToast({ message: 'وارد کردن عنوان و توضیحات اجباری میباشد ❌', bg: 'bg-red-200' });
      setSubmitting(false);
      return;
    }

    try {
      dispatch(
        setCapsule({
          ...capsule,
          title,
          description,
          extra,
          color: selected,
          removeImage: mode === 'edit' && rmvImage ? true : false,
        })
      );
      showToast('تنظیمات کپسول شما ثبت شد ✅');
    } finally {
      setSubmitting(false);
    }
  };

  // If capsule has a timed lock and the time already passed, show the info component instead of the form
  let isTimedPassed = false;
  if (capsule?.access?.unlockAt && capsule.createdAt) {
    isTimedPassed = checkUnlockAt(capsule.access.unlockAt);
    if (isTimedPassed === true) {
      return <IsTimePassed time={capsule.access.unlockAt} createdAt={capsule.createdAt} />;
    }
  }

  return (
    // Root section for "Capsule Info" step; contains the entire form
    <section className="flex w-full md:p-8 p-4 h-full flex-col">
      {/* Vertical stack for all fields and actions */}
      <section className="flex flex-col gap-6">
        {/* Form heading and short description */}
        <header className="space-y-1">
          <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">اطلاعات</h4>
          <p className="text-foreground/80">در این قسمت میتونین اسم ، یادداشت‌ها ، عکس و حتی رنگ کپسول خودتون رو مشخص کنین.</p>
        </header>

        {/* Title input (required) */}
        <Label className="flex flex-col items-start text-base text-foreground/80">
          <span>
            اسم کپسول<span className="text-red-500 text-lg">*</span>
          </span>
          <Input type="text" placeholder="مثال : تولد برادرم" value={title} onChange={(e) => setTitle(e.target.value)} className="md:text-sm md:placeholder:text-sm" />
        </Label>

        {/* Description textarea (required) */}
        <Label className="flex flex-col items-start text-base text-foreground/80">
          <span>
            توضیحات شما<span className="text-red-500 text-lg">*</span>
          </span>
          <Textarea placeholder="نوشته های شما برای ذخیره در کپسول" value={description} onChange={(e) => setDescription(e.target.value)} className="md:text-sm md:placeholder:text-sm w-full h-[200px]" />
        </Label>

        {/* Image picker block: shows pick button, live preview and remove action */}
        <section className="flex flex-col gap-2">
          <span className="text-base text-foreground/80 font-medium">
            <span className="flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                عکس<span className="text-red-500 text-xs underline underline-offset-2">حداکثر 5Mb</span>
              </div>
              {preview && (
                <span onClick={handleRemoveImage} className="flex items-center text-xs cursor-pointer hover:scale-105 duration-300 bg-red-400 text-background rounded-lg p-1">
                  حذف عکس
                  <IoClose className="text-base" />
                </span>
              )}
            </span>
          </span>

          {/* Clickable dropzone-like label that holds the hidden file input */}
          <Label className={`relative flex flex-col bg-background h-[200px] items-center justify-center border border-primary cursor-pointer ${preview ? 'p-0' : 'p-4'} rounded-lg text-base text-foreground/80 overflow-hidden`}>
            {/* Placeholder icon/text when no image is selected */}
            <span className={`text-lg ${preview ? 'hidden' : ''}`}>انتخاب عکس</span>
            <MdOutlineCameraAlt className={`text-4xl ${preview ? 'hidden' : ''}`} />

            {/* Image preview (either blob or server URL) */}
            {preview && (
              <div className="relative w-full h-full">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                  onLoad={() => {
                    // Revoke previous blob URL to free memory (when switching local images)
                    if (lastBlobUrl.current && lastBlobUrl.current !== preview && lastBlobUrl.current.startsWith('blob:')) {
                      URL.revokeObjectURL(lastBlobUrl.current);
                    }
                    // If preview is server URL (not blob), clear the blob ref and allow server-driven updates again
                    if (!preview.startsWith('blob:')) {
                      lastBlobUrl.current = null;
                      setHasLocalImage(false);
                    }
                  }}

                />
              </div>
            )}

            {/* Hidden file input; keyed to allow selecting the same file twice */}
            <Input multiple={false} key={inputKey} onChange={handleFileChange} type="file" accept="image/*" className="hidden" />
          </Label>
        </section>

        {/* Optional extra notes textarea */}
        <Label className="flex flex-col items-start text-base text-foreground/80">
          توضیحات اضافی
          <Textarea placeholder="نوشته های شما برای ذخیره در کپسول" value={extra} onChange={(e) => setExtra(e.target.value)} className="md:text-sm md:placeholder:text-sm w-full h-[200px]" />
        </Label>

        {/* Background color picker (radio-like UI) */}
        <section className="flex flex-col items-center gap-2">
          <span className="text-foreground/80 self-start text-base font-medium">رنگ پس زمینه کپسول شما</span>
          <p className="text-sm self-start text-foreground/70">شما میتونین برای نمایش کپسول خودتون چه در پنل خصوصی خودتون و چه در بخش عمومی از رنگ های زیر انتخاب کنین.</p>

          {/* Color swatches; highlight current selection with a ring */}
          <div className="mt-4">
            <RadioGroup value={selected} onValueChange={(value: Color) => setSelected(value)} className="flex gap-4">
              <div className="mt-4 flex gap-4">
                {colors.map(({ id, colorCode }) => (
                  <div key={id} onClick={() => setSelected(id as Color)} className={`${colorCode} h-8 w-8 md:h-10 md:w-10 rounded-full transition-all ${selected === id ? 'ring-4 ring-primary' : 'ring ring-foreground/30'} cursor-pointer`} title={id} />
                ))}
              </div>
            </RadioGroup>
          </div>
        </section>

        {/* Submit button (saves current step data to Redux) */}
        <footer className="w-full flex justify-center mt-8">
          <Button onClick={handleSubmit} disabled={!title || !description || submitting} className="cursor-pointer w-1/3 py-6 text-lg" aria-busy={submitting}>
            ثبت
          </Button>
        </footer>
      </section>
    </section>
  );
}

'use client';

import { PiSubtitlesFill } from 'react-icons/pi';
import { FaImage } from 'react-icons/fa6';
import { GrStatusInfo } from 'react-icons/gr';
import dynamic from 'next/dynamic';
import { ComponentType, JSX, useCallback, useEffect, useRef, useState } from 'react';
import { TabButton } from './TabButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ApiError, dashboardCreateCapsuleTab, Lock, Visibility } from '@/lib/types';
import { Button } from '@/components/ui/button';
import callApi from '@/app/services/callApi';
import useCustomToast from '@/app/hooks/useCustomToast';
import { AxiosError } from 'axios';
import checkUnlockAt from '@/app/hooks/checkUnlockAt';
import { DeleteCpModal } from './DeleteCpModal';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';
import Image from 'next/image';

const CapsuleInfo = dynamic(() => import('./CapsuleInfo'));
const CapsuleTags = dynamic(() => import('./CapsuleTags'));
const CapsuleStatus = dynamic(() => import('./CapsuleStatus'));

type AccessPayload = {
  visibility: Visibility;
  lock: Lock;
  unlockAt?: string;
};

const isDate = (v: unknown): v is Date => v instanceof Date;

const tabs: { id: dashboardCreateCapsuleTab; label: string; icon: ComponentType<{ className?: string }>; component: JSX.Element }[] = [
  { id: 'info', label: 'اطلاعات کپسول', icon: PiSubtitlesFill, component: <CapsuleInfo /> },
  { id: 'tags', label: 'دسته‌بندی کپسول', icon: FaImage, component: <CapsuleTags /> },
  { id: 'status', label: 'وضعیت انتشار کپسول', icon: GrStatusInfo, component: <CapsuleStatus /> },
];

export default function CreateCapsulePage() {
  const router = useRouter();
  const [tab, setTab] = useState<dashboardCreateCapsuleTab>('info');
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState(false);
  const { capsule, mode } = useSelector((state: RootState) => state.editOrcreate);
  const showToast = useCustomToast();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  let isTimedPassed = false;
  if (capsule?.access?.unlockAt) {
    isTimedPassed = checkUnlockAt(capsule.access.unlockAt);
  }

  // فایل انتخابی کاربر اینجا نگه داشته می‌شود
  const fileRef = useRef<File | null>(null);
  const onFileSelected = useCallback((file: File | null) => {
    fileRef.current = file;
  }, []);

  // رنگ پس‌زمینه
  const color = capsule?.color;
  let colorCode;
  if (!color || color === 'default') {
    colorCode = 'bg-white dark:bg-slate-900';
  } else if (color === 'blue') {
    colorCode = 'bg-blue-600/15 dark:bg-blue-800/50';
  } else if (color === 'green') {
    colorCode = 'bg-green-600/15 dark:bg-green-800/50';
  } else if (color === 'red') {
    colorCode = 'bg-red-600/15 dark:bg-red-800/50';
  } else if (color === 'yellow') {
    colorCode = 'bg-yellow-500/15 dark:bg-yellow-700/50';
  }

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const fd = new FormData();

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

      const categoryItem = capsule?.categoryItem?._id;

      appendIf('title', capsule?.title);
      appendIf('description', capsule?.description);
      appendIf('extra', capsule?.extra);
      appendIf('color', capsule?.color);
      appendIf('categoryItem', categoryItem);
      if (capsule?.removeImage === true) {
        appendIf('removeImage', capsule.removeImage);
      } else if (fileRef.current) {
        fd.set('image', fileRef.current);
      }

      const lock = capsule?.access?.lock as Lock | undefined;
      const isTimed = lock === 'timed';

      const rawUnlockAt = capsule?.access?.unlockAt as unknown;
      const unlockAt: string | undefined = isTimed ? (isDate(rawUnlockAt) ? rawUnlockAt.toISOString() : (typeof rawUnlockAt === 'string' && rawUnlockAt) || undefined) : undefined;

      const accessPayload: AccessPayload = {
        visibility: (capsule?.access?.visibility as Visibility) ?? 'public',
        lock: lock ?? 'none',
        ...(unlockAt ? { unlockAt } : {}),
      };
      fd.append('access', JSON.stringify(accessPayload));

      if (mode === 'edit' && capsule?._id) {
        const res = await callApi().patch(`/capsules/${capsule._id}`, fd);
        if (res.status === 200) {
          fileRef.current = null;
          showToast({ message: 'کپسول شما با موفقیت بروزرسانی شد ✅', bg: 'bg-green-300' });
          router.push('/dashboard/user-capsules');
          return;
        }
      } else {
        const res = await callApi().post('/capsules', fd);
        if (res.status === 201) {
          showToast({ message: 'کپسول شما با موفقیت ساخته شد ✅', bg: 'bg-green-300' });
          router.push('/dashboard/user-capsules');
          return;
        }
      }
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      const payload = err.response?.data.data;

      if (err.response?.data.message === 'File too large') {
        showToast({ message: 'حجم فایل وارد شده زیاد است ❌', bg: 'bg-red-200' });
      } else if (err.response?.status === 500) {
        showToast({ message: 'وارد کردن فیلد عنوان ، توضیحات ، دسته‌بندی و نوع کپسول اجباری میباشد ❌', bg: 'bg-red-200' });
      } else if (err.response?.status === 422) {
        if (Array.isArray(payload)) {
          payload.forEach(({ message }) => showToast({ message, bg: 'bg-red-200' }));
        }
      } else if (err.response?.status === 415) {
        showToast({ message: err.response.data.message });
      } else {
        showToast({ message: 'خطایی در ثبت کپسول شما پیش آمده لطفا کمی بعد تلاش کنید' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // اگر روی کپسول دیگری رفتید، فایل انتخابی قبلی پاک شود
  useEffect(() => {
    fileRef.current = null;
  }, [capsule?._id]);

  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 h-full">
        <span>درحال بارگزاری</span>
        <PulseLoader size={7} />
      </div>
    );

  return (
    <section key={mode && capsule?._id} className="flex flex-col h-full gap-10">
      <span className='text-foreground text-xl pr-4 relative font-bold after:content-[""] after:h-2 after:w-2 after:rounded-full after:absolute after:bg-foreground after:right-0 after:top-1/2 after:-translate-y-1/2'>{mode === 'create' ? 'ساخت کپسول' : 'ویرایش کپسول'}</span>

      <div className="flex lg:flex-row flex-col h-full justify-start gap-10">
        {/* Desktop Tabs */}
        <div className="lg:flex hidden w-3/12 flex-col gap-4">
          {tabs.map(({ id, label, icon: Icon }) => (
            <TabButton key={id} id={id} currentTab={tab} setTab={setTab} icon={Icon}>
              {label}
            </TabButton>
          ))}
        </div>

        {/* Mobile Select */}
        <div className="lg:hidden flex w-full flex-col gap-4">
          <Select value={tab} onValueChange={(value: dashboardCreateCapsuleTab) => setTab(value)} dir="rtl">
            <SelectTrigger size="sm" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tabs.map(({ id, label, icon: Icon }) => (
                <SelectItem key={id} value={id}>
                  <div className="flex items-center text-base font-medium gap-2">
                    <div className="bg-primary p-1 rounded-md">
                      <Icon />
                    </div>
                    {label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tab Content */}
        <div className={`h-full lg:w-9/12 w-full ${colorCode} rounded-lg shadow-md shadow-black/5`}>{tab === 'info' ? <CapsuleInfo onFileSelected={onFileSelected} /> : tab === 'tags' ? <CapsuleTags /> : <CapsuleStatus />}</div>
      </div>

      <div className="w-full flex justify-center mt-8 gap-4">
        <DeleteCpModal />
        <Button onClick={handleSubmit} disabled={(mode === 'edit' ? isTimedPassed : false) || submitting} className="cursor-pointer md:w-1/4 py-6 text-lg" aria-busy={submitting}>
          {mode === 'edit' ? 'ویرایش کپسول' : 'ساخت کپسول'}
        </Button>
      </div>

      <div className="flex gap-2 items-center py-4 px-2 border border-foreground/20 rounded-lg lg:w-2/3 w-full">
        <Image src="/images/cartoon-question.png" alt="question" width={100} height={100} />
        <div className="flex flex-col gap-1">
          <p className="lg:text-lg text-base font-bold text-foreground/80">شما میتونین برای ساخت کپسول از سه بخش مختلف موجود ، مشخصات کپسول خودتون رو وارد کنین. توجه داشته باشین که بخش دسته بندی و وضعیت انتشار ضروری میباشد.</p>
        </div>
      </div>
    </section>
  );
}

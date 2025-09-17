'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineCameraAlt } from 'react-icons/md';
import BirthDateInputs from './BirthDateInput';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hook';
import callApi from '@/app/services/callApi';
import { AxiosError } from 'axios';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import useCustomToast from '@/app/hooks/useCustomToast';
import { setUser } from '@/app/store/userSlice';
import { ApiError } from '@/lib/types';

export default function UserAccInfo() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const showToast = useCustomToast();

  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [birthday, setBirthday] = useState<string | Date>('');
  const [rmvImage, setRmvImage] = useState<boolean>(false);

  const lastBlobUrl = useRef<string | null>(null);
  const fileRef = useRef<File | null>(null);

  const [initialData, setInitialData] = useState({
    name: '',
    email: '',
    education: '',
    about: '',
    birthday: '' as string | Date,
    avatar: null as string | null,
  });

  const onFileSelected = useCallback((file: File | null) => {
    fileRef.current = file;
  }, []);

  useEffect(() => {
    if (!user) return;

    setName(user.name ?? '');
    setEmail(user.email ?? '');
    setEducation(user.education ?? '');
    setAbout(user.about ?? '');
    setBirthday(user.birthday ?? '');
    setPreview(user.avatar ? `http://localhost:8080/images/${user.avatar}` : null);

    setInitialData({
      name: user.name ?? '',
      email: user.email ?? '',
      education: user.education ?? '',
      about: user.about ?? '',
      birthday: user.birthday ?? '',
      avatar: user.avatar ?? null,
    });
  }, [user]);

  useEffect(() => {
    return () => {
      if (lastBlobUrl.current) {
        URL.revokeObjectURL(lastBlobUrl.current);
        lastBlobUrl.current = null;
      }
    };
  }, [onFileSelected]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRmvImage(false);
    onFileSelected(file);

    const url = URL.createObjectURL(file);
    setPreview(url);
    e.target.value = '';
  };

  const handleSubmit = async () => {
    const fd = new FormData();

    const appendIf = (key: string, val: unknown) => {
      if (val === undefined || val === null || val === '') return;
      if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
        fd.append(key, String(val));
        return;
      }
      if (val instanceof File || val instanceof Blob) {
        fd.append(key, val);
        return;
      }
      fd.append(key, JSON.stringify(val));
    };

    appendIf('name', name);
    appendIf('education', education);
    appendIf('about', about);
    appendIf('birthday', birthday);
    if (rmvImage) appendIf('removeImage', 'true');

    const file = fileRef.current;
    if (file) appendIf('image', file);

    try {
      const res = await callApi().patch('/me', fd);

      if (res.status === 200) {
        const updatedUser = {
          ...user,
          name,
          education,
          about,
          birthday,
          avatar: res.data.user.avatar ?? null,
        };

        dispatch(setUser(updatedUser));

        setPreview(updatedUser.avatar ? `http://localhost:8080/images/${updatedUser.avatar}` : null);

        showToast({ message: 'اطلاعات حساب شما با موفقیت بروزرسانی شد ✅', bg: 'bg-green-300' });

        router.push('/dashboard/panel');
      }
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      const payload = err.response?.data.data;
      console.log(err);
      if (err.response?.data.message === 'File too large') {
        return showToast({ message: 'حجم فایل وارد شده زیاد است ❌', bg: 'bg-red-200' });
      }
      if (err.response?.status === 500) {
        return showToast({ message: 'وارد کردن فیلد عنوان ، توضیحات ، دسته‌بندی و نوع کپسول اجباری میباشد ❌', bg: 'bg-red-200' });
      } else if (err.response?.status === 422) {
        if (Array.isArray(payload)) {
          payload.forEach(({ message }) => {
            return showToast({ message: message, bg: 'bg-red-200' });
          });
        }
      } else if (err.response?.status === 415) {
        return showToast({ message: err.response.data.message });
      } else {
        return showToast({ message: 'خطایی در ثبت کپسول شما پیش آمده لطفا کمی بعد تلاش کنید' });
      }
    }
  };

  const isChanged = () => {
    return name !== initialData.name || education !== initialData.education || about !== initialData.about || birthday !== initialData.birthday || preview !== (initialData.avatar ? `http://localhost:8080/images/${initialData.avatar}` : null);
  };

  return (
    <>
      <div className="space-y-1">
        <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">اطلاعات حساب شما</h4>
        <p className="text-foreground/80">در این قسمت میتونین اطلاعات حساب خودتون رو مشخص کنین.</p>
      </div>

      <div className="flex lg:flex-row flex-col-reverse w-full items-center gap-10">
        <div className="lg:w-1/2 w-full flex flex-col gap-4">
          <Label className="flex flex-col items-start text-base text-foreground/80">
            نام و نام‌خانوادگی شما
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="نام کامل شما" className="md:text-sm md:placeholder:text-sm" />
          </Label>
          <Label className="flex flex-col items-start text-base text-foreground/80">
            ایمیل شما
            <Input type="text" disabled value={email} placeholder="google@gmail.com" className="md:text-sm md:placeholder:text-sm" />
            {user?.email && <span className="text-foreground/50 text-xs font-light">در حال حاضر امکان تغییر ایمیل وجود ندارد</span>}
          </Label>
        </div>

        <div className="flex flex-col items-center gap-2 w-1/2">
          <span className="text-base text-foreground/80 font-medium">پروفایل شما</span>
          <Label className={`relative flex flex-col w-[150px] bg-background h-[150px] items-center justify-center border border-primary cursor-pointer ${preview ? 'p-0' : 'p-4'} rounded-full text-base text-foreground/80 overflow-hidden`}>
            <span className={`text-lg ${preview ? 'hidden' : ''}`}>انتخاب عکس</span>
            <MdOutlineCameraAlt className={`text-4xl ${preview ? 'hidden' : ''}`} />
            {preview && (
              <div className="relative w-full h-full">
                <Image
                  src={preview}
                  alt="Preview"
                  priority
                  fill
                  onLoad={() => {
                    if (lastBlobUrl.current && lastBlobUrl.current !== preview) {
                      URL.revokeObjectURL(lastBlobUrl.current);
                    }
                    lastBlobUrl.current = preview.startsWith('blob:') ? preview : null;
                  }}
                  className="object-cover rounded-full"
                  unoptimized
                />
              </div>
            )}
            <Input onChange={handleFileChange} type="file" className="hidden" />
          </Label>

          {preview && (
            <span
              onClick={() => {
                setRmvImage(true);
                setPreview(null);
                if (lastBlobUrl.current) {
                  URL.revokeObjectURL(lastBlobUrl.current);
                  lastBlobUrl.current = null;
                }
                onFileSelected(null);
              }}
              className="flex items-center text-xs cursor-pointer hover:scale-105 duration-300 bg-red-400 text-background rounded-lg p-1"
            >
              حذف عکس
              <IoClose className="text-base" />
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1 mt-6">
        <h4 className="text-foreground/95 pr-5 relative text-xl after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-foreground/80 after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2">اطلاعات فردی</h4>
      </div>

      <div className="flex flex-col w-full items-center gap-10">
        <div className="flex lg:flex-row flex-col w-full gap-10">
          <Label className="flex lg:w-1/2 w-full flex-col items-start text-base text-foreground/80">
            تاریخ تولد
            <BirthDateInputs birthday={birthday} setBirthday={setBirthday} />
          </Label>
          <Label className="flex lg:w-1/2 w-full flex-col items-start text-base text-foreground/80">
            تحصیلات
            <Input type="text" value={education} onChange={(e) => setEducation(e.target.value)} placeholder="تحصیلات شما" className="md:text-sm md:placeholder:text-sm" />
          </Label>
        </div>

        <Label className="flex w-full flex-col lg:items-center items-start text-base text-foreground/80">
          درباره من
          <Textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="توضیحی مختصر درباره خودتون و علاقه‌مندی هاتون" className="md:text-sm md:placeholder:text-sm lg:w-8/12 w-full h-[200px]" />
        </Label>
      </div>

      <div className="self-center mt-4">
        <Button disabled={!isChanged()} onClick={handleSubmit} className="cursor-pointer">
          ثبت تغییرات
        </Button>
      </div>
    </>
  );
}

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import z from 'zod';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store/store';
import { setStep } from '@/app/store/authSlice';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { api } from '@/app/services/api';
import { AxiosError } from 'axios';
import { ApiError } from '@/lib/types';

const formSchemaStepTwo = z.object({
  email: z.email(),
  password: z.string().min(5, { message: 'پسورد شما باید بالای 5 کاراکتر باشد' }),
  passwordRepeat: z.string().min(5, { message: 'پسورد شما باید بالای 5 کاراکتر باشد' }),
});

type StepTwoData = z.infer<typeof formSchemaStepTwo>;

export default function StepThreeForm({ anime }: { anime: string }) {
  const [hideRepeat, setHideRepeat] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.auth.pendingEmail);

  const form = useForm<StepTwoData>({
    resolver: zodResolver(formSchemaStepTwo),
    defaultValues: { email, password: '', passwordRepeat: '' },
  });

  async function onSubmit(values: StepTwoData) {
    try {
      if (values.email && values.password && values.passwordRepeat) {
        if (values.passwordRepeat !== values.password) {
          return form.setError('passwordRepeat', { type: 'client', message: 'تکرار پسورد باید با پسورد برابر باشد' });
        }
        const res = await api.signUp(values.email, values.password);
        console.log(res);
        if (res.status === 201) {
          dispatch(setStep(1));
        }
      }
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      const payload = error.response?.data.data;

      if (Array.isArray(payload)) {
        payload.forEach(({ field, message }) => {
          if (field === 'email' || field === 'password') {
            form.setError(field as keyof StepTwoData, { type: 'server', message });
          } else {
            form.setError('root', { type: 'server', message });
          }
        });
      } else {
        form.setError('root', { type: 'server', message: 'خطای نامشخص رخ داد' });
      }
    }
  }

  return (
    <>
      <h4 className="text-2xl text-foreground/80 self-start font-bold">ثبت نام</h4>
      <p className="text-base text-foreground/70 self-start">پسورد خود را وارد کنید</p>
      <Separator className="bg-foreground/10 my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <FormLabel>
                    ایمیل: <FormMessage className="text-red-500 text-xs" />
                  </FormLabel>
                  <span onClick={() => dispatch(setStep(1))} className="text-primary text-xs cursor-pointer hover:underline">
                    ویرایش
                  </span>
                </div>
                <FormControl>
                  <Input disabled {...field} className={anime} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <FormLabel>
                    پسورد: <FormMessage className="text-red-500 text-xs" />
                  </FormLabel>
                </div>
                <FormControl>
                  <div className={`${anime} relative`}>
                    <Input placeholder="پسورد خودتون رو وارد کنید" className={anime} type={'password'} {...field} />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordRepeat"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <FormLabel>
                    تکرار پسورد: <FormMessage className="text-red-500 text-xs" />
                  </FormLabel>
                </div>
                <FormControl>
                  <div className={`${anime} relative`}>
                    <Input placeholder="پسورد خودتون رو دوباره بنویسید" type={hideRepeat === true ? 'password' : 'text'} {...field} />
                    <button type="button" onClick={() => setHideRepeat(!hideRepeat)} className="absolute inset-y-0 left-0 flex items-center pl-3 z-10 cursor-pointer" aria-label={hideRepeat ? 'نمایش پسورد' : 'مخفی‌کردن پسورد'} title={hideRepeat ? 'نمایش پسورد' : 'مخفی‌کردن پسورد'}>
                      <span className="relative w-5 h-5">
                        <IoEye
                          className={`absolute inset-0 text-foreground/60 text-xl transition-all duration-300
                            ${hideRepeat ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}
                        />
                        <IoEyeOff
                          className={`absolute inset-0 text-foreground/60 text-xl transition-all duration-300
                            ${hideRepeat ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
                        />
                      </span>
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="text-[12px] flex gap-1 items-center font-light text-foreground">
            <FaCheck className="bg-primary text-background rounded-full text-[14px] p-0.5" />
            <p>
              ورود/ثبت نام شما به منظور پذیرش{' '}
              <Link className="text-blue-600 underline" href="/terms">
                قوانین
              </Link>{' '}
              میباشد
            </p>
          </div>
          <Button className="w-full py-5 text-lg cursor-pointer" type="submit">
            ثبت
          </Button>
        </form>
      </Form>
    </>
  );
}

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
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiError } from '@/lib/types';
import { setStep } from '@/app/store/authStepOneSlice';
import callApi from '@/app/services/callApi';
import useCustomToast from '@/app/hooks/useCustomToast';

/* Zod schema for sign-up step (email, password, passwordRepeat) */
const formSchemaStepTwo = z.object({
  email: z.email(),
  password: z.string().min(5, { message: 'پسورد شما باید بالای 5 کاراکتر باشد' }),
  passwordRepeat: z.string().min(5, { message: 'پسورد شما باید بالای 5 کاراکتر باشد' }),
});

/* TS type inferred from schema */
type StepTwoData = z.infer<typeof formSchemaStepTwo>;

export default function StepThreeForm({ anime }: { anime: string }) {
  /* Toast helper for user feedback */
  const showToast = useCustomToast();

  /* Local UI state: show/hide for repeat password field */
  const [hideRepeat, setHideRepeat] = useState<boolean>(true);

  /* Redux wiring: dispatch actions and get pending email from store */
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.authStepOne.pendingEmail);

  /*
    React Hook Form setup:
    - zodResolver for schema validation
    - default values include the pending email from store
  */
  const form = useForm<StepTwoData>({
    resolver: zodResolver(formSchemaStepTwo),
    defaultValues: { email, password: '', passwordRepeat: '' },
  });

  /*
    Submit handler:
    - Client-side check that password and passwordRepeat match
    - POST /auth/signup on success
    - On 201, show toast and reset flow to step 1
    - Map API errors into field/root errors
  */
  async function onSubmit(values: StepTwoData) {
    try {
      if (values.email && values.password && values.passwordRepeat) {
        if (values.passwordRepeat !== values.password) {
          return form.setError('passwordRepeat', { type: 'client', message: 'تکرار پسورد باید با پسورد برابر باشد' });
        }
        const res = await callApi().post('/auth/signup', values);
        const response = res as AxiosResponse;
        if (response.status === 201) {
          showToast({ message: 'ثبت نام شما با موفقیت انجام شد ✅', bg: 'bg-green-200' });
          dispatch(setStep(1));
          return;
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
    <section aria-labelledby="signup-title">
      {/* Section header: title + short instruction */}
      <header>
        <h4 id="signup-title" className="text-2xl text-foreground/80 self-start font-bold">
          ثبت نام
        </h4>
        <p className="text-base text-foreground/70 self-start">پسورد خود را وارد کنید</p>
      </header>

      {/* Divider before the form */}
      <Separator className="bg-foreground/10 my-4" />

      {/* Form context provider (kept unchanged) */}
      <Form {...form}>
        {/* Native form element; aria-label localized for assistive tech */}
        <form aria-label="ثبت نام" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* Email (read-only) field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                {/* Label + inline validation + edit affordance */}
                <div className="flex justify-between items-center">
                  {/* Associate label to input via id/htmlFor for accessibility */}
                  <FormLabel htmlFor="email">
                    ایمیل: <FormMessage className="text-red-500 text-xs" />
                  </FormLabel>
                  <span onClick={() => dispatch(setStep(1))} className="text-primary text-xs cursor-pointer hover:underline">
                    ویرایش
                  </span>
                </div>
                <FormControl>
                  {/* Disabled input shows the email captured in step 1 */}
                  <Input id="email" disabled {...field} className={anime} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <FormLabel htmlFor="password">
                    پسورد: <FormMessage className="text-red-500 text-xs" />
                  </FormLabel>
                </div>
                <FormControl>
                  {/* Password input (always masked in this step) */}
                  <div className={`${anime} relative`}>
                    <Input id="password" placeholder="پسورد خودتون رو وارد کنید" className={anime} type={'password'} {...field} />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Repeat password field with show/hide toggle */}
          <FormField
            control={form.control}
            name="passwordRepeat"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <FormLabel htmlFor="passwordRepeat">
                    تکرار پسورد: <FormMessage className="text-red-500 text-xs" />
                  </FormLabel>
                </div>
                <FormControl>
                  <div className={`${anime} relative`}>
                    <Input id="passwordRepeat" placeholder="پسورد خودتون رو دوباره بنویسید" type={hideRepeat === true ? 'password' : 'text'} {...field} />
                    {/* Visibility toggle for repeat password field */}
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

          {/* Complementary terms/consent notice */}
          <aside className="text-[12px] flex gap-1 items-center font-light text-foreground">
            <FaCheck className="bg-primary text-background rounded-full text-[14px] p-0.5" />
            <p>
              ورود/ثبت نام شما به منظور پذیرش{' '}
              <Link className="text-blue-600 underline" href="/terms">
                قوانین
              </Link>{' '}
              میباشد
            </p>
          </aside>

          {/* Primary submit action */}
          <Button className="w-full py-5 text-lg cursor-pointer" type="submit">
            ثبت
          </Button>
        </form>
      </Form>
    </section>
  );
}

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
import { useRouter } from 'next/navigation';
import { ClockLoader, PulseLoader } from 'react-spinners';
import { usePersistedCountdown } from '@/app/hooks/useCountDown';

const formSchemaStepTwo = z.object({
  email: z.email(),
  password: z.string().min(5, { message: 'پسورد شما باید بالای 5 کاراکتر باشد' }).optional().or(z.literal('')),
  otp: z.string().min(6, { message: 'کد یکبار مصرف شما باید ٦ باید' }).max(6, { message: 'کد یکبار مصرف شما باید ٦ باید' }).optional().or(z.literal('')),
});

type StepTwoData = z.infer<typeof formSchemaStepTwo>;

const OTP_TIMER_SEC = 180;
const timerKey = (email: string) => `otpTimerExpiresAt:${email}`;
const toMMSS = (totalSec: number) => {
  const sec = Math.max(0, Math.floor(totalSec));
  const mm = String(Math.floor(sec / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');
  return `${mm}:${ss}`;
};

export default function StepTwoForm({ anime }: { anime: string }) {
  const [otp, setOtp] = useState<boolean>(false);
  const [sendButton, setSendButton] = useState<'ورود' | 'ارسال کد'>('ورود');
  const [hide, setHide] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.auth.email);
  const { left: remaining, start: startTimer } = usePersistedCountdown(timerKey(email));
  const router = useRouter();

  const form = useForm<StepTwoData>({
    resolver: zodResolver(formSchemaStepTwo),
    defaultValues: { email, password: '', otp: '' },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: StepTwoData) {
    if (!otp && values.password) {
      try {
        await api.loginWithPass(values.email, values.password);
        router.push('/dashboard/panel');
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
        return;
      }
    } else if (otp && sendButton === 'ارسال کد') {
      try {
        const res = await api.sendOTPCode(values.email);
        if (res.status === 200) {
          startTimer(OTP_TIMER_SEC);
          setSendButton('ورود');
        }
      } catch (err) {
        const error = err as AxiosError<ApiError>;
        const payload = error.response;
        if (payload?.status !== 200) {
          form.setError('otp', { type: 'server', message: payload?.data.message });
        }
      }
      return;
    }
  }

  return (
    <>
      <h4 className="text-2xl text-foreground/80 self-start font-bold">ورود</h4>
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
            disabled={otp}
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <FormLabel>
                    پسورد: <FormMessage className="text-red-500 text-xs" />
                  </FormLabel>
                  <span className="text-primary text-xs min-w-20 cursor-pointer hover:underline">فراموش کرده‌اید؟</span>
                </div>
                <FormControl>
                  <div className={`${anime} relative`}>
                    <Input placeholder="پسورد اکانت" type={hide ? 'password' : 'text'} {...field} />
                    <button type="button" onClick={() => setHide(!hide)} className="absolute inset-y-0 left-0 flex items-center pl-3 z-10 cursor-pointer" aria-label={hide ? 'نمایش پسورد' : 'مخفی‌کردن پسورد'} title={hide ? 'نمایش پسورد' : 'مخفی‌کردن پسورد'}>
                      <span className="relative w-5 h-5">
                        <IoEye
                          className={`absolute inset-0 text-foreground/60 text-xl transition-all duration-300
                          ${hide ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}
                        />
                        <IoEyeOff
                          className={`absolute inset-0 text-foreground/60 text-xl transition-all duration-300
                          ${hide ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
                        />
                      </span>
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otp"
            disabled={!otp}
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <FormLabel>
                    کد یکبار مصرف: <FormMessage className="text-red-500 text-xs" />
                  </FormLabel>
                </div>
                <FormControl>
                  <div className={`${anime} relative`}>
                    <Input placeholder="کد یکبار مصرف وارد نمایید" type={'text'} {...field} />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            {otp ? (
              <button
                type="button"
                className="text-foreground/90 font-medium cursor-pointer"
                onClick={() => {
                  setOtp(!otp);
                  setSendButton('ورود');
                }}
              >
                ورود با پسورد
              </button>
            ) : (
              <button
                type="button"
                className="text-foreground/90 font-medium cursor-pointer"
                onClick={() => {
                  setOtp(!otp);
                  setSendButton('ارسال کد');
                }}
              >
                ورود با کد یکبار مصرف
              </button>
            )}
            <div className="flex items-center gap-2">
              {otp && (
                <>
                  <span dir="ltr" className="mt-1 tabular-nums">
                    {toMMSS(remaining)}
                  </span>
                  <ClockLoader size={25} speedMultiplier={sendButton === 'ورود' ? 1 : 0} />
                </>
              )}
            </div>
          </div>
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
          <Button disabled={isSubmitting || (otp && sendButton === 'ارسال کد' && remaining > 0)} className="w-full py-5 text-lg cursor-pointer" type="submit">
            {isSubmitting ? (
              <div className="flex items-center gap-2 justify-center">
                <span>درحال ارسال کد</span>
                <PulseLoader size={7} />
              </div>
            ) : otp && sendButton === 'ارسال کد' && remaining > 0 ? (
              <div className="flex items-center gap-2">
                <span>ارسال مجدد در</span>
                <span dir="ltr">{toMMSS(remaining)}</span>
              </div>
            ) : remaining < 0 ? (
              sendButton === 'ارسال کد'
            ) : (
              sendButton
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}

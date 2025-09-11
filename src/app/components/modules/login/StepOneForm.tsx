'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import z from 'zod';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import { Separator } from '@/components/ui/separator';
import { setPendingEmail, setStep } from '@/app/store/authStepOneSlice';
import callApi from '@/app/services/callApi';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hook';
import { AxiosError } from 'axios';
import { ApiError } from '@/lib/types';

const formSchemaStepOne = z.object({
  email: z.email({
    message: 'لطفا ایمیل معتبر وارد کنید',
  }),
});

type StepOneData = z.infer<typeof formSchemaStepOne>;

export default function StepOneForm({ anime }: { anime: string }) {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.authStepOne.pendingEmail);

  const form = useForm({
    resolver: zodResolver(formSchemaStepOne),
    defaultValues: { email },
  });

  async function onSubmit(values: StepOneData) {
    try {
      const res = await callApi().post('/auth/check', values);
      if (res.data.message === 'Found') {
        dispatch(setPendingEmail(values.email));
        dispatch(setStep(2));
      } else if (res.data.message === 'notFound') {
        dispatch(setPendingEmail(values.email));
        dispatch(setStep(3));
      }
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      const payload = error.response?.data.data;
      if (Array.isArray(payload)) {
        payload.forEach(({ field, message }) => {
          if (field === 'email') {
            form.setError(field as keyof StepOneData, { type: 'server', message });
          } else {
            form.setError('root', { type: 'server', message });
          }
        });
      } else {
        form.setError('root', { type: 'server', message: 'خطای نامشخص رخ داد' });
      }
      return;
    }
  }

  return (
    <>
      <h4 className="text-2xl text-foreground/80 self-start font-bold">ورود / ثبت نام</h4>
      <p className="text-base text-foreground/70 self-start">ایمیل خود را وارد کنید</p>
      <Separator className="bg-foreground/10 my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel>
                  ایمیل: <FormMessage className="text-red-500 text-xs" />
                </FormLabel>
                <FormControl>
                  <Input placeholder="your@gmail.com" className={anime} {...field} />
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
            ادامه
          </Button>
        </form>
      </Form>
    </>
  );
}

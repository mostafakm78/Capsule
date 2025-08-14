'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
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

const formSchemaStepTwo = z.object({
  email: z.email(),
  password: z.string().min(5, { message: 'پسورد شما باید بالای 5 کاراکتر باشد' }),
});

type StepTwoData = z.infer<typeof formSchemaStepTwo>;

export default function StepTwoForm() {
  const [hide, setHide] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.auth.email);

  const form = useForm<StepTwoData>({
    resolver: zodResolver(formSchemaStepTwo),
    defaultValues: { email, password: '' },
  });

  function onSubmit(values: StepTwoData) {
    console.log('ثبت نام/ورود:', values);
  }

  return (
    <>
      <p className="text-base text-foreground/70 self-start">پسورد خود را وارد کنید</p>
      <Separator className="bg-foreground/10 my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>
                    ایمیل: <FormMessage className="text-red-500" />
                  </FormLabel>
                  <span onClick={() => dispatch(setStep(1))} className="text-primary text-sm cursor-pointer hover:underline">
                    ویرایش
                  </span>
                </div>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormDescription>ایمیل شما</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>
                    پسورد: <FormMessage className="text-red-500" />
                  </FormLabel>
                  <span className="text-primary text-sm cursor-pointer hover:underline">فراموش کرده‌اید؟</span>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="پسورد اکانت" type={hide === true ? 'password' : 'text'} {...field} />
                    <div onClick={() => setHide(!hide)}>
                      {hide === false && <IoEye className="absolute text-foreground/60 text-xl top-1/2 -translate-y-1/2 left-0 ml-3 cursor-pointer" />}
                      {hide === true && <IoEyeOff className="absolute text-foreground/60 text-xl top-1/2 -translate-y-1/2 left-0 ml-3 cursor-pointer" />}
                    </div>
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
          <Button className="w-full py-5 text-lg" type="submit">
            ثبت
          </Button>
        </form>
      </Form>
    </>
  );
}

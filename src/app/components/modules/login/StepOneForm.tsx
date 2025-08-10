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
import { setEmail, setStep } from '@/app/store/authSlice';

const formSchemaStepOne = z.object({
  email: z.email({
    message: 'لطفا ایمیل معتبر وارد کنید',
  }),
});

type StepOneData = z.infer<typeof formSchemaStepOne>;

export default function StepOneForm() {
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.auth.email);

  const form = useForm<StepOneData>({
    resolver: zodResolver(formSchemaStepOne),
    defaultValues: { email },
  });

  function onSubmit(values: StepOneData) {
    dispatch(setEmail(values.email));
    dispatch(setStep(2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ایمیل:</FormLabel>
              <FormControl>
                <Input placeholder="your@gmail.com" {...field} />
              </FormControl>
              <FormDescription>ایمیل اکانت خود را وارد کنید</FormDescription>
              <FormMessage />
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
          ادامه
        </Button>
      </form>
    </Form>
  );
}

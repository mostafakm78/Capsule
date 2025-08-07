'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

// اسکیماها برای هر مرحله جداگانه
const step1Schema = z.object({
  firstName: z.string().min(2, { message: 'نام الزامی است' }),
  lastName: z.string().min(2, { message: 'نام خانوادگی الزامی است' }),
});

const step2Schema = z.object({
  email: z.string().email({ message: 'ایمیل نامعتبر است' }),
  phone: z.string().min(10, { message: 'شماره تماس معتبر نیست' }),
});

const step3Schema = z.object({
  title: z.string().min(3, { message: 'عنوان شما نباید کمتر از ۳ حرف باشد' }),
  description: z.string().min(10, { message: 'توضیحات شما نباید کمتر از ۱۰ حرف باشد' }),
});

const fullSchema = step1Schema.extend(step2Schema.shape).extend(step3Schema.shape);

export default function ContactUsFrom() {
  const [step, setStep] = useState<number>(1);

  const form = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      title: '',
      description: '',
    },
  });

  const onNext = async () => {
    let valid = false;

    if (step === 1) {
      valid = await form.trigger(['firstName', 'lastName']);
    } else if (step === 2) {
      valid = await form.trigger(['email', 'phone']);
    }

    if (valid) {
      setStep((prev) => prev + 1);
    }
  };

  const onBack = () => setStep((prev) => prev - 1);

  const onFinalSubmit = async () => {
    const valid = await form.trigger(['title', 'description']);
    if (valid) {
      form.handleSubmit(onSubmit)();
    }
  };

  const onSubmit = (values: z.infer<typeof fullSchema>) => {
    console.log('فرم ارسال شد:', values);
  };

  return (
    <div className="flex flex-col w-2/3 mt-10">
      <div className="flex items-center justify-center">
        {[1, 2, 3].map((s, i, arr) => (
          <div key={s} className="flex items-center">
            <div className={`h-[70px] w-[70px] flex items-center justify-center rounded-full ${step >= s ? 'bg-primary' : 'bg-background'} duration-300`}>
              <span className={`text-2xl ${step >= s ? 'text-background' : 'text-foreground/70'}`}>{s === 1 ? '۱' : s === 2 ? '۲' : '۳'}</span>
            </div>
            {i !== arr.length - 1 && <div className={`h-[4px] w-[100px] relative bg-background after:content-[""] after:w-0 after:h-full after:absolute after:bg-primary after:right-0 ${step > s ? 'after:w-full' : ''} after:duration-300`}></div>}
          </div>
        ))}
      </div>

      <div className="bg-white h-[400px] p-8 rounded-lg shadow-lg mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
            {step === 1 && (
              <>
                <h4 className="text-xl font-bold text-center">مرحله ۱: اطلاعات شخصی</h4>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام:</FormLabel>
                      <FormControl>
                        <Input placeholder="نام شما" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام خانوادگی:</FormLabel>
                      <FormControl>
                        <Input placeholder="نام خانوادگی شما" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 2 && (
              <>
                <h4 className="text-xl font-bold text-center">مرحله ۲: اطلاعات تماس</h4>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ایمیل:</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>شماره تماس:</FormLabel>
                      <FormControl>
                        <Input placeholder="09123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 3 && (
              <>
                <h4 className="text-xl font-bold text-center">مرحله ۳: جزئیات پیام</h4>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عنوان:</FormLabel>
                      <FormControl>
                        <Input placeholder="عنوان پیام" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>توضیحات:</FormLabel>
                      <FormControl>
                        <Textarea placeholder="توضیحات بیشتر" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </form>
        </Form>
        <div className={`flex ${step === 1 ? 'justify-end' : 'justify-between'} items-center w-full mt-6`}>
          {step > 1 && (
            <Button type="button" variant="outline" onClick={onBack}>
              قبلی
            </Button>
          )}

          {step < 3 && (
            <Button type="button" onClick={onNext}>
              بعدی
            </Button>
          )}

          {step === 3 && (
            <Button type="submit" onClick={onFinalSubmit} className="bg-green-600 text-white">
              ارسال
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

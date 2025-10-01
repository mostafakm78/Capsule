'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldPath, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import gsap from 'gsap';
import callApi from '@/app/services/callApi';
import useCustomToast from '@/app/hooks/useCustomToast';
import { AxiosError } from 'axios';
import { ApiError } from '@/lib/types';

const toEnDigits = (s: string) => s.replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - '۰'.charCodeAt(0))).replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - '٠'.charCodeAt(0)));

const cleanPhone = (s: string) => s.replace(/[\u200c\u200f\u200e\u202a-\u202e]/g, '').replace(/[^\d+]/g, '');

const iranMobile = /^(?:0098|\+98|98|0)?9\d{9}$/;

const step1Schema = z.object({
  firstName: z.string().min(3, { message: 'نام الزامی است' }).max(12, { message: 'نام الزامی است' }).trim(),
  lastName: z.string().min(3, { message: 'نام خانوادگی الزامی است' }).max(12, { message: 'نام خانوادگی الزامی است' }).trim(),
});

const step2Schema = z.object({
  email: z.email({ message: 'ایمیل نامعتبر است' }),
  number: z
    .string()
    .trim()
    .transform(toEnDigits)
    .transform(cleanPhone)
    .refine((v) => iranMobile.test(v), { message: 'شماره موبایل نامعتبر است' })
    .transform((v) => {
      let digits = v;
      if (digits.startsWith('0098')) digits = digits.slice(4);
      else if (digits.startsWith('+98')) digits = digits.slice(3);
      else if (digits.startsWith('98')) digits = digits.slice(2);
      else if (digits.startsWith('0')) digits = digits.slice(1);
      return `+98${digits}`;
    }),
});

const step3Schema = z.object({
  title: z.string().min(4, { message: 'عنوان شما نباید کمتر از 4 حرف باشد' }).max(16, { message: 'عنوان شما نباید کمتر از 16 حرف باشد' }).trim(),
  description: z.string().min(32, { message: 'توضیحات شما نباید کمتر از 32 حرف باشد' }).max(500, { message: 'توضیحات شما نباید کمتر از 500 حرف باشد' }).trim(),
});

const fullSchema = step1Schema.extend(step2Schema.shape).extend(step3Schema.shape);

type FormValues = z.infer<typeof fullSchema>;

export default function ContactUsFrom() {
  const showToast = useCustomToast();

  const [step, setStep] = useState<number>(1);
  const formRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        '.anime',
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.3,
        }
      );
      gsap.fromTo(
        '.title-anime',
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
        }
      );
    }
  }, [step]);

  const form = useForm<FormValues>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      number: '',
      title: '',
      description: '',
    },
  });

  const onNext = useCallback(async () => {
    let valid = false;

    if (step === 1) {
      valid = await form.trigger(['firstName', 'lastName']);
    } else if (step === 2) {
      valid = await form.trigger(['email', 'number']);
    }

    if (valid) {
      setStep((prev) => prev + 1);
    }
  }, [form, step]);

  const onBack = useCallback(() => setStep((prev) => prev - 1), []);

  const onSubmit = useCallback(
    async (values: z.infer<typeof fullSchema>) => {
      try {
        const res = await callApi().post('/public/contactus', values);
        if (res.status === 201) {
          showToast({ message: 'پیام شما به موفقیت ارسال شد ✅', bg: 'bg-green-200' });
          form.reset({
            firstName: '',
            lastName: '',
            number: '',
            email: '',
            title: '',
            description: '',
          });
          setStep(1);
          return;
        }
      } catch (err) {
        {
          const error = err as AxiosError<ApiError>;
          const payload = error.response?.data.data;
          if (Array.isArray(payload)) {
            payload.forEach(({ field, message }) => {
              const allowed: Array<keyof FormValues> = ['number', 'email', 'firstName', 'lastName', 'title', 'description'];
              if (allowed.includes(field as keyof FormValues)) {
                form.setError(field as FieldPath<FormValues>, { type: 'server', message });
              } else {
                form.setError('root', { type: 'server', message });
              }
            });
          } else {
            form.setError('root', { type: 'server', message: 'خطای نامشخص رخ داد' });
          }
        }
      }
    },
    [form, showToast]
  );

  const onFinalSubmit = useCallback(async () => {
    const valid = await form.trigger(['title', 'description']);
    if (valid) {
      form.handleSubmit(onSubmit)();
    }
  }, [form, onSubmit]);

  return (
    <div className="flex flex-col lg:w-2/3 w-full mt-10" aria-label="Contact Form Container">
      <div className="flex items-center justify-center" aria-label="Step Indicator">
        {[1, 2, 3].map((s, i, arr) => (
          <div key={s} className="flex items-center">
            <div className={`lg:h-[70px] h-[60px] w-[60px] lg:w-[70px] flex items-center justify-center shadow-lg rounded-full ${step >= s ? 'bg-primary' : 'bg-accent/50'} duration-300`} aria-label={`Step ${s} ${step >= s ? 'completed' : 'incomplete'}`}>
              <span className={`text-2xl ${step >= s ? 'text-background' : 'text-foreground/70'}`}>{s === 1 ? '۱' : s === 2 ? '۲' : '۳'}</span>
            </div>
            {i !== arr.length - 1 && <div className={`h-[4px] lg:w-[100px] w-[50px] md:w-[80px] relative bg-accent/50 after:content-[""] after:w-0 after:h-full after:absolute after:bg-primary after:right-0 ${step > s ? 'after:w-full' : ''} after:duration-300`} aria-hidden="true"></div>}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 md:h-[500px] flex flex-col justify-between md:p-8 py-6 px-3 rounded-lg shadow-lg mt-8" role="form" aria-label="Contact Form">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col" aria-live="polite">
            <div ref={formRef} key={step} className="flex flex-col"></div>
            {step === 1 && (
              <>
                <h4 className="title-anime md:text-2xl text-xl text-foreground font-bold text-center" aria-label="Step 1: Personal Information">
                  مرحله ۱: اطلاعات شخصی
                </h4>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel className="anime lg:text-2xl md:text-xl text-base" aria-label="First Name Label">
                        نام:
                      </FormLabel>
                      <FormControl>
                        <Input className="anime" placeholder="نام شما" {...field} aria-required="true" aria-invalid={!!form.formState.errors.firstName} />
                      </FormControl>
                      <FormMessage className="text-red-500 md:hidden" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel className="anime lg:text-2xl md:text-xl text-base" aria-label="Last Name Label">
                        نام خانوادگی:
                      </FormLabel>
                      <FormControl>
                        <Input className="anime" placeholder="نام خانوادگی شما" {...field} aria-required="true" aria-invalid={!!form.formState.errors.lastName} />
                      </FormControl>
                      <FormMessage className="text-red-500 md:hidden" />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 2 && (
              <>
                <h4 className="title-anime md:text-2xl text-xl text-foreground font-bold text-center" aria-label="Step 2: Contact Information">
                  مرحله ۲: اطلاعات تماس
                </h4>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel className="anime lg:text-2xl md:text-xl text-base" aria-label="Email Label">
                        ایمیل:
                      </FormLabel>
                      <FormControl>
                        <Input className="anime" placeholder="your@email.com" {...field} aria-required="true" aria-invalid={!!form.formState.errors.email} />
                      </FormControl>
                      <FormMessage className="text-red-500 md:hidden" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel className="anime lg:text-2xl md:text-xl text-base" aria-label="Phone Number Label">
                        شماره تماس:
                      </FormLabel>
                      <FormControl>
                        <Input className="anime" placeholder="0912..." {...field} aria-required="true" aria-invalid={!!form.formState.errors.number} />
                      </FormControl>
                      <FormMessage className="text-red-500 md:hidden" />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 3 && (
              <>
                <h4 className="title-anime md:text-2xl text-xl text-foreground font-bold text-center" aria-label="Step 3: Message Details">
                  مرحله ۳: جزئیات پیام
                </h4>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel className="anime lg:text-2xl md:text-xl text-base" aria-label="Title Label">
                        عنوان:
                      </FormLabel>
                      <FormControl>
                        <Input className="anime" placeholder="عنوان پیام" {...field} aria-required="true" aria-invalid={!!form.formState.errors.title} />
                      </FormControl>
                      <FormMessage className="text-red-500 md:hidden" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="p-4">
                      <FormLabel className="anime lg:text-2xl md:text-xl text-base" aria-label="Description Label">
                        توضیحات:
                      </FormLabel>
                      <FormControl>
                        <Textarea className="anime" placeholder="توضیحات بیشتر" {...field} aria-required="true" aria-invalid={!!form.formState.errors.description} />
                      </FormControl>
                      <FormMessage className="text-red-500 md:hidden" />
                    </FormItem>
                  )}
                />
              </>
            )}
          </form>
        </Form>
        <div className={`flex ${step === 1 ? '' : 'justify-between'} items-center w-full mt-6 px-4 gap-2 justify-center`} aria-label="Form Navigation Buttons">
          {step > 1 && (
            <Button type="button" variant="outline" className={`cursor-pointer w-full md:w-auto ${step > 1 ? 'w-2/4' : ''}`} onClick={onBack} aria-label="Go Back to Previous Step">
              قبلی
            </Button>
          )}

          {step < 3 && (
            <Button type="button" className={`hover:text-background cursor-pointer w-full md:w-auto ${step > 1 ? 'w-2/4' : ''}`} onClick={onNext} aria-label="Proceed to Next Step">
              بعدی
            </Button>
          )}

          {step === 3 && (
            <Button type="submit" onClick={onFinalSubmit} className="bg-green-600 hover:bg-foreground w-2/4 md:w-1/4 text-white cursor-pointer" aria-label="Submit Contact Form">
              ارسال
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

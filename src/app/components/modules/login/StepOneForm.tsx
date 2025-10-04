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

/*
  Zod schema for step-one form (email only).
  - Provides i18n-friendly validation message in Persian.
*/
const formSchemaStepOne = z.object({
  email: z.email({
    message: 'لطفا ایمیل معتبر وارد کنید',
  }),
});

/* Inferred TypeScript type from the schema */
type StepOneData = z.infer<typeof formSchemaStepOne>;

export default function StepOneForm({ anime }: { anime: string }) {
  /* Redux dispatcher and selector for pending email (persisted between steps) */
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.authStepOne.pendingEmail);

  /*
    Initialize React Hook Form:
    - zodResolver wires schema validation to RHK
    - defaultValues pulls a possibly saved email from the store
  */
  const form = useForm({
    resolver: zodResolver(formSchemaStepOne),
    defaultValues: { email },
  });

  /*
    Submit handler:
    - Calls /auth/check to see if email exists
    - If Found -> go to step 2 (login path)
      If notFound -> go to step 3 (signup path)
    - Maps server validation errors into form.setError for field/root
  */
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
    <section aria-labelledby="auth-title">
      {/* Heading & brief instruction (semantic page/section header) */}
      <header>
        {/* Primary title for the section (referenced by aria-labelledby) */}
        <h4 id="auth-title" className="text-2xl text-foreground/80 self-start font-bold">
          ورود / ثبت نام
        </h4>
        {/* Short helper text for the step */}
        <p className="text-base text-foreground/70 self-start">ایمیل خود را وارد کنید</p>
      </header>

      {/* Visual separator between header and form */}
      <Separator className="bg-foreground/10 my-4" />

      {/*
        Form wrapper from the UI kit binds RHK context.
        Inner <form> handles submission and accessibility attributes.
      */}
      <Form {...form}>
        {/* Native form element; aria-label provides localized name for AT users */}
        <form aria-label="وارد کردن ایمیل" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* Email field (controlled by RHK via render prop) */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                {/*
                  Label associated to the input via htmlFor/id.
                  FormMessage rendered inline to surface validation feedback near the label.
                */}
                <FormLabel htmlFor="email">
                  ایمیل: <FormMessage className="text-red-500 text-xs" />
                </FormLabel>

                {/*
                  Input control bound to RHK's field props.
                  - id ties it to the label
                  - className includes incoming animation class
                */}
                <FormControl>
                  <Input id="email" placeholder="your@gmail.com" className={anime} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/*
            Terms/consent note (auxiliary info).
            SEMANTIC: Placed in <aside> to denote complementary content to the form.
          */}
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

          {/* Submit action (primary call-to-action for this step) */}
          <Button className="w-full py-5 text-lg cursor-pointer" type="submit">
            ادامه
          </Button>
        </form>
      </Form>
    </section>
  );
}

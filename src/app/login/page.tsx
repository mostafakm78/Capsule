import CheckUserLogin from '@/app/components/modules/login/CheckUserLogin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ورود/ثبت‌نام',
  description: 'بخش ورود/ثبت‌نام سایت کپسول برای عضویت یا وارد شدن به حساب',
};

export default function Login() {
  return <CheckUserLogin />;
}

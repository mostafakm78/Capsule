import DashboardSettingIndex from '@/app/components/modules/dashboard/setting/DashboardSetting';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تنظیمات حساب',
};

export default function DashboardSetting() {
  return <DashboardSettingIndex />;
}

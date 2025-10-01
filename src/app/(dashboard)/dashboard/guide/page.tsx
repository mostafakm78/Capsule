import DashboardGuideIndex from '@/app/components/modules/dashboard/guide/DashboardGuideIndex';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'راهنمای داشبورد',
};

export default function DashboardGuide() {
  return <DashboardGuideIndex />;
}

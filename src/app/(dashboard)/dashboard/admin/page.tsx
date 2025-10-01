import AdminPanelWrapper from '@/app/components/modules/dashboard/admin/AdminPanelWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'پنل ادمین',
};

export default function AdminPanel() {
  return <AdminPanelWrapper />;
}

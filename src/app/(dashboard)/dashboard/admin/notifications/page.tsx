import NotificationsAdmin from '@/app/components/modules/dashboard/admin/notifications/NotificatiosAmin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'اعلان های سایت',
};

export default function AdminNotifications() {
  return <NotificationsAdmin />;
}

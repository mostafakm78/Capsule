import UsersAdminIndex from '@/app/components/modules/dashboard/admin/users/UsersAdminIndex';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'کاربران سایت',
};

export default function AdminUsers() {
  return <UsersAdminIndex />;
}

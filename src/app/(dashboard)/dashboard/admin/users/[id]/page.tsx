import SingleUserAdminIndex from '@/app/components/modules/dashboard/admin/users/user-page/SingleUserAdminIndex';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'کاربر سایت',
};

export default function SingleUserAdminPage() {
  return <SingleUserAdminIndex />;
}

import SingleUserCapsuleAdminIndex from '@/app/components/modules/dashboard/admin/capsules/UserCapsule';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'کپسول کاربر',
};

export default function SingleUserCapuslePage() {
  return <SingleUserCapsuleAdminIndex />;
}

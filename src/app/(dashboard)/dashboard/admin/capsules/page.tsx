import CapsulesAdminIndex from '@/app/components/modules/dashboard/admin/capsules/CapsulesAdminIndex';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'کپسول های سایت',
};

export default function AdminCapsules() {
  return <CapsulesAdminIndex />;
}

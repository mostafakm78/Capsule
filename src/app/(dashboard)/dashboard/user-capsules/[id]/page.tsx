import CapsulePageWrapper from '@/app/components/modules/dashboard/create-edit/CapsulePageWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'کپسول های شما',
};

export default function UserCapsuleSinglePage() {
  return <CapsulePageWrapper />;
}

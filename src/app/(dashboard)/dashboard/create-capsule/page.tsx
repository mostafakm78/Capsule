import CapsulePageWrapper from '@/app/components/modules/dashboard/create-edit/CapsulePageWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ساخت/ویرایش کپسول',
};

export default function CreateCapsule() {
  return <CapsulePageWrapper />;
}

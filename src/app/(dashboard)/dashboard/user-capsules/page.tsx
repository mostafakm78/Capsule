import UserCapsulesIndex from '@/app/components/modules/dashboard/user-capsules/UserCapsulesIndex';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'کپسول های شما',
};

export default function UserCapsules() {
  return <UserCapsulesIndex />;
}

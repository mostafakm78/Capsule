import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const TermsIndex = dynamic(() => import('@/app/components/modules/terms/TermsIndex'));

export const metadata: Metadata = {
  title: 'قوانین سایت کپسول',
};

export default function Terms() {
  return <TermsIndex />;
}

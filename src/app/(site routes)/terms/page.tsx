import TermsIndex from '@/app/components/modules/terms/TermsIndex';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'قوانین سایت کپسول',
};

export default function Terms() {
  return <TermsIndex />;
}

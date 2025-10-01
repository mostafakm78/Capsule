import AboutUsWrapper from '@/app/components/modules/about-us/AboutUsWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'درباره ما',
};

export default function AboutUs() {
  return <AboutUsWrapper />;
}

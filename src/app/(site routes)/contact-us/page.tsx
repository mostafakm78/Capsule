import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ContactUsComponent = dynamic(() => import('@/app/components/modules/contact-us/ContactUs'));

export const metadata: Metadata = {
  title: 'ارتباط با ما',
};

export default function ContactUs() {
  return <ContactUsComponent />;
}

import { Suspense } from 'react';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';

import { Bungee } from 'next/font/google';
const bungee = Bungee({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export default function RoutesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <Header bungee={bungee} />
      </Suspense>
      <main>{children}</main>
      <Footer bungee={bungee} />
    </>
  );
}

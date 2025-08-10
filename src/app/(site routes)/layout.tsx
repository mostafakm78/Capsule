import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';

import { Bungee } from 'next/font/google';
const bungee = Bungee({
  weight: '400',
});

export default function RoutesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header bungee={bungee} />
      <main>{children}</main>
      <Footer bungee={bungee} />
    </>
  );
}

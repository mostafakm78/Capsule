import { Suspense } from 'react';
import Main from './components/modules/home/Main';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import { Bungee } from 'next/font/google';

const bungee = Bungee({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Header bungee={bungee} />
      </Suspense>
      <Main />
      <Footer bungee={bungee} />
    </>
  );
}

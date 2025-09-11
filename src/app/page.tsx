import Main from './components/modules/home/Main';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import { Bungee } from 'next/font/google';


const bungee = Bungee({
  weight: '400',
});

export default function Home() {

  return (
    <>
      <Header bungee={bungee} />
      <Main />
      <Footer bungee={bungee} />
    </>
  );
}

import HeroSection from './HeroSection';
import Register from './Register';
import Testimonials from './Testimonials';
import UseCases from './UseCases';
import WhatIsThis from './WhatIsThis';

export default function Main() {
  return (
    <main>
      <HeroSection />
      <WhatIsThis />
      <UseCases />
      <Testimonials />
      <Register />
    </main>
  );
}

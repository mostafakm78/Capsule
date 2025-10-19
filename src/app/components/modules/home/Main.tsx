// Page-level composition: stitches together the homepage sections
import HeroSection from './HeroSection';
import LastCapsules from './LastCapsules';
import Register from './Register';
import Testimonials from './Testimonials';
import UseCases from './UseCases';
import WhatIsThis from './WhatIsThis';

export default function Main() {
  return (
    // Landmark region for the primary content of the page
    // Note: Child components already expose their own semantic structure (<header>, <section>, etc.)
    <main aria-label="main section">
      {/* Hero banner: page introduction and primary CTA */}
      <HeroSection />

      {/* Short explanatory "What is this?" feature trio */}
      <WhatIsThis />

      {/* Use-cases / how-it-works stacked cards with scroll/pin effects */}
      <UseCases />

      {/* Testimonials carousel + controls */}
      <Testimonials />

      {/* Registration CTA section */}
      <Register />
    </main>
  );
}

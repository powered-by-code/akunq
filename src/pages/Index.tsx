import { useEffect } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { CalculatorSection } from '@/components/sections/CalculatorSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SystemSection } from '@/components/sections/SystemSection';
import { FounderStory } from '@/components/sections/FounderStory';
import { HowItWorks } from '@/components/sections/HowItWorks';

import { ValueStack } from '@/components/sections/ValueStack';
import { GuaranteeSection } from '@/components/sections/GuaranteeSection';
import { ResultsSection } from '@/components/sections/ResultsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactForm } from '@/components/sections/ContactForm';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';

const Index = () => {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <div id="calculator" className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <CalculatorSection />
        </div>
      </div>
      <ProblemSection />
      <SystemSection />
      <FounderStory />
      <HowItWorks />
      <ValueStack />
      <GuaranteeSection />
      <ContactForm />
      {/* <ResultsSection /> */}
      {/* <TestimonialsSection /> */}
      <FAQSection />
      {/* ForMomSection removed — pivot to dev audience */}
      {/* <FinalCTA /> */}
      <Footer />
    </div>
  );
};

export default Index;

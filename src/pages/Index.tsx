import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { CalculatorSection } from '@/components/sections/CalculatorSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SystemSection } from '@/components/sections/SystemSection';
import { ValueStack } from '@/components/sections/ValueStack';
import { FounderStory } from '@/components/sections/FounderStory';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { GuaranteeSection } from '@/components/sections/GuaranteeSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactForm } from '@/components/sections/ContactForm';
import { Footer } from '@/components/sections/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      <div id="calculator" className="py-16 px-0 md:px-4 bg-background relative">
        <div className="md:container md:mx-auto max-w-4xl md:px-0">
          <CalculatorSection />
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </div>
      <ProblemSection />
      <div className="section-divider" />
      <SystemSection />
      <div className="section-divider" />
      <ValueStack />
      <div className="section-divider" />
      <FounderStory />
      <div className="section-divider" />
      <HowItWorks />
      <div className="section-divider" />
      <GuaranteeSection />
      <div className="section-divider" />
      <ContactForm />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;

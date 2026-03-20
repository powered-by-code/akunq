import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SystemSection } from '@/components/sections/SystemSection';
import { FounderStory } from '@/components/sections/FounderStory';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ForMomSection } from '@/components/sections/ForMomSection';
import { ValueStack } from '@/components/sections/ValueStack';
import { GuaranteeSection } from '@/components/sections/GuaranteeSection';
import { ResultsSection } from '@/components/sections/ResultsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactForm } from '@/components/sections/ContactForm';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
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
      <ForMomSection />
      {/* <FinalCTA /> */}
      <Footer />
    </div>
  );
};

export default Index;

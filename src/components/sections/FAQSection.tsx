import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FAQSection() {
  const items = tArray<{ question: string; answer: string }>('faq.items');

  return (
    <AnimatedSection className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">{t('faq.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-headline mt-3 mb-10">{t('faq.headline')}</h2>

        <Accordion type="single" collapsible className="mb-10">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left text-sm font-medium text-text-headline hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-text-body leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center">
          <Button onClick={scrollToForm} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 font-semibold">
            {t('faq.ctaButton')}
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}

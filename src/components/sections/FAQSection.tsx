import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FAQSection() {
  const items = tArray<{ question: string; answer: string }>('faq.items');

  return (
    <AnimatedSection className="py-20 px-4 bg-background relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 wash-indigo pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dots pointer-events-none" />
      <div className="container mx-auto max-w-3xl relative">
        <span className="text-xs uppercase tracking-[0.08em] text-gradient-blue font-semibold block mb-3">{t('faq.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-12 max-w-[800px]">{t('faq.headline')}</h2>

        <Accordion type="single" collapsible className="mb-12">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left text-sm font-semibold text-text-headline hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-text-body leading-[1.75]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex gap-4 overflow-hidden">
          <Button onClick={scrollToForm} size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/80 px-8 py-4 font-semibold rounded-lg h-auto glow-blue hover:glow-blue-lg transition-shadow duration-300">
            {t('faq.ctaButton')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-1 px-8 py-4 font-semibold rounded-lg h-auto"
          >
            {t('form.calcButton')}
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}

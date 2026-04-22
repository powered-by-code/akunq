import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FAQSection() {
  const items = tArray<{ question: string; answer: string }>('faq.items');

  return (
    <AnimatedSection className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-3xl relative">
        <div className="mono-label mb-4">// {t('faq.sectionTag')}</div>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-12 max-w-[800px]">{t('faq.headline')}</h2>

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

        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <Button onClick={scrollToForm} size="lg" className="md:flex-1 bg-foreground text-background hover:bg-foreground/90 px-8 py-4 font-semibold rounded-lg h-auto">
            {t('faq.ctaButton')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            className="md:flex-1 px-8 py-4 font-semibold rounded-lg h-auto"
          >
            {t('form.calcButton')}
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}

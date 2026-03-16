import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';

export function HowItWorks() {
  const steps = tArray<{ number: string; title: string; description: string }>('howItWorks.steps');

  return (
    <AnimatedSection className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">{t('howItWorks.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-headline mt-3 mb-10">{t('howItWorks.headline')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps.map((step) => (
            <div key={step.number} className="bg-card border rounded-lg p-6 relative">
              <span className="text-4xl font-bold text-primary/20 font-mono absolute top-4 right-4">{step.number}</span>
              <h3 className="text-lg font-bold text-text-headline mb-3">{step.title}</h3>
              <p className="text-sm text-text-body leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 text-center">
          <p className="text-base font-semibold text-text-headline">{t('howItWorks.bottomLine')}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';

export function HowItWorks() {
  const steps = tArray<{ number: string; title: string; description: string }>('howItWorks.steps');

  return (
    <AnimatedSection className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative">
        <div className="mono-label mb-4">// {t('howItWorks.sectionTag')}</div>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-12 max-w-[800px]">{t('howItWorks.headline')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="glass-card rounded-xl p-6 relative hover:border-primary/20 transition-colors duration-300">
              <span className="text-4xl font-bold text-primary/30 font-mono absolute top-4 right-4">{step.number}</span>
              <h3 className="text-lg font-bold text-text-headline mb-3">{step.title}</h3>
              <p className="text-sm text-text-body leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-xl p-6 text-center">
          <p className="text-base font-semibold text-text-headline">{t('howItWorks.bottomLine')}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';

export function HowItWorks() {
  const steps = tArray<{ number: string; title: string; description: string }>('howItWorks.steps');

  return (
    <AnimatedSection className="py-20 px-4 bg-background relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 wash-cyan pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 bg-grid pointer-events-none" />
      {/* Ambient glow */}
      <div aria-hidden="true" className="glow-orb w-[600px] h-[400px] top-[-50px] left-1/2 -translate-x-1/2 opacity-25" style={{ background: 'rgba(99,102,241,0.4)' }} />
      <div className="container mx-auto max-w-5xl relative">
        <span className="text-xs uppercase tracking-[0.08em] text-gradient-blue font-semibold block mb-3">{t('howItWorks.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-12 max-w-[800px]">{t('howItWorks.headline')}</h2>

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

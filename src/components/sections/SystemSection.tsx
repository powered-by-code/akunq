import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { CalculatorSection } from '@/components/sections/CalculatorSection';
import { MapPin } from 'lucide-react';

export function SystemSection() {
  const phases = tArray<{ name: string; location: string; description: string; keyMetrics: string }>('system.phases');

  return (
    <AnimatedSection className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">{t('system.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-headline mt-3 mb-4">{t('system.headline')}</h2>
        <p className="text-text-body leading-relaxed mb-10 max-w-3xl">{t('system.intro')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {phases.map((phase, i) => (
            <div key={i} className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-bold text-text-headline mb-2">{phase.name}</h3>
              <span className="inline-flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full mb-4">
                <MapPin size={12} /> {phase.location}
              </span>
              <p className="text-sm text-text-body leading-relaxed mb-4">{phase.description}</p>
              <div className="border-t pt-3">
                <p className="text-xs font-mono-data text-muted-foreground">{phase.keyMetrics}</p>
              </div>
            </div>
          ))}
        </div>

        <CalculatorSection />

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-10">
          <h3 className="text-base font-bold text-text-headline mb-2">{t('system.reporting.headline')}</h3>
          <p className="text-sm text-text-body leading-relaxed">{t('system.reporting.description')}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

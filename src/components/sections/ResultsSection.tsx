import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';

export function ResultsSection() {
  const metrics = tArray<{ metric: string; target: string; detail: string }>('results.metrics');

  return (
    <AnimatedSection className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-4xl">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">{t('results.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-headline mt-3 mb-4">{t('results.headline')}</h2>
        <p className="text-sm text-muted-foreground italic mb-10">{t('results.note')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((m, i) => (
            <div key={i} className="bg-card border rounded-lg p-5 text-center">
              <p className="text-2xl font-bold font-mono-data text-primary mb-2">{m.target}</p>
              <p className="text-sm font-bold text-text-headline mb-1">{m.metric}</p>
              <p className="text-xs text-muted-foreground">{m.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

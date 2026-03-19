import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';

export function GuaranteeSection() {
  const guarantees = tArray<{ name: string; type: string; description: string }>('guarantee.guarantees');

  const badgeColor = (type: string) => {
    if (type.includes('Unconditional')) return 'bg-primary text-primary-foreground';
    if (type.includes('Conditional')) return 'bg-accent/20 text-accent';
    return 'bg-secondary text-text-headline';
  };

  return (
    <AnimatedSection className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">{t('guarantee.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-headline mt-3 mb-10">{t('guarantee.headline')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {guarantees.map((g, i) => (
            <div key={i} className="bg-card border rounded-lg p-6">
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${badgeColor(g.type)}`}>
                {g.type}
              </span>
              <h3 className="text-base font-bold text-text-headline mb-3">{g.name}</h3>
              <p className="text-sm text-text-body leading-relaxed">{g.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <p className="text-sm text-text-headline font-medium leading-relaxed">{t('guarantee.summary')}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

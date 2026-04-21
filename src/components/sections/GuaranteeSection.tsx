import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';

export function GuaranteeSection() {
  const guarantees = tArray<{ name: string; type: string; description: string }>('guarantee.guarantees');

  const badgeColor = (type: string) => {
    if (type.includes('Unconditional')) return 'bg-[#0A2618] text-[#4ADE80]';
    if (type.includes('Conditional')) return 'bg-[#261A00] text-[#FCD34D]';
    return 'bg-border text-muted-foreground';
  };

  return (
    <AnimatedSection className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative">
        <div className="mono-label mb-4">// {t('guarantee.sectionTag')}</div>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-12 max-w-[800px]">{t('guarantee.headline')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {guarantees.map((g, i) => (
            <div key={i} className="glass-card rounded-xl p-6 hover:border-primary/20 transition-colors duration-300">
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-md mb-4 ${badgeColor(g.type)}`}>
                {g.type}
              </span>
              <h3 className="text-base font-bold text-foreground mb-3">{g.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-xl p-6">
          <p className="text-sm text-foreground font-medium leading-relaxed">{t('guarantee.summary')}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

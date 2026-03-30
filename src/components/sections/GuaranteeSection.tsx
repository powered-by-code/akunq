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
    <AnimatedSection className="py-20 px-4 bg-secondary relative overflow-hidden bg-grid">
      {/* Ambient green/blue glow */}
      <div aria-hidden="true" className="glow-orb w-[350px] h-[350px] top-[20%] right-[-80px] opacity-10" style={{ background: 'rgba(74,222,128,0.3)' }} />
      <div className="container mx-auto max-w-5xl relative">
        <span className="text-xs uppercase tracking-[0.08em] text-gradient-blue font-semibold block mb-3">{t('guarantee.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-12 max-w-[800px]">{t('guarantee.headline')}</h2>

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

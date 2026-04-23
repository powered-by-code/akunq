import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ShieldCheck } from 'lucide-react';

type Guarantee = { name: string; type: string; description: string };

export function GuaranteeSection() {
  const guarantees = tArray<Guarantee>('guarantee.guarantees');

  return (
    <AnimatedSection id="guarantee-section" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative">
        <div className="mono-label mb-4">// {t('guarantee.sectionTag')}</div>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-10 max-w-[800px]">
          {t('guarantee.headline')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {guarantees.map((g, i) => {
            const idx = String(i + 1).padStart(2, '0');
            return (
              <div
                key={i}
                className="rounded-lg border border-border bg-card/40 backdrop-blur-sm overflow-hidden hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-center justify-between px-5 py-2.5 border-b border-border/80 bg-white/[0.02]">
                  <span className="mono-label">guarantee_{idx}</span>
                  <span className="inline-flex items-center gap-1.5 mono-label text-[#34D399]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                    {g.type}
                  </span>
                </div>
                <div className="px-5 py-5">
                  <h3 className="text-base font-semibold text-foreground mb-2 leading-snug">{g.name}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.7]">{g.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-lg border border-border bg-card/40 backdrop-blur-sm px-5 py-4 flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-[#34D399] shrink-0" strokeWidth={2.25} />
          <p className="text-sm text-foreground/90 leading-relaxed">{t('guarantee.summary')}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

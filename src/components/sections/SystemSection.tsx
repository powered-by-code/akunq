import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';

type Phase = { name: string; location: string; description: string; keyMetrics: string };

export function SystemSection() {
  const phases = tArray<Phase>('system.phases');

  return (
    <AnimatedSection id="system-section" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative">
        <div className="mono-label mb-4">// {t('system.sectionTag')}</div>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4 max-w-[800px]">{t('system.headline')}</h2>
        <p className="text-muted-foreground leading-[1.75] text-[1.05rem] mb-12 max-w-[680px]">{t('system.intro')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {phases.map((phase, i) => {
            const metrics = phase.keyMetrics.split(/\s*·\s*/).filter(Boolean);
            const phaseNum = String(i + 1).padStart(2, '0');
            return (
              <div
                key={i}
                className="rounded-lg border border-border bg-card/40 backdrop-blur-sm overflow-hidden hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-center justify-between px-5 py-2.5 border-b border-border/80 bg-white/[0.02]">
                  <span className="mono-label">phase_{phaseNum}</span>
                  <span className="mono-label text-foreground/60">@ {phase.location}</span>
                </div>

                <div className="px-5 pt-5 pb-4">
                  <h3 className="text-lg font-semibold text-foreground mb-3 leading-snug">{phase.name}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.7]">{phase.description}</p>
                </div>

                <div className="border-t border-border/80 px-5 py-4">
                  <div className="mono-label mb-2">// metrics</div>
                  <ul className="space-y-1.5">
                    {metrics.map((m, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground/80 font-mono text-[13px]">
                        <span className="text-muted-foreground/60 select-none">{j === metrics.length - 1 ? '└─' : '├─'}</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-lg border border-border bg-card/40 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-border/80 bg-white/[0.02]">
            <span className="mono-label">reporting</span>
          </div>
          <div className="px-5 py-5">
            <h3 className="text-base font-semibold text-foreground mb-2">{t('system.reporting.headline')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t('system.reporting.description')}</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

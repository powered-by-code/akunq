import { t, tArray, tNumber } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';

export function ValueStack() {
  const bundles = tArray<{ name: string; description: string; value: number }>('valueStack.bundles');
  const bonuses = tArray<{ name: string; description: string; value: number }>('valueStack.bonuses');

  const currency = t('valueStack.currency');
  const fmt = (n: number) => n.toLocaleString('de-DE') + currency;

  const bundlesTotal = bundles.reduce((s, b) => s + b.value, 0);
  const bonusesTotal = bonuses.reduce((s, b) => s + b.value, 0);
  const grandTotal = bundlesTotal + bonusesTotal;
  const price = tNumber('valueStack.price');

  return (
    <AnimatedSection id="services" className="py-20 px-4 bg-background relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 wash-blue pointer-events-none" />
      {/* Ambient glow */}
      <div aria-hidden="true" className="glow-orb w-[500px] h-[500px] bottom-[10%] left-[-100px] opacity-25" style={{ background: 'rgba(59,130,246,0.3)' }} />
      <div className="container mx-auto max-w-5xl relative">
        <span className="text-xs uppercase tracking-[0.08em] text-gradient-blue font-semibold block mb-3">{t('valueStack.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4 max-w-[800px]">{t('valueStack.headline')}</h2>

        <div className="flex items-center justify-center gap-3 mb-12">
          <span className="text-xl font-mono-data line-through text-muted-foreground">{fmt(grandTotal)}</span>
          <span className="text-3xl font-bold font-mono-data text-gradient-blue">{fmt(price)}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {bundles.map((b, i) => (
            <div key={i} className="glass-card rounded-xl p-6 hover:border-primary/20 transition-colors duration-300">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold text-text-headline">{b.name}</h3>
                <span className="text-xs font-mono-data text-muted-foreground font-medium shrink-0 ml-2">{fmt(b.value)}</span>
              </div>
              <p className="text-xs text-text-body leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-bold text-text-headline mb-4">{t('valueStack.bonusHeadline')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {bonuses.map((b, i) => (
            <div key={i} className="glass-card border-l-[3px] border-l-primary/60 rounded-xl p-5 hover:border-l-primary transition-colors duration-300">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xs font-bold text-text-headline">{b.name}</h4>
                <span className="text-xs font-mono-data text-muted-foreground font-medium shrink-0 ml-2">{fmt(b.value)}</span>
              </div>
              <p className="text-xs text-text-body leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        <div className="border-t mt-8 pt-6 space-y-2 max-w-sm mx-auto">
          <div className="flex justify-between text-sm text-text-body">
            <span>{t('valueStack.bundlesTotalLabel')}</span>
            <span className="font-mono-data">{fmt(bundlesTotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-text-body">
            <span>{t('valueStack.bonusTotalLabel')}</span>
            <span className="font-mono-data">+ {fmt(bonusesTotal)}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold text-text-headline border-t pt-2">
            <span>{t('valueStack.grandTotalLabel')}</span>
            <span className="font-mono-data line-through text-muted-foreground">{fmt(grandTotal)}</span>
          </div>
          <div className="flex items-end justify-between text-3xl font-bold text-text-headline pt-2">
            <span>{t('valueStack.priceLabel')}</span>
            <span className="font-mono-data">{fmt(price)}</span>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button onClick={scrollToForm} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/80 px-8 py-4 font-semibold rounded-lg h-auto glow-blue hover:glow-blue-lg transition-shadow duration-300">
            {t('valueStack.ctaButton')}
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}

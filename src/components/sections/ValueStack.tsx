import { t, tArray, tNumber } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';

export function ValueStack() {
  const bundles = tArray<{ name: string; description: string; value: number }>('valueStack.bundles');
  const bonuses = tArray<{ name: string; description: string; value: number }>('valueStack.bonuses');

  const currency = t('valueStack.currency');
  const fmt = (n: number) => n.toLocaleString('hy-AM') + ' ' + currency;

  const bundlesTotal = bundles.reduce((s, b) => s + b.value, 0);
  const bonusesTotal = bonuses.reduce((s, b) => s + b.value, 0);
  const grandTotal = bundlesTotal + bonusesTotal;
  const price = tNumber('valueStack.price');

  return (
    <AnimatedSection id="services" className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-4xl">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">{t('valueStack.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-headline mt-3 mb-4">{t('valueStack.headline')}</h2>

        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-xl font-mono-data line-through text-muted-foreground">{fmt(grandTotal)}</span>
          <span className="text-3xl font-bold font-mono-data text-primary">{fmt(price)}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {bundles.map((b, i) => (
            <div key={i} className="bg-card border rounded-lg p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold text-text-headline">{b.name}</h3>
                <span className="text-xs font-mono-data text-muted-foreground shrink-0 ml-2">{fmt(b.value)}</span>
              </div>
              <p className="text-xs text-text-body leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
        <h3 className="text-lg font-bold text-text-headline mb-4">{t('valueStack.bonusHeadline')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {bonuses.map((b, i) => (
            <div key={i} className="bg-card border border-accent/20 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xs font-bold text-text-headline">{b.name}</h4>
                <span className="text-xs font-mono-data text-muted-foreground shrink-0 ml-2">{fmt(b.value)}</span>
              </div>
              <p className="text-xs text-text-body leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        <div className="border-t mt-6 pt-6 space-y-2 max-w-sm mx-auto">
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
          <div className="flex justify-between text-3xl font-bold text-primary pt-2">
            <span>{t('valueStack.priceLabel')}</span>
            <span className="font-mono-data">{fmt(price)}</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button onClick={scrollToForm} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 font-semibold">
            {t('valueStack.ctaButton')}
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}

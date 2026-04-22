import { t, tArray, tNumber } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';

type Item = { name: string; description: string; value: number };

export function ValueStack() {
  const bundles = tArray<Item>('valueStack.bundles');
  const bonuses = tArray<Item>('valueStack.bonuses');

  const currency = t('valueStack.currency');
  const fmt = (n: number) => n.toLocaleString('de-DE') + currency;

  const bundlesTotal = bundles.reduce((s, b) => s + b.value, 0);
  const bonusesTotal = bonuses.reduce((s, b) => s + b.value, 0);
  const grandTotal = bundlesTotal + bonusesTotal;
  const price = tNumber('valueStack.price');

  return (
    <AnimatedSection id="services" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative">
        <div className="mono-label mb-4">// {t('valueStack.sectionTag')}</div>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-8 max-w-[800px]">
          {t('valueStack.headline')}
        </h2>

        {/* Price callout */}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-10">
          <span className="font-mono text-lg md:text-xl line-through text-muted-foreground tabular-nums">
            {fmt(grandTotal)}
          </span>
          <span className="font-mono text-4xl md:text-5xl font-semibold text-foreground tabular-nums">
            {fmt(price)}
          </span>
          <span className="mono-label">{t('valueStack.priceLabel').replace(/[:՝]\s*$/, '')}</span>
        </div>

        {/* Bundles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {bundles.map((b, i) => (
            <Card key={i} item={b} fmt={fmt} />
          ))}
        </div>

        {/* Bonus headline */}
        <div className="mono-label mt-10 mb-4">// {t('valueStack.bonusHeadline')}</div>
        <div className="flex flex-wrap justify-center gap-4">
          {bonuses.map((b, i) => (
            <div key={i} className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]">
              <Card item={b} fmt={fmt} compact />
            </div>
          ))}
        </div>

        {/* Totals summary */}
        <div className="mt-12 pt-8 border-t border-border/60 max-w-md mx-auto">
          <div className="space-y-1.5 font-mono text-[13px]">
            <Row label={t('valueStack.bundlesTotalLabel')} value={fmt(bundlesTotal)} />
            <Row label={t('valueStack.bonusTotalLabel')} value={`+ ${fmt(bonusesTotal)}`} />
            <Row
              label={t('valueStack.grandTotalLabel')}
              value={<span className="line-through text-muted-foreground">{fmt(grandTotal)}</span>}
            />
          </div>

          <div className="mt-6 text-center">
            <div className="mono-label mb-2">{t('valueStack.priceLabel').replace(/[:՝]\s*$/, '')}</div>
            <div className="font-mono text-5xl md:text-6xl font-semibold text-foreground tabular-nums">
              {fmt(price)}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 max-w-md mx-auto">
          <Button
            onClick={scrollToForm}
            className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold text-base h-14"
          >
            {t('valueStack.ctaButton')}
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 text-muted-foreground">
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

function Card({ item, fmt, compact = false }: { item: Item; fmt: (n: number) => string; compact?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-card/40 backdrop-blur-sm p-5 hover:border-foreground/20 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className={`${compact ? 'text-sm' : 'text-sm md:text-[15px]'} font-semibold text-foreground leading-snug`}>
          {item.name}
        </h3>
        <span className="font-mono text-[12px] text-muted-foreground tabular-nums shrink-0">
          {fmt(item.value)}
        </span>
      </div>
      <p className="text-[13px] text-muted-foreground leading-[1.65]">
        {item.description}
      </p>
    </div>
  );
}

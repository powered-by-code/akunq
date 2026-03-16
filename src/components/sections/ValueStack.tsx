import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';

export function ValueStack() {
  const bundles = tArray<{ name: string; description: string; value: string }>('valueStack.bundles');
  const bonuses = tArray<{ name: string; description: string; value: string }>('valueStack.bonuses');

  return (
    <AnimatedSection className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-4xl">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">{t('valueStack.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-headline mt-3 mb-10">{t('valueStack.headline')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {bundles.map((b, i) => (
            <div key={i} className="bg-card border rounded-lg p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold text-text-headline">{b.name}</h3>
                <span className="text-xs font-mono-data text-muted-foreground shrink-0 ml-2">{b.value}</span>
              </div>
              <p className="text-xs text-text-body leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
        <p className="text-right text-sm font-mono-data text-primary font-medium mb-10">{t('valueStack.bundlesTotal')}</p>

        <h3 className="text-lg font-bold text-text-headline mb-4">{t('valueStack.bonusHeadline')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {bonuses.map((b, i) => (
            <div key={i} className="bg-card border border-accent/20 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xs font-bold text-text-headline">{b.name}</h4>
                <span className="text-xs font-mono-data text-muted-foreground shrink-0 ml-2">{b.value}</span>
              </div>
              <p className="text-xs text-text-body leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
        <p className="text-right text-sm font-mono-data text-accent font-medium mb-10">{t('valueStack.bonusTotal')}</p>

        <div className="text-center py-8 border-t">
          <p className="text-lg text-muted-foreground line-through mb-2">{t('valueStack.grandTotal')}</p>
          <p className="text-5xl font-bold text-primary mb-4">{t('valueStack.price')}</p>
          <p className="text-sm text-text-body max-w-lg mx-auto mb-6">{t('valueStack.priceContext')}</p>
          <Button onClick={scrollToForm} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 font-semibold">
            {t('valueStack.ctaButton')}
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}

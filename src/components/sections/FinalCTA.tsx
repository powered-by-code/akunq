import { t } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';

export function FinalCTA() {
  return (
    <AnimatedSection className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('finalCta.headline')}</h2>
        <p className="text-base opacity-90 mb-4 max-w-2xl mx-auto">{t('finalCta.description')}</p>
        <p className="text-sm font-mono-data opacity-70 mb-8">{t('finalCta.scarcity')}</p>
        <Button
          onClick={scrollToForm}
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 font-semibold text-base mb-4"
        >
          {t('finalCta.ctaButton')}
        </Button>
        <p className="text-xs opacity-70">{t('finalCta.reassurance')}</p>
      </div>
    </AnimatedSection>
  );
}

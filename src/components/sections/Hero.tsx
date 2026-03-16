import { t } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';

export function Hero() {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-headline leading-tight mb-6">
          {t('hero.headline')}
        </h1>
        <p className="text-lg md:text-xl text-primary font-medium mb-4">
          {t('hero.subheadline')}
        </p>
        <p className="text-base md:text-lg text-text-body leading-relaxed mb-8 max-w-2xl mx-auto">
          {t('hero.description')}
        </p>
        <Button
          onClick={scrollToForm}
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 py-6 font-semibold mb-6"
        >
          {t('hero.ctaButton')}
        </Button>
        <p className="text-sm text-muted-foreground font-mono-data">
          {t('hero.trustLine')}
        </p>
      </div>
    </section>
  );
}

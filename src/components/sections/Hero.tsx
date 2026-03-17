import { t } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';

export function Hero() {
  return (
    <section id="hero-section" className="pt-28 pb-20 md:pt-36 md:pb-28 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="md:text-6xl font-bold tracking-tight text-text-headline leading-[1.1] mb-6 lg:text-6xl text-4xl">
          {t('hero.headline')}
        </h1>
        <p className="text-lg md:text-xl text-text-body leading-relaxed mb-8 max-w-2xl mx-auto">
          {t('hero.subheadline')}
        </p>
        <Button
          onClick={scrollToForm}
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 py-6 font-semibold">
          
          {t('hero.ctaButton')}
        </Button>
      </div>
    </section>);

}
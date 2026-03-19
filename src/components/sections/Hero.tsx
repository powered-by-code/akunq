import { t } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';

export function Hero() {
  return (
    <section
      id="hero-section"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero-bg.png')" }}
    >
      <div className="relative container mx-auto max-w-3xl text-center">
        <div className="inline-block bg-black/30 backdrop-blur-md backdrop-saturate-150 backdrop-brightness-75 rounded-2xl px-2 py-6 mb-8">
          <h1 className="md:text-6xl font-bold tracking-tight text-white leading-[1.1] lg:text-6xl text-4xl drop-shadow-lg mb-4">
            {t('hero.headline')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-md mb-6">
            {t('hero.subheadline')}
          </p>
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 py-6 font-semibold">
            {t('hero.ctaButton')}
          </Button>
        </div>
      </div>
    </section>);

}
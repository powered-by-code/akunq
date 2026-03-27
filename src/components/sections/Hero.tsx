import { t, tHtml } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="hero-section"
      className="bg-[#09090B] px-4 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <h1 className="font-extrabold tracking-tight text-white leading-[1.08] text-[clamp(2.5rem,5vw,4.5rem)] max-w-[800px] mb-6">
          {t('hero.headline')}
        </h1>
        <p className="text-lg md:text-xl text-[#A1A1AA] leading-relaxed max-w-[600px] mb-10">
          {tHtml('hero.subheadline')}
        </p>
        <Button
          onClick={() => {
            document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
          }}
          size="lg"
          className="bg-primary text-white hover:bg-[#1D4ED8] px-8 py-4 text-base font-semibold rounded-lg h-auto">
          {t('hero.ctaButton')}
          <ChevronDown className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}

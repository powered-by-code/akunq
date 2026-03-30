import { t, tHtml } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="hero-section"
      className="relative bg-background px-4 py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Git graph background */}
      <img
        src="/hero-bg.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none select-none"
      />
      {/* Gradient overlay: solid on left (text area) → transparent on right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #0a0a0a 0%, #0a0a0a 40%, transparent 100%)',
        }}
      />
      {/* Grid pattern on top of image */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      {/* Top-center blue ambient glow */}
      <div
        aria-hidden="true"
        className="glow-orb w-[600px] h-[400px] top-[-100px] left-1/2 -translate-x-1/2 opacity-50"
        style={{ background: 'rgba(59,130,246,0.25)', animation: 'none', willChange: 'auto' }}
      />
      {/* Left purple accent glow */}
      <div
        aria-hidden="true"
        className="glow-orb w-[300px] h-[300px] top-[20%] left-[-50px] opacity-35"
        style={{ background: 'rgba(139,92,246,0.3)', animation: 'none', willChange: 'auto' }}
      />

      <div className="relative mx-auto max-w-5xl">
        <h1 className="font-extrabold tracking-tight text-gradient leading-[1.08] text-[clamp(2.5rem,5vw,4.5rem)] max-w-[800px] mb-6">
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
          className="bg-[#F5F5F7] text-[#0a0a0a] hover:bg-white px-8 py-4 text-base font-semibold rounded-lg h-auto glow-blue hover:glow-blue-lg transition-shadow duration-300">
          {t('hero.ctaButton')}
          <ChevronDown className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Bottom section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}

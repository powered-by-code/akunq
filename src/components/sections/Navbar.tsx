import { t } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-background/80 backdrop-blur-sm'}`}>
      <div className="container mx-auto flex items-center justify-between px-4 py-4 max-w-5xl">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.webp" alt="Ակունք" className="h-8 w-auto" />
          <span className="text-lg tracking-tight text-text-headline font-bold" style={{ fontFamily: "'ARM HMK IMAGINESQUARE', sans-serif" }}>{t('nav.brandName')}</span>
        </button>
        <Button onClick={scrollToForm} className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-md shadow-sm">
          {t('nav.ctaButton')}
        </Button>
      </div>
    </nav>
  );
}

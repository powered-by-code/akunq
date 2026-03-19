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
    <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="container mx-auto flex items-center justify-between px-4 py-4 max-w-5xl">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Ակունք" className="h-8 w-auto" />
          <span className="text-lg tracking-tight text-primary" style={{ fontFamily: "'ARM HMK IMAGINESQUARE', sans-serif" }}>{t('nav.brandName')}</span>
        </div>
        <Button onClick={scrollToForm} className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
          {t('nav.ctaButton')}
        </Button>
      </div>
    </nav>
  );
}

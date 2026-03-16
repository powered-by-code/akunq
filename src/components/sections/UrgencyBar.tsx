import { t } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { scrollToForm } from '@/lib/scrollToForm';
import { useState, useEffect } from 'react';

export function UrgencyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      const hero = document.getElementById('hero-section');
      const form = document.getElementById('contact-form');
      if (!hero) return;

      const heroBottom = hero.getBoundingClientRect().bottom;
      const pastHero = heroBottom < 0;

      let nearForm = false;
      if (form) {
        const formRect = form.getBoundingClientRect();
        nearForm = formRect.top < window.innerHeight && formRect.bottom > 0;
      }

      setVisible(pastHero && !nearForm);
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div
      className={`fixed z-40 left-0 right-0 bg-accent text-accent-foreground transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'md:-translate-y-full translate-y-full'
      } md:top-[64px] bottom-0 md:bottom-auto`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-2 max-w-5xl">
        <span className="text-xs md:text-sm font-medium">{t('urgencyBar.text')}</span>
        <Button
          onClick={scrollToForm}
          size="sm"
          variant="secondary"
          className="text-xs font-semibold shrink-0 ml-3"
        >
          {t('urgencyBar.ctaButton')}
        </Button>
      </div>
    </div>
  );
}

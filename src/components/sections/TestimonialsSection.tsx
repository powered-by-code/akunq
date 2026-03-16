import { t } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { BarChart3 } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <AnimatedSection className="py-20 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">{t('testimonials.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-headline mt-3 mb-6">{t('testimonials.headline')}</h2>
        <div className="bg-card border rounded-lg p-10">
          <BarChart3 size={40} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-text-body leading-relaxed mb-4">{t('testimonials.comingSoon')}</p>
          <p className="text-sm text-muted-foreground italic">{t('testimonials.placeholder')}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

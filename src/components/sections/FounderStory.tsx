import { t } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { User } from 'lucide-react';

export function FounderStory() {
  return (
    <AnimatedSection className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-4xl">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">{t('story.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-headline mt-3 mb-6">{t('story.headline')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-text-body leading-relaxed mb-4">{t('story.paragraph1')}</p>
            <p className="text-text-body leading-relaxed mb-6">{t('story.paragraph2')}</p>
            <blockquote className="border-l-4 border-primary pl-4 text-text-headline font-semibold italic">
              {t('story.boldStatement')}
            </blockquote>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/founder-before-after.png"
              alt={t('story.photoCaption')}
              className="w-full rounded-lg mb-3"
            />
            <p className="text-sm text-muted-foreground font-mono-data">{t('story.photoCaption')}</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

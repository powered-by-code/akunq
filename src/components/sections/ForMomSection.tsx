import { t, tArray, tHtml } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Mountain, ChefHat, Users, Heart, Phone } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  mountain: Mountain,
  'chef-hat': ChefHat,
  users: Users,
  heart: Heart,
  phone: Phone,
};

export function ForMomSection() {
  const highlights = tArray<{ icon: string; text: string }>('forMom.highlights');

  return (
    <AnimatedSection className="py-20 px-4 bg-warm-cream">
      <div className="container mx-auto max-w-3xl">
        <p className="text-xs text-accent font-medium uppercase tracking-widest mb-2">{t('forMom.sectionTag')}</p>
        <p className="text-sm text-text-body mb-6 italic">{t('forMom.intro')}</p>

        <h2 className="text-3xl md:text-4xl font-serif-warm font-semibold text-text-headline mb-1 text-center">
          {t('forMom.headline')}
        </h2>
        <p className="text-center text-sm text-muted-foreground mb-10">{t('forMom.headlineTranslation')}</p>

        <div className="bg-card rounded-xl border shadow-sm p-8 md:p-10 mb-10">
          <div className="font-serif-warm text-text-body leading-loose whitespace-pre-line text-base">
            {tHtml('forMom.letter')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {highlights.map((h, i) => {
            const Icon = iconMap[h.icon] || Heart;
            return (
              <div key={i} className="flex items-start gap-3 bg-card/80 p-4 rounded-lg border">
                <div className="p-2 rounded-md bg-accent/10 text-accent shrink-0">
                  <Icon size={18} />
                </div>
                <p className="text-sm text-text-body">{h.text}</p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-lg font-serif-warm font-semibold text-text-headline">
          {t('forMom.closingLine')}
        </p>
      </div>
    </AnimatedSection>
  );
}

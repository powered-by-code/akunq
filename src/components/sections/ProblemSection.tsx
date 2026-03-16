import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Activity, Utensils, ShieldOff, RotateCcw } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  activity: Activity,
  utensils: Utensils,
  'shield-off': ShieldOff,
  'rotate-ccw': RotateCcw,
};

export function ProblemSection() {
  const situations = tArray<{ icon: string; text: string }>('problem.situations');

  return (
    <AnimatedSection className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-4xl">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">{t('problem.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-headline mt-3 mb-6">{t('problem.headline')}</h2>
        <p className="text-text-body leading-relaxed mb-4 max-w-3xl">{t('problem.paragraph1')}</p>
        <p className="text-text-body leading-relaxed mb-10 max-w-3xl">{t('problem.paragraph2')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {situations.map((s, i) => {
            const Icon = iconMap[s.icon] || Activity;
            return (
              <div key={i} className="flex items-start gap-4 bg-card p-5 rounded-lg border">
                <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
                  <Icon size={20} />
                </div>
                <p className="text-sm text-text-body leading-relaxed">{s.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

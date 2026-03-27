import { t, tArray, tHtml } from '@/i18n/useTranslation';
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
    <AnimatedSection className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <span className="text-xs uppercase tracking-[0.08em] text-primary font-semibold block mb-3">{t('problem.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-headline mb-6 max-w-[800px]">{t('problem.headline')}</h2>
        <p className="text-text-body leading-[1.75] text-[1.05rem] mb-4 max-w-[680px]">{t('problem.paragraph1')}</p>
        <p className="text-text-body leading-[1.75] text-[1.05rem] mb-12 max-w-[680px]">{tHtml('problem.paragraph2')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {situations.map((s, i) => {
            const Icon = iconMap[s.icon] || Activity;
            return (
              <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-xl border border-[#E4E4E7]">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
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

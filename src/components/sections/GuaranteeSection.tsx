import { t, tArray } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';

export function GuaranteeSection() {
  const guarantees = tArray<{ name: string; type: string; description: string }>('guarantee.guarantees');

  const badgeColor = (type: string) => {
    if (type.includes('Unconditional')) return 'bg-[#F0FDF4] text-[#16A34A]';
    if (type.includes('Conditional')) return 'bg-[#FFFBEB] text-[#F59E0B]';
    return 'bg-[#27272A] text-[#A1A1AA]';
  };

  return (
    <AnimatedSection className="py-20 px-4 bg-[#09090B]">
      <div className="container mx-auto max-w-5xl">
        <span className="text-xs uppercase tracking-[0.08em] text-[#3B82F6] font-semibold block mb-3">{t('guarantee.sectionTag')}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#FAFAFA] mb-12 max-w-[800px]">{t('guarantee.headline')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {guarantees.map((g, i) => (
            <div key={i} className="bg-[#18181B] border border-[#27272A] rounded-xl p-6">
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-md mb-4 ${badgeColor(g.type)}`}>
                {g.type}
              </span>
              <h3 className="text-base font-bold text-[#FAFAFA] mb-3">{g.name}</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">{g.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6">
          <p className="text-sm text-[#FAFAFA] font-medium leading-relaxed">{t('guarantee.summary')}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

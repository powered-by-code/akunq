import { t } from '@/i18n/useTranslation';

export function Footer() {
  return (
    <footer className="py-10 px-4 bg-[#09090B]">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="font-bold text-[#FAFAFA]">{t('footer.brandName')}</p>
            <p className="text-xs text-[#A1A1AA]">{t('footer.tagline')}</p>
          </div>
          <div className="text-xs text-[#A1A1AA] space-y-1">
            <p>{t('footer.contact')} {t('footer.email')} · {t('footer.phone')}</p>
            <p>{t('footer.location')}</p>
          </div>
        </div>
        <p className="text-xs text-[#71717A] text-center mt-6">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}

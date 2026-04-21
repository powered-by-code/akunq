import { t } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { notifyMe } from '@/utils/notify';
import { metaPixel } from '@/utils/meta-pixel';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [workField, setWorkField] = useState('');

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    notifyMe(name.trim(), phone.trim(), workField.trim(), '', '', '', '');
    metaPixel.trackLead();
    setSubmitted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <AnimatedSection id="contact-form" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-md relative">
        <div className="glass-card rounded-lg p-8">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-headline mb-2">{t('form.thankYou')}</h3>
              <p className="text-text-body">{t('form.callSoon')}</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-text-headline mb-6">{t('form.headline')}</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-text-headline text-sm font-medium mb-2 block">{t('form.nameLabel')}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('form.namePlaceholder')}

                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-text-headline text-sm font-medium mb-2 block">{t('form.phoneLabel')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('form.phonePlaceholder')}
                  />
                </div>
                <div>
                  <Label htmlFor="workField" className="text-text-headline text-sm font-medium mb-2 block">{t('form.workFieldLabel')}</Label>
                  <Input
                    id="workField"
                    value={workField}
                    onChange={(e) => setWorkField(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('form.workFieldPlaceholder')}
                  />
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="w-full bg-primary text-white hover:bg-primary/80 h-[52px] font-semibold text-base rounded-lg"
                >
                  {t('form.submitButton')}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">{t('form.disclaimer')}</p>
            </>
          )}
        </div>

      </div>
    </AnimatedSection>
  );
}

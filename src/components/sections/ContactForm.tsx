import { t } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { notifyMe } from '@/utils/notify';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    notifyMe(name.trim(), phone.trim());
    setSubmitted(true);
  };

  return (
    <AnimatedSection id="contact-form" className="py-20 px-4">
      <div className="container mx-auto max-w-md">
        <div className="bg-card border rounded-xl p-8 shadow-lg">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-headline mb-2">{t('form.thankYou')}</h3>
              <p className="text-text-body">{t('form.callSoon')}</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-text-headline mb-2 text-center">{t('form.headline')}</h2>
              <p className="text-sm text-text-body text-center mb-3">{t('form.description')}</p>

              <p className="text-xs text-accent font-medium text-center mb-4">
                {t('form.urgency')}{' '}
                <a href="#services" className="underline hover:text-accent/80">{t('form.servicesLink')}</a>
              </p>

              <div className="flex flex-col items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-2 bg-accent/10 text-accent font-mono-data text-xl font-bold px-6 py-3 rounded-full">
                  {t('form.spotsLeft')}
                </span>
                <span className="text-xs font-semibold text-text-headline">
                  {t('form.deadline')}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-text-headline">{t('form.nameLabel')}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('form.namePlaceholder')}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-text-headline">{t('form.phoneLabel')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('form.phonePlaceholder')}
                    className="mt-1"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700 py-7 font-bold text-lg rounded-xl animate-pulse-subtle">
                  {t('form.submitButton')}
                </Button>
                <p className="text-xs text-muted-foreground text-center">{t('form.disclaimer')}</p>
              </form>
            </>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}

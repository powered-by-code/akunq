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
              <h3 className="text-xl font-bold text-text-headline mb-2">Thank you!</h3>
              <p className="text-text-body">We'll call you within 24 hours.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-text-headline mb-2 text-center">{t('form.headline')}</h2>
              <p className="text-sm text-text-body text-center mb-3">{t('form.description')}</p>

              <p className="text-xs text-accent font-medium text-center mb-4">
                {t('form.urgency')}
              </p>

              <div className="flex flex-col items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1 bg-accent/10 text-accent font-mono-data text-sm font-semibold px-4 py-2 rounded-full">
                  {t('form.spotsCount')} {t('form.spotsLeft')}
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
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 font-semibold text-base">
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

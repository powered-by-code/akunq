import { t } from '@/i18n/useTranslation';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { notifyMe } from '@/utils/notify';

const TOTAL_STEPS = 6;

const textareaClass =
  'mt-1 flex w-full rounded-lg border border-input bg-secondary px-3 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:border-primary md:text-sm min-h-[96px]';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [workField, setWorkField] = useState('');
  const [goal, setGoal] = useState('');
  const [frustrations, setFrustrations] = useState('');
  const [pastAttempts, setPastAttempts] = useState('');
  const [excitement, setExcitement] = useState('');

  const canGoNext = () => {
    if (step === 1) return goal.trim().length > 0;
    if (step === 2) return frustrations.trim().length > 0;
    if (step === 3) return pastAttempts.trim().length > 0;
    if (step === 4) return excitement.trim().length > 0;
    if (step === 5) return name.trim().length > 0 && phone.trim().length > 0;
    if (step === 6) return true;
    return true;
  };

  const handleNext = () => {
    if (canGoNext() && step < TOTAL_STEPS) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) return;
    notifyMe(name.trim(), phone.trim(), workField.trim(), goal.trim(), frustrations.trim(), pastAttempts.trim(), excitement.trim());
    setSubmitted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (step < TOTAL_STEPS) handleNext();
      else handleSubmit();
    }
  };

  return (
    <AnimatedSection id="contact-form" className="py-20 px-4 bg-[#FAFAFA]">
      <div className="container mx-auto max-w-md">
        <div className="bg-white border border-[#E4E4E7] rounded-xl p-8">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-headline mb-2">{t('form.thankYou')}</h3>
              <p className="text-text-body">{t('form.callSoon')}</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-text-headline mb-2">{t('form.headline')}</h2>

              {/* Progress bar */}
              <div className="flex gap-1.5 mb-8 mt-4">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                      i < step ? 'bg-primary' : 'bg-primary/15'
                    }`}
                  />
                ))}
              </div>

              {/* Step content */}
              <div className="min-h-[160px] flex flex-col justify-center">
                {step === 1 && (
                  <div>
                    <Label htmlFor="goal" className="text-text-headline text-sm font-medium mb-2 block">{t('form.goalLabel')}</Label>
                    <textarea
                      id="goal"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t('form.goalPlaceholder')}
                      rows={3}
                      className={textareaClass}
                      autoFocus
                    />
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <Label htmlFor="frustrations" className="text-text-headline text-sm font-medium mb-2 block">{t('form.frustrationsLabel')}</Label>
                    <textarea
                      id="frustrations"
                      value={frustrations}
                      onChange={(e) => setFrustrations(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t('form.frustrationsPlaceholder')}
                      rows={3}
                      className={textareaClass}
                      autoFocus
                    />
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <Label htmlFor="pastAttempts" className="text-text-headline text-sm font-medium mb-2 block">{t('form.pastAttemptsLabel')}</Label>
                    <textarea
                      id="pastAttempts"
                      value={pastAttempts}
                      onChange={(e) => setPastAttempts(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t('form.pastAttemptsPlaceholder')}
                      rows={3}
                      className={textareaClass}
                      autoFocus
                    />
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <Label htmlFor="excitement" className="text-text-headline text-sm font-medium mb-2 block">{t('form.excitementLabel')}</Label>
                    <textarea
                      id="excitement"
                      value={excitement}
                      onChange={(e) => setExcitement(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t('form.excitementPlaceholder')}
                      rows={3}
                      className={textareaClass}
                      autoFocus
                    />
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-text-headline text-sm font-medium mb-2 block">{t('form.nameLabel')}</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t('form.namePlaceholder')}
                        autoFocus
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
                  </div>
                )}

                {step === 6 && (
                  <div>
                    <Label htmlFor="workField" className="text-text-headline text-sm font-medium mb-2 block">{t('form.workFieldLabel')}</Label>
                    <Input
                      id="workField"
                      value={workField}
                      onChange={(e) => setWorkField(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t('form.workFieldPlaceholder')}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex gap-3 mt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="flex-none px-4 py-3"
                  >
                    <ChevronLeft size={18} />
                  </Button>
                )}

                {step < TOTAL_STEPS ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!canGoNext()}
                    className="flex-1 bg-primary text-white hover:bg-[#1D4ED8] h-[52px] font-semibold text-base rounded-lg"
                  >
                    <span className="flex items-center gap-2">
                      {t('form.nextButton')} <ChevronRight size={18} />
                    </span>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canGoNext()}
                    className="flex-1 bg-primary text-white hover:bg-[#1D4ED8] h-[52px] font-semibold text-base rounded-lg animate-pulse-subtle"
                  >
                    {t('form.submitButton')}
                  </Button>
                )}
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">{t('form.disclaimer')}</p>
            </>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}

import { useState, useEffect } from 'react';
import { t, tHtml } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { DashboardMock } from '@/components/DashboardMock';

type FBVideoInstance = { unmute: () => void; play: () => void };
type FBXfbmlMsg = { type: string; instance: FBVideoInstance };
type FBType = {
  init: (opts: { xfbml: boolean; version: string }) => void;
  XFBML: { parse: () => void };
  Event: {
    subscribe: (event: string, handler: (msg: FBXfbmlMsg) => void) => void;
    unsubscribe: (event: string, handler: (msg: FBXfbmlMsg) => void) => void;
  };
};

declare global {
  interface Window { FB: FBType; fbAsyncInit: () => void; }
}

export function Hero() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.FB || document.getElementById('fb-sdk')) return;

    window.fbAsyncInit = function () {
      window.FB.init({ xfbml: false, version: 'v18.0' });
    };

    const script = document.createElement('script');
    script.id = 'fb-sdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handler = (msg: FBXfbmlMsg) => {
      if (msg.type === 'video') {
        msg.instance.unmute();
        msg.instance.play();
      }
    };

    const tryParse = () => {
      if (!window.FB) { setTimeout(tryParse, 200); return; }
      window.FB.Event.subscribe('xfbml.ready', handler);
      window.FB.XFBML.parse();
    };

    const timer = setTimeout(tryParse, 150);

    return () => {
      clearTimeout(timer);
      if (window.FB) window.FB.Event.unsubscribe('xfbml.ready', handler);
    };
  }, [open]);

  return (
    <section
      id="hero-section"
      className="relative bg-background px-4 py-24 md:py-32 lg:py-36 overflow-hidden"
    >
      <img
        src="/hero-bg.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none select-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.85) 50%, rgba(10,10,10,0.6) 100%)',
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-x-16 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="font-semibold tracking-tight text-foreground leading-[1.05] text-[clamp(2.5rem,5vw,4.25rem)] max-w-[720px] mb-6">
              {t('hero.headline')}
            </h1>

            <p className="text-[1.05rem] md:text-lg text-muted-foreground leading-[1.7] max-w-[560px] mb-8">
              {tHtml('hero.subheadline')}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => {
                  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 font-semibold"
              >
                {t('hero.ctaButton')}
              </Button>
              <Button
                onClick={() => {
                  document.getElementById('system-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="ghost"
                size="lg"
                className="text-muted-foreground hover:text-foreground hover:bg-transparent font-medium"
              >
                {t('hero.secondaryCta')}
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative lg:pb-20">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group block w-full text-left rounded-lg border border-border bg-card/60 backdrop-blur-sm overflow-hidden font-mono text-[12px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] transition-colors hover:border-foreground/20"
              aria-label={t('hero.watchVideo')}
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/80">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#3a3a3a]" />
                    <span className="w-2 h-2 rounded-full bg-[#3a3a3a]" />
                    <span className="w-2 h-2 rounded-full bg-[#3a3a3a]" />
                  </div>
                  <span className="mono-label ml-2">intro.mp4</span>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/video-thumbnail.webp"
                  alt=""
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#F5F5F7] group-hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 text-[#0a0a0a] fill-[#0a0a0a] ml-0.5" />
                  </div>
                </div>
              </div>
            </button>

            <div className="mt-4 lg:mt-0 lg:absolute lg:-bottom-4 lg:-right-10 lg:w-[62%] lg:z-10 lg:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.9)] lg:rounded-lg">
              {/* <DashboardMock compact /> */}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-black border-0 p-0 overflow-hidden">
          <DialogTitle className="sr-only">Explainer video</DialogTitle>
          <div
            className="fb-video w-full"
            data-href="https://www.facebook.com/reel/1471198307713941/"
            data-width="auto"
            data-show-text="false"
            data-autoplay="true"
          />
        </DialogContent>
      </Dialog>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}

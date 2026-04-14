import { useState, useEffect } from 'react';
import { t, tHtml } from '@/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { ChevronDown, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

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

  // Load Facebook JS SDK once
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

  // When dialog opens: parse XFBML, then unmute + play via SDK
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
      className="relative bg-background px-4 py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Git graph background */}
      <img
        src="/hero-bg.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none select-none"
      />
      {/* Gradient overlay: solid on left (text area) → transparent on right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #0a0a0a 0%, #0a0a0a 40%, transparent 100%)',
        }}
      />
      {/* Grid pattern on top of image */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      {/* Top-center blue ambient glow */}
      <div
        aria-hidden="true"
        className="glow-orb w-[600px] h-[400px] top-[-100px] left-1/2 -translate-x-1/2 opacity-50"
        style={{ background: 'rgba(59,130,246,0.25)', animation: 'none', willChange: 'auto' }}
      />
      {/* Left purple accent glow */}
      <div
        aria-hidden="true"
        className="glow-orb w-[300px] h-[300px] top-[20%] left-[-50px] opacity-35"
        style={{ background: 'rgba(139,92,246,0.3)', animation: 'none', willChange: 'auto' }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video thumbnail — top on mobile, right on desktop */}
          <div
            className="order-1 lg:order-2 rounded-xl overflow-hidden cursor-pointer relative group shadow-2xl"
            onClick={() => setOpen(true)}
          >
            <img
              src="/video-thumbnail.webp"
              alt="Watch explainer video"
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors duration-300">
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#F5F5F7] glow-blue group-hover:glow-blue-lg group-hover:scale-110 transition-all duration-200">
                <Play className="w-8 h-8 text-[#0a0a0a] fill-[#0a0a0a] ml-1" />
              </div>
            </div>
          </div>

          {/* Text content — bottom on mobile, left on desktop */}
          <div className="order-2 lg:order-1">
            <h1 className="font-extrabold tracking-tight text-gradient leading-[1.08] text-[clamp(2.5rem,5vw,4.5rem)] max-w-[800px] mb-6">
              {t('hero.headline')}
            </h1>
            <p className="text-lg md:text-xl text-[#A1A1AA] leading-relaxed max-w-[600px] mb-10">
              {tHtml('hero.subheadline')}
            </p>
            <Button
              onClick={() => {
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              className="bg-[#F5F5F7] text-[#0a0a0a] hover:bg-white px-8 py-4 text-base font-semibold rounded-lg h-auto glow-blue hover:glow-blue-lg transition-shadow duration-300">
              {t('hero.ctaButton')}
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video modal */}
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

      {/* Bottom section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}

import { t } from '@/i18n/useTranslation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const menuImages = Array.from({ length: 7 }, (_, i) => `/menu/${i + 1}.webp`);

export function MenuSection() {
  return (
    <section className="py-16 px-4 bg-background relative">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-headline mb-3">
            {t('menu.headline')}
          </h2>
          <p className="text-sm md:text-base text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
            {t('menu.subtitle')}
          </p>
        </div>

        <Carousel
          opts={{ align: 'start', loop: true }}
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {menuImages.map((src, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full md:basis-1/2"
              >
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={src}
                    alt={`Menu item ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-12 bg-background/80 border-border hover:bg-background" />
          <CarouselNext className="-right-4 md:-right-12 bg-background/80 border-border hover:bg-background" />
        </Carousel>
      </div>
    </section>
  );
}

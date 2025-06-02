import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useCallback, useState } from 'react';

interface CarouselProps {
  images: string[];
}

export const Carousel = ({ images }: CarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`slide-${index}`}
              className="min-w-full max-h-[173px] object-cover rounded-2xl"
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-3 absolute bottom-2 left-1/2 -translate-x-1/2">
        {images.map((_, index) => {
          const distance = Math.abs(index - selectedIndex);
          const isActive = index === selectedIndex;

          const clampedDistance = Math.min(distance, 3);

          const sizeMap = [
            'w-1 h-1',
            'w-1 h-1',
            'w-[3px] h-[3px]',
            'w-0.5 h-0.5',
          ];
          const style = isActive
            ? 'bg-white !w-5 h-1'
            : 'bg-black backdrop-blur-[10px]';

          return (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`rounded-full transition-all duration-300 ease-in-out ${sizeMap[clampedDistance]} ${style}`}
            />
          );
        })}
      </div>
    </div>
  );
};

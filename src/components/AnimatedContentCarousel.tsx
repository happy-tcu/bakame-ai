
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ContentItem {
  id: string;
  title: string;
  image?: string;
  description?: string;
}

interface AnimatedContentCarouselProps {
  items: ContentItem[];
  autoPlay?: boolean;
  className?: string;
}

const AnimatedContentCarousel = ({ 
  items, 
  autoPlay = true, 
  className = "" 
}: AnimatedContentCarouselProps) => {
  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 h-full aspect-square flex flex-col">
                {item.image && (
                  <div className="w-full h-48 bg-white/10 rounded-lg mb-6 overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-white/70">{item.description}</p>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12 bg-white/10 border-white/20 text-white hover:bg-white/20" />
        <CarouselNext className="hidden md:flex -right-12 bg-white/10 border-white/20 text-white hover:bg-white/20" />
      </Carousel>
    </div>
  );
};

export default AnimatedContentCarousel;

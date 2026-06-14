import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
// import hero3 from '@/assets/hero-3.jpg';

const heroImages = [
  '/projects/Resorts/MARAMON-RESORT/maramon-resort.png',
  '/web-images/hero1_2.jpg',
  '/projects/Hospital/SANJIVANI-HOSPITAL/sanjivani-hospital.png',
];

const headlines = [
  'We Design Spaces <br /> That Inspire',
  "Building Tomorrow's <br /> Landmarks",
  'Where Functionality <br /> Meets Aesthetics',
];

const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const headlineEl = headlineRef.current;
    const subtextEl = subtextRef.current;

    if (!headlineEl || !subtextEl) return;

    // Animate the subtext once with the "slide from top" effect
    // Wrap the text in a div to animate its position inside the p tag
    const subtextLine = subtextEl.children[0];
    gsap.from(subtextLine, {
      yPercent: -120,
      duration: 1,
      ease: 'power2.out',
      delay: 0.8,
    });

    // Create a master timeline for the looping headlines
    const masterTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    headlines.forEach((text, index) => {
      const isFirst = index === 0;
      const animationTimeline = gsap.timeline();
      // Use a regex to split robustly, ignoring whitespace around the <br /> tag
      const lines = text.split(/\s*<br\s*\/?>\s*/);

      // 1. Set the content and initial state. This happens instantly.
      animationTimeline.set(headlineEl, {
        innerHTML: `<div>${lines.join('</div><div>')}</div>`,
        clipPath: 'inset(0% 0% 0% 0%)', // Reset clip-path for the entrance
      });

      // 2. Animate lines in (sliding down from above).
      // We target the divs inside the headline element.
      animationTimeline.from(headlineEl.querySelectorAll('div'), {
        yPercent: -120,
        stagger: 0.1,
        duration: 1,
        ease: 'power2.out',
        delay: isFirst ? 0.3 : 0.1, // Add a small delay for subsequent animations
      });

      // 3. Animate out after a pause (erase from bottom to top)
      animationTimeline.to(headlineEl, {
        clipPath: 'inset(0% 0% 100% 0%)', // Clip from bottom to top
        duration: 1,
        ease: 'power2.out',
        delay: 3, // How long the text stays visible
      });

      masterTimeline.add(animationTimeline);
    });

    return () => {
      masterTimeline.kill();
    };
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-screen p-0">
              <div className="relative h-full w-full">
                <img
                  src={image}
                  alt={`Architecture ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="left-8 bg-white/10 border-white/20 text-white hover:bg-white/20" /> */}
        {/* <CarouselNext className="right-8 bg-white/10 border-white/20 text-white hover:bg-white/20" /> */}
      </Carousel>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-6 max-w-5xl">
          {/* The h1 is a container for the animated lines. Overflow is hidden to contain the slide-in effect. */}
          <h1
            ref={headlineRef}
            className="text-white mb-6 leading-tight font-bold text-4xl md:text-6xl lg:text-7xl overflow-hidden flex flex-col items-center"
          >
            {/* Initial state for SSR and to prevent layout shift. */}
            <div>We Design Spaces</div>
            <div>That Inspire</div>
          </h1>
          <p
            ref={subtextRef}
            className="text-white/90 text-xl md:text-2xl font-light tracking-wide overflow-hidden"
          >
            <div>Transforming visions into architectural masterpieces</div>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

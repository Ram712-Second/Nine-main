import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Sarath and Sarah Sarath',
    project: 'Residential Villa',
    rating: 3,
    text: 'You have come to the right place if you want to create a home of exceptional quality and according to your specifications. Without a hitch, 9 Architects will construct your ideal space. Dear Team 9 Architects, thank you from the bottom of my heart.'
  },
  {
    name: 'Koushik Neelakantan',
    project: 'Corporate Office',
    rating: 5,
    text: 'We had like to express our gratitude to 9 Architects for their outstanding job. The group works well together and knows what they are doing. Recommended.',
  },
  {
    name: 'Sreejith and Revathi Sreejith',
    project: 'Boutique Hotel',
    rating: 5,
    text: 'The top construction firm in Kollam with whom you can entrust any building project. If you are wanting to develop a home or a business, this is a great option.',
  },
  {
    name: 'Reshma and Rashmi Associates',
    project: 'Urban Loft',
    rating: 5,
    text: 'Teamwork was excellent, as was synchronisation and attention to detail. Thank you for creating our dream home, team 9 Architects.',
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      onEnter: () => {
        gsap.fromTo(
          '.testimonial-content',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          }
        );
      },
    });
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding bg-black"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-center mb-16 text-white">Client Testimonials</h2>

        <div className="testimonial-content max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-8 md:p-12 text-center">
                    <div className="flex justify-center gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 fill-yellow-500 text-yellow"
                        />
                      ))}
                    </div>

                    <p className="text-2xl md:text-3xl font-light text-white mb-8 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>

                    <div className="space-y-1">
                      <div className="text-xl font-light text-white">
                        {testimonial.name}
                      </div>
                      {/* <div className="text-sm tracking-wider text-white/60 uppercase">
                        {testimonial.project}
                      </div> */}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white/10 border-white/20 text-white hover:bg-white/20" />
            <CarouselNext className="right-0 bg-white/10 border-white/20 text-white hover:bg-white/20" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

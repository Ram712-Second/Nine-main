import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Understanding your vision, requirements, and project goals through comprehensive consultation and site analysis.',
  },
  {
    number: '02',
    title: 'Planning',
    description: 'Developing strategic approaches and feasibility studies to ensure optimal project execution.',
  },
  {
    number: '03',
    title: 'Concept Design',
    description: 'Creating initial design concepts and visual representations that bring your vision to life.',
  },
  {
    number: '04',
    title: 'Detailed Design',
    description: 'Refining designs with technical specifications and comprehensive documentation for flawless execution.',
  },
  {
    number: '05',
    title: 'Execution',
    description: 'Overseeing construction and ensuring quality implementation with meticulous attention to detail.',
  },
  {
    number: '06',
    title: 'Handover',
    description: 'Final inspections and project delivery to client with complete documentation and support.',
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.process-card');

    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      onEnter: () => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          }
        );
      },
    });
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <div className="inline-block mb-4">
            <div className="w-12 h-[1px] bg-foreground/30 mb-6 mx-auto"></div>
          </div>
          <h2 className="text-black mb-6">Our Process</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            A systematic approach to transforming your vision into reality
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="process-card group relative"
            >
              {/* Card Container */}
              <div className="relative h-full p-8 md:p-10 bg-card border border-border/50 hover:border-foreground/20 transition-all duration-500 rounded-none">
                {/* Number */}
                <div className="absolute top-8 right-8 text-6xl md:text-7xl font-extralight text-foreground/10 group-hover:text-foreground/20 transition-colors duration-500">
                  {step.number}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-8 h-[1px] bg-foreground/40 mb-6"></div>
                  
                  <h3 className="text-2xl md:text-3xl font-light text-foreground mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-foreground group-hover:w-full transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Home, Trees, Ruler, Hammer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Building2,
    title: 'Architectural Design',
    description: 'Innovative and functional architectural solutions tailored to your vision and requirements.',
    color: 'from-slate-800 to-slate-900',
  },
  {
    icon: Home,
    title: 'Interior Design',
    description: 'Creating beautiful, cohesive interior spaces that reflect your style and enhance livability.',
    color: 'from-blue-900 to-slate-800',
  },
  {
    icon: Trees,
    title: 'Landscape Planning',
    description: 'Harmonious outdoor environments that complement architectural design and natural surroundings.',
    color: 'from-gray-800 to-slate-900',
  },
  {
    icon: Ruler,
    title: 'Structural Consulting',
    description: 'Advanced structural engineering expertise ensuring durability, safety, and design precision.',
    color: 'from-stone-800 to-gray-900',
  },
  {
    icon: Hammer,
    title: 'Project Execution',
    description: 'End-to-end project management ensuring quality delivery within timeline and budget.',
    color: 'from-amber-900 to-slate-900',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      onEnter: () => {
        gsap.fromTo(
          '.service-card',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
          }
        );
      },
    });
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-white py-24 px-4 md:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl  text-black md:text-6xl">
            Our Services
          </h2>
          <p className="text-lg text-black/60">
            Comprehensive architectural solutions for your vision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card group relative h-[400px] overflow-hidden rounded-2xl shadow-2xl"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="text-white/5 w-64 h-64" strokeWidth={0.5} />
                  </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/40" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <div className="text-white">
                    <Icon className="w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                    <h3 className="mb-3 text-2xl font-bold md:text-3xl">
                      {service.title}
                    </h3>
                    <p className="text-lg text-white/90 md:text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutImage from '@/assets/IMG_20260404_211742_981.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [experience, setExperience] = useState(0);
  const [projects, setProjects] = useState(0);
  const [awards, setAwards] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animateCounter = (setter: (value: number) => void, target: number) => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => setter(Math.floor(obj.value)),
      });
    };

    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      onEnter: () => {
        animateCounter(setExperience, 23);
        animateCounter(setProjects, 3000);
        animateCounter(setAwards, 32);

        gsap.fromTo(
          '.about-text',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
          }
        );

        gsap.fromTo(
          '.about-image',
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
      id="about"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="about-image">
            <img
              src={aboutImage}
              alt="9 Architects Studio"
              className="w-full h-[600px] object-cover grayscale"
            />
          </div>

          <div>
            <h2 className="about-text mb-6 text-black">About 9 Architects</h2>
            <p className="about-text text-lg md:text-xl text-black/70 mb-6 font-light leading-relaxed">
              9 Architects, Kollam is an architecture, construction, and interior design studio based in Kollam, known for delivering integrated design and build solutions across residential, commercial, hospitality, and renovation projects. Established in 2003, the firm was founded with the vision of providing quality architectural and construction services across different budget ranges while maintaining strong design values and execution quality.
            </p>
            <p className="about-text text-lg md:text-xl text-black/70 mb-8 font-light leading-relaxed">
              The studio follows a collaborative and client-focused approach, where architecture is treated not only as building design but as a complete process involving planning, creativity, functionality, and execution. Their workflow emphasizes detailed brainstorming, proactive problem-solving, and close coordination with clients throughout every stage of the project to ensure smooth project delivery.
            </p>

            {/* <h3 className="about-text mb-4 text-black text-xl font-medium">Core Services</h3>
            <ul className="about-text text-lg md:text-xl text-black/70 mb-12 font-light leading-relaxed space-y-2">
              <li>• Architectural Design – Residential villas, commercial buildings, hospitality projects, apartments, and institutional spaces</li>
              <li>• Construction & Turnkey Execution – End-to-end project delivery integrating modern construction techniques with traditional building practices</li>
              <li>• Interior Design – Functional and customized interiors with emphasis on space optimization, material quality, and finish</li>
              <li>• Landscape Design – Outdoor environment planning to complement architectural character</li>
              <li>• Renovation & Remodeling – Modernization and transformation of existing buildings and spaces</li>
            </ul> */}

            <div className="grid grid-cols-3 gap-8">
              <div className="about-text text-center">
                <div className="text-5xl md:text-6xl font-light text-black mb-2">
                  {experience}+
                </div>
                <div className="text-sm tracking-wider text-black/60 uppercase">
                  Years Experience
                </div>
              </div>

              <div className="about-text text-center">
                <div className="text-5xl md:text-6xl font-light text-black mb-2">
                  {projects}+
                </div>
                <div className="text-sm tracking-wider text-black/60 uppercase">
                  Projects Completed
                </div>
              </div>

              <div className="about-text text-center">
                <div className="text-5xl md:text-6xl font-light text-black mb-2">
                  {awards}+
                </div>
                <div className="text-sm tracking-wider text-black/60 uppercase">
                  Awards Won
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Masonry from './Masonry';

gsap.registerPlugin(ScrollTrigger);

// Gallery images - Mixed from all project categories
const masonryItems = [
  // Interior Design
  { id: "1", img: "/projects/interior/int-3.jpg", url: "#", height: 850, title: "Interior Design", description: "Elegant spaces" },
  { id: "2", img: "/projects/interior/reception.jpg", url: "#", height: 700, title: "ANAMTHARA Reception", description: "Grand entrance" },
  { id: "3", img: "/projects/interior/banquet-hall-max-180.jpg", url: "#", height: 800, title: "Banquet Hall", description: "Event space" },
  { id: "4", img: "/projects/interior/restaurant.jpg", url: "#", height: 650, title: "Restaurant Interior", description: "Fine dining" },

  // Residential
  { id: "5", img: "/projects/residential/res-1.jpg", url: "#", height: 900, title: "Harisree Residency", description: "Premium living" },
  { id: "6", img: "/projects/residential/ChatGPT%20Image%20Feb%2016,%202026,%2010_59_03%20AM.png", url: "#", height: 700, title: "Rani Gate", description: "Luxury apartments" },
  { id: "7", img: "/projects/residential/ChatGPT%20Image%20Feb%2016,%202026,%2009_41_01%20AM.png", url: "#", height: 800, title: "Holiday Vista", description: "Scenic views" },
  { id: "8", img: "/projects/residential/getlstd-property-photo%20%282%29.jpg", url: "#", height: 750, title: "Silver Sand", description: "Coastal property" },

  // Commercial
  { id: "9", img: "/projects/commercial/AZAD-SIR.jpg", url: "#", height: 700, title: "AL BAYT KOOTTIKAL", description: "Commercial complex" },
  { id: "10", img: "/projects/commercial/com-9.png", url: "#", height: 900, title: "Commercial Tower", description: "Modern workspace" },
  { id: "11", img: "/projects/commercial/com-10.png", url: "#", height: 650, title: "Office Interior", description: "Professional space" },
  { id: "12", img: "/projects/commercial/19.jpg", url: "#", height: 800, title: "KC Center", description: "Business hub" },

  // Hospitality
  { id: "13", img: "/projects/hospitality/ANAMTHARA/reception.jpg", url: "#", height: 900, title: "ANAMTHARA", description: "Elegant reception" },
  { id: "14", img: "/projects/hospitality/SAVITRI%20HOTEL/LOBY.jpg", url: "#", height: 700, title: "SAVITRI Hotel", description: "Grand lobby" },
  { id: "15", img: "/projects/hospitality/MARAMON%20RESORT/ChatGPT%20Image%20Feb%2016,%202026,%2011_41_14%20AM.png", url: "#", height: 600, title: "MARAMON Resort", description: "Riverside retreat" },
  { id: "16", img: "/projects/hospitality/SAVITRI%20HOTEL/NIGHT.jpg", url: "#", height: 850, title: "Night View", description: "Evening ambiance" },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate videos
    gsap.fromTo(
      '.video-embed',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.video-section',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-padding bg-gray-50"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-center mb-16 text-black">Our Work</h2>

        {/* --- YouTube Videos Section --- */}
        <div className="video-section mb-24 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* --- TODO: Replace with your YouTube video URLs --- */}
            <div className="video-embed aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/0L5X0AqFVx8?autoplay=1&mute=1"
                title="YouTube video player 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
            <div className="video-embed aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/7lFuZ76c8zw?autoplay=1&mute=1"
                title="YouTube video player 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>

        {/* --- Photo Gallery Section --- */}
        <div className="photo-gallery">
          <h3 className="text-center text-3xl mb-12 text-black/80">
            Photo Showcase
          </h3>
          <Masonry
            items={masonryItems}
            ease="power3.out"
            duration={0.8}
            stagger={0.06}
            animateFrom="bottom"
            scaleOnHover={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
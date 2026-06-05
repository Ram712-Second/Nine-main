import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

// A more thematic "blueprint" style loader animation.
const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const nineTextRef = useRef<SVGTextElement>(null);
  const architectsTextRef = useRef<SVGTextElement>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep the ref updated with the latest onComplete without re-triggering the effect
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => onCompleteRef.current(),
          });
        }, 800);
      },
    });

    const nineText = nineTextRef.current;
    const architectsText = architectsTextRef.current;

    if (nineText && architectsText) {
      // Animate the "9" with slow rubber band effect
      timeline
        .fromTo(nineText,
          { opacity: 0, scale: 0.3, y: -80 },
          {
            opacity: 1,
            scale: 1.2,
            y: 0,
            duration: 2.5,
            ease: 'elastic.out(1, 0.3)',
          }
        )
        // Add a subtle rubber band stretch effect
        .to(nineText, {
          scale: 0.95,
          duration: 0.4,
          ease: 'power2.inOut'
        })
        .to(nineText, {
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1.2, 0.4)'
        })
        // Animate the "Architects" text
        .fromTo(architectsText,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
          }, "-=1.2"); // Start architects text during the rubber band effect
    }

    return () => {
      timeline.kill();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
<svg
        width="300"
        height="200"
        viewBox="0 0 300 200"
        className="w-60 md:w-80"
      >
        {/* Bold "9" in blue */}
        <text
          ref={nineTextRef}
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="120"
          fontWeight="bold"
          fontFamily="sans-serif"
          fill="#0EA5E9"
        >
          9
        </text>
        {/* "architects" text in lowercase and smaller */}
        <text 
          ref={architectsTextRef} 
          x="50%" 
          y="85%" 
          textAnchor="middle" 
          fontSize="20" 
          fontWeight="medium"
          fontFamily="sans-serif" 
          letterSpacing="0.15em"
          fill="currentColor"
        >
          Architects
        </text>
      </svg>
    </div>
  );
};

export default Loader;

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => (typeof window !== 'undefined' ? values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue : defaultValue);

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    if (typeof window !== 'undefined') {
      queries.forEach(q => matchMedia(q).addEventListener('change', handler));
      return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
    }
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  description?: string;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  onImageClick?: (index: number) => void;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  blurToFocus = true,
  colorShiftOnHover = false,
  onImageClick
}) => {

  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const getRandomDescription = (id: string) => {
    const descriptions = [
      { title: 'Mountain Vista', description: 'Majestic peaks touching the clouds in golden light' },
      { title: 'Ocean Dreams', description: 'Crystal clear waters meeting pristine sandy shores' },
      { title: 'Forest Whispers', description: 'Ancient trees creating a magical green canopy' },
      { title: 'Desert Sunset', description: 'Golden dunes painted with warm evening colors' },
      { title: 'Urban Nights', description: 'City lights dancing in the evening atmosphere' },
      { title: 'Tropical Paradise', description: 'Palm trees swaying over turquoise lagoons' },
      { title: 'Winter Wonderland', description: 'Snow-covered landscape sparkling under moonlight' },
      { title: 'Autumn Colors', description: 'Vibrant fall foliage creating nature\'s masterpiece' },
      { title: 'Coastal Serenity', description: 'Peaceful waves caressing the rocky shoreline' },
      { title: 'Valley of Dreams', description: 'Morning mist rolling through peaceful meadows' },
      { title: 'Starry Night', description: 'Countless stars illuminating the dark canvas above' },
      { title: 'Spring Blossoms', description: 'Delicate flowers awakening after winter sleep' },
      { title: 'Canyon Majesty', description: 'Ancient rock formations carved by time itself' },
      { title: 'Lake Reflections', description: 'Mirror-like waters reflecting the surrounding beauty' },
      { title: 'Jungle Adventure', description: 'Lush greenery hiding countless natural wonders' }
    ];
    
    const index = parseInt(id) % descriptions.length;
    return descriptions[index];
  };

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  // Load images progressively - each image loads independently
  useEffect(() => {
    items.forEach(item => {
      const img = new Image();
      img.src = item.img;
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(item.id));
      };
      // Handle error case too - still show placeholder
      img.onerror = () => {
        setLoadedImages(prev => new Set(prev).add(item.id));
      };
    });
  }, [items]);

  const { grid, containerHeight } = useMemo(() => {
    if (!width) return { grid: [], containerHeight: 0 };
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    const gridItems = items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = (child.height / 2) * (columnWidth / (child.height * 0.75));
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });

    return { grid: gridItems, containerHeight: Math.max(...colHeights) };
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!width) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(selector, {
          opacity: 0,
          x: start.x,
          y: start.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' })
        }, {
          opacity: 1,
          ...animProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: 0.8,
          ease: 'power3.out',
          delay: index * stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          }
        });
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, stagger, animateFrom, blurToFocus, duration, ease, width]);

  const handleMouseEnter = (id: string) => {
    const scale = window.innerWidth < 768 ? 1.08 : 1.15;

    gsap.to(`[data-key="${id}"]`, {
      scale: scale,
      zIndex: 100,
      duration: 0.4,
      ease: 'power2.out'
    });

    const textOverlay = document.querySelector(`[data-key="${id}"] .text-overlay`) as HTMLElement;
    if (textOverlay) {
      gsap.to(textOverlay, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = (id: string) => {
    gsap.to(`[data-key="${id}"]`, {
      scale: 1,
      zIndex: 1,
      duration: 0.4,
      ease: 'power2.out'
    });

    const textOverlay = document.querySelector(`[data-key="${id}"] .text-overlay`) as HTMLElement;
    if (textOverlay) {
      gsap.to(textOverlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: containerHeight }}>
      {grid.map((item, index) => {
        const randomDesc = getRandomDescription(item.id);
        const isLoaded = loadedImages.has(item.id);
        return (
          <div
            key={item.id}
            data-key={item.id}
            className={`absolute box-content ${onImageClick ? 'cursor-pointer' : ''}`}
            style={{ willChange: 'transform, width, height, opacity' }}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave(item.id)}
            onClick={() => {
              if (onImageClick) {
                // Reset scale before opening lightbox
                gsap.set(`[data-key="${item.id}"]`, { scale: 1, zIndex: 1 });
                onImageClick(index);
              }
            }}
          >
            <div className="relative w-full h-full rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] overflow-hidden">
              {/* Skeleton loader - shown while image is loading */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-[10px] overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent animate-shimmer" />
                  {/* Pulse animation */}
                  <div className="absolute inset-0 animate-pulse bg-gray-300/20" />
                  {/* Loading indicator */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-gray-400/30 border-t-gray-500 rounded-full animate-spin" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Loading...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actual image - shown when loaded */}
              <div
                className={`relative w-full h-full bg-cover bg-center rounded-[10px] transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundImage: `url(${item.img})` }}
              >
                {colorShiftOnHover && (
                  <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
                )}

                <div className="text-overlay absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 pointer-events-none">
                  <h3 className="font-bold text-sm md:text-lg text-white mb-0.5 line-clamp-1">
                    {item.title || randomDesc.title}
                  </h3>
                  {/* <p className="text-xs md:text-sm text-gray-200 line-clamp-2">
                    {item.description || randomDesc.description}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;
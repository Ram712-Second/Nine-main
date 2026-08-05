import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import Masonry from '@/components/Masonry';
import NotFound from './NotFound';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryData {
  title: string;
  subtitle: string;
  description: string;
  images: { id: string; img: string; url: string; height: number; title: string; description: string }[];
}

const categoryData: Record<string, CategoryData> = {
  auditoriums: {
    title: 'Auditoriums',
    subtitle: 'Event Spaces',
    description: 'State-of-the-art venues designed for exceptional acoustic experiences.',
    images: [
      { id: 'aud-1', img: '/projects/Auditoriums/MANSOOR-AUDITORIUM/mansoor-auditorium.png', url: '#', height: 400, title: 'MANSOOR AUDITORIUM', description: 'Modern venue for exceptional events' },
    ],
  },
  commercial: {
    title: 'Commercial',
    subtitle: 'Business Spaces',
    description: 'Modern offices, malls, retail spaces, and commercial complexes.',
    images: [
      { id: 'com-1', img: '/projects/commercial/WISMA-MALL/wisma-mall-1.jpg', url: '#', height: 400, title: 'WISMA MALL', description: 'Prime shopping destination in Punalur' },
      { id: 'com-2', img: '/projects/commercial/WISMA-MALL/wisma-mall-2.jpg', url: '#', height: 400, title: 'WISMA MALL 2', description: 'Interior view' },
      { id: 'com-3', img: '/projects/commercial/WISMA-MALL/wisma-mall-3.jpg', url: '#', height: 400, title: 'WISMA MALL 3', description: 'Shopping area' },
      { id: 'com-4', img: '/projects/commercial/WISMA-MALL/wisma-mall-4.jpg', url: '#', height: 400, title: 'WISMA MALL 4', description: 'Mall facade' },
      { id: 'com-5', img: '/projects/commercial/WISMA-MALL/wisma-mall-5.jpg', url: '#', height: 400, title: 'WISMA MALL 5', description: 'Atrium view' },
      { id: 'com-6', img: '/projects/commercial/WISMA-MALL/wisma-mall-6.jpg', url: '#', height: 400, title: 'WISMA MALL 6', description: 'Exterior night' },
      { id: 'com-7', img: '/projects/commercial/WISMA-MALL/wisma-mall-7.jpg', url: '#', height: 400, title: 'WISMA MALL 7', description: 'Front entrance' },
      { id: 'com-8', img: '/projects/commercial/KC-CENTER/kc-center.jpg', url: '#', height: 400, title: 'KC CENTER', description: 'Modern commercial complex' },
      { id: 'com-9', img: '/projects/commercial/KC-CENTER/kc-center-2.jpg', url: '#', height: 400, title: 'KC CENTER 2', description: 'Side view' },
      { id: 'com-10', img: '/projects/commercial/NAZAR-JEWELLERY/nazar-jewellery.png', url: '#', height: 400, title: 'NAZAR ARABIAN JEWELLERY', description: 'Luxury retail showroom' },
      { id: 'com-11', img: '/projects/commercial/KC-BRIGHT/kc-bright.jpg', url: '#', height: 400, title: 'KC BRIGHT', description: 'Contemporary commercial space' },
      { id: 'com-12', img: '/projects/commercial/KC-SHELL/kc-shell.jpg', url: '#', height: 400, title: 'KC SHELL TRIVANDRUM', description: 'Modern fuel station design' },
      { id: 'com-13', img: '/projects/commercial/SABU-ARCADE/sabu-arcade.png', url: '#', height: 400, title: 'SABU ARCADE', description: 'Commercial arcade design' },
      { id: 'com-14', img: '/projects/commercial/NIZAM-TOWER/nizar-tower.png', url: '#', height: 400, title: 'NIZAM TOWER', description: 'Multi-story commercial tower' },
      { id: 'com-15', img: '/projects/commercial/SAFEER-MALL/safeer-mall.png', url: '#', height: 400, title: 'SAFEER MALL', description: 'Shopping mall complex' },
      { id: 'com-16', img: '/projects/commercial/COSMO/cosmo.png', url: '#', height: 400, title: 'COSMO', description: 'Modern commercial space' },
      { id: 'com-17', img: '/projects/commercial/HYUNDAI-SHOWROOM/hyundai-showroom.png', url: '#', height: 400, title: 'HYUNDAI SHOWROOM', description: 'Automotive showroom design' },
      { id: 'com-18', img: '/projects/commercial/I-MALL-RESTAURANT/i-mall-restaurant.png', url: '#', height: 400, title: 'I MALL RESTAURANT', description: 'Mall restaurant design' },
      { id: 'com-19', img: '/projects/commercial/DEV-RESIDENCY/dev-residency.png', url: '#', height: 400, title: 'DEV RESIDENCY', description: 'Commercial residency project' },
      { id: 'com-20', img: '/projects/commercial/ANAS-UNIVERSAL/anas-universal.png', url: '#', height: 400, title: 'ANAS UNIVERSAL', description: 'Universal commercial space' },
      { id: 'com-21', img: '/projects/commercial/KCHELL/kchell.png', url: '#', height: 400, title: 'KCHELL', description: 'Commercial complex' },
      { id: 'com-22', img: '/projects/commercial/NANMA-PROJECT/nanma-project.png', url: '#', height: 400, title: 'NANMA PROJECT', description: 'Commercial project' },
      { id: 'com-23', img: '/projects/commercial/AL-BAYT/al-bayt.jpg', url: '#', height: 400, title: 'AL BAYT KOOTTIKAL', description: 'Commercial building' },
    ],
  },
  hotels: {
    title: 'Hotels',
    subtitle: 'Hospitality',
    description: 'Premium hotels featuring elegant rooms and dining facilities.',
    images: [
      { id: 'hot-1', img: '/projects/Hotels/SAVITRI-HOTEL/lobby.jpg', url: '#', height: 400, title: 'SAVITRI HOTEL LOBBY', description: 'Elegant lobby and reception' },
      { id: 'hot-2', img: '/projects/Hotels/SAVITRI-HOTEL/night.jpg', url: '#', height: 400, title: 'SAVITRI NIGHT VIEW', description: 'Evening ambiance' },
      { id: 'hot-3', img: '/projects/Hotels/SAVITRI-HOTEL/room.jpg', url: '#', height: 400, title: 'SAVITRI ROOM', description: 'Comfortable accommodation' },
      { id: 'hot-4', img: '/projects/Hotels/SAVITRI-HOTEL/room-2.jpg', url: '#', height: 400, title: 'SAVITRI ROOM 2', description: 'Guest room' },
      { id: 'hot-5', img: '/projects/Hotels/SAVITRI-HOTEL/room-3.jpg', url: '#', height: 400, title: 'SAVITRI ROOM 3', description: 'Deluxe room' },
      { id: 'hot-6', img: '/projects/Hotels/SAVITRI-HOTEL/room-4.jpg', url: '#', height: 400, title: 'SAVITRI ROOM 4', description: 'Suite room' },
      { id: 'hot-7', img: '/projects/Hotels/SAVITRI-HOTEL/restaurant.jpg', url: '#', height: 400, title: 'SAVITRI RESTAURANT', description: 'Dining area' },
      { id: 'hot-8', img: '/projects/Hotels/SAVITRI-HOTEL/restaurant-2.jpg', url: '#', height: 400, title: 'SAVITRI RESTAURANT 2', description: 'Fine dining' },
      { id: 'hot-9', img: '/projects/Hotels/SAVITRI-HOTEL/outdoor.jpg', url: '#', height: 400, title: 'SAVITRI OUTDOOR', description: 'Outdoor area' },
      { id: 'hot-10', img: '/projects/Hotels/SAVITRI-HOTEL/outdoor-2.jpg', url: '#', height: 400, title: 'SAVITRI OUTDOOR 2', description: 'Garden view' },
      { id: 'hot-11', img: '/projects/Hotels/ANAMTHARA/reception.jpg', url: '#', height: 400, title: 'ANAMTHARA RECEPTION', description: 'Luxury hotel reception' },
      { id: 'hot-12', img: '/projects/Hotels/ANAMTHARA/banquet-hall-2.jpg', url: '#', height: 400, title: 'ANAMTHARA BANQUET', description: 'Grand banquet hall' },
      { id: 'hot-13', img: '/projects/Hotels/ANAMTHARA/deluxe-double-room.jpg', url: '#', height: 400, title: 'ANAMTHARA ROOMS', description: 'Deluxe accommodation' },
      { id: 'hot-14', img: '/projects/Hotels/HOLIDAY-VISTA/holiday-vista.png', url: '#', height: 400, title: 'HOLIDAY VISTA', description: 'Holiday destination' },
      { id: 'hot-15', img: '/projects/Hotels/HIGHWAY-PARK/highway-park.png', url: '#', height: 400, title: 'HIGHWAY PARK', description: 'Highway hotel' },
      { id: 'hot-16', img: '/projects/Hotels/CLASSIC-REGENCY/classic-regency.png', url: '#', height: 400, title: 'CLASSIC REGENCY', description: 'Classic luxury hotel' },
      { id: 'hot-17', img: '/projects/Hotels/RANI-GATE/rani-gate.png', url: '#', height: 400, title: 'RANI GATE', description: 'Premium hospitality' },
    ],
  },
  resorts: {
    title: 'Resorts',
    subtitle: 'Retreats',
    description: 'Serene retreats blending nature with architectural excellence.',
    images: [
      { id: 'res-1', img: '/projects/Resorts/MARAMON-RESORT/maramon-resort.png', url: '#', height: 400, title: 'MARAMON RESORT', description: 'Riverside retreat' },
      { id: 'res-2', img: '/projects/Resorts/PERINGALAM-RESORT/peringalam-resort.png', url: '#', height: 400, title: 'PERINGALAM RESORT', description: 'Nature retreat experience' },
    ],
  },
  sports: {
    title: 'Sports Facilities',
    subtitle: 'Sports Complex',
    description: 'Modern sports complexes with world-class facilities.',
    images: [
      { id: 'spo-1', img: '/projects/Sports-Facilities/IZIYAN-SPORTS-CITY/iziyan-sports.png', url: '#', height: 400, title: 'IZIYAN SPORTS CITY', description: 'State-of-the-art sports complex' },
    ],
  },
  hospital: {
    title: 'Hospital',
    subtitle: 'Healthcare',
    description: 'Advanced healthcare facilities designed for patient comfort.',
    images: [
      { id: 'hos-1', img: '/projects/Hospital/SANJIVANI-HOSPITAL/sanjivani-hospital.png', url: '#', height: 400, title: 'SANJIVANI HOSPITAL', description: 'Modern healthcare facility' },
    ],
  },
  residential: {
    title: 'Residential',
    subtitle: 'Living Spaces',
    description: 'Modern homes and apartments designed for comfortable living.',
    images: [
      { id: 'res-1', img: '/projects/residential/ANAS-FLAT/anas-flat.png', url: '#', height: 400, title: 'ANAS FLAT', description: 'Modern residential living' },
    ],
  },
  religious: {
    title: 'Religious Projects',
    subtitle: 'Sacred Spaces',
    description: 'Places of worship designed for spiritual reflection and community gathering.',
    images: [
      { id: 'rel-1', img: '/projects/Religious-projects/Ithikara-Mosque/ithikara-mosque-1.png', url: '#', height: 400, title: 'ITHIKARA MOSQUE', description: 'Modern mosque architecture' },
      { id: 'rel-2', img: '/projects/Religious-projects/Ithikara-Mosque/ithikara-mosque-2.png', url: '#', height: 400, title: 'ITHIKARA MOSQUE - VIEW 2', description: 'Mosque interior view' },
      { id: 'rel-3', img: '/projects/Religious-projects/Ithikara-Mosque/ithikara-mosque-3.png', url: '#', height: 400, title: 'ITHIKARA MOSQUE - VIEW 3', description: 'Mosque exterior detail' },
      { id: 'rel-4', img: '/projects/Religious-projects/Chapel-Peringalam/chapel-peringalam-1.png', url: '#', height: 400, title: 'CHAPEL PERINGALAM', description: 'Chapel design' },
      { id: 'rel-5', img: '/projects/Religious-projects/Thazhava-Mosque/thazhava-mosque-1.png', url: '#', height: 400, title: 'THAZHAVA MOSQUE', description: 'Community mosque' },
    ],
  },
};

const ProjectCategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const category = slug ? categoryData[slug] : undefined;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    setImageLoaded(false);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const goToPrevious = useCallback(() => {
    if (!category) return;
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev === 0 ? category.images.length - 1 : prev - 1));
  }, [category]);

  const goToNext = useCallback(() => {
    if (!category) return;
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev === category.images.length - 1 ? 0 : prev + 1));
  }, [category]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  if (!category) {
    return <NotFound />;
  }

  const currentImage = category.images[currentIndex];

  return (
    <Layout theme="light">
      <section className="bg-background pt-32 pb-24 px-4 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => navigate('/', { state: { scrollTo: `project-${slug}` } })}
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <div className="mb-3 text-sm font-light uppercase tracking-widest text-muted-foreground">
              {category.subtitle}
            </div>
            <h1 className="mb-4 text-5xl font-bold text-foreground md:text-6xl">
              {category.title}
            </h1>
            {/* <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {category.description}
            </p> */}
          </motion.div>

          {/* Masonry Gallery */}
          <Masonry
            items={category.images}
            animateFrom="bottom"
            stagger={0.04}
            blurToFocus={true}
            onImageClick={openLightbox}
          />
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95"
            onClick={closeLightbox}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Loading spinner */}
              {!imageLoaded && (
                <div className="flex items-center justify-center w-[80vw] h-[60vh] md:w-[60vw] md:h-[70vh]">
                  <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}

              <img
                src={currentImage.img}
                alt={currentImage.title}
                className={`max-w-full max-h-[85vh] object-contain rounded-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
                onLoad={() => setImageLoaded(true)}
              />

              {/* Image info - only show when image is loaded */}
              {imageLoaded && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                  <h3 className="text-white text-xl font-semibold">{currentImage.title}</h3>
                  {/* <p className="text-white/70 text-sm">{currentImage.description}</p> */}
                  <p className="text-white/50 text-xs mt-2">{currentIndex + 1} / {category.images.length}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ProjectCategoryPage;

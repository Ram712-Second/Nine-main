import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: "Auditoriums",
    subtitle: "Event Spaces",
    description: "State-of-the-art venues designed for exceptional acoustic experiences",
    color: "from-purple-900 to-slate-800",
    slug: "auditoriums",
    image: "/projects/Auditoriums/MANSOOR-AUDITORIUM/mansoor-auditorium.png",
  },
  {
    id: 2,
    title: "Commercial",
    subtitle: "Business Spaces",
    description: "Modern offices, malls, retail spaces, and commercial complexes",
    color: "from-blue-900 to-slate-800",
    slug: "commercial",
    image: "/projects/commercial/KC-BRIGHT/kc-bright-view.jpg",
  },
  {
    id: 3,
    title: "Hotels",
    subtitle: "Hospitality",
    description: "Premium hotels featuring elegant rooms and dining facilities",
    color: "from-amber-900 to-stone-900",
    slug: "hotels",
    image: "/projects/Hotels/SAVITRI-HOTEL/lobby.jpg",
  },
  {
    id: 4,
    title: "Resorts",
    subtitle: "Retreats",
    description: "Serene retreats blending nature with architectural excellence",
    color: "from-green-900 to-slate-800",
    slug: "resorts",
    image: "/projects/Resorts/MARAMON-RESORT/maramon-resort.png",
  },
  {
    id: 5,
    title: "Sports Facilities",
    subtitle: "Sports Complex",
    description: "Modern sports complexes with world-class facilities",
    color: "from-orange-900 to-slate-800",
    slug: "sports",
    image: "/projects/Sports-Facilities/IZIYAN-SPORTS-CITY/iziyan-sports.png",
  },
  {
    id: 6,
    title: "Hospital",
    subtitle: "Healthcare",
    description: "Advanced healthcare facilities designed for patient comfort",
    color: "from-teal-900 to-slate-800",
    slug: "hospital",
    image: "/projects/Hospital/SANJIVANI-HOSPITAL/sanjivani-hospital.png",
  },
  {
    id: 7,
    title: "Residential",
    subtitle: "Living Spaces",
    description: "Modern homes and apartments designed for comfortable living",
    color: "from-slate-800 to-slate-900",
    slug: "residential",
    image: "/projects/residential/ANAS-FLAT/anas-flat.png",
  },
  {
    id: 8,
    title: "Religious Projects",
    subtitle: "Sacred Spaces",
    description: "Places of worship designed for spiritual reflection and community gathering",
    color: "from-rose-900 to-slate-800",
    slug: "religious",
    image: "/projects/Religious-projects/Ithikara-Mosque/ithikara-mosque-1.png",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <motion.div
      ref={ref}
      id={`project-${project.slug}`}
      style={{ opacity, scale, y }}
      className="sticky top-20 mb-20 h-[70vh] w-full"
    >
      <div className="group relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
        {/* Background image */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent`} />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/5 transition-all duration-500 group-hover:bg-black/20" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white"
          >
            <div className="mb-2 text-sm font-light uppercase tracking-widest text-white/70">
              {project.subtitle}
            </div>
            <h3 className="mb-3 text-4xl font-bold md:text-5xl lg:text-6xl">
              {project.title}
            </h3>
            <p className="mb-6 text-lg text-white/90 md:text-xl">
              {project.description}
            </p>
            <Link
              to={`/projects/${project.slug}`}
              className="group/btn inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-medium backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50"
            >
              <span>View Project</span>
              <svg
                className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative bg-background py-24 px-4 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-foreground md:text-6xl">
            Our Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our portfolio of architectural excellence
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

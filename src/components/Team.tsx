import { motion } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
const teamMembers = [
  {
    id: 1,
    name: 'Rakesh Raj',
    role: 'Principal Architect & Managing Partner',
    image: '/web-images/team/rakesh_raj_m_arch_iiid_iia_aiia_principal_architect_managing_partner.jpg',
    credentials: 'M.Arch, IIID, IIA, AIIIA',
  },
  {
    id: 2,
    name: 'Azad Jamal',
    role: 'Principal Architect & Managing Partner',
    image: '/web-images/team/azad_jamal_m_arch_iiid_iia_aiia_principal_architect_managing_partner.png',
    credentials: 'M.Arch, IIID, IIA, AIIIA',
  },
  {
    id: 3,
    name: 'Athira',
    role: 'Senior Engineer',
    image: '/web-images/team/athira_senior_engineer.jpg',
  },
  {
    id: 4,
    name: 'Shifa P',
    role: 'Senior Engineer',
    image: '/web-images/team/shifa_p_senior_engineer.jpg',
  },
  {
    id: 5,
    name: 'Sebin',
    role: 'Junior Architect',
    image: '/web-images/team/sebin_junior_architect.jpg',
  },
  {
    id: 6,
    name: 'Jobin',
    role: 'Senior Engineer',
    image: '/web-images/team/jobin_junior_arhitect.jpg',
  },
];

const Team = () => {
  return (
    <section id="team" className="relative bg-white py-24 px-4 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-black md:text-6xl">
            Our Team
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-black/70">
            Meet the talented people behind our award-winning designs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[
              Autoplay({ delay: 3000, stopOnInteraction: false }),
            ]}
            className="mx-auto w-full max-w-6xl"
          >
            <CarouselContent className="-ml-4">
              {teamMembers.map((member) => (
                <CarouselItem
                  key={member.id}
                  className="pl-4 basis-[60%] sm:basis-[40%] lg:basis-1/4"
                >
                  <div className="group relative overflow-hidden rounded-xl">
                    <div className="aspect-[3/4] h-[400px] overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white md:text-2xl">
                        {member.name}
                        {member.credentials && (
                          <span className="block text-xs font-normal text-white/75 mt-0.5">
                            {member.credentials}
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 text-sm font-light tracking-wide text-white/80">
                        {member.role}
                      </p>

                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12 h-10 w-10 border-foreground/20 bg-background/80 backdrop-blur-sm hover:bg-background" />
            <CarouselNext className="-right-4 md:-right-12 h-10 w-10 border-foreground/20 bg-background/80 backdrop-blur-sm hover:bg-background" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;

import { motion } from 'framer-motion';

const clients = [
  { name: "Hyundai", logo: "/web-images/brands/hyundai.PNG" },
  { name: "Reliance", logo: "/web-images/brands/reliance.png" },
  { name: "Smart Fitness Group", logo: "/web-images/brands/smart-fitness-group.PNG" },
  { name: "Wisma", logo: "/web-images/brands/wisma.PNG" },
];

const ClientLogos = () => {
  // Repeat clients 4 times to ensure seamless loop without gaps on wide screens
  const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="relative bg-background py-20 overflow-hidden border-y border-border/50">
      <div className="mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-light text-foreground tracking-tight"
        >
          Trusted By Leading Brands
        </motion.h2>
      </div>

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling logos */}
        <motion.div
          className="flex gap-16"
          animate={{
            x: [0, "-25%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <div className="group relative w-60 h-32 flex items-center justify-center">
                {/* Premium Glassmorphic Card Container for Logo */}
                <div className="w-full h-full rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm flex items-center justify-center p-3 transition-all duration-500 group-hover:border-border/80 group-hover:bg-card group-hover:shadow-lg group-hover:shadow-foreground/5">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-[85%] max-h-[85%] object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;


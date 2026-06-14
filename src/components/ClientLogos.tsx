```jsx
import { motion } from 'framer-motion';

const clients = [
  { name: "Hyundai", logo: "/web-images/brands/hyundai.PNG" },
  { name: "Reliance", logo: "/web-images/brands/reliance.png" },
  { name: "Smart Fitness Group", logo: "/web-images/brands/smart-fitness-group.PNG" },
  { name: "Wisma", logo: "/web-images/brands/wisma.PNG" },
];

const ClientLogos = () => {
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden border-y border-border/50 bg-background py-20">
      <div className="mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-light tracking-tight text-foreground md:text-4xl"
        >
          Trusted By Leading Brands
        </motion.h2>
      </div>

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 z-10 w-20 md:w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 z-10 w-20 md:w-32 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling Logos */}
        <motion.div
          className="flex gap-8 md:gap-16"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 8,
              ease: 'linear',
            },
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex flex-shrink-0 items-center justify-center"
            >
              <div className="group relative flex h-24 w-40 items-center justify-center md:h-32 md:w-60">
                <div className="flex h-full w-full items-center justify-center rounded-xl border border-border/30 bg-card/30 p-3 backdrop-blur-sm transition-all duration-500 group-hover:border-border/80 group-hover:bg-card group-hover:shadow-lg group-hover:shadow-foreground/5">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-[85%] max-w-[85%] object-contain grayscale opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
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
```

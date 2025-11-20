import { motion } from 'framer-motion';
import { Squircle } from './squircle';

// Define the palette to maintain consistency
const palette = {
  bg: "#FFFFFF",
  card: "#E8F5E0",
  squircle: "#D9F0CC",
  accent: "#A8D88A",
  dark: "#1D1A05",
  shadow: "#142506",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

export function BrewingGuide() {
  return (
    <Squircle className="mx-auto max-w-7xl" innerClassName="space-y-6 sm:space-y-8" ariaLabel="brewing" id="brewing">
      <motion.h2
        className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
        style={{ color: palette.dark }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
      >
        Brewing Guide
      </motion.h2>
      <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: false }}>
        {[
          {
            title: "Water",
            text: "Fresh filtered water; 70–80°C for green, 85–95°C for oolong, 95–100°C for black teas.",
            icon: "💧",
          },
          {
            title: "Leaf Ratio",
            text: "2–3g per 250ml for western style; 5–7g for gongfu brewing with shorter steeps.",
            icon: "🍃",
          },
          {
            title: "Time",
            text: "2–3min for green, 3–4min for oolong, 4–5min for black; adjust in 30s increments.",
            icon: "⏱️",
          },
          {
            title: "Steeping",
            text: "Multiple short steeps bring out nuanced flavors; first steep 15-20s, subsequent steeps 5-10s longer.",
            icon: "🫖",
          },
        ].map((brew, i) => (
          <motion.div key={brew.title} variants={fadeInUp} className="group col-span-1" whileHover={{ y: -5 }}>
            <motion.div
              className="relative rounded-2xl p-5 sm:p-6 lg:p-8 h-full shadow-lg hover:shadow-2xl transition-all backdrop-blur-sm gradient-border-hover"
              style={{
                backgroundColor: `${palette.card}F0`,
                border: `1px solid ${palette.dark}08`,
              }}
            >
              <motion.div
                className="text-2xl sm:text-3xl mb-3 sm:mb-4"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {brew.icon}
              </motion.div>
              <h4 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3" style={{ color: palette.dark }}>
                {brew.title}
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed opacity-80" style={{ color: palette.dark }}>
                {brew.text}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </Squircle>
  );
}
import { motion } from "framer-motion";
import Image from "next/image";
import { useScroll, useSpring } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

// Define the palette to maintain consistency
const palette = {
  bg: "#FFFFFF",
  card: "#E8F5E0",
  squircle: "#D9F0CC",
  accent: "#A8D88A",
  dark: "#1D1A05",
  shadow: "#142506",
};

export function Hero({ openCollection }: { openCollection: () => void }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
  });

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-400 to-lime-400 origin-left z-60" style={{ scaleX }} />

      <div className="pt-20 sm:pt-24 lg:pt-28 space-y-12 sm:space-y-16 lg:space-y-20 px-4 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl py-4 sm:py-6 lg:py-8">
          <motion.div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center" variants={stagger} initial="initial" animate="animate">
                        <motion.div className="space-y-4 sm:space-y-6" variants={fadeInUp}>
                            <motion.p
                                className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-semibold opacity-60"
                                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                                animate={{ opacity: 0.6, letterSpacing: "0.3em" }}
                                transition={{ duration: 0.8 }}
                            >
                                Curated Leaf • Mindful Brewing
                            </motion.p>

                            <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight" style={{ color: palette.dark }}>
                                Nature's Finest
                                <motion.span
                                    className="relative inline-block mx-1 sm:mx-2 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-2xl"
                                    style={{ backgroundColor: palette.accent }}
                                    whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
                                    transition={{ duration: 0.5, type: "tween" }}
                                >
                                    চাপাত from Assam
                                </motion.span>
                            </motion.h1>

                            <motion.p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-lg" style={{ color: palette.dark }} variants={fadeInUp}>
                                Chaah Paat brings you Nature's Finest Leaf from Assam, paired with mindful brewing rituals for your daily moments of tranquility.
                            </motion.p>

                            <motion.div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4" variants={fadeInUp}>
                                <motion.a
                                    className="rounded-2xl px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transition-all gradient-border-hover"
                                    href="#collection"
                                    style={{
                                        backgroundColor: palette.accent,
                                        color: palette.dark,
                                    }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Explore Collection
                                </motion.a>
                                <motion.a
                                    className="rounded-2xl px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold backdrop-blur-sm hover:backdrop-blur-md transition-all gradient-border-hover"
                                    href="#brewing"
                                    style={{
                                        border: `2px solid ${palette.dark}20`,
                                        color: palette.dark,
                                    }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Brewing Guide
                                </motion.a>
                            </motion.div>
                        </motion.div>

                        <motion.div className="relative flex justify-center md:justify-end" variants={fadeInUp}>
                            <motion.div
                                className="relative h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-200 via-lime-200 to-yellow-100 opacity-30 blur-3xl" />
                            </motion.div>
                            <motion.a
                                href="#collection"
                                className="absolute h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                                style={{
                                    backgroundColor: palette.squircle,
                                }}
                                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    rotate: [0, -3, 3, 0],
                                }}
                                transition={{
                                    delay: 0.2,
                                    type: "spring",
                                    stiffness: 100,
                                    rotate: {
                                        duration: 20,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    },
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    rotate: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10,
                                    },
                                }}
                                whileTap={{
                                    scale: 0.95,
                                    transition: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 15,
                                    },
                                }}
                            >
                                <Image src="/chaah-paat.png" alt="চাপাত tea" fill className="object-contain p-1" />
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

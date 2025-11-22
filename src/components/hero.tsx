import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaLeaf, FaMugHot } from "react-icons/fa";

const palette = { bg: "#FCFDF5", card: "#EFF5E6", squircle: "#D6E8C6", accent: "#7FA850", dark: "#2A3820", shadow: "#1C2615" };

const fadeInUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

export function Hero({ openCollection }: { openCollection: () => void }) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
             {/* Background elements */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30" style={{ backgroundColor: palette.accent }} />
                 <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30" style={{ backgroundColor: palette.squircle }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-8 order-2 lg:order-1">
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: palette.dark + "20", backgroundColor: palette.bg + "80" }}>
                            <FaLeaf className="text-sm" style={{ color: palette.accent }} />
                            <span className="text-sm font-medium tracking-wide uppercase" style={{ color: palette.dark }}>Premium Assam Tea</span>
                        </motion.div>
                        
                        <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold leading-tight" style={{ color: palette.dark }}>
                            Sip the Essence of <span className="italic" style={{ color: palette.accent }}>Assam</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-lg lg:text-xl max-w-xl leading-relaxed opacity-80" style={{ color: palette.dark }}>
                            Experience the rich, robust flavors of authentic Assam tea. Directly from the gardens to your cup, crafted with passion and tradition.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <motion.button
                                onClick={openCollection}
                                className="px-8 py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center gap-2"
                                style={{ backgroundColor: palette.accent, color: palette.bg }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaLeaf /> Shop Collection
                            </motion.button>
                            <motion.a
                                href="#brewing-guide"
                                className="px-8 py-4 rounded-2xl font-bold text-lg border-2 flex items-center gap-2"
                                style={{ borderColor: palette.dark, color: palette.dark }}
                                whileHover={{ scale: 1.05, backgroundColor: palette.dark + "10" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaMugHot /> Brewing Guide
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    <motion.div style={{ y: y1, opacity }} className="relative order-1 lg:order-2 flex justify-center">
                         <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-[600px] lg:h-[600px]"
                         >
                            <Image src="/chaah-paat.png" alt="Chaah Paat Tea" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain drop-shadow-2xl" priority />
                         </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

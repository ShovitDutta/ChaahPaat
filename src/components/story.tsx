import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const palette = { bg: "#F2F8F0", card: "#E0EBD0", squircle: "#CDE0B4", accent: "#88B04B", dark: "#203015", shadow: "#152010" };

export function OurStory() {
    return (
        <section id="our-story" className="py-24 relative overflow-hidden rounded-[3rem] mx-4 my-8" style={{ backgroundColor: palette.card }}>
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `radial-gradient(${palette.dark} 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-8" style={{ color: palette.dark }}>
                        "Tea is not just a beverage. <br />
                        It's a moment of <span style={{ color: palette.accent }}>connection</span>."
                    </h2>
                    <p className="text-xl leading-relaxed opacity-70 mb-12" style={{ color: palette.dark }}>
                        We believe in the power of tea to bring people together. Whether it's a morning ritual, an afternoon pause, or an evening conversation, Chaah Paat is there to make every moment
                        special.
                    </p>
                    <motion.div className="inline-block" whileHover={{ x: 5 }}>
                        <a href="#about" className="inline-flex items-center gap-2 font-bold text-lg" style={{ color: palette.accent }}>
                            Read Our Full Story <FaArrowRight />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

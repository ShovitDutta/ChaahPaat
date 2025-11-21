import { Squircle } from "@/ui/squircle";
import { motion } from "framer-motion";
const palette = { bg: "#FFFFFF", card: "#E8F5E0", squircle: "#D9F0CC", accent: "#A8D88A", dark: "#1D1A05", shadow: "#142506" };
export function Story() {
    return (
        <Squircle className="mx-auto max-w-7xl" innerClassName="space-y-4 sm:space-y-5" ariaLabel="about" id="about">
            <motion.div className="text-center space-y-3 sm:space-y-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-linear-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">About Us</h2>
                <div className="max-w-4xl mx-auto">
                    <p className="text-sm sm:text-base leading-relaxed opacity-80" style={{ color: palette.dark }}>
                        At Chaah Paat, we bring you the finest teas from the heart of Assam—handpicked from legendary tea regions like Mangaldoi, Dibrugarh, Tinsukia, Jorhat, Golaghat, and beyond.
                        Each leaf is carefully selected for its bold aroma, rich flavour, and authentic heritage. Our mission is simple: to deliver premium Assam tea that carries the soul of the land,
                        the passion of our growers, and the purity of every sunrise over the tea gardens. Experience tea the way Assam intended—fresh, honest, and unforgettable.
                    </p>
                </div>
            </motion.div>
        </Squircle>
    );
}
export function OurStory() {
    return (
        <Squircle className="mx-auto max-w-7xl" innerClassName="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10" ariaLabel="story" id="story">
            <motion.div className="space-y-3 sm:space-y-4" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.8 }}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-linear-to-r from-teal-600 to-green-700 bg-clip-text text-transparent">Our Story</h2>
                <div className="space-y-3 sm:space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed opacity-80" style={{ color: palette.dark }}>
                        Our journey began not in an office, but in the early morning mist of Assam's tea gardens, where generations of growers have poured their hearts into every leaf. We grew up
                        watching the rhythm of the pluckers' hands, the warmth of the first brew at dawn, and the pride that comes from creating tea that travels the world.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed opacity-80" style={{ color: palette.dark }}>
                        What started as a small dream soon became a mission—to bring authentic Assam tea to every cup, without losing the traditions that shaped it. Today, we travel across Assam's
                        finest estates, from Mangaldoi's aromatic orthodox fields to Dibrugarh's bold CTC gardens, choosing only the leaves that tell a story.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed opacity-80" style={{ color: palette.dark }}>
                        This is not just our business— this is our heritage, our passion, and our promise: to deliver tea that feels like home, tastes like tradition, and inspires the modern tea
                        lover.
                    </p>
                </div>
                <motion.div className="pt-2 sm:pt-4" whileHover={{ x: 5 }}>
                    <a href="#about" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: palette.dark }}>
                        Learn More <span className="text-lg">→</span>
                    </a>
                </motion.div>
            </motion.div>
            <motion.div className="space-y-4 sm:space-y-6" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.8 }}>
                <motion.div
                    className="rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm"
                    style={{
                        backgroundColor: `${palette.card}F0`,
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider mb-4 sm:mb-6" style={{ color: palette.dark }}>
                        Why Chaah Paat
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                        {[
                            "Finest Leaves From Assam's Iconic Regions",
                            "Handpicked for Quality, Not Quantity",
                            "Authentic & Farm-Fresh",
                            "Tradition Meets Modern Craft",
                            "Ethically Sourced, Expertly Blended",
                            "Tea That Tells a Story",
                        ].map((item, i) => (
                            <motion.div
                                key={item}
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <motion.div
                                    className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full shrink-0"
                                    style={{ backgroundColor: palette.accent }}
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                />
                                <span className="text-xs sm:text-sm opacity-90" style={{ color: palette.dark }}>
                                    {item}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </Squircle>
    );
}

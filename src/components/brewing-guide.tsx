import { Squircle } from "./squircle";
import { motion } from "framer-motion";
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const palette = { bg: "#F2F8F0", card: "#E0EBD0", squircle: "#CDE0B4", accent: "#88B04B", dark: "#203015", shadow: "#152010" };

const steps = [
    {
        icon: "💧",
        title: "Fresh Water",
        desc: "Start with fresh, cold filtered water. Bring it to a rolling boil for black teas, or just short of boiling for green teas.",
    },
    {
        icon: "🥄",
        title: "Measure",
        desc: "Use one teaspoon (approx 2g) of tea leaves per cup (200ml). Adjust according to your taste preference.",
    },
    {
        icon: "⏱️",
        title: "Steep",
        desc: "Pour water over the leaves. Steep for 3-5 minutes for black tea, or 2-3 minutes for green tea. Don't over-steep!",
    },
    {
        icon: "😌",
        title: "Savor",
        desc: "Strain the leaves and let the tea cool slightly. Take a moment to inhale the aroma before your first sip.",
    },
];

export function BrewingGuide() {
    return (
        <section id="brewing-guide" className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-sm font-bold tracking-widest uppercase mb-2 block" style={{ color: palette.accent }}>
                        The Perfect Cup
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold" style={{ color: palette.dark }}>
                        Brewing Guide
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="relative group"
                        >
                            <div
                                className="h-full p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2"
                                style={{ backgroundColor: palette.card }}
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform"
                                    style={{ backgroundColor: palette.bg }}
                                >
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4" style={{ color: palette.dark }}>
                                    {step.title}
                                </h3>
                                <p className="leading-relaxed opacity-80" style={{ color: palette.dark }}>
                                    {step.desc}
                                </p>
                            </div>
                            
                            {/* Connector Line (Desktop only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 opacity-20" style={{ backgroundColor: palette.dark }} />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { Squircle } from "@/ui/squircle";
import { motion } from "framer-motion";
const palette = { bg: "#FFFFFF", card: "#E8F5E0", squircle: "#D9F0CC", accent: "#A8D88A", dark: "#1D1A05", shadow: "#142506" };
export function Footer() {
    return (
        <Squircle className="mx-auto max-w-7xl" innerClassName="py-2 sm:py-3" ariaLabel="footer">
            <motion.div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}>
                <motion.div className="text-xs sm:text-sm opacity-60" style={{ color: palette.dark }} whileHover={{ opacity: 1 }}>
                    © {new Date().getFullYear()} চাপাত — Mindful Tea Moments
                </motion.div>
                <div className="flex gap-2 sm:gap-3 lg:gap-4">
                    <motion.a
                        href="tel:+916900234165"
                        className="rounded-2xl px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium backdrop-blur-sm transition-all"
                        style={{
                            color: palette.dark,
                        }}
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: `${palette.accent}20`,
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact: +91 6900234165
                    </motion.a>
                    <motion.a
                        href="tel:+919883617119"
                        className="rounded-2xl px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium backdrop-blur-sm transition-all"
                        style={{
                            color: palette.dark,
                        }}
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: `${palette.accent}20`,
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        +91 9883617119
                    </motion.a>
                </div>
            </motion.div>
        </Squircle>
    );
}

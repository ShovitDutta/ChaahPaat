import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const palette = { bg: "#FFFFFF", card: "#E8F5E0", squircle: "#D9F0CC", accent: "#A8D88A", dark: "#1D1A05", shadow: "#142506" };
export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <motion.header className="fixed top-0 left-0 right-0 z-50 px-4 py-2 sm:py-3 lg:py-4" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }}>
            <div className="mx-auto max-w-7xl">
                <motion.div
                    className={`rounded-2xl backdrop-blur-2xl bg-white/10 p-2 sm:p-3 transition-all duration-500 ${isScrolled ? "shadow-2xl" : "shadow-lg"}`}
                    style={{
                        backgroundColor: isScrolled ? `${palette.squircle}F5` : `${palette.squircle}E5`,
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: `1px solid ${palette.dark}15`,
                    }}
                >
                    <nav className="flex items-center justify-between gap-2 sm:gap-4 px-2 sm:px-4">
                        <motion.div className="flex items-center gap-2 sm:gap-3" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                            <motion.div
                                className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-2xl overflow-hidden p-2 sm:p-3 shadow-inner"
                                style={{ backgroundColor: palette.accent }}
                                whileHover={{ rotate: [0, -5, 5, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                <Image src="/chaah-paat.png" alt="চাপাত logo" fill className="object-contain" />
                            </motion.div>
                            <div className="flex flex-col leading-tight">
                                <span className="font-bold text-base sm:text-lg lg:text-xl tracking-tight" style={{ color: palette.dark }}>
                                    চাপাত
                                </span>
                                <span className="text-[10px] sm:text-xs opacity-70 hidden sm:block" style={{ color: palette.dark }}>
                                    Nature's Finest Leaf
                                </span>
                            </div>
                        </motion.div>
                        <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium">
                            {["About", "Collection", "Story", "Brewing"].map((item, i) => (
                                <motion.a
                                    key={item}
                                    href={item === "About" ? "#about" : `#${item.toLowerCase()}`}
                                    className="relative hover:text-opacity-100 transition-all py-2 px-3 rounded-2xl gradient-border-hover"
                                    style={{ color: palette.dark }}
                                    whileHover={{ y: -2 }}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {item}
                                    <motion.span
                                        className="absolute -bottom-1 left-0 h-0.5 bg-current"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    />
                                </motion.a>
                            ))}
                        </div>
                        <motion.a
                            href="#collection"
                            className="rounded-2xl px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all gradient-border-hover"
                            style={{
                                backgroundColor: palette.accent,
                                color: palette.dark,
                                border: `1px solid ${palette.dark}15`,
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Shop Now
                        </motion.a>
                    </nav>
                </motion.div>
            </div>
        </motion.header>
    );
}

"use client";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const palette = {
    bg: "#FAFDF7",
    card: "#F0F7E8",
    squircle: "#E5F2D9",
    accent: "#C1E0A8",
    dark: "#2A4810",
    shadow: "#1A2F08",
};
const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function Squircle({ children, className = "", innerClassName = "", ariaLabel, id }: { children: React.ReactNode; className?: string; innerClassName?: string; ariaLabel?: string; id?: string }) {
    return (
        <section
            className={`relative w-full ${className}`}
            aria-label={ariaLabel}
            id={id}
            style={{
                backgroundColor: palette.squircle,
                borderRadius: "2.5rem",
                border: `1px solid ${palette.dark}15`,
            }}
        >
            <div className={`relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 ${innerClassName}`} style={{ minHeight: 120 }}>
                {children}
            </div>
        </section>
    );
}

const teas = [
    {
        name: "Mangaldoi Orthodox Special",
        note: "Traditional Assam tea with golden tips and malty sweetness.",
        tag: "Black",
        emoji: "☕",
        description:
            "Handpicked from Mangaldoi's aromatic orthodox fields. This premium whole-leaf tea delivers the authentic taste of Assam with its characteristic bright liquor and robust flavor. Each leaf tells a story of tradition passed down through generations.",
        origin: "Mangaldoi, Assam",
        elevation: "400-600m",
        harvest: "Second Flush 2024",
    },
    {
        name: "Dibrugarh Bold CTC",
        note: "Strong, full-bodied breakfast tea with rich color.",
        tag: "Black",
        emoji: "🫖",
        description:
            "From Dibrugarh's bold CTC gardens, this tea is perfect for those who love their morning cup strong. Deep amber color with a robust, malty character that stands up well to milk. The pride of Upper Assam's tea heritage.",
        origin: "Dibrugarh, Assam",
        elevation: "300-500m",
        harvest: "Summer 2024",
    },
    {
        name: "Tinsukia White Pearl",
        note: "Delicate, sweet, floral notes with a silky finish.",
        tag: "White",
        emoji: "🪷",
        description:
            "Rare silver needle white tea from Tinsukia with minimal processing to preserve its natural sweetness. Hand-picked buds create a pale golden liquor with subtle complexity that unfolds with each sip.",
        origin: "Tinsukia, Assam",
        elevation: "800-1000m",
        harvest: "Early Spring 2024",
    },
    {
        name: "Jorhat Green Harmony",
        note: "Floral, light-bodied — perfect for evening unwinding.",
        tag: "Green",
        emoji: "🌿",
        description:
            "A delicate green tea from Jorhat's premium gardens. Light and refreshing with natural floral notes, this tea undergoes careful processing to preserve its fresh character. The perfect companion for peaceful moments.",
        origin: "Jorhat, Assam",
        elevation: "500-800m",
        harvest: "Spring 2024",
    },
    {
        name: "Golaghat Mountain Oolong",
        note: "Complex roasted aroma with a sweet lingering finish.",
        tag: "Oolong",
        emoji: "🏔️",
        description:
            "Partially oxidized and carefully roasted in Golaghat's traditional style. Notes of dried fruit and honey emerge as the leaves unfold through multiple infusions. A masterpiece of tea craftsmanship.",
        origin: "Golaghat, Assam",
        elevation: "1000-1200m",
        harvest: "Summer 2024",
    },
    {
        name: "Autumn Gold Premium",
        note: "Smooth black tea with subtle stone fruit and cocoa.",
        tag: "Black",
        emoji: "🍂",
        description:
            "Premium black tea from Jorhat with wine-like characteristics and natural sweetness. Known for its smooth texture without astringency, with hints of cocoa and fruit. A testament to Assam's finest autumn harvest.",
        origin: "Jorhat, Assam",
        elevation: "600-900m",
        harvest: "Autumn 2024",
    },
    {
        name: "Upper Assam Breakfast",
        note: "Bold and malty with a hint of caramel.",
        tag: "Black",
        emoji: "⛰️",
        description:
            "Robust breakfast blend from Upper Assam's finest gardens. Full-bodied character with natural sweetness and strength that pairs perfectly with milk. Start your day the Assamese way.",
        origin: "Upper Assam",
        elevation: "1500-2000m",
        harvest: "Summer 2024",
    },
    {
        name: "Tieguanyin Special",
        note: "Floral oolong with a honeyed aftertaste.",
        tag: "Oolong",
        emoji: "🌸",
        description:
            "Traditional iron goddess oolong adapted to Golaghat's unique terroir. Multiple roasting creates layers of flavor that evolve through successive infusions. A bridge between tradition and innovation.",
        origin: "Golaghat, Assam",
        elevation: "800-1200m",
        harvest: "Spring 2024",
    },
];

function TeaModal({ tea, isOpen, onClose }: { tea: (typeof teas)[0] | null; isOpen: boolean; onClose: () => void }) {
    if (!tea) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
                    <motion.div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div
                            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl pointer-events-auto"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{tea.emoji}</span>
                                    <motion.span
                                        className="inline-block rounded-full px-3 py-1 text-xs font-bold"
                                        style={{
                                            backgroundColor: palette.accent,
                                            color: palette.dark,
                                        }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500, delay: 0.1 }}
                                    >
                                        {tea.tag}
                                    </motion.span>
                                </div>
                                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none" aria-label="Close modal">
                                    ×
                                </button>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: palette.dark }}>
                                {tea.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 italic">{tea.note}</p>
                            <p className="text-sm leading-relaxed mb-4" style={{ color: palette.dark }}>
                                {tea.description}
                            </p>
                            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Origin</p>
                                    <p className="text-xs font-semibold" style={{ color: palette.dark }}>
                                        {tea.origin}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Elevation</p>
                                    <p className="text-xs font-semibold" style={{ color: palette.dark }}>
                                        {tea.elevation}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Harvest</p>
                                    <p className="text-xs font-semibold" style={{ color: palette.dark }}>
                                        {tea.harvest}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default function Home() {
    const [selectedTea, setSelectedTea] = useState<(typeof teas)[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const interval = setInterval(() => {
            const teaBadges = document.querySelectorAll(".tea-badge");
            teaBadges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.classList.add("pulse-once");
                    setTimeout(() => badge.classList.remove("pulse-once"), 600);
                }, index * 100);
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const openModal = (tea: (typeof teas)[0]) => {
        setSelectedTea(tea);
        setIsModalOpen(true);
    };

    return (
        <main className="min-h-screen relative" style={{ backgroundColor: palette.bg }}>
            <motion.div className="fixed top-0 left-0 right-0 h-1 origin-left z-50" style={{ scaleX, backgroundColor: palette.accent }} />
            <style jsx global>{`
                @keyframes pulseOnce {
                    0%,
                    100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }
                .pulse-once {
                    animation: pulseOnce 0.6s ease-in-out;
                }
                .gradient-border-hover {
                    transition: all 0.3s ease;
                    position: relative;
                }
                .gradient-border-hover:hover {
                    background: linear-gradient(135deg, ${palette.card}F0 0%, ${palette.accent}20 100%);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }
            `}</style>
            <div className="relative mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-4 lg:py-6 space-y-2 sm:space-y-3 lg:space-y-4">
                <Squircle className="mx-auto max-w-7xl" innerClassName="py-8 sm:py-10 lg:py-12" ariaLabel="header" id="home">
                    <nav className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl sm:text-3xl font-bold tracking-tight cursor-pointer"
                            style={{ color: palette.dark }}
                        >
                            <span className="inline-flex items-center gap-2">
                                <motion.span animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                                    ☕
                                </motion.span>
                                Chaah Paat
                            </span>
                        </motion.div>
                        <motion.div
                            className="flex gap-2 sm:gap-3 lg:gap-4 flex-wrap justify-center"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        >
                            {["collection", "about", "story", "brewing"].map((item, i) => (
                                <motion.a
                                    key={item}
                                    href={`#${item}`}
                                    className="px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm transition-all gradient-border-hover"
                                    style={{
                                        border: `1px solid ${palette.dark}20`,
                                        color: palette.dark,
                                    }}
                                    whileHover={{ scale: 1.05, backgroundColor: `${palette.accent}20` }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </motion.a>
                            ))}
                        </motion.div>
                    </nav>
                    <motion.div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <motion.h1
                            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                            style={{ color: palette.dark }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Finest Assam Tea from <motion.span className="inline-block bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Heart of India</motion.span>
                        </motion.h1>
                        <motion.p
                            className="text-sm sm:text-base lg:text-lg leading-relaxed opacity-90"
                            style={{ color: palette.dark }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            From the legendary tea regions of Mangaldoi, Dibrugarh, Tinsukia, Jorhat, and Golaghat — bringing you authentic Assam tea that carries the soul of the land.
                        </motion.p>
                        <motion.div className="flex gap-3 sm:gap-4 justify-center pt-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
                            <motion.button
                                className="px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-xl backdrop-blur-sm"
                                style={{
                                    backgroundColor: palette.dark,
                                    color: palette.bg,
                                }}
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Explore Collection
                            </motion.button>
                            <motion.button
                                className="px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base backdrop-blur-sm gradient-border-hover"
                                style={{
                                    border: `2px solid ${palette.dark}`,
                                    color: palette.dark,
                                }}
                                whileHover={{ scale: 1.05, backgroundColor: `${palette.accent}20` }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Our Heritage
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </Squircle>

                {/* About Us Section */}
                <Squircle className="mx-auto max-w-7xl" innerClassName="py-12 sm:py-16" ariaLabel="about" id="about">
                    <motion.div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <motion.div className="space-y-4 sm:space-y-6" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: palette.dark }}>
                                About Chaah Paat 🌿
                            </h2>
                            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: palette.dark }}>
                                <p className="opacity-90">
                                    At Chaah Paat, we bring you the finest teas from the heart of Assam—handpicked from legendary tea regions like Mangaldoi, Dibrugarh, Tinsukia, Jorhat, Golaghat, and
                                    beyond.
                                </p>
                                <p className="opacity-90">
                                    Each leaf is carefully selected for its bold aroma, rich flavour, and authentic heritage. Our mission is simple: to deliver premium Assam tea that carries the soul
                                    of the land, the passion of our growers, and the purity of every sunrise over the tea gardens.
                                </p>
                                <p className="font-semibold italic text-base sm:text-lg">Experience tea the way Assam intended—fresh, honest, and unforgettable.</p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm gradient-border-hover"
                            style={{
                                backgroundColor: `${palette.card}F0`,
                                border: `1px solid ${palette.dark}08`,
                            }}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <h3 className="text-lg sm:text-xl font-bold mb-4" style={{ color: palette.dark }}>
                                Our Promise ✨
                            </h3>
                            <div className="space-y-3">
                                {[
                                    "Premium quality from Assam's finest gardens",
                                    "Direct from source to your cup",
                                    "Supporting local tea growers and communities",
                                    "Preserving centuries-old tea traditions",
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <motion.div
                                            className="h-2 w-2 rounded-full"
                                            style={{ backgroundColor: palette.accent }}
                                            animate={{ scale: [1, 1.5, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                        />
                                        <span className="text-sm opacity-90" style={{ color: palette.dark }}>
                                            {item}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </Squircle>

                {/* Our Story Section */}
                <Squircle className="mx-auto max-w-7xl" innerClassName="py-12 sm:py-16" ariaLabel="story" id="story">
                    <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <motion.h2
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-center mb-8"
                            style={{ color: palette.dark }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Our Story 🫖
                        </motion.h2>
                        <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed" style={{ color: palette.dark }}>
                            <motion.p className="opacity-90" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                                Our journey began not in an office, but in the early morning mist of Assam's tea gardens, where generations of growers have poured their hearts into every leaf. We grew
                                up watching the rhythm of the pluckers' hands, the warmth of the first brew at dawn, and the pride that comes from creating tea that travels the world.
                            </motion.p>
                            <motion.p className="opacity-90" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                                What started as a small dream soon became a mission—to bring authentic Assam tea to every cup, without losing the traditions that shaped it. Today, we travel across
                                Assam's finest estates, from Mangaldoi's aromatic orthodox fields to Dibrugarh's bold CTC gardens, choosing only the leaves that tell a story.
                            </motion.p>
                            <motion.div
                                className="text-center py-4 sm:py-6"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <p className="font-bold text-base sm:text-lg italic" style={{ color: palette.dark }}>
                                    This is not just our business—
                                </p>
                                <p className="font-bold text-lg sm:text-xl mt-2" style={{ color: palette.dark }}>
                                    this is our heritage, our passion, and our promise:
                                </p>
                                <p className="mt-3 text-base sm:text-lg italic opacity-90">to deliver tea that feels like home, tastes like tradition, and inspires the modern tea lover.</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </Squircle>

                <Squircle className="mx-auto max-w-7xl" innerClassName="space-y-6 sm:space-y-8" ariaLabel="collection" id="collection">
                    <motion.h2
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
                        style={{ color: palette.dark }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Tea Collection
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
                        variants={stagger}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {teas.map((tea) => (
                            <motion.div key={tea.name} variants={fadeInUp} className="group" whileHover={{ y: -5 }}>
                                <motion.div
                                    className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 h-full cursor-pointer shadow-lg hover:shadow-2xl transition-all backdrop-blur-sm tea-badge gradient-border-hover"
                                    style={{
                                        backgroundColor: `${palette.card}F0`,
                                        border: `1px solid ${palette.dark}08`,
                                    }}
                                    onClick={() => openModal(tea)}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                                        <span className="text-2xl sm:text-3xl">{tea.emoji}</span>
                                        <span
                                            className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                                            style={{
                                                backgroundColor: palette.accent,
                                                color: palette.dark,
                                            }}
                                        >
                                            {tea.tag}
                                        </span>
                                    </div>
                                    <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2" style={{ color: palette.dark }}>
                                        {tea.name}
                                    </h3>
                                    <p className="text-xs sm:text-sm leading-relaxed opacity-80 mb-3" style={{ color: palette.dark }}>
                                        {tea.note}
                                    </p>
                                    <motion.div className="text-xs font-medium opacity-60" style={{ color: palette.dark }} whileHover={{ opacity: 1 }}>
                                        {tea.origin}
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </Squircle>

                <Squircle className="mx-auto max-w-7xl" innerClassName="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12" ariaLabel="why-choose">
                    <motion.div className="space-y-4 sm:space-y-6" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <div className="space-y-3 sm:space-y-4">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: palette.dark }}>
                                Why Chaah Paat? 🌱
                            </h2>
                        </div>
                        <motion.div className="pt-2 sm:pt-4" whileHover={{ x: 5 }}>
                            <a href="#collection" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: palette.dark }}>
                                Explore Our Teas <span className="text-lg">→</span>
                            </a>
                        </motion.div>
                    </motion.div>
                    <motion.div className="space-y-4 sm:space-y-6" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <motion.div
                            className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm gradient-border-hover"
                            style={{
                                backgroundColor: `${palette.card}F0`,
                                border: `1px solid ${palette.dark}08`,
                            }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider mb-4 sm:mb-6" style={{ color: palette.dark }}>
                                Our Difference
                            </h3>
                            <div className="space-y-3 sm:space-y-4">
                                {[
                                    "🌿 Finest Leaves From Assam's Iconic Regions - We source only from the top tea belts—Mangaldoi, Dibrugarh, Tinsukia, Jorhat, Golaghat",
                                    "✋ Handpicked for Quality, Not Quantity - Every batch is carefully selected for bold aroma, strong colour, and smooth taste",
                                    "🏡 Authentic & Farm-Fresh - Direct from trusted growers, ensuring freshness and purity without middlemen",
                                    "🎯 Tradition Meets Modern Craft - Honouring Assam's age-old tea heritage with modern processing standards",
                                    "🤝 Ethically Sourced, Expertly Blended - Fair practices, sustainable gardens, and responsible sourcing",
                                    "📖 Tea That Tells a Story - Each sip carries the spirit of the land and the passion of our growers",
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <span className="text-xs sm:text-sm leading-relaxed opacity-90" style={{ color: palette.dark }}>
                                            {item}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </Squircle>

                <Squircle className="mx-auto max-w-7xl" innerClassName="space-y-6 sm:space-y-8" ariaLabel="brewing" id="brewing">
                    <motion.h2
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
                        style={{ color: palette.dark }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Brewing Guide
                    </motion.h2>
                    <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
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
                                    className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 h-full shadow-lg hover:shadow-2xl transition-all backdrop-blur-sm gradient-border-hover"
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
                <Squircle className="mx-auto max-w-7xl" innerClassName="py-4 sm:py-6" ariaLabel="footer">
                    <motion.div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <motion.div className="text-xs sm:text-sm opacity-60" style={{ color: palette.dark }} whileHover={{ opacity: 1 }}>
                            © {new Date().getFullYear()} Chaah Paat — Premium Assam Tea
                        </motion.div>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex gap-2 text-xs sm:text-sm opacity-80" style={{ color: palette.dark }}>
                                <span>📞 6900234165</span>
                                <span>•</span>
                                <span>9883617119</span>
                            </div>
                            <div className="flex gap-2 sm:gap-3 lg:gap-4">
                                {["Instagram", "Newsletter"].map((link) => (
                                    <motion.button
                                        key={link}
                                        className="rounded-full px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium backdrop-blur-sm transition-all gradient-border-hover"
                                        style={{
                                            border: `1px solid ${palette.dark}20`,
                                            color: palette.dark,
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: `${palette.accent}20`,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {link}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </Squircle>
            </div>
            <TeaModal tea={selectedTea} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
}

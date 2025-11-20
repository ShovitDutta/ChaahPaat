"use client";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const palette = {
    bg: "#FAFDF7",
    card: "#E8F5E0",
    squircle: "#D9F0CC",
    accent: "#A8D88A",
    dark: "#213D0B",
    shadow: "#142506",
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

import TeaCollection from './tea-collection';

export default function TeaShopPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main style={{ backgroundColor: palette.bg, color: palette.dark }} className="min-h-screen antialiased overflow-x-hidden">
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-400 to-lime-400 origin-left z-60" style={{ scaleX }} />

            <motion.header className="fixed top-0 left-0 right-0 z-50 px-4 py-2 sm:py-3 lg:py-4" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }}>
                <div className="mx-auto max-w-7xl">
                    <motion.div
                        className={`rounded-full backdrop-blur-2xl bg-white/10 p-2 sm:p-3 transition-all duration-500 ${isScrolled ? "shadow-2xl" : "shadow-lg"}`}
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
                                    className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-3xl overflow-hidden p-2 sm:p-3 shadow-inner"
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
                                        className="relative hover:text-opacity-100 transition-all py-2 px-3 rounded-lg gradient-border-hover"
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
                                className="rounded-full px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all gradient-border-hover"
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

            <div className="pt-20 sm:pt-24 lg:pt-28 space-y-12 sm:space-y-16 lg:space-y-20 px-4 py-8 sm:py-10 lg:py-12">
                <Squircle className="mx-auto max-w-7xl" innerClassName="py-4 sm:py-6 lg:py-8">
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
                                    className="relative inline-block mx-1 sm:mx-2 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl"
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
                                    className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transition-all gradient-border-hover"
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
                                    className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold backdrop-blur-sm hover:backdrop-blur-md transition-all gradient-border-hover"
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
                                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-emerald-200 via-lime-200 to-yellow-100 opacity-30 blur-3xl" />
                            </motion.div>
                            <motion.a
                                href="#collection"
                                className="absolute h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80 rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer"
                                style={{
                                    backgroundColor: palette.squircle,
                                }}
                                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    rotate: [0, -3, 3, 0]
                                }}
                                transition={{
                                    delay: 0.2,
                                    type: "spring",
                                    stiffness: 100,
                                    rotate: {
                                        duration: 20,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    rotate: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10,
                                    }
                                }}
                                whileTap={{
                                    scale: 0.95,
                                    transition: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 15,
                                    }
                                }}
                            >
                                <Image src="/chaah-paat.png" alt="চাপাত tea" fill className="object-contain p-1" />
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </Squircle>
                <Squircle className="mx-auto max-w-7xl" innerClassName="space-y-6 sm:space-y-8" ariaLabel="collection" id="collection">
                    <TeaCollection />
                </Squircle>
                <Squircle className="mx-auto max-w-7xl" innerClassName="space-y-6 sm:space-y-8" ariaLabel="about" id="about">
                    <motion.div
                        className="text-center space-y-4 sm:space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: palette.dark }}>
                            About Us
                        </h2>
                        <div className="max-w-4xl mx-auto">
                            <p className="text-sm sm:text-base leading-relaxed opacity-80" style={{ color: palette.dark }}>
                                At Chaah Paat, we bring you the finest teas from the heart of Assam—handpicked from legendary tea regions like Mangaldoi, Dibrugarh, Tinsukia, Jorhat, Golaghat, and beyond. Each leaf is carefully selected for its bold aroma, rich flavour, and authentic heritage. Our mission is simple: to deliver premium Assam tea that carries the soul of the land, the passion of our growers, and the purity of every sunrise over the tea gardens. Experience tea the way Assam intended—fresh, honest, and unforgettable.
                            </p>
                        </div>
                    </motion.div>
                </Squircle>
                <Squircle className="mx-auto max-w-7xl" innerClassName="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12" ariaLabel="story" id="story">
                    <motion.div className="space-y-4 sm:space-y-6" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: palette.dark }}>
                            Our Story
                        </h2>
                        <div className="space-y-3 sm:space-y-4">
                            <p className="text-sm sm:text-base leading-relaxed opacity-80" style={{ color: palette.dark }}>
                                Our journey began not in an office, but in the early morning mist of Assam's tea gardens, where generations of growers have poured their hearts into every leaf. We grew up watching the rhythm of the pluckers' hands, the warmth of the first brew at dawn, and the pride that comes from creating tea that travels the world.
                            </p>
                            <p className="text-sm sm:text-base leading-relaxed opacity-80" style={{ color: palette.dark }}>
                                What started as a small dream soon became a mission—to bring authentic Assam tea to every cup, without losing the traditions that shaped it. Today, we travel across Assam's finest estates, from Mangaldoi's aromatic orthodox fields to Dibrugarh's bold CTC gardens, choosing only the leaves that tell a story.
                            </p>
                            <p className="text-sm sm:text-base leading-relaxed opacity-80" style={{ color: palette.dark }}>
                                This is not just our business—
                                this is our heritage, our passion, and our promise:
                                to deliver tea that feels like home, tastes like tradition, and inspires the modern tea lover.
                            </p>
                        </div>
                        <motion.div className="pt-2 sm:pt-4" whileHover={{ x: 5 }}>
                            <a href="#about" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: palette.dark }}>
                                Learn More <span className="text-lg">→</span>
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
                                Why Chaah Paat
                            </h3>
                            <div className="space-y-3 sm:space-y-4">
                                {["Finest Leaves From Assam's Iconic Regions", "Handpicked for Quality, Not Quantity", "Authentic & Farm-Fresh", "Tradition Meets Modern Craft", "Ethically Sourced, Expertly Blended", "Tea That Tells a Story"].map(
                                    (item, i) => (
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
                                    ),
                                )}
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
                            © {new Date().getFullYear()} চাপাত — Mindful Tea Moments
                        </motion.div>
                        <div className="flex gap-2 sm:gap-3 lg:gap-4">
                            <motion.a
                                href="tel:+916900234165"
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
                                Contact: +91 6900234165
                            </motion.a>
                            <motion.a
                                href="tel:+919883617119"
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
                                +91 9883617119
                            </motion.a>
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
                    </motion.div>
                </Squircle>
            </div>
        </main>
    );
}

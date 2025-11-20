"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from '@/store/cartStore';

type Tea = { id: string; name: string; note: string; tag: string; emoji: string; description: string; origin: string; elevation: string; harvest: string };
const fadeInUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } };
const palette = { bg: "#FFFFFF", card: "#E8F5E0", squircle: "#D9F0CC", accent: "#A8D88A", dark: "#1D1A05", shadow: "#142506" };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

function TeaModal({ tea, isOpen, onClose }: { tea: Tea | null; isOpen: boolean; onClose: () => void }) {
    const addToCart = useCartStore(state => state.addToCart);

    if (!tea) return null;
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
                    <motion.div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div
                            className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl pointer-events-auto"
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
                                    >
                                        {tea.tag}
                                    </motion.span>
                                </div>
                                <button type="button" onClick={onClose} className="text-2xl hover:scale-110 transition-transform" style={{ color: palette.dark }}>
                                    ×
                                </button>
                            </div>
                            <h3 className="text-2xl font-bold mb-4" style={{ color: palette.dark }}>
                                {tea.name}
                            </h3>
                            <p className="text-base mb-6 leading-relaxed" style={{ color: `${palette.dark}CC` }}>
                                {tea.description}
                            </p>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold" style={{ color: palette.dark }}>
                                        Origin:
                                    </span>
                                    <span style={{ color: `${palette.dark}CC` }}>{tea.origin}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold" style={{ color: palette.dark }}>
                                        Elevation:
                                    </span>
                                    <span style={{ color: `${palette.dark}CC` }}>{tea.elevation}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold" style={{ color: palette.dark }}>
                                        Harvest:
                                    </span>
                                    <span style={{ color: `${palette.dark}CC` }}>{tea.harvest}</span>
                                </div>
                            </div>
                            <motion.button
                                className="w-full rounded-2xl py-3 font-semibold"
                                style={{ backgroundColor: palette.accent, color: palette.dark }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => {
                                    // Get the button position for the animation
                                    const rect = (e.target as HTMLElement).getBoundingClientRect();
                                    const position = {
                                        x: rect.left + rect.width / 2,
                                        y: rect.top + rect.height / 2
                                    };

                                    addToCart(tea, position);
                                    // Close the modal after adding to cart
                                    onClose();
                                }}
                            >
                                Add to Cart
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

const fetchTeas = async (): Promise<Tea[]> => {
    const res = await fetch("/api/teas");
    if (!res.ok) throw new Error("Failed to fetch teas");
    return res.json();
};

export default function TeaCollection() {
    const { data: teas = [], isLoading, error } = useQuery<Tea[]>({ queryKey: ["teas"], queryFn: fetchTeas, staleTime: 5 * 60 * 1000 });
    const [hoveredTea, setHoveredTea] = useState<string | null>(null);
    const [selectedTea, setSelectedTea] = useState<Tea | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openTeaModal = (tea: Tea) => {
        setSelectedTea(tea);
        setIsModalOpen(true);
    };
    if (isLoading) {
        return (
            <div className="mx-auto max-w-7xl py-4 sm:py-6 lg:py-8 flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: palette.accent }}></div>
                    <p className="mt-2" style={{ color: palette.dark }}>
                        Loading teas...
                    </p>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="mx-auto max-w-7xl py-4 sm:py-6 lg:py-8">
                <div className="text-center p-8 rounded-3xl" style={{ backgroundColor: palette.card }}>
                    <p className="text-lg" style={{ color: palette.dark }}>
                        Error loading teas: {(error as Error).message}
                    </p>
                    <button className="mt-4 rounded-full px-6 py-2 font-semibold" style={{ backgroundColor: palette.accent, color: palette.dark }} onClick={() => window.location.reload()}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="mx-auto max-w-7xl">
            <motion.div
                className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
            >
                <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-lime-500 to-teal-600 bg-clip-text text-transparent">
                        Featured Collection
                    </h2>
                    <p className="mt-1 sm:mt-2 text-sm sm:text-base opacity-70" style={{ color: palette.dark }}>
                        Seasonal small-batch teas from Assam's finest gardens
                    </p>
                </div>
                <motion.span className="text-[10px] sm:text-xs uppercase tracking-wider opacity-50" initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} viewport={{ once: false }}>
                    Single Origin
                </motion.span>
            </motion.div>
            <motion.div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: false }}>
                <AnimatePresence>
                    {teas.map((tea) => (
                        <motion.div
                            key={tea.id}
                            variants={fadeInUp}
                            className="group relative cursor-pointer"
                            onHoverStart={() => setHoveredTea(tea.name)}
                            onHoverEnd={() => setHoveredTea(null)}
                            onClick={() => openTeaModal(tea)}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <motion.div
                                className="absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-400/20 to-lime-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                initial={false}
                                animate={hoveredTea === tea.name ? { scale: 1.1 } : { scale: 1 }}
                            />
                            <div
                                className="relative rounded-2xl p-4 sm:p-5 lg:p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm gradient-border-hover"
                                style={{
                                    backgroundColor: `${palette.card}F0`,
                                    border: `2px solid ${palette.dark}08`,
                                }}
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex items-start justify-between gap-2 sm:gap-4">
                                        <motion.span
                                            className="inline-block rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold tracking-wide"
                                            style={{
                                                backgroundColor: palette.accent,
                                                color: palette.dark,
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {tea.tag}
                                        </motion.span>
                                        <motion.div className="text-xl sm:text-2xl" animate={hoveredTea === tea.name ? { rotate: [0, -10, 10, 0] } : {}} transition={{ duration: 0.5 }}>
                                            {tea.emoji}
                                        </motion.div>
                                    </div>
                                    <div className="flex-1 mt-3 sm:mt-4">
                                        <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight tracking-tight" style={{ color: palette.dark }}>
                                            {tea.name}
                                        </h3>
                                        <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed opacity-80 line-clamp-2 sm:line-clamp-3" style={{ color: palette.dark }}>
                                            {tea.note}
                                        </p>
                                    </div>
                                    <motion.button
                                        className="w-full mt-3 sm:mt-4 lg:mt-6 rounded-2xl py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm font-semibold tracking-wide transition-all gradient-border-hover"
                                        style={{
                                            backgroundColor: hoveredTea === tea.name ? palette.accent : palette.bg,
                                            color: palette.dark,
                                            border: `2px solid ${palette.dark}10`,
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openTeaModal(tea);
                                        }}
                                    >
                                        View Details
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            <TeaModal tea={selectedTea} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

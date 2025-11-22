"use client";

import { useState } from "react";
import useCartStore from "@/store/cartStore";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { FaTimes, FaLeaf, FaPlus, FaMapMarkerAlt, FaMountain, FaShoppingBag } from "react-icons/fa";
type Tea = { id: string; name: string; note: string; tag: string; emoji: string; description: string; origin: string; elevation: string; harvest: string; gradient: string };
type TeaCollectionProps = {
    isAuthenticated: boolean;
};
const fadeInUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } };
const palette = { bg: "#F5F0E6", card: "#EBE0D0", squircle: "#D6C4A6", accent: "#A67B5B", dark: "#4A3B2A", shadow: "#2C2218" };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
const fetchTeas = async (): Promise<Tea[]> => {
    const res = await fetch("/api/teas");
    if (!res.ok) throw new Error("Failed to fetch teas");
    return res.json();
};

export default function TeaCollection({ isAuthenticated }: TeaCollectionProps) {
    const { data: teas, isLoading, error } = useQuery<Tea[]>({ queryKey: ["teas"], queryFn: fetchTeas, staleTime: 5 * 60 * 1000 });
    const [selectedTea, setSelectedTea] = useState<Tea | null>(null); // Renamed from isModalOpen to selectedTea for direct modal content

    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = (e: React.MouseEvent, tea: Tea) => {
        e.stopPropagation();
        // Get button position for animation
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        addToCart(
            {
                id: tea.id,
                name: tea.name,
                tag: tea.tag,
                note: tea.note,
                emoji: tea.emoji,
                origin: tea.origin,
                harvest: tea.harvest,
                elevation: tea.elevation,
                description: tea.description,
                gradient: tea.gradient, // Ensure gradient is passed
            },
            { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
        );
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-96 rounded-3xl animate-pulse" style={{ backgroundColor: palette.card }} />
                ))}
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
                    <button className="mt-4 rounded-full px-6 py-2 font-semibold" style={{ backgroundColor: palette.accent, color: palette.bg }} onClick={() => window.location.reload()}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teas?.map((tea) => (
                    <motion.div
                        key={tea.id}
                        layoutId={`card-${tea.id}`}
                        onClick={() => setSelectedTea(tea)}
                        className="group relative rounded-3xl overflow-hidden cursor-pointer h-full flex flex-col"
                        style={{ backgroundColor: palette.card }}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    >
                        {/* Image Placeholder with Gradient */}
                        <div className={`h-48 w-full bg-linear-to-br ${tea.gradient} relative overflow-hidden`}>
                            <div className="absolute inset-0 flex items-center justify-center text-9xl transform group-hover:scale-110 transition-transform duration-500">{tea.emoji}</div>
                            <div className="absolute top-4 right-4">
                                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-black/80 backdrop-blur-sm">{tea.tag}</span>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold leading-tight" style={{ color: palette.dark }}>
                                    {tea.name}
                                </h3>
                                <div className="flex items-center gap-1 text-xs font-medium opacity-60" style={{ color: palette.dark }}>
                                    <FaLeaf /> {tea.harvest}
                                </div>
                            </div>

                            <p className="text-sm mb-4 line-clamp-2 opacity-70 flex-1" style={{ color: palette.dark }}>
                                {tea.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: `${palette.dark}10` }}>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase tracking-wider opacity-50" style={{ color: palette.dark }}>
                                        Origin
                                    </span>
                                    <span className="font-semibold text-sm" style={{ color: palette.dark }}>
                                        {tea.origin}
                                    </span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => handleAddToCart(e, tea)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors"
                                    style={{ backgroundColor: palette.accent, color: palette.bg }}
                                >
                                    <FaPlus />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedTea && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedTea(null)}
                    >
                        <motion.div
                            layoutId={`card-${selectedTea.id}`}
                            className="w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative"
                            style={{ backgroundColor: palette.bg }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedTea(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/30 transition-colors"
                            >
                                <FaTimes />
                            </button>

                            <div className="grid md:grid-cols-2">
                                <div className={`h-64 md:h-full bg-linear-to-br ${selectedTea.gradient} flex items-center justify-center relative overflow-hidden`}>
                                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="text-9xl md:text-[10rem]">
                                        {selectedTea.emoji}
                                    </motion.div>
                                </div>

                                <div className="p-8 md:p-10 flex flex-col h-full">
                                    <div className="mb-6">
                                        <motion.span
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                                            style={{ backgroundColor: palette.squircle, color: palette.dark }}
                                        >
                                            {selectedTea.tag}
                                        </motion.span>
                                        <motion.h2
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-3xl md:text-4xl font-bold mb-2"
                                            style={{ color: palette.dark }}
                                        >
                                            {selectedTea.name}
                                        </motion.h2>
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-lg font-medium opacity-60"
                                            style={{ color: palette.dark }}
                                        >
                                            {selectedTea.note}
                                        </motion.p>
                                    </div>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-base leading-relaxed mb-8 opacity-80"
                                        style={{ color: palette.dark }}
                                    >
                                        {selectedTea.description}
                                    </motion.p>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {[
                                            { label: "Origin", value: selectedTea.origin, icon: FaMapMarkerAlt },
                                            { label: "Harvest", value: selectedTea.harvest, icon: FaLeaf },
                                            { label: "Elevation", value: selectedTea.elevation, icon: FaMountain },
                                        ].map((item, i) => (
                                            <motion.div
                                                key={item.label}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 + i * 0.1 }}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="mt-1 opacity-50" style={{ color: palette.dark }}>
                                                    <item.icon />
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase tracking-wider opacity-50" style={{ color: palette.dark }}>
                                                        {item.label}
                                                    </p>
                                                    <p className="font-semibold" style={{ color: palette.dark }}>
                                                        {item.value}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="mt-auto">
                                        {!isAuthenticated ? (
                                            <button
                                                onClick={() => signIn("google")}
                                                className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                                style={{ backgroundColor: palette.accent, color: palette.bg }}
                                            >
                                                Sign in to Purchase
                                            </button>
                                        ) : (
                                            <button
                                                onClick={(e) => {
                                                    handleAddToCart(e, selectedTea);
                                                    setSelectedTea(null);
                                                }}
                                                className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                                style={{ backgroundColor: palette.accent, color: palette.bg }}
                                            >
                                                <FaShoppingBag /> Add to Cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

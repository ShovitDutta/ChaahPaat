"use client";

import Image from "next/image";
import { useState } from "react";
import useCartStore from "@/store/cartStore";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { FaTimes, FaLeaf, FaPlus, FaMapMarkerAlt, FaMountain, FaShoppingBag } from "react-icons/fa";

type Tea = {
    id: string;
    name: string;
    note: string;
    tag: string;
    emoji: string;
    description: string;
    origin: string;
    elevation: string;
    harvest: string;
    gradient: string;
    image: string;
};

type TeaCollectionProps = {
    isAuthenticated: boolean;
};

const fadeInUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } };
const palette = { bg: "#F2F8F0", card: "#E0EBD0", squircle: "#CDE0B4", accent: "#88B04B", dark: "#203015", shadow: "#152010" };

const fetchTeas = async (): Promise<Tea[]> => {
    const res = await fetch("/api/teas");
    if (!res.ok) throw new Error("Failed to fetch teas");
    return res.json();
};

export default function TeaCollection({ isAuthenticated }: TeaCollectionProps) {
    const { data: teas, isLoading, error } = useQuery<Tea[]>({ queryKey: ["teas"], queryFn: fetchTeas, staleTime: 5 * 60 * 1000 });
    const [selectedTea, setSelectedTea] = useState<Tea | null>(null);

    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = (e: React.MouseEvent, tea: Tea) => {
        e.stopPropagation();
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
                gradient: tea.gradient,
                image: tea.image,
            },
            { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
        );
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
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
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {teas?.map((tea) => (
                    <motion.div
                        key={tea.id}
                        layoutId={`card-${tea.id}`}
                        variants={fadeInUp}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        className="group relative h-full rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                        style={{ backgroundColor: palette.card }}
                        onClick={() => setSelectedTea(tea)}
                    >
                        {/* Image Section */}
                        <div className={`h-48 relative overflow-hidden bg-linear-to-br ${tea.gradient}`}>
                            <Image
                                src={tea.image}
                                alt={tea.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute top-4 right-4">
                                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/90 backdrop-blur-sm shadow-sm" style={{ color: palette.dark }}>
                                    {tea.tag}
                                </span>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2 line-clamp-1" style={{ color: palette.dark }}>
                                    {tea.name}
                                </h3>
                                <p className="text-sm font-medium opacity-80 line-clamp-2" style={{ color: palette.dark }}>
                                    {tea.note}
                                </p>
                            </div>

                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-2xl font-bold" style={{ color: palette.accent }}>
                                    $12
                                </span>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => handleAddToCart(e, tea)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-90 hover:rotate-90"
                                    style={{ backgroundColor: palette.accent, color: palette.bg }}
                                    aria-label={`Add ${tea.name} to cart`}
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
                                <div className={`h-64 md:h-full bg-linear-to-br ${selectedTea.gradient} relative overflow-hidden`}>
                                    <Image src={selectedTea.image} alt={selectedTea.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
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

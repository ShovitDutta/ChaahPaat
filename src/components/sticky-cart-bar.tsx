"use client";
import useCartStore from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
const palette = {
    bg: "#FFFFFF",
    card: "#E8F5E0",
    squircle: "#D9F0CC",
    accent: "#A8D88A",
    dark: "#1D1A05",
    shadow: "#142506",
};
export const StickyCartBar = () => {
    const { items, isStickyBarOpen, setStickyBarOpen, updateQuantity, getTotalItems } = useCartStore();
    const totalItems = getTotalItems();
    const cartTotal = items.reduce((total, item) => total + item.quantity, 0);
    if (!isStickyBarOpen || totalItems === 0) return null;
    return (
        <AnimatePresence>
            <motion.div
                className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 z-50"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
                <div
                    className="rounded-2xl p-4 shadow-xl backdrop-blur-lg"
                    style={{
                        backgroundColor: `${palette.squircle}F5`,
                        border: `2px solid ${palette.dark}20`,
                    }}
                >
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-lg" style={{ color: palette.dark }}>
                            Your Cart ({totalItems})
                        </h3>
                        <button onClick={() => setStickyBarOpen(false)} className="text-lg hover:scale-110 transition-transform" style={{ color: palette.dark }}>
                            ×
                        </button>
                    </div>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                className="flex items-center justify-between py-2 border-b border-gray-200"
                                style={{ borderColor: `${palette.dark}20` }}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-xl">{item.emoji}</span>
                                    <div>
                                        <p className="font-semibold text-sm" style={{ color: palette.dark }}>
                                            {item.name}
                                        </p>
                                        <p className="text-xs opacity-70" style={{ color: palette.dark }}>
                                            {item.tag}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button
                                        className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                                        style={{ backgroundColor: palette.accent, color: palette.dark }}
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="w-6 text-center" style={{ color: palette.dark }}>
                                        {item.quantity}
                                    </span>
                                    <button
                                        className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                                        style={{ backgroundColor: palette.accent, color: palette.dark }}
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t" style={{ borderColor: `${palette.dark}20` }}>
                        <div>
                            <p className="text-sm opacity-80" style={{ color: palette.dark }}>
                                Total Items: {cartTotal}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className="px-4 py-2 rounded-2xl font-medium text-sm"
                                style={{
                                    backgroundColor: palette.accent,
                                    color: palette.dark,
                                }}
                            >
                                View Cart
                            </button>
                            <button
                                className="px-4 py-2 rounded-2xl font-medium text-sm"
                                style={{
                                    backgroundColor: palette.dark,
                                    color: palette.squircle,
                                }}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

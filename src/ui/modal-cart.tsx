import useCartStore from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTrashAlt, FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const palette = {
    bg: "#FFFFFF",
    card: "#E8F5E0",
    squircle: "#D9F0CC",
    accent: "#A8D88A",
    dark: "#1D1A05",
    shadow: "#142506",
};

const ModalCart = () => {
    const { items, isStickyBarOpen, setStickyBarOpen, updateQuantity, getTotalItems, removeFromCart } = useCartStore();
    const totalItems = getTotalItems();
    const cartTotal = items.reduce((total, item) => total + item.quantity * 1, 0); // Assuming each item costs 1 as a placeholder
    const cartSubtotal = items.reduce((total, item) => total + (item.quantity * 1), 0); // Assuming each item costs 1 as a placeholder

    if (!isStickyBarOpen) return null;

    const handleClose = () => {
        setStickyBarOpen(false);
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
            >
                <motion.div
                    className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
                    style={{
                        backgroundColor: palette.squircle,
                    }}
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: palette.dark }}>
                                <FaShoppingBag /> Your Cart ({totalItems})
                            </h2>
                            <button
                                onClick={handleClose}
                                className="text-2xl hover:scale-110 transition-transform"
                                style={{ color: palette.dark }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {items.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-lg" style={{ color: palette.dark }}>Your cart is empty</p>
                                <p className="text-sm opacity-70 mt-2" style={{ color: palette.dark }}>Add some delicious tea to your cart!</p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            className="flex items-center justify-between py-4 border-b border-gray-200"
                                            style={{ borderColor: `${palette.dark}20` }}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <span className="text-2xl">{item.emoji}</span>
                                                <div>
                                                    <p className="font-semibold" style={{ color: palette.dark }}>
                                                        {item.name}
                                                    </p>
                                                    <p className="text-xs opacity-70" style={{ color: palette.dark }}>
                                                        {item.tag}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                                                    style={{ backgroundColor: palette.accent, color: palette.dark }}
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span 
                                                    className="w-8 text-center font-bold" 
                                                    style={{ color: palette.dark }}
                                                >
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                                                    style={{ backgroundColor: palette.accent, color: palette.dark }}
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-6 border-t" style={{ borderColor: `${palette.dark}20` }}>
                                    <div className="flex justify-between mb-4">
                                        <span style={{ color: palette.dark }}>Subtotal</span>
                                        <span className="font-bold" style={{ color: palette.dark }}>
                                            ₹{cartSubtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    
                                    <div className="flex space-x-3">
                                        <button
                                            className="flex-1 py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-1"
                                            style={{
                                                backgroundColor: palette.accent,
                                                color: palette.dark,
                                            }}
                                            onClick={handleClose}
                                        >
                                            <FaArrowLeft /> Continue Shopping
                                        </button>
                                        <Link
                                            href="/dashboard"
                                            className="flex-1 py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-1"
                                            style={{
                                                backgroundColor: palette.dark,
                                                color: palette.squircle,
                                            }}
                                        >
                                            Checkout <FaShoppingBag />
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ModalCart;
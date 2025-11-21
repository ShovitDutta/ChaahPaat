"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import useCartStore from "@/store/cartStore";
export const AddToCartAnimation = () => {
    const { animation } = useCartStore();
    const cartIconRef = useRef<HTMLDivElement>(null);
    const getCartIconPosition = () => {
        if (cartIconRef.current) {
            const rect = cartIconRef.current.getBoundingClientRect();
            return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        }
        return { x: window.innerWidth - 50, y: 50 };
    };
    if (!animation.isAnimating || !animation.fromPosition) return null;
    const cartPosition = getCartIconPosition();
    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9999 }}>
            <motion.div
                className="absolute text-2xl"
                initial={{ x: animation.fromPosition.x, y: animation.fromPosition.y, scale: 1, opacity: 1 }}
                animate={{ x: cartPosition.x, y: cartPosition.y, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onAnimationComplete={() => {}}
            >
                🍵
            </motion.div>
        </div>
    );
};
export const CartIconRefProvider = ({ children }: { children: React.ReactNode }) => {
    const setCartIconRef = (element: HTMLDivElement | null) => {
        if (element) (window as any).__cartIconRef = element;
    };
    return <div ref={setCartIconRef}>{children}</div>;
};

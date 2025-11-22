import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useCartStore from "@/store/cartStore";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaGoogle, FaShoppingBag, FaUser, FaSignOutAlt } from "react-icons/fa";

const palette = { bg: "#FCFDF5", card: "#EFF5E6", squircle: "#D6E8C6", accent: "#7FA850", dark: "#2A3820", shadow: "#1C2615" };

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { data: session, status } = useSession();
    const cart = useCartStore((state) => state.items);
    const toggleCart = useCartStore((state) => state.toggleCart);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
            <div
                className={`mx-auto max-w-7xl rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${isScrolled ? "shadow-lg backdrop-blur-md" : ""}`}
                style={{
                    backgroundColor: isScrolled ? `${palette.bg}E6` : "transparent",
                    border: isScrolled ? `1px solid ${palette.dark}10` : "none",
                }}
            >
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🍵</span>
                    <span className="text-xl font-bold tracking-tight" style={{ color: palette.dark }}>
                        Chaah Paat
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    {["Collection", "Our Story", "Brewing Guide"].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: palette.dark }}>
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <button onClick={toggleCart} className="relative p-2 hover:bg-black/5 rounded-full transition-colors">
                        <FaShoppingBag className="text-xl" style={{ color: palette.dark }} />
                        {mounted && totalItems > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold"
                                style={{ backgroundColor: palette.accent, color: palette.bg }}
                            >
                                {totalItems}
                            </motion.span>
                        )}
                    </button>

                    {mounted && status === "authenticated" && session?.user ? (
                        <div className="flex items-center gap-3">
                            <motion.a
                                href="/dashboard"
                                className="hidden sm:flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium"
                                style={{ color: palette.dark }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaUser className="h-5 w-5" />
                                <span>Profile</span>
                            </motion.a>
                            <motion.button
                                onClick={() => signOut()}
                                className="rounded-2xl px-4 py-2 text-xs sm:text-sm font-medium flex items-center gap-1"
                                style={{
                                    backgroundColor: palette.accent,
                                    color: palette.dark,
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaSignOutAlt />
                                Sign Out
                            </motion.button>
                        </div>
                    ) : (
                        <motion.button
                            onClick={() => signIn("google", { callbackUrl: window.location.href })}
                            className="rounded-2xl px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-1 gradient-border-hover"
                            style={{
                                backgroundColor: palette.accent,
                                color: palette.dark,
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaGoogle className="text-base" />
                            Sign In
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.header>
    );
}

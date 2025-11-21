import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useCartStore from "@/store/cartStore";
import { useSession, signIn, signOut } from "next-auth/react";

const palette = {
    bg: "#FFFFFF",
    card: "#E8F5E0",
    squircle: "#D9F0CC",
    accent: "#A8D88A",
    dark: "#1D1A05",
    shadow: "#142506"
};

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { data: session, status } = useSession();
    const { getTotalItems } = useCartStore();
    const totalItems = getTotalItems();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const openCart = () => {
        useCartStore.getState().setStickyBarOpen(true);
    };

    const handleSignOut = () => {
        signOut({ redirect: true, callbackUrl: "/" });
    };

    return (
        <motion.header className="fixed top-0 left-0 right-0 z-50 px-4 py-2 sm:py-3 lg:py-4" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }}>
            <div className="mx-auto max-w-7xl">
                <motion.div
                    className={`rounded-2xl backdrop-blur-2xl bg-white/10 p-2 sm:p-3 transition-all duration-500 ${isScrolled ? "shadow-2xl" : "shadow-lg"}`}
                    style={{
                        backgroundColor: isScrolled ? `${palette.squircle}F5` : `${palette.squircle}E5`,
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
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
                                <span className="font-bold text-base sm:text-lg lg:text-xl tracking-tight bg-linear-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">চাপাত</span>
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
                        <div className="flex items-center gap-2">
                            {totalItems > 0 && (
                                <motion.button className="relative p-2 rounded-xl" style={{ backgroundColor: palette.accent }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={openCart}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ color: palette.dark }}>
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs rounded-full text-white" style={{ backgroundColor: palette.dark }}>
                                        {totalItems}
                                    </span>
                                </motion.button>
                            )}
                            {status === "authenticated" && session?.user ? (
                                <div className="flex items-center gap-3">
                                    <motion.a
                                        href="/dashboard"
                                        className="hidden sm:flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium"
                                        style={{ color: palette.dark }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                        <span>Profile</span>
                                    </motion.a>
                                    <motion.button
                                        onClick={handleSignOut}
                                        className="rounded-2xl px-4 py-2 text-xs sm:text-sm font-medium"
                                        style={{
                                            backgroundColor: palette.accent,
                                            color: palette.dark,
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Sign Out
                                    </motion.button>
                                </div>
                            ) : (
                                <motion.a
                                    href="/login"
                                    className="rounded-2xl px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                                    style={{
                                        backgroundColor: palette.accent,
                                        color: palette.dark,
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Sign In
                                </motion.a>
                            )}
                        </div>
                    </nav>
                </motion.div>
            </div>
        </motion.header>
    );
}

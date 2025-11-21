"use client";
import { Hero } from "@/components/hero";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Squircle } from "@/ui/squircle";
import { useScroll, useSpring } from "framer-motion";
import { Story, OurStory } from "@/components/story";
import TeaCollection from "@/components/tea-collection";
import { BrewingGuide } from "@/components/brewing-guide";
import ModalCart from "@/ui/modal-cart";
import { AddToCartAnimation } from "@/components/add-to-cart-animation";
import { useSession } from "next-auth/react";

export default function TeaShopPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const { data: session, status } = useSession();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main style={{ backgroundColor: "#FFFFFF", color: "#1D1A05" }} className="min-h-screen antialiased overflow-x-hidden">
            <Header />
            <Hero openCollection={() => {}} />
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <div className="px-4 py-2 sm:py-3 lg:py-4">
                    <OurStory />
                </div>
                <div className="px-4 py-2 sm:py-3 lg:py-4">
                    <Squircle className="mx-auto max-w-7xl" innerClassName="space-y-2 sm:space-y-3" ariaLabel="collection" id="collection">
                        <TeaCollection isAuthenticated={!!session?.user} />
                    </Squircle>
                </div>
                <div className="px-4 py-2 sm:py-3 lg:py-4">
                    <Story />
                </div>
                <div className="px-4 py-2 sm:py-3 lg:py-4">
                    <BrewingGuide />
                </div>
            </div>
            <div className="px-4 py-2 sm:py-3 lg:py-4">
                <Footer />
            </div>
            {session?.user && (
                <>
                    <ModalCart />
                    <AddToCartAnimation />
                </>
            )}
        </main>
    );
}

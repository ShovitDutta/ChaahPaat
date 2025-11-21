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
import { StickyCartBar } from "@/components/sticky-cart-bar";
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
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <div className="px-4 py-4 sm:py-5 lg:py-6">
                    <OurStory />
                </div>
                <div className="px-4 py-4 sm:py-5 lg:py-6">
                    <Squircle className="mx-auto max-w-7xl" innerClassName="space-y-4 sm:space-y-5" ariaLabel="collection" id="collection">
                        <TeaCollection isAuthenticated={!!session?.user} />
                    </Squircle>
                </div>
                <div className="px-4 py-4 sm:py-5 lg:py-6">
                    <Story />
                </div>
                <div className="px-4 py-4 sm:py-5 lg:py-6">
                    <BrewingGuide />
                </div>
            </div>
            <div className="px-4 py-4 sm:py-5 lg:py-6">
                <Footer />
            </div>
            {session?.user && (
                <>
                    <StickyCartBar />
                    <AddToCartAnimation />
                </>
            )}
        </main>
    );
}

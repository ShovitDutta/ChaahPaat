"use client";
import { Hero } from "@/components/hero";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Squircle } from "@/components/squircle";
import { useScroll, useSpring } from "framer-motion";
import { Story, OurStory } from "@/components/story";
import TeaCollection from "@/components/tea-collection";
import { BrewingGuide } from "@/components/brewing-guide";
import { StickyCartBar } from "@/components/sticky-cart-bar";
import { AddToCartAnimation } from "@/components/add-to-cart-animation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function TeaShopPage() {
    const { data: session, status } = useSession();

    // If not authenticated, redirect to login
    if (status === "unauthenticated") {
        redirect("/login");
    }

    // Show loading state while checking session
    if (status === "loading") {
        return (
            <main style={{ backgroundColor: "#FFFFFF", color: "#1D1A05" }} className="min-h-screen antialiased overflow-x-hidden">
                <Header />
                <div className="min-h-[80vh] flex items-center justify-center">
                    <p>Loading...</p>
                </div>
                <Footer />
            </main>
        );
    }

    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main style={{ backgroundColor: "#FFFFFF", color: "#1D1A05" }} className="min-h-screen antialiased overflow-x-hidden">
            <Header />
            <Hero openCollection={() => {}} />
            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                <div className="px-4 py-6 sm:py-8 lg:py-10">
                    <OurStory />
                </div>
                <div className="px-4 py-6 sm:py-8 lg:py-10">
                    <Squircle className="mx-auto max-w-7xl" innerClassName="space-y-6 sm:space-y-8" ariaLabel="collection" id="collection">
                        <TeaCollection />
                    </Squircle>
                </div>
                <div className="px-4 py-6 sm:py-8 lg:py-10">
                    <Story />
                </div>
                <div className="px-4 py-6 sm:py-8 lg:py-10">
                    <BrewingGuide />
                </div>
            </div>
            <div className="px-4 py-6 sm:py-8 lg:py-10">
                <Footer />
            </div>
            <StickyCartBar />
            <AddToCartAnimation />
        </main>
    );
}

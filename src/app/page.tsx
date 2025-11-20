"use client";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import TeaCollection from './tea-collection';
import { Header } from '../components/header';
import { Hero } from '../components/hero';
import { Squircle } from '../components/squircle';
import { Story, OurStory } from '../components/story';
import { BrewingGuide } from '../components/brewing-guide';
import { Footer } from '../components/footer';

export default function TeaShopPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main style={{ backgroundColor: "#FFFFFF", color: "#1D1A05" }} className="min-h-screen antialiased overflow-x-hidden">
            <Header />
            <Hero openCollection={() => {}} />
            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
                <Squircle className="mx-auto max-w-7xl" innerClassName="space-y-6 sm:space-y-8" ariaLabel="collection" id="collection">
                    <TeaCollection />
                </Squircle>
                <Story />
                <OurStory />
                <BrewingGuide />
            </div>
            <Footer />
        </main>
    );
}

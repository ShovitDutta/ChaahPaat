"use client";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import LoginForm from "@/components/auth/LoginForm";
import { Squircle } from "@/components/squircle";
import { StickyCartBar } from "@/components/sticky-cart-bar";
import { AddToCartAnimation } from "@/components/add-to-cart-animation";

export default function LoginPage() {
    return (
        <main style={{ backgroundColor: "#FFFFFF", color: "#1D1A05" }} className="min-h-screen antialiased overflow-x-hidden">
            <Header />
            <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md">
                    <Squircle className="p-8" innerClassName="space-y-6" ariaLabel="login">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold" style={{ color: "#1D1A05" }}>
                                Welcome to Chaah Paat
                            </h1>
                            <p className="mt-2 text-sm" style={{ color: "#1D1A05" }}>
                                Sign in to access your tea collection
                            </p>
                        </div>
                        <Suspense fallback={<div className="text-center py-4">Loading...</div>}>
                            <LoginForm />
                        </Suspense>
                    </Squircle>
                </div>
            </div>
            <div className="px-4">
                <Footer />
            </div>
            <StickyCartBar />
            <AddToCartAnimation />
        </main>
    );
}

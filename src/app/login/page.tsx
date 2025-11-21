"use client";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import LoginForm from "@/components/auth/LoginForm";
export default function LoginPage() {
    return (
        <main style={{ backgroundColor: "#FFFFFF", color: "#1D1A05" }} className="min-h-screen antialiased">
            <Header />
            <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <Suspense fallback={<div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg text-center">Loading...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
            <Footer />
        </main>
    );
}

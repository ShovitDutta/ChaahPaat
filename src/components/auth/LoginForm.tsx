"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await signIn("google", { callbackUrl, redirect: true });
        } catch (error) {
            console.error("Error signing in:", error);
            setIsLoading(false);
        }
    };
    return (
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold" style={{ color: "#1D1A05" }}>
                    Sign in to your account
                </h2>
                <p className="mt-2 text-sm" style={{ color: "#1D1A05" }}>
                    Sign in using Google
                </p>
            </div>
            <div className="mt-8">
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className={`w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    style={{ backgroundColor: "#F5F5F4", color: "#1D1A05", border: "1px solid #D1D5DB" }}
                >
                    {isLoading ? (
                        <span>Signing in...</span>
                    ) : (
                        <span className="flex items-center">
                            <FaGoogle className="mr-2 h-5 w-5" />
                            Sign in with Google
                        </span>
                    )}
                </button>
            </div>
            <div className="text-center text-sm mt-4" style={{ color: "#1D1A05" }}>
                By signing in, you agree to our Terms of Service and Privacy Policy
            </div>
        </div>
    );
}

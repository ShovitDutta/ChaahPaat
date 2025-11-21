"use client";
import Link from "next/link";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useSession, signOut } from "next-auth/react";
import useCartStore from "@/store/cartStore";
export default function DashboardPage() {
    const { data: session, status } = useSession();
    const { items, getTotalItems, getCartTotal, clearCart } = useCartStore();
    const totalItems = getTotalItems();
    const cartTotal = getCartTotal();

    useEffect(() => {
        if (status === "unauthenticated") {
            // Redirect to home page where users can login
            redirect("/");
        }
    }, [status]);
    if (status === "loading") {
        return (
            <main style={{ backgroundColor: "#FFFFFF", color: "#1D1A05" }} className="min-h-screen antialiased">
                <Header />
                <div className="min-h-[80vh] flex items-center justify-center">
                    <p>Loading...</p>
                </div>
                <Footer />
            </main>
        );
    }
    if (!session) return null;
    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
    };
    return (
        <main style={{ backgroundColor: "#FFFFFF", color: "#1D1A05" }} className="min-h-screen antialiased">
            <Header />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold" style={{ color: "#1D1A05" }}>
                                Dashboard
                            </h1>
                            <div className="flex items-center space-x-4">
                                {session?.user && (
                                    <div className="flex items-center space-x-2">
                                        {session.user.image && <img src={session.user.image} alt={session.user.name || "User avatar"} className="w-10 h-10 rounded-full" />}
                                        <span className="text-gray-700">{session.user.name}</span>
                                    </div>
                                )}
                                <button onClick={handleSignOut} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-sm font-medium">
                                    Sign out
                                </button>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4" style={{ color: "#1D1A05" }}>
                                Welcome to your dashboard!
                            </h2>
                            <p className="text-gray-700 mb-6">You are successfully logged in as {session.user?.email || "user"}.</p>

                            {/* Cart Information Section */}
                            {items.length > 0 ? (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-3" style={{ color: "#1D1A05" }}>
                                        Your Cart ({totalItems} items)
                                    </h3>
                                    <div className="space-y-3">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <span className="text-2xl mr-3">{item.emoji}</span>
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-sm text-gray-600">{item.tag}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="mr-4">Qty: {item.quantity}</span>
                                                    <span className="font-medium">₹{item.quantity}</span> {/* Assuming each item costs ₹1 as placeholder */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between font-semibold">
                                        <span>Total Items: {totalItems}</span>
                                        <span>Cart Value: ₹{totalItems}</span> {/* Assuming each item costs ₹1 as placeholder */}
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-3" style={{ color: "#1D1A05" }}>
                                        Your Cart
                                    </h3>
                                    <p className="text-gray-700 mb-4">Your cart is currently empty. Start adding your favorite teas!</p>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3">
                                <Link href="/" className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium">
                                    Go Home
                                </Link>
                                <Link href="/" className="bg-gray-800 hover:bg-black text-white py-2 px-4 rounded-md text-sm font-medium">
                                    View Collection
                                </Link>
                                {items.length > 0 && (
                                    <button
                                        onClick={clearCart}
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium"
                                    >
                                        Clear Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

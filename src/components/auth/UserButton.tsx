"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
export default function UserButton() {
    const { data: session, status } = useSession();
    if (status === "loading") {
        return (
            <div className="flex items-center space-x-4">
                <span className="text-gray-700">Loading...</span>
            </div>
        );
    }
    if (!session) {
        return (
            <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-gray-900">
                    Sign In
                </Link>
            </div>
        );
    }
    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                {session.user?.image && <img src={session.user.image} alt={session.user.name || "User avatar"} className="w-8 h-8 rounded-full" />}
                <span className="text-gray-700 hidden md:block">{session.user?.name || session.user?.email}</span>
            </div>
            <button onClick={() => signOut({ redirect: true, callbackUrl: "/" })} className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-md">
                Sign Out
            </button>
        </div>
    );
}

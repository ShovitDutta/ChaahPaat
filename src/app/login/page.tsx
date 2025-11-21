"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            redirect("/");
        }
    }, [status]);

    if (status === "authenticated") {
        return null;
    }

    // For unauthenticated users, redirect to home page where login buttons are available
    if (status === "unauthenticated") {
        redirect("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Loading...</p>
        </div>
    );
}

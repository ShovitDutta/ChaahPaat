"use client";
import { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
export default function FramerMotionProvider({ children }: { children: ReactNode }) {
    return <MotionConfig transition={{ type: "spring", stiffness: 300, damping: 30 }}> {children} </MotionConfig>;
}
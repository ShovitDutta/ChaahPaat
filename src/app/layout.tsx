import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Roboto_Condensed } from "next/font/google";
import TanStackProvider from "../providers/tanstack-provider";
import FramerMotionProvider from "../providers/framer-motion-provider";

const playfairDisplay = Playfair_Display({
    variable: "--font-playfair-display",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    display: 'swap'
});
const robotoCondensed = Roboto_Condensed({
    variable: "--font-roboto-condensed",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: 'swap'
});
export const metadata: Metadata = { title: "Chaah Paat | Premium Assam Tea from the Heart of Assam", description: "Premium Assam Tea from the Heart of Assam" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${playfairDisplay.variable} ${robotoCondensed.variable} antialiased`}>
                <TanStackProvider>
                    <FramerMotionProvider>{children}</FramerMotionProvider>
                </TanStackProvider>
            </body>
        </html>
    );
}

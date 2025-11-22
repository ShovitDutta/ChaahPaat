import { Squircle } from "@/ui/squircle";
import { motion } from "framer-motion";
import { FaPhone, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
const palette = { bg: "#F2F8F0", card: "#E0EBD0", squircle: "#CDE0B4", accent: "#88B04B", dark: "#203015", shadow: "#152010" };

export function Footer() {
    return (
        <footer className="relative mt-20 overflow-hidden rounded-3xl" style={{ backgroundColor: palette.card }}>
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: palette.accent }} />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: palette.squircle }} />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-3xl">🍵</span>
                            <span className="text-2xl font-bold tracking-tight" style={{ color: palette.dark }}>
                                Chaah Paat
                            </span>
                        </div>
                        <p className="text-lg opacity-80 max-w-md leading-relaxed" style={{ color: palette.dark }}>
                            Bringing the authentic taste of Assam's finest tea gardens directly to your cup. Sustainably sourced, ethically grown, and crafted with passion.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6" style={{ color: palette.dark }}>
                            Explore
                        </h4>
                        <ul className="space-y-4">
                            {["Collection", "Our Story", "Brewing Guide", "Sustainability"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="opacity-70 hover:opacity-100 transition-opacity" style={{ color: palette.dark }}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6" style={{ color: palette.dark }}>
                            Connect
                        </h4>
                        <div className="flex gap-4 mb-6">
                            {[FaInstagram, FaTwitter, FaFacebookF].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                                    style={{ backgroundColor: palette.bg, color: palette.dark }}
                                >
                                    <Icon />
                                </a>
                            ))}
                        </div>
                        <p className="opacity-70 text-sm" style={{ color: palette.dark }}>
                            hello@chaahpaat.com
                            <br />
                            +91 98765 43210
                        </p>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 opacity-60" style={{ borderColor: `${palette.dark}20`, color: palette.dark }}>
                    <p>© 2024 Chaah Paat. All rights reserved.</p>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="hover:underline">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:underline">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

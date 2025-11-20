import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ReactQueryProvider from "./react-query-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Chaah Paat | Premium Assam Tea from the Heart of Assam",
  description: "Premium Assam Tea from the Heart of Assam",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

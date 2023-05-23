"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// export const metadata = {
//   title: "bantang",
//   description: "a blog",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="w-11/12 m-auto container dark:bg-zinc-900">
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Navbar />
          <div className="w-2/4 m-auto">{children}</div>
        </motion.div>
      </body>
    </html>
  );
}

"use client";

import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mi primer proyecto Next",
  description: "LeetClone",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <html lang="es">
        {/* <body className={inter.className} suppressHydrationWarning={true}> */}
        <body className={inter.className}>
          <ToastContainer />
          {children}
        </body>
      </html>
    </RecoilRoot>
  );
}

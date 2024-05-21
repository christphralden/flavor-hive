'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@service/query";
import AuthContextProvider from "@context/auth-context";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>

          <body className={inter.className}>{children}</body>
        </AuthContextProvider>
      </QueryClientProvider>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AuthContextProvider from "@context/auth-context";
import { ReactQueryClientProvider } from "@components/client/react-query-client-provider";


const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: 'FlavorHive',
  description: 'FlavorHive is an app offering personalized restaurant recommendations based on users’ locations and taste preferences, simplifying the search for perfect dining spots.',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryClientProvider>
        <AuthContextProvider>

          <body className={inter.className}>{children}</body>
        </AuthContextProvider>
      </ReactQueryClientProvider>
    </html>
  );
}

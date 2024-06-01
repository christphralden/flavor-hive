import type { Metadata } from "next";
import "./globals.css";
import AuthContextProvider from "@context/auth-context";
import { ReactQueryClientProvider } from "@components/client/react-query-client-provider";
import localFont from 'next/font/local'
import { Toaster } from "@components/ui/sonner";


const restart = localFont({
  src: [
    {
      path: './_fonts/restart_hard/RestartHard-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './_fonts/restart_hard/RestartHard-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './_fonts/restart_hard/RestartHard-Medium.ttf',
      weight: '500',
      style: 'normal`',
    },
    {
      path: './_fonts/restart_hard/RestartHard-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './_fonts/restart_hard/RestartHard-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})


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
          <body className={`${restart.className} w-screen`}>
            {children}
            <Toaster position="top-right" visibleToasts={3}/>
          </body>
        </AuthContextProvider>
      </ReactQueryClientProvider>
    </html>
  );
}

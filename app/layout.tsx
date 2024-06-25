import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";

import { SessionProvider } from "next-auth/react";
import { auth } from "../app/api/auth";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-64x64.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <SessionProvider session={session}>
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                  <div className="inline-block max-w-4xl justify-center w-full">
                    {children}
                    <Toaster />
                  </div>
                </section>
              </main>
              <footer className="w-full flex items-center justify-center py-3">
                <p>&copy; 2023-{new Date().getFullYear()} IHASY.COM</p>
              </footer>
            </SessionProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}

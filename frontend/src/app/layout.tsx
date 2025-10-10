import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Produtos Test",
  description: "Aplicação teste de produtos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="flex h-screen w-screen flex-col antialiased">
        <main className="flex h-full w-full max-w-full flex-1 overflow-hidden min-h-0">
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}

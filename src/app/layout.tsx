import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salman MP | Web Designer & Developer",
  description: "Professional Web Designer & Developer based in Kerala, India. Specialized in creating modern websites, UI/UX design, and digital marketing solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ClientBody>{children}</ClientBody>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

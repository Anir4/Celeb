import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { Toaster } from "sonner";
import SessionProvider from '@/components/SessionProvider';

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: "Celebque",
  description: "Connectez-vous à votre compte Celebque",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <SessionProvider>
          <AuthProvider>
            <SidebarProvider>
            {children}
            <Toaster />
            </SidebarProvider>
          </AuthProvider>
        </SessionProvider>

      </body>
    </html>
  );
}
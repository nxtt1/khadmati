import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import { Chatbot } from "@/components/Chatbot";
import { ThemeProvider } from "@/components/theme-provider";

// Define the LBC font
const lbc = localFont({
  src: "../public/fonts/LBC Regular/LBC Regular.ttf",
  variable: "--font-lbc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khadamati | خدماتي",
  description: "Premier Service Marketplace in Iraq",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      {/* 
        This is the main root layout.
        We apply the custom LBC font and global styles here.
      */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          lbc.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Chatbot />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

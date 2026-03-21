import type { Metadata } from "next";
import "./globals.css";
import { DecorCircle } from "@/shared/ui/DecorCircle";

export const metadata: Metadata = {
  title: "Copymind — Your AI Digital Twin",
  description: "An AI-powered digital twin that helps you understand yourself better through guided self-reflection.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[#0B1220]">
          {/* Breathing background glows — palette from app screenshots */}
          <DecorCircle className="-left-[260px] -top-[260px] bg-[rgba(142,186,212,0.37)]"/>
          {/* <DecorCircle className="-right-[260px] -bottom-[260px] bg-[rgba(58,137,255,0.1)]" /> */}

          <div className="relative z-10 w-full flex items-center justify-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

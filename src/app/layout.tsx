import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import NavMenu from "@/components/home/nav";
import "./globals.css";

const Jakarta = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Togetherly ",
  description: "social events for everyone",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${Jakarta.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavMenu />
        {children}
      </body>
    </html>
  );
}

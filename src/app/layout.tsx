import type { Metadata } from "next";
import { Inclusive_Sans } from "next/font/google";
import "@/styles/globals.css";

const inclusiveSans = Inclusive_Sans({
  variable: "--font-incl-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "briana's sketchbook",
  description: "a collection of things i've made at recurse center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inclusiveSans.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}

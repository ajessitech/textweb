import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
      title: "archer | AI for Private Credit",
    description: "Archer is Cursor for fast-moving designers",
  icons: {
    icon: "/archerlogo.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

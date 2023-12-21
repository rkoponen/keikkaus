import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import logo from "../public/keikkaus.svg";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keikkaus",
  description: "Pelaa parhaita lottopelejä ilman häviämisen vaaraa!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex items-center justify-center my-6">
          <Link href="/">
            <div>
              <Image src={logo} alt="keikkaus" className="w-56" />
            </div>
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}

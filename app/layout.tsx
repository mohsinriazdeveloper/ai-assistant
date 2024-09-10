import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/ReduxToolKit/providers";
import { Toaster } from "react-hot-toast";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "My AI Companion | Create & Train Custom AI Agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>
        <Toaster position="top-right" reverseOrder={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

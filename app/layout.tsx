import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Providers from "./components/ReduxToolKit/providers";
import "./globals.css";

// Initialize the Noto Sans font
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Include desired font weights
  style: ["normal", "italic"], // Include styles if needed
  display: "swap", // Use font-display: swap for better loading
});

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
      <body className="font-customQuicksand">
        <Toaster position="top-right" reverseOrder={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

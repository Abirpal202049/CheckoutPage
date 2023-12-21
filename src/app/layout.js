import { Inter } from "next/font/google";
import "./globals.css";
import ThemeWrapperContext from "@/context/ThemeWrapperContext";
import Navbar from "@/components/Navbar";
import QueryProviderWrapper from "@/context/QueryProviderWrapper";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GROWW Checkout Page",
  description: "Checkout Page for Groww",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProviderWrapper>
          <ThemeWrapperContext>
            <Navbar />
            {children}
            <Toaster />
          </ThemeWrapperContext>
        </QueryProviderWrapper>
      </body>
    </html>
  );
}

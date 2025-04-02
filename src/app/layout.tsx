import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import Navbar from "./components/navbar/navbar";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight:["100","200","300","400","500","600","700","800","900"] });

export const metadata: Metadata = {
  title: "Sezer Şeker",
  description: "Sezer Şeker portfolyo",
}; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="container">
          <div className="wrapper">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

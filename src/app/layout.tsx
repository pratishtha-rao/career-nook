import type { Metadata } from "next";
import { Urbanist, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: [
    "500",
    "600",
    "700",
    "800"
  ],
});


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700"
  ],
});


export const metadata: Metadata = {
  title: "Career Nook",
  description: "Your personal job search manager",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

return (

<html
lang="en"
className={`
${urbanist.variable}
${poppins.variable}
h-full
antialiased
`}
>


<body>

<Navbar />

{children}

<Footer />

</body>


</html>

);

}
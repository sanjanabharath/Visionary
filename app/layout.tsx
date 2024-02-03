import { Work_Sans } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

import Room from "./Room";

export const metadata = {
  title: "Visionary",
  description: "A free tool for creating diagrams and drawing",
  icons: {
    icon: "/brush.png", // /public path
  },
};

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    {/* <Head>
      <link rel='icon' href='/favicon.ico' />
    </Head> */}
    <body className={`${workSans.className} bg-zinc-200`}>
      <Room>
        <TooltipProvider>{children}</TooltipProvider>
      </Room>
    </body>
  </html>
);

export default RootLayout;

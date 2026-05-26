import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/system/SmoothScroll";
import Cursor from "@/components/system/Cursor";
import Grain from "@/components/system/Grain";
import { DimensionProvider } from "@/components/system/DimensionContext";
import DimensionToggle from "@/components/system/DimensionToggle";
import ScrollProgress from "@/components/system/ScrollProgress";

export const metadata: Metadata = {
  title: "Inna — Designer · UAL · London",
  description:
    "Portfolio of Inna — UI/UX, web, brand & logo designer studying at UAL, London. A digital exhibition of cinematic, emotional design.",
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DimensionProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Grain />
          <Cursor />
          <ScrollProgress />
          <DimensionToggle />
        </DimensionProvider>
      </body>
    </html>
  );
}

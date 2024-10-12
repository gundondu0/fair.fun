import "./globals.css";
import Navbar from "../components/layout/Navbar";
import { Roboto, Indie_Flower } from "next/font/google";
import { FontProvider } from "../contexts/FontContext";
import FontWrapper from "../wrappers/FontWrapper";
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../contexts/ThemeContext";
import { SuiProvider } from "../wrappers/SuiProvider";
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-indie-flower",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${indieFlower.variable}`}>
      <body className={indieFlower.className}>
        <SuiProvider>
          <ThemeProvider>
            <FontProvider>
              <FontWrapper>
                <Navbar />
                {children}
                <Footer />
              </FontWrapper>
            </FontProvider>
          </ThemeProvider>
        </SuiProvider>
      </body>
    </html>
  );
}

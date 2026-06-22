import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-serif", display: "swap" });

export const metadata = {
  title: "VALVERDE CLINIC — косметология и реабилитация в Уфе",
  description: "Инъекционная, аппаратная и терапевтическая косметология. Реабилитация после пластической хирургии.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>{children}</body>
    </html>
  );
}
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "LUMIÈRE — Студия красоты",
  description: "Премиальная студия косметологии. Инъекции, аппаратные процедуры, лазер, уходы.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "АСТ Империал Строй | Строительство СЭС в Кыргызстане",
  description: "Строительство солнечных электростанций (СЭС) мощностью 325 МВт в Кыргызстане.",
  openGraph: {
    title: "АСТ Империал Строй | Строительство СЭС в Кыргызстане",
    description: "Строительство солнечных электростанций (СЭС) мощностью 325 МВт в Кыргызстане.",
    siteName: "АСТ Империал Строй",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}

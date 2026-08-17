import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alastair",
  description: "金融工程 × 量化 × AI 的交叉开发者",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="bg-bg font-sans text-fg antialiased">{children}</body>
    </html>
  );
}

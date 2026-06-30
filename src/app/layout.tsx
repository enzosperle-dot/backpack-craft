import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Backpack Craft — Mod de Mochilas para Minecraft",
    template: "%s | Backpack Craft",
  },
  description:
    "Backpack Craft é um mod de mochilas moderno, leve e completo para Minecraft. Suporte para Forge e Fabric nas versões 1.16.5 até 1.21.x.",
  keywords: [
    "Minecraft mod",
    "backpack mod",
    "mochila minecraft",
    "forge mod",
    "fabric mod",
    "storage mod",
    "backpack craft",
  ],
  openGraph: {
    title: "Backpack Craft — Mod de Mochilas para Minecraft",
    description:
      "Mod de mochilas moderno, leve e completo para Minecraft. Suporte Forge/Fabric 1.16.5 até 1.21.x.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

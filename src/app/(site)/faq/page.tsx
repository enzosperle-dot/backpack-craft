import { prisma } from "@/lib/prisma";
import FAQSection from "@/components/sections/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Perguntas frequentes sobre o Backpack Craft.",
};

export const dynamic = "force-dynamic";

export default async function FAQPage() {
  const items = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="min-h-screen pt-16">
      <FAQSection items={items} />
    </div>
  );
}

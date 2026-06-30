import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Gallery from "@/components/sections/Gallery";
import VersionsPreview from "@/components/sections/VersionsPreview";
import Installation from "@/components/sections/Installation";
import FAQSection from "@/components/sections/FAQSection";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getData() {
  const [versions, gallery, faq] = await Promise.all([
    prisma.modVersion.findMany({ orderBy: { releaseDate: "desc" } }),
    prisma.galleryImage.findMany({ orderBy: { order: "asc" } }),
    prisma.faqItem.findMany({ orderBy: { order: "asc" } }),
  ]);
  return { versions, gallery, faq };
}

export default async function HomePage() {
  const { versions, gallery, faq } = await getData();

  return (
    <>
      <Hero />
      <Features />
      <Gallery images={gallery} />
      <VersionsPreview versions={versions} />
      <Installation />
      <FAQSection items={faq} preview />
    </>
  );
}

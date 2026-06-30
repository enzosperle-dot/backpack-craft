import { prisma } from "@/lib/prisma";
import VersionsClient from "./VersionsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Versões",
  description: "Todas as versões do Backpack Craft para Minecraft.",
};

export const dynamic = "force-dynamic";

export default async function VersoesPage() {
  const versions = await prisma.modVersion.findMany({
    orderBy: { releaseDate: "desc" },
    include: { changelog: true },
  });

  return <VersionsClient versions={versions} />;
}

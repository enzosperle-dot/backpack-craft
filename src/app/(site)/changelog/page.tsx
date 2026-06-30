import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import ChangelogClient from "./ChangelogClient";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Histórico de atualizações do Backpack Craft.",
};

export const dynamic = "force-dynamic";

export default async function ChangelogPage() {
  const versions = await prisma.modVersion.findMany({
    orderBy: { releaseDate: "desc" },
    include: { changelog: true },
  });

  return <ChangelogClient versions={versions} />;
}

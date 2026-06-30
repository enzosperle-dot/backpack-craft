import { prisma } from "@/lib/prisma";
import DownloadClient from "./DownloadClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download",
  description: "Baixe o Backpack Craft para sua versão do Minecraft.",
};

export const dynamic = "force-dynamic";

export default async function DownloadPage() {
  const versions = await prisma.modVersion.findMany({
    orderBy: { releaseDate: "desc" },
  });

  return <DownloadClient versions={versions} />;
}

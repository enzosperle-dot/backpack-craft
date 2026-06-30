import { prisma } from "@/lib/prisma";
import { Download, Layers, Image, HelpCircle, TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default async function AdminDashboard() {
  const [versionsCount, galleryCount, faqCount, totalDownloads] = await Promise.all([
    prisma.modVersion.count(),
    prisma.galleryImage.count(),
    prisma.faqItem.count(),
    prisma.modVersion.aggregate({ _sum: { downloads: true } }),
  ]);

  const stats = [
    {
      label: "Total de Downloads",
      value: formatNumber(totalDownloads._sum.downloads || 0),
      icon: TrendingUp,
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/20",
    },
    {
      label: "Versões Publicadas",
      value: versionsCount,
      icon: Layers,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Imagens na Galeria",
      value: galleryCount,
      icon: Image,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      label: "Perguntas no FAQ",
      value: faqCount,
      icon: HelpCircle,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Visão geral do Backpack Craft</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-5 rounded-2xl border ${stat.bg} flex items-center gap-4`}
          >
            <div className={`w-11 h-11 rounded-xl ${stat.bg} border flex items-center justify-center flex-shrink-0`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-card border border-white/8">
        <h2 className="font-display font-semibold text-foreground mb-2">
          Ações rápidas
        </h2>
        <p className="text-muted text-sm">
          Use o menu lateral para navegar entre as seções do painel administrativo.
          Você pode gerenciar versões, galeria, FAQ, changelog e configurações do site.
        </p>
      </div>
    </div>
  );
}

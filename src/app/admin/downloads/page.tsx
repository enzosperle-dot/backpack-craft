import { prisma } from "@/lib/prisma";
import { formatDate, formatNumber } from "@/lib/utils";
import { Download, TrendingUp } from "lucide-react";

export default async function AdminDownloadsPage() {
  const versions = await prisma.modVersion.findMany({
    orderBy: { downloads: "desc" },
  });

  const total = versions.reduce((acc, v) => acc + v.downloads, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold">Downloads</h1>
        <p className="text-muted text-sm mt-1">Estatísticas de download por versão</p>
      </div>

      <div className="flex items-center gap-4 p-5 rounded-2xl bg-primary/8 border border-primary/20 mb-6">
        <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-3xl font-display font-bold text-foreground">
            {formatNumber(total)}
          </p>
          <p className="text-sm text-muted">Downloads totais em todas as versões</p>
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-white/8 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 text-muted text-xs uppercase tracking-wider">
              <th className="px-5 py-3 text-left">Versão</th>
              <th className="px-5 py-3 text-left">Arquivo</th>
              <th className="px-5 py-3 text-left">Data</th>
              <th className="px-5 py-3 text-right">Downloads</th>
              <th className="px-5 py-3 text-right">Participação</th>
            </tr>
          </thead>
          <tbody>
            {versions.map((v) => (
              <tr key={v.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                <td className="px-5 py-4">
                  <span className="font-semibold">MC {v.mcVersion}</span>
                  <span className="text-muted ml-2">v{v.modVersion}</span>
                </td>
                <td className="px-5 py-4 text-muted text-xs font-mono">{v.fileName}</td>
                <td className="px-5 py-4 text-muted">{formatDate(v.releaseDate)}</td>
                <td className="px-5 py-4 text-right font-semibold text-primary">
                  {v.downloads.toLocaleString("pt-BR")}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.round((v.downloads / total) * 100)}%` }}
                      />
                    </div>
                    <span className="text-muted text-xs w-8 text-right">
                      {Math.round((v.downloads / total) * 100)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

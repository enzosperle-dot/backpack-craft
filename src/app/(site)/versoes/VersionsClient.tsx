"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Download, Calendar, HardDrive, Filter } from "lucide-react";
import { formatDate, formatNumber } from "@/lib/utils";

interface ModVersion {
  id: string;
  mcVersion: string;
  modVersion: string;
  loader: string;
  releaseDate: Date;
  status: string;
  fileSize: string;
  fileName: string;
  downloadUrl: string;
  downloads: number;
}

export default function VersionsClient({ versions }: { versions: ModVersion[] }) {
  const [loaderFilter, setLoaderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = versions.filter((v) => {
    if (loaderFilter !== "all" && !v.loader.toLowerCase().includes(loaderFilter)) return false;
    if (statusFilter !== "all" && v.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Versões
          </div>
          <h1 className="section-title mb-4">
            Versões <span className="text-gradient">disponíveis</span>
          </h1>
          <p className="section-subtitle">
            Escolha a versão correta para seu Minecraft e loader.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-10"
        >
          <div className="flex items-center gap-2 text-muted text-sm">
            <Filter className="w-4 h-4" />
            Filtrar:
          </div>

          <div className="flex flex-wrap gap-2">
            {["all", "forge", "fabric"].map((l) => (
              <button
                key={l}
                onClick={() => setLoaderFilter(l)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  loaderFilter === l
                    ? "bg-primary text-black"
                    : "bg-white/5 text-muted hover:bg-white/10 hover:text-foreground border border-white/10"
                }`}
              >
                {l === "all" ? "Todos os Loaders" : l.charAt(0).toUpperCase() + l.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {["all", "stable", "beta"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  statusFilter === s
                    ? "bg-primary text-black"
                    : "bg-white/5 text-muted hover:bg-white/10 hover:text-foreground border border-white/10"
                }`}
              >
                {s === "all" ? "Todos os Status" : s === "stable" ? "Estável" : "Beta"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Versions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((version, index) => (
            <motion.div
              key={version.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="relative rounded-2xl p-6 bg-card border border-white/8 hover:border-primary/25 transition-all duration-300 group shadow-card hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-xl font-display font-bold">
                    MC {version.mcVersion}
                  </h3>
                  <p className="text-muted text-sm mt-0.5">
                    v{version.modVersion}
                  </p>
                </div>
                <span
                  className={
                    version.status === "stable"
                      ? "version-badge-stable"
                      : "version-badge-beta"
                  }
                >
                  {version.status === "stable" ? "Estável" : "Beta"}
                </span>
              </div>

              <div className="space-y-2.5 mb-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Loader</span>
                  <span className="font-medium text-foreground">{version.loader}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Lançamento
                  </span>
                  <span className="text-foreground">{formatDate(version.releaseDate)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5" /> Tamanho
                  </span>
                  <span className="text-foreground">{version.fileSize}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Downloads</span>
                  <span className="text-primary font-semibold">
                    {formatNumber(version.downloads)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={version.downloadUrl}
                  className="flex-1 btn-primary justify-center text-sm py-2.5"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
                <Link
                  href={`/changelog#${version.id}`}
                  className="btn-secondary text-sm py-2.5 px-4"
                >
                  Changelog
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted">
            Nenhuma versão encontrada com esses filtros.
          </div>
        )}
      </div>
    </div>
  );
}

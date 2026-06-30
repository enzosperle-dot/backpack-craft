"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, AlertCircle, FileArchive, Calendar, HardDrive, Filter } from "lucide-react";
import { formatDate } from "@/lib/utils";

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

export default function DownloadClient({ versions }: { versions: ModVersion[] }) {
  const [mcFilter, setMcFilter] = useState("all");
  const [loaderFilter, setLoaderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const mcVersions = Array.from(new Set(versions.map((v) => v.mcVersion)));

  const filtered = versions.filter((v) => {
    if (mcFilter !== "all" && v.mcVersion !== mcFilter) return false;
    if (loaderFilter !== "all" && !v.loader.toLowerCase().includes(loaderFilter)) return false;
    if (statusFilter !== "all" && v.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Download
          </div>
          <h1 className="section-title mb-4">
            Baixar <span className="text-gradient">Backpack Craft</span>
          </h1>
          <p className="section-subtitle">
            Escolha a versão compatível com seu Minecraft e loader.
          </p>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/8 border border-amber-500/25 mb-8"
        >
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-amber-200/80 text-sm">
            <span className="font-semibold text-amber-300">Atenção:</span> Baixe sempre a versão
            compatível com seu Minecraft e loader. Uma versão errada pode causar crashes.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="p-4 rounded-xl bg-card border border-white/8 mb-6"
        >
          <div className="flex items-center gap-2 text-muted text-xs font-medium uppercase tracking-wider mb-3">
            <Filter className="w-3.5 h-3.5" /> Filtros
          </div>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-xs text-muted mb-1.5 block">Versão do Minecraft</label>
              <div className="flex flex-wrap gap-1.5">
                {["all", ...mcVersions].map((v) => (
                  <button
                    key={v}
                    onClick={() => setMcFilter(v)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      mcFilter === v
                        ? "bg-primary text-black"
                        : "bg-white/5 text-muted hover:bg-white/10"
                    }`}
                  >
                    {v === "all" ? "Todos" : v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-muted mb-1.5 block">Loader</label>
              <div className="flex gap-1.5">
                {["all", "forge", "fabric"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLoaderFilter(l)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      loaderFilter === l
                        ? "bg-primary text-black"
                        : "bg-white/5 text-muted hover:bg-white/10"
                    }`}
                  >
                    {l === "all" ? "Todos" : l.charAt(0).toUpperCase() + l.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-muted mb-1.5 block">Status</label>
              <div className="flex gap-1.5">
                {["all", "stable", "beta"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      statusFilter === s
                        ? "bg-primary text-black"
                        : "bg-white/5 text-muted hover:bg-white/10"
                    }`}
                  >
                    {s === "all" ? "Todos" : s === "stable" ? "Estável" : "Beta"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download list */}
        <div className="space-y-3">
          {filtered.map((version, index) => (
            <motion.div
              key={version.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl bg-card border border-white/8 hover:border-primary/25 transition-all duration-300"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <FileArchive className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">
                    {version.fileName}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <span className="text-xs text-muted">MC {version.mcVersion}</span>
                    <span className="text-xs text-muted">•</span>
                    <span className="text-xs text-muted">{version.loader}</span>
                    <span className="text-xs text-muted flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(version.releaseDate)}
                    </span>
                    <span className="text-xs text-muted flex items-center gap-1">
                      <HardDrive className="w-3 h-3" />
                      {version.fileSize}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={
                    version.status === "stable"
                      ? "version-badge-stable"
                      : "version-badge-beta"
                  }
                >
                  {version.status === "stable" ? "Estável" : "Beta"}
                </span>
                <a
                  href={version.downloadUrl}
                  className="btn-primary text-sm py-2 px-4"
                >
                  <Download className="w-4 h-4" />
                  Baixar
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted">
            Nenhuma versão encontrada com esses filtros.
          </div>
        )}
      </div>
    </div>
  );
}

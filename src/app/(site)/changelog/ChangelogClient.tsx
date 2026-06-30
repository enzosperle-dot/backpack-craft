"use client";

import { motion } from "framer-motion";
import { Plus, Wrench, TrendingUp, Download, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface Changelog {
  additions: string[];
  fixes: string[];
  improvements: string[];
}

interface ModVersion {
  id: string;
  mcVersion: string;
  modVersion: string;
  loader: string;
  releaseDate: Date;
  status: string;
  downloadUrl: string;
  changelog: Changelog | null;
}

export default function ChangelogClient({ versions }: { versions: ModVersion[] }) {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Changelog
          </div>
          <h1 className="section-title mb-4">
            Histórico de <span className="text-gradient">atualizações</span>
          </h1>
          <p className="section-subtitle">
            Acompanhe todas as novidades, correções e melhorias do Backpack Craft.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          <div className="space-y-8">
            {versions.map((version, index) => (
              <motion.div
                key={version.id}
                id={version.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-5 w-9 h-9 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>

                <div className="rounded-2xl bg-card border border-white/8 overflow-hidden">
                  {/* Header */}
                  <div className="p-5 border-b border-white/8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display font-bold text-lg">
                            v{version.modVersion}
                          </h3>
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
                        <div className="flex items-center gap-3 text-sm text-muted">
                          <span>MC {version.mcVersion}</span>
                          <span>•</span>
                          <span>{version.loader}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(version.releaseDate)}
                          </span>
                        </div>
                      </div>
                      <a href={version.downloadUrl} className="btn-primary text-sm py-2 px-4">
                        <Download className="w-3.5 h-3.5" />
                        Baixar
                      </a>
                    </div>
                  </div>

                  {/* Changelog content */}
                  {version.changelog ? (
                    <div className="p-5 space-y-5">
                      {version.changelog.additions.length > 0 && (
                        <div>
                          <h4 className="flex items-center gap-2 text-sm font-semibold text-green-400 mb-3">
                            <Plus className="w-4 h-4" />
                            Novidades
                          </h4>
                          <ul className="space-y-2">
                            {version.changelog.additions.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                                <span className="text-green-500 mt-1 flex-shrink-0">+</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {version.changelog.fixes.length > 0 && (
                        <div>
                          <h4 className="flex items-center gap-2 text-sm font-semibold text-red-400 mb-3">
                            <Wrench className="w-4 h-4" />
                            Correções
                          </h4>
                          <ul className="space-y-2">
                            {version.changelog.fixes.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                                <span className="text-red-400 mt-1 flex-shrink-0">✕</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {version.changelog.improvements.length > 0 && (
                        <div>
                          <h4 className="flex items-center gap-2 text-sm font-semibold text-blue-400 mb-3">
                            <TrendingUp className="w-4 h-4" />
                            Melhorias
                          </h4>
                          <ul className="space-y-2">
                            {version.changelog.improvements.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                                <span className="text-blue-400 mt-1 flex-shrink-0">↑</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-5 text-muted text-sm">
                      Changelog não disponível para esta versão.
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

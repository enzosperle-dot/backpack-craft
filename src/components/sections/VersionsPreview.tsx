"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, ArrowRight, Calendar, HardDrive } from "lucide-react";
import { formatDate, formatNumber } from "@/lib/utils";

interface ModVersion {
  id: string;
  mcVersion: string;
  modVersion: string;
  loader: string;
  releaseDate: Date;
  status: string;
  fileSize: string;
  downloadUrl: string;
  downloads: number;
}

interface VersionsPreviewProps {
  versions: ModVersion[];
}

export default function VersionsPreview({ versions }: VersionsPreviewProps) {
  const featured = versions.slice(0, 3);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Versões
            </div>
            <h2 className="section-title">
              Versões <span className="text-gradient">disponíveis</span>
            </h2>
          </div>
          <Link
            href="/versoes"
            className="btn-secondary flex-shrink-0"
          >
            Ver todas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((version, index) => (
            <motion.div
              key={version.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                index === 0
                  ? "border-primary/30 bg-primary/5 shadow-glow-sm"
                  : "border-white/8 bg-card hover:border-white/15"
              }`}
            >
              {index === 0 && (
                <div className="absolute -top-3 left-6">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary text-black uppercase tracking-wider">
                    Mais recente
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">
                    MC {version.mcVersion}
                  </p>
                  <p className="text-muted text-sm mt-0.5">
                    Backpack Craft v{version.modVersion}
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

              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted">Loader:</span>
                  <span className="text-foreground font-medium">
                    {version.loader}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-3.5 h-3.5 text-muted" />
                  <span className="text-muted">
                    {formatDate(version.releaseDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HardDrive className="w-3.5 h-3.5 text-muted" />
                  <span className="text-muted">{version.fileSize}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={version.downloadUrl}
                  className="flex-1 btn-primary justify-center text-sm py-2.5"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
                <Link
                  href={`/changelog#${version.id}`}
                  className="btn-secondary text-sm py-2.5 px-3"
                >
                  Log
                </Link>
              </div>

              <p className="text-center text-xs text-muted mt-3">
                {formatNumber(version.downloads)} downloads
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

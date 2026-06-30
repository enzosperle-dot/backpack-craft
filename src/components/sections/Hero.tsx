"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, ChevronDown, Cpu, Layers, Tag, Grid3X3 } from "lucide-react";

const stats = [
  { icon: Tag, label: "Mod", value: "Backpack Craft" },
  { icon: Cpu, label: "Loader", value: "Forge / Fabric" },
  { icon: Layers, label: "Versões", value: "1.16.5 → 1.21.x" },
  { icon: Grid3X3, label: "Categoria", value: "Storage / Backpacks" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none"
        style={{ maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)" }}
      />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/10 text-primary text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Versão 2.0.0 disponível para Minecraft 1.21.x
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter mb-6"
        >
          Backpack
          <br />
          <span className="text-gradient glow-text">Craft</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl font-medium text-white/80 mb-4"
        >
          Um mod de mochilas moderno, leve e completo para Minecraft.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted text-base md:text-lg max-w-2xl mx-auto mb-10"
        >
          Leve mais itens, organize sua aventura e use mochilas personalizáveis
          em várias versões do Minecraft.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/download" className="btn-primary text-base px-8 py-4">
            <Download className="w-5 h-5" />
            Baixar Agora
          </Link>
          <Link href="/versoes" className="btn-secondary text-base px-8 py-4">
            Ver Versões
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="inline-grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/8 glass"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-1.5 px-6 py-5 ${
                i < stats.length - 1 ? "border-r border-white/5" : ""
              }`}
            >
              <stat.icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted uppercase tracking-wider font-medium">
                {stat.label}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          Rolar
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

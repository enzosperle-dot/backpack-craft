"use client";

import { motion } from "framer-motion";
import {
  Package,
  Zap,
  Palette,
  LayoutGrid,
  Layers,
  Cpu,
  Hammer,
  FolderOpen,
} from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Vários Tamanhos",
    description:
      "Mochilas pequenas, médias e grandes com capacidades diferentes para cada necessidade.",
  },
  {
    icon: Zap,
    title: "Sistema de Upgrades",
    description:
      "Expanda a capacidade das suas mochilas com upgrades craftáveis no banco de trabalho.",
  },
  {
    icon: Palette,
    title: "Mochilas Coloridas",
    description:
      "Personalize com 16 cores diferentes para organizar sua coleção do jeito que preferir.",
  },
  {
    icon: LayoutGrid,
    title: "Interface Simples",
    description:
      "UI limpa e intuitiva que não polui o inventário. Acesso rápido e sem complicações.",
  },
  {
    icon: Layers,
    title: "Multi-versão",
    description:
      "Suporte oficial para Minecraft 1.16.5 até 1.21.x com Forge e Fabric.",
  },
  {
    icon: Cpu,
    title: "Alta Performance",
    description:
      "Código otimizado com impacto mínimo no TPS do servidor e FPS do cliente.",
  },
  {
    icon: Hammer,
    title: "Crafting Balanceado",
    description:
      "Receitas pensadas para manter o equilíbrio do jogo em qualquer estágio.",
  },
  {
    icon: FolderOpen,
    title: "Organização Total",
    description:
      "Ordene, filtre e acesse seus itens de forma rápida diretamente na mochila.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="recursos" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Recursos
          </div>
          <h2 className="section-title mb-4">
            Tudo que você precisa em{" "}
            <span className="text-gradient">uma mochila</span>
          </h2>
          <p className="section-subtitle">
            O Backpack Craft traz os recursos essenciais com qualidade e
            performance sem comprometer a experiência vanilla.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="feature-card group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-base text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

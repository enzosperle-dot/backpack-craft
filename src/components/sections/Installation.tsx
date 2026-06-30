"use client";

import { motion } from "framer-motion";
import { Download, FolderOpen, Play, Hammer, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Hammer,
    title: "Instale o Loader",
    description:
      "Baixe e instale o Forge ou Fabric compatível com sua versão do Minecraft.",
  },
  {
    number: "02",
    icon: Download,
    title: "Baixe o Backpack Craft",
    description:
      "Na aba de Download, escolha a versão correta para seu Minecraft e loader.",
  },
  {
    number: "03",
    icon: FolderOpen,
    title: "Coloque na pasta mods",
    description:
      'Mova o arquivo .jar para a pasta "mods" dentro do seu diretório do Minecraft.',
  },
  {
    number: "04",
    icon: Play,
    title: "Abra com o perfil correto",
    description:
      "Inicie o Minecraft usando o perfil do Forge ou Fabric que você instalou.",
  },
  {
    number: "05",
    icon: Sparkles,
    title: "Aproveite o mod!",
    description:
      "Crie sua primeira mochila no banco de trabalho e comece a aventura organizada.",
  },
];

export default function Installation() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Instalação
          </div>
          <h2 className="section-title mb-4">
            Instale em <span className="text-gradient">5 minutos</span>
          </h2>
          <p className="section-subtitle">
            Processo simples e direto. Siga os passos abaixo e comece a usar o
            Backpack Craft imediatamente.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 -translate-x-1/2" />

          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative lg:flex ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-8 lg:mb-12`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                  }`}
                >
                  <div
                    className={`inline-flex items-start gap-4 p-6 rounded-2xl bg-card border border-white/8 hover:border-primary/25 transition-all duration-300 group max-w-md ${
                      index % 2 === 0 ? "lg:ml-auto" : ""
                    }`}
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className={index % 2 === 0 ? "lg:text-right" : ""}>
                      <span className="text-primary text-xs font-bold uppercase tracking-wider">
                        Passo {step.number}
                      </span>
                      <h3 className="font-display font-semibold text-foreground mt-0.5 mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex w-5 h-5 rounded-full bg-primary border-2 border-background z-10 flex-shrink-0 shadow-glow-sm" />

                {/* Empty space for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

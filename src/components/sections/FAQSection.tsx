"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FaqItem[];
  preview?: boolean;
}

export default function FAQSection({ items, preview = false }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const displayed = preview ? items.slice(0, 5) : items;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            FAQ
          </div>
          <h2 className="section-title mb-4">
            Perguntas <span className="text-gradient">frequentes</span>
          </h2>
          <p className="section-subtitle">
            Tire suas dúvidas sobre o Backpack Craft.
          </p>
        </motion.div>

        <div className="space-y-3">
          {displayed.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                openId === item.id
                  ? "border-primary/30 bg-primary/5"
                  : "border-white/8 bg-card hover:border-white/15"
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                onClick={() =>
                  setOpenId(openId === item.id ? null : item.id)
                }
              >
                <span className="font-medium text-foreground text-sm sm:text-base">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center"
                >
                  <ChevronDown className="w-4 h-4 text-muted" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-5 pb-5">
                      <div className="h-px bg-white/8 mb-4" />
                      <p className="text-muted text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {preview && items.length > 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Link href="/faq" className="btn-secondary">
              Ver todas as perguntas
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

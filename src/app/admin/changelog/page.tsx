"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Loader2, X, Check, Plus, Minus } from "lucide-react";

interface ChangelogEntry {
  additions: string[];
  fixes: string[];
  improvements: string[];
}

interface ModVersion {
  id: string;
  mcVersion: string;
  modVersion: string;
  changelog: ChangelogEntry | null;
}

export default function AdminChangelogPage() {
  const [versions, setVersions] = useState<ModVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<ModVersion | null>(null);
  const [form, setForm] = useState<ChangelogEntry>({ additions: [""], fixes: [""], improvements: [""] });
  const [saving, setSaving] = useState(false);

  const fetchVersions = async () => {
    const res = await fetch("/api/admin/versions");
    setVersions(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchVersions(); }, []);

  const openEdit = (v: ModVersion) => {
    setSelectedVersion(v);
    setForm(v.changelog || { additions: [""], fixes: [""], improvements: [""] });
    setShowForm(true);
  };

  const updateList = (key: keyof ChangelogEntry, index: number, value: string) => {
    setForm((prev) => ({ ...prev, [key]: prev[key].map((item, i) => i === index ? value : item) }));
  };

  const addItem = (key: keyof ChangelogEntry) => {
    setForm((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const removeItem = (key: keyof ChangelogEntry, index: number) => {
    setForm((prev) => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
  };

  const handleSave = async () => {
    if (!selectedVersion) return;
    setSaving(true);
    const cleanedForm = {
      additions: form.additions.filter(Boolean),
      fixes: form.fixes.filter(Boolean),
      improvements: form.improvements.filter(Boolean),
    };
    await fetch(`/api/admin/changelog`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modVersionId: selectedVersion.id, ...cleanedForm }),
    });
    setSaving(false);
    setShowForm(false);
    fetchVersions();
  };

  const ListEditor = ({ label, key: listKey, color }: { label: string; key: keyof ChangelogEntry; color: string }) => (
    <div>
      <label className={`block text-xs font-semibold ${color} mb-2`}>{label}</label>
      <div className="space-y-2">
        {form[listKey].map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateList(listKey, i, e.target.value)}
              placeholder={`Item ${i + 1}...`}
              className="flex-1 px-3 py-2 rounded-lg bg-background border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all"
            />
            <button onClick={() => removeItem(listKey, i)} className="p-2 rounded-lg text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors">
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button onClick={() => addItem(listKey)} className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Adicionar item
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold">Changelog</h1>
        <p className="text-muted text-sm mt-1">Edite o changelog de cada versão</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {versions.map((v) => (
            <div key={v.id} className="flex items-center justify-between gap-4 p-5 rounded-xl bg-card border border-white/8 hover:border-white/15 transition-all">
              <div>
                <p className="font-semibold">v{v.modVersion} — MC {v.mcVersion}</p>
                <p className="text-xs text-muted mt-0.5">
                  {v.changelog
                    ? `${v.changelog.additions.length} novidades, ${v.changelog.fixes.length} correções, ${v.changelog.improvements.length} melhorias`
                    : "Sem changelog"}
                </p>
              </div>
              <button onClick={() => openEdit(v)} className="btn-secondary text-sm py-2 px-4">
                <Pencil className="w-3.5 h-3.5" /> Editar
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm && selectedVersion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-card border border-white/10 rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold">
                Changelog v{selectedVersion.modVersion}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-muted hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-6">
              <ListEditor label="✦ Novidades" key="additions" color="text-green-400" />
              <ListEditor label="✕ Correções" key="fixes" color="text-red-400" />
              <ListEditor label="↑ Melhorias" key="improvements" color="text-blue-400" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="btn-secondary">Cancelar</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

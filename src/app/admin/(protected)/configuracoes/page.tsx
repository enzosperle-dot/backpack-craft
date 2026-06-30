"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, Check } from "lucide-react";

const configFields = [
  { key: "hero_title", label: "Título do Hero", placeholder: "Backpack Craft" },
  { key: "hero_subtitle", label: "Subtítulo do Hero", placeholder: "Um mod de mochilas..." },
  { key: "hero_description", label: "Descrição do Hero", placeholder: "Leve mais itens..." },
  { key: "discord_url", label: "URL do Discord", placeholder: "https://discord.gg/..." },
  { key: "github_url", label: "URL do GitHub", placeholder: "https://github.com/..." },
  { key: "curseforge_url", label: "URL do CurseForge", placeholder: "https://www.curseforge.com/..." },
  { key: "modrinth_url", label: "URL do Modrinth", placeholder: "https://modrinth.com/..." },
];

export default function AdminConfigPage() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then((data) => { setConfig(data); setLoading(false); });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold">Configurações</h1>
          <p className="text-muted text-sm mt-1">Edite os textos e links do site</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saved ? (
            <><Check className="w-4 h-4" /> Salvo!</>
          ) : saving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</>
          ) : (
            <><Save className="w-4 h-4" /> Salvar alterações</>
          )}
        </button>
      </div>

      <div className="max-w-2xl space-y-5">
        {configFields.map((field) => (
          <div key={field.key} className="p-5 rounded-2xl bg-card border border-white/8">
            <label className="block text-sm font-medium text-foreground mb-2">
              {field.label}
            </label>
            <input
              type="text"
              value={config[field.key] || ""}
              onChange={(e) => setConfig({ ...config, [field.key]: e.target.value })}
              placeholder={field.placeholder}
              className="w-full px-3 py-2.5 rounded-xl bg-background border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

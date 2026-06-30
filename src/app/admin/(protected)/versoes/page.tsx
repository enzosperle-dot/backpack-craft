"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, X, Check } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ModVersion {
  id: string;
  mcVersion: string;
  modVersion: string;
  loader: string;
  releaseDate: string;
  status: string;
  fileSize: string;
  fileName: string;
  downloadUrl: string;
  downloads: number;
}

const emptyForm = {
  mcVersion: "",
  modVersion: "",
  loader: "Forge / Fabric",
  releaseDate: new Date().toISOString().split("T")[0],
  status: "stable",
  fileSize: "",
  fileName: "",
  downloadUrl: "",
};

export default function AdminVersionsPage() {
  const [versions, setVersions] = useState<ModVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ModVersion | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchVersions = async () => {
    const res = await fetch("/api/admin/versions");
    const data = await res.json();
    setVersions(data);
    setLoading(false);
  };

  useEffect(() => { fetchVersions(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (v: ModVersion) => {
    setEditing(v);
    setForm({
      mcVersion: v.mcVersion,
      modVersion: v.modVersion,
      loader: v.loader,
      releaseDate: v.releaseDate.split("T")[0],
      status: v.status,
      fileSize: v.fileSize,
      fileName: v.fileName,
      downloadUrl: v.downloadUrl,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;
    await fetch("/api/admin/versions", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    setShowForm(false);
    fetchVersions();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta versão?")) return;
    await fetch("/api/admin/versions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchVersions();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold">Versões</h1>
          <p className="text-muted text-sm mt-1">Gerencie as versões do mod</p>
        </div>
        <button onClick={openNew} className="btn-primary">
          <Plus className="w-4 h-4" /> Nova versão
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="rounded-2xl bg-card border border-white/8 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-muted text-xs uppercase tracking-wider">
                <th className="px-5 py-3 text-left">Minecraft</th>
                <th className="px-5 py-3 text-left">Mod</th>
                <th className="px-5 py-3 text-left">Loader</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Downloads</th>
                <th className="px-5 py-3 text-left">Data</th>
                <th className="px-5 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {versions.map((v) => (
                <tr key={v.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3.5 font-semibold">{v.mcVersion}</td>
                  <td className="px-5 py-3.5 text-muted">v{v.modVersion}</td>
                  <td className="px-5 py-3.5 text-muted">{v.loader}</td>
                  <td className="px-5 py-3.5">
                    <span className={v.status === "stable" ? "version-badge-stable" : "version-badge-beta"}>
                      {v.status === "stable" ? "Estável" : "Beta"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-muted">{v.downloads.toLocaleString("pt-BR")}</td>
                  <td className="px-5 py-3.5 text-muted">{formatDate(v.releaseDate)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(v)}
                        className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-card border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold">
                {editing ? "Editar versão" : "Nova versão"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-muted hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Versão do Minecraft", key: "mcVersion", placeholder: "1.21.x" },
                { label: "Versão do Mod", key: "modVersion", placeholder: "2.0.0" },
                { label: "Loader", key: "loader", placeholder: "Forge / Fabric" },
                { label: "Tamanho do Arquivo", key: "fileSize", placeholder: "1.2 MB" },
                { label: "Nome do Arquivo", key: "fileName", placeholder: "backpack-craft-2.0.0.jar", colSpan: true },
                { label: "URL de Download", key: "downloadUrl", placeholder: "https://...", colSpan: true },
              ].map((field) => (
                <div key={field.key} className={field.colSpan ? "col-span-2" : ""}>
                  <label className="block text-xs text-muted mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 rounded-xl bg-background border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs text-muted mb-1.5">Data de Lançamento</label>
                <input
                  type="date"
                  value={form.releaseDate}
                  onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs text-muted mb-1.5">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all"
                >
                  <option value="stable">Estável</option>
                  <option value="beta">Beta</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="btn-secondary">
                Cancelar
              </button>
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

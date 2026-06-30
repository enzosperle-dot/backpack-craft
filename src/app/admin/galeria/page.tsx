"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Pencil, Trash2, Loader2, X, Check } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  url: string;
  order: number;
}

const emptyForm = { title: "", description: "", url: "", order: 0 };

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchImages = async () => {
    const res = await fetch("/api/admin/gallery");
    setImages(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

  const openEdit = (img: GalleryImage) => {
    setEditing(img);
    setForm({ title: img.title, description: img.description || "", url: img.url, order: img.order });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;
    await fetch("/api/admin/gallery", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    setShowForm(false);
    fetchImages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta imagem?")) return;
    await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchImages();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold">Galeria</h1>
          <p className="text-muted text-sm mt-1">Gerencie as imagens da galeria</p>
        </div>
        <button onClick={() => { setEditing(null); setForm(emptyForm); setShowForm(true); }} className="btn-primary">
          <Plus className="w-4 h-4" /> Nova imagem
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-2xl overflow-hidden bg-card border border-white/8">
              <div className="aspect-video relative">
                <Image src={img.url} alt={img.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="font-medium text-sm">{img.title}</p>
                {img.description && (
                  <p className="text-muted text-xs mt-0.5 truncate">{img.description}</p>
                )}
                <p className="text-muted text-xs mt-1">Ordem: {img.order}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(img)} className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur flex items-center justify-center text-white hover:text-primary transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(img.id)} className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur flex items-center justify-center text-white hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-card border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold">{editing ? "Editar imagem" : "Nova imagem"}</h2>
              <button onClick={() => setShowForm(false)} className="text-muted hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Título", key: "title", placeholder: "Interface da Mochila" },
                { label: "Descrição", key: "description", placeholder: "Descrição opcional" },
                { label: "URL da Imagem", key: "url", placeholder: "https://..." },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs text-muted mb-1.5">{f.label}</label>
                  <input
                    type="text"
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2 rounded-xl bg-background border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-muted mb-1.5">Ordem</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-white/10 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all"
                />
              </div>
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

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { mockCategories } from "@/data/blog";

// Importa o BlockNote via Dynamic Import para evitar erros de SSR com window.document
const Editor = dynamic(() => import("@/components/blog/blocknote-editor"), {
  ssr: false,
});

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categoryId, setCategoryId] = useState("ai");
  const [contentHtml, setContentHtml] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simula tempo de gravação no DB mockado
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      console.log("Post Salvo:", {
        title,
        coverImage,
        categoryId,
        contentHtml,
      });

      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32">
      {/* Topbar Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-16 z-30 bg-background/80 backdrop-blur-xl py-4 border-b border-border/10">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">
            Escrever Artigo
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Crie um novo post impressionante usando blocos.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50">
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !title}
            className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 min-w-[140px]"
          >
            {isSaving ? (
              "Salvando..."
            ) : isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" /> Salvo
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" /> Publicar
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Meta e Capa (Hero) */}
      <div className="space-y-6 bg-card/50 p-6 rounded-test-test-2xl border border-border/50">
        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título impactante do Artigo..."
            className="text-3xl md:text-5xl font-black h-auto py-4 border-none bg-transparent px-0 focus-visible:ring-0 placeholder:text-muted-foreground/40 uppercase tracking-tighter"
          />

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border/30">
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                URL da Capa
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://images.unsplash..."
                  className="pl-9 bg-background/50"
                />
              </div>
            </div>
            <div className="sm:w-64 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Categoria
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full h-10 rounded-test-test-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {mockCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Live Preview da Capa */}
        {coverImage && (
          <div className="mt-6 aspect-video w-full max-h-[400px] overflow-hidden rounded-test-test-xl border border-border/50 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt="Capa preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Editor Principal (BlockNote) */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">
          Conteúdo do Artigo
        </label>
        <Editor onChange={(html) => setContentHtml(html)} />
      </div>
    </div>
  );
}

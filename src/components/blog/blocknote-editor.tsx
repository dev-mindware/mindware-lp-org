"use client";

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";

interface EditorProps {
  initialContent?: string;
  onChange?: (html: string) => void;
}

export default function BlockNoteEditorComponent({
  initialContent,
  onChange,
}: EditorProps) {
  const { resolvedTheme } = useTheme();

  // Inicializa o editor, usando blocks JSON se initialContent fosse um JSON stringificado
  // mas vamos tratar isso de forma limpa
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
  });

  // Exportar HTML sempre que o documento mudar (útil pra guardar na DB mock)
  const handleChange = async () => {
    if (onChange) {
      const html = await editor.blocksToHTMLLossy(editor.document);
      onChange(html);
    }
  };

  return (
    <div className="min-h-[500px] border border-border/50 rounded-test-test-xl bg-card overflow-hidden">
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={handleChange}
        className="pt-6 pb-24 px-4 sm:px-12"
      />
    </div>
  );
}

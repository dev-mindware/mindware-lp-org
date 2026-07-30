import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarClock, Scale } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { LegalToc, LegalTocMobile } from "./legal-toc";
import type { LegalBlock, LegalDocument as LegalDocumentData } from "@/data/legal";

type RelatedDocument = {
  label: string;
  href: string;
};

type LegalDocumentProps = {
  doc: LegalDocumentData;
  /** Ligações cruzadas para os restantes documentos legais. */
  related?: RelatedDocument[];
};

/** Converte `**assim**` em texto a negrito, mantendo o resto intacto. */
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, index) =>
    chunk.startsWith("**") && chunk.endsWith("**") ? (
      <strong key={index} className="font-bold text-foreground">
        {chunk.slice(2, -2)}
      </strong>
    ) : (
      chunk
    ),
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          {renderInline(block.text)}
        </p>
      );

    case "list":
      return (
        <ul className="space-y-4">
          {block.items.map((item, index) => (
            <li key={index} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-primary"
              />
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {item.label && (
                  <span className="font-bold text-foreground">
                    {item.label}:{" "}
                  </span>
                )}
                {renderInline(item.text)}
              </p>
            </li>
          ))}
        </ul>
      );

    case "note":
      return (
        <div className="border-l-2 border-primary bg-primary/5 p-6 md:p-8">
          {block.label && (
            <p className="mb-3 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
              {block.label}
            </p>
          )}
          <p className="text-base leading-relaxed text-muted-foreground">
            {renderInline(block.text)}
          </p>
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto border border-border/60">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40">
                {block.head.map((cell) => (
                  <th
                    key={cell}
                    scope="col"
                    className="px-5 py-4 text-[10px] font-black tracking-[0.2em] text-primary uppercase"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-border/40 last:border-b-0"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={
                        cellIndex === 0
                          ? "px-5 py-5 align-top text-sm font-bold text-foreground uppercase"
                          : "px-5 py-5 align-top text-sm leading-relaxed text-muted-foreground"
                      }
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function LegalDocument({ doc, related = [] }: LegalDocumentProps) {
  const { eyebrow, title, titleAccent, shortTitle, updatedAt, intro, sections } =
    doc;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background pt-32 pb-24 text-foreground">
      {/* Atmosfera — mesmos blobs das restantes páginas interiores */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 -left-32 h-[600px] w-[600px] bg-primary/10 blur-[140px] dark:bg-primary/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-15%] bottom-[10%] h-[520px] w-[520px] bg-blue-500/5 blur-[120px] dark:bg-blue-500/10"
      />

      <div className="relative z-10 container mx-auto max-w-6xl px-4">
        <SectionWrapper>
          <header className="mb-16 max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase backdrop-blur-md">
              <Scale aria-hidden="true" className="h-4 w-4" />
              {eyebrow}
            </div>

            <h1 className="mb-6 text-4xl leading-none font-black tracking-tighter uppercase md:text-6xl">
              {title} <span className="text-primary italic">{titleAccent}</span>
            </h1>

            <p className="mb-8 inline-flex items-center gap-2 border border-border/60 px-4 py-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
              <CalendarClock aria-hidden="true" className="h-4 w-4" />
              Última actualização · {updatedAt}
            </p>

            <p className="text-lg leading-relaxed font-medium text-muted-foreground md:text-xl">
              {renderInline(intro)}
            </p>
          </header>
        </SectionWrapper>

        <LegalTocMobile title={shortTitle} sections={sections} />

        <div className="grid gap-x-16 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
          <LegalToc title={shortTitle} sections={sections} />

          <div className="min-w-0">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="scroll-mt-40 border-t border-border/60 py-12 first:border-t-0 first:pt-0 lg:scroll-mt-32 lg:py-14"
              >
                <h2
                  id={`${section.id}-title`}
                  className="mb-8 flex items-baseline gap-4 text-2xl font-black tracking-tight uppercase md:text-3xl"
                >
                  <span
                    aria-hidden="true"
                    className="text-base font-black tabular-nums text-primary"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>

                <div className="space-y-6">
                  {section.blocks.map((block, blockIndex) => (
                    <Block key={blockIndex} block={block} />
                  ))}
                </div>
              </section>
            ))}

            {related.length > 0 && (
              <div className="border-t border-border/60 pt-12">
                <p className="mb-6 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
                  Documentos relacionados
                </p>
                <div className="flex flex-wrap gap-4">
                  {related.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group inline-flex items-center gap-3 border border-border/60 px-6 py-4 text-sm font-bold text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                    >
                      {item.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

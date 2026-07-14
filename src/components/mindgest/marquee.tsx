import { DOCUMENT_TYPES } from "@/data/mindgest/site";

export function Marquee() {
  const items = [...DOCUMENT_TYPES, ...DOCUMENT_TYPES];

  return (
    <div className="overflow-hidden border-y border-border bg-background py-5 text-foreground">
      <div className="animate-marquee flex w-max items-center gap-10">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-sm font-bold tracking-[0.2em] whitespace-nowrap text-muted-foreground uppercase"
          >
            {item}
            <span className="size-1.5 bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}

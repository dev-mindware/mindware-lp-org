import type { ReactNode } from "react";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div
        className={`flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase text-primary ${
          centered ? "justify-center" : ""
        }`}
      >
        <span>{index}</span>
        <span className="h-px w-8 bg-primary/40" />
        <span className="text-muted-foreground">{label}</span>
      </div>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-balance text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

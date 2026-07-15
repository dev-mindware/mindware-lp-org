"use client";

import type { ReactNode } from "react";
import {
  ScrollReveal,
  Stagger,
  StaggerItem,
  fadeUpSoft,
  fadeLeft,
} from "./motion";

type AffiliateHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function AffiliateHeading({
  index,
  label,
  title,
  description,
  align = "left",
}: AffiliateHeadingProps) {
  const centered = align === "center";

  return (
    <Stagger
      className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      <StaggerItem variants={fadeLeft}>
        <div
          className={`flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase text-primary ${
            centered ? "justify-center" : ""
          }`}
        >
          <span>{index}</span>
          <span className="h-px w-8 origin-left bg-primary/40" />
          <span className="text-muted-foreground">{label}</span>
        </div>
      </StaggerItem>

      <StaggerItem variants={fadeUpSoft}>
        <h2 className="mt-5 text-4xl font-black tracking-tight text-balance text-foreground sm:text-5xl">
          {title}
        </h2>
      </StaggerItem>

      {description ? (
        <StaggerItem variants={fadeUpSoft}>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </StaggerItem>
      ) : null}
    </Stagger>
  );
}

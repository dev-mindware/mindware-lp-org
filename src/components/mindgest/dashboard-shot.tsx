import Image from "next/image";

export function DashboardShot() {
  return (
    <div className="overflow-hidden border border-border bg-card shadow-[0_40px_120px_-20px_rgba(153,86,246,0.35)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 bg-muted-foreground/30" />
        <span className="size-2.5 bg-muted-foreground/30" />
        <span className="size-2.5 bg-muted-foreground/30" />
        <span className="mx-auto bg-muted px-6 py-1 text-[10px] font-medium text-muted-foreground">
          mindgest.mindware.ao
        </span>
        <span className="w-12" />
      </div>

      <Image
        src="/mindgest/dashboard.png"
        alt="Painel do Mindgest com a visão consolidada da empresa: total de vendas, serviços prestados e evolução da facturação"
        width={1919}
        height={992}
        priority
        sizes="(min-width: 1120px) 1024px, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BADGE_CLASS =
  "shrink-0 border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-black tracking-[0.22em] text-primary uppercase";

export type HeaderLockupProps = {
  /**
   * Selo de contexto — "Mindgest", "Blog", "Legal"… Funciona como migalha de
   * pão: diz sempre em que zona do site o visitante está.
   */
  badge?: string;
  /** Torna o selo clicável — normalmente o topo da própria página. */
  badgeHref?: string;
  /**
   * Mostra o botão de voltar em vez da marca. Falso apenas na homepage,
   * onde não há para onde voltar e o logo assume o lugar.
   */
  back?: boolean;
  /** Destino do voltar. */
  backHref?: string;
};

/**
 * Lockup partilhado por todos os headers do site.
 *
 * Nas páginas interiores mostra `← Voltar │ SELO`; na homepage mostra a marca.
 * É o único caminho de volta em todo o site — antes havia três botões
 * diferentes em três cantos diferentes a fazer este mesmo trabalho.
 */
export function HeaderLockup({
  badge,
  badgeHref,
  back = false,
  backHref = "/",
}: HeaderLockupProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {back ? (
        <Link
          href={backHref}
          aria-label="Voltar ao site da Mindware"
          className="group flex shrink-0 items-center gap-2 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Voltar
        </Link>
      ) : (
        <Link
          href="/"
          aria-label="Mindware — página inicial"
          className="flex shrink-0 items-center gap-2 text-base font-semibold text-foreground"
        >
          <Image src="/logo.png" alt="" width={30} height={30} priority />
          <span className="hidden sm:inline">Mindware</span>
        </Link>
      )}

      {badge ? (
        <>
          <span aria-hidden="true" className="h-5 w-px shrink-0 bg-border" />
          {badgeHref ? (
            <Link
              href={badgeHref}
              className={`${BADGE_CLASS} transition-colors hover:bg-primary/20`}
            >
              {badge}
            </Link>
          ) : (
            <span className={BADGE_CLASS}>{badge}</span>
          )}
        </>
      ) : null}
    </div>
  );
}

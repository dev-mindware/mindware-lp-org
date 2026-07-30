/**
 * Wordmark decorativo do rodapé.
 *
 * Mantém o dimensionamento original (corpo de 11rem, largura ditada pelas
 * métricas da fonte). Não usar `textLength`: fixar a largura na viewBox esticava
 * o wordmark até às margens e o tamanho ficava desproporcionado.
 */
export function FooterBrandAnimation() {
  return (
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle"
      strokeWidth="1"
      className="fill-transparent stroke-primary text-[11rem] font-black tracking-tighter"
    >
      Mindware
    </text>
  );
}

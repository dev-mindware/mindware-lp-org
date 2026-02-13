"use client";

export function AnimatedLinesBackground() {
  const spacing = 140;
  const size = 1000;

  const lines = [];

  for (let i = -size; i <= size; i += spacing) {
    lines.push(
      <line
        key={`v-${i}`}
        x1={i}
        y1={-size}
        x2={i}
        y2={size}
        stroke="#9956f6"
        strokeOpacity="0.15"
        strokeWidth="1"
        strokeDasharray="4 8"
      />
    );

    lines.push(
      <line
        key={`h-${i}`}
        x1={-size}
        y1={i}
        x2={size}
        y2={i}
        stroke="#9956f6"
        strokeOpacity="0.15"
        strokeWidth="1"
        strokeDasharray="4 8"
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute top-1/2 left-1/2 w-[2000px] h-[2000px] -translate-x-1/2 -translate-y-1/2"
        viewBox={`${-size} ${-size} ${size * 2} ${size * 2}`}
        fill="none"
      >
        {lines}
      </svg>
    </div>
  );
}

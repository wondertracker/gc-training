interface GCSigilProps {
  size?: number;
  color?: string;
}

export function GCSigil({ size = 48, color = "#C9A84C" }: GCSigilProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Grande Charte monogram"
    >
      <rect width="100" height="100" fill="none" />
      <text
        x="50"
        y="72"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="72"
        fontWeight="400"
        fill={color}
        letterSpacing="-4"
      >
        GC
      </text>
      <line
        x1="10"
        y1="82"
        x2="90"
        y2="82"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}

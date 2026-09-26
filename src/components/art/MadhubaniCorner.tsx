type MadhubaniCornerProps = {
  className?: string
  tone?: 'gold' | 'green' | 'terracotta'
}

export function MadhubaniCorner({ className = '', tone = 'gold' }: MadhubaniCornerProps) {
  const palette = {
    gold: 'rgba(190,145,58,0.92)',
    green: 'rgba(50,90,74,0.9)',
    terracotta: 'rgba(155,85,54,0.9)'
  }

  return (
    <svg
      viewBox="0 0 88 88"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke={palette[tone]} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c12 0 17 4 23 11 6 9 8 17 8 27" strokeWidth="1.4" />
        <path d="M18 12v18M12 18h18" strokeWidth="1.1" />
        <path d="M42 18c9 0 15 7 15 15 0 9-6 15-15 15" strokeWidth="1.2" fill="rgba(190,145,58,0.08)" />
        <path d="M12 52c10-8 20-11 32-11" strokeWidth="1.2" />
        <path d="M56 12v14M44 24h24" strokeWidth="1.1" />
      </g>
    </svg>
  )
}

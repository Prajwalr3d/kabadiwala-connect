type MadhubaniPatternProps = {
  className?: string
}

export function MadhubaniPattern({ className = '' }: MadhubaniPatternProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="28" cy="28" r="10" strokeWidth="1.4" />
        <circle cx="28" cy="28" r="18" strokeWidth="1.1" />
        <path d="M28 6v44M6 28h44" strokeWidth="1.2" />
        <path d="M72 28c8-14 22-16 38-8 6 3 10 8 14 16-10 9-21 11-32 8-7-2-14-6-20-16z" strokeWidth="1.2" fill="rgba(92,120,78,0.08)" />
        <path d="M98 62c-10 18-12 40-5 56 2 6 8 9 13 6 8-6 9-17 6-28-3-12-7-20-14-34z" strokeWidth="1.2" fill="rgba(161,103,67,0.08)" />
        <path d="M22 92c16-14 32-20 54-20" strokeWidth="1.3" />
        <path d="M58 112c14-8 30-12 50-10" strokeWidth="1.3" />
        <path d="M25 120c8-10 18-16 30-20" strokeWidth="1.3" />
        <path d="M110 98l12 14-12 14" strokeWidth="1.4" />
        <path d="M122 112h14" strokeWidth="1.4" />
      </g>
    </svg>
  )
}

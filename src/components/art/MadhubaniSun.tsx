export function MadhubaniSun({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g fill="none" stroke="#7a2f1b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="28" r="8" fill="#f3c46c" stroke="#7a2f1b" />
        <g stroke="#7a2f1b">
          <path d="M32 4v8" />
          <path d="M32 44v8" />
          <path d="M4 28h8" />
          <path d="M52 28h8" />
          <path d="M12 12l6 6" />
          <path d="M46 46l6 6" />
          <path d="M12 44l6-6" />
          <path d="M46 18l6-6" />
        </g>
      </g>
    </svg>
  )
}

export default MadhubaniSun

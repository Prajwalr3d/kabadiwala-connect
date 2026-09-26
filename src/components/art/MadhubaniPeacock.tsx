export function MadhubaniPeacock({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="mp-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="#215a48" />
          <stop offset="100%" stopColor="#123c2f" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="#123c2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="70" cy="120" rx="38" ry="18" fill="#d77d59" stroke="#7a2f1b" />
        <path d="M40 112c24-10 48-18 78-14" strokeWidth="2.2" />
        <g transform="translate(90,32)">
          <path d="M8 28c8-14 28-22 48-10 10 6 18 16 22 28-8 6-18 8-28 6-12-2-28-10-42-24z" fill="url(#mp-grad)" />
          <circle cx="24" cy="24" r="6" fill="#f3c46c" />
        </g>
        <path d="M80 46c4-6 12-10 20-8" strokeWidth="1.6" />
      </g>
    </svg>
  )
}

export default MadhubaniPeacock

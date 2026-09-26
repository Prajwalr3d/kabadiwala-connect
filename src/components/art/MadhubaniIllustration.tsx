import { MadhubaniPeacock } from './MadhubaniPeacock'
import { MadhubaniFlower } from './MadhubaniFlower'
import { MadhubaniSun } from './MadhubaniSun'

export function MadhubaniIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ width: '100%', height: '100%' }}>
        <rect x="0" y="0" width="800" height="360" fill="none" />
        <g transform="translate(48,16)">
          <g transform="translate(0,30) scale(0.9)">
            <MadhubaniPeacock />
          </g>
          <g transform="translate(360,10) scale(0.5)">
            <MadhubaniSun />
          </g>
          <g transform="translate(420,160) scale(0.8)">
            <MadhubaniFlower />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default MadhubaniIllustration

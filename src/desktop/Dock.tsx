import { APPS, DOCK_IDS } from '../apps/manifest'

type Props = {
  isOpen: (id: string) => boolean
  onLaunch: (id: string) => void
  onSpotlight: () => void
}

export function Dock({ isOpen, onLaunch, onSpotlight }: Props) {
  return (
    <div className="dock">
      {DOCK_IDS.map(id => {
        const app = APPS[id]
        return (
          <div
            key={id}
            className={`dapp ${app.dockClass} ${isOpen(id) ? 'running' : ''}`}
            style={app.iconImg ? {} : {}}
            onClick={() => onLaunch(id)}
          >
            <span className="tip">{app.title}</span>
            {app.iconImg
              ? <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: '14px' }}>
                  <img src={app.iconImg} alt={app.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              : app.icon}
            <span className="dot" />
          </div>
        )
      })}
      <div className="dapp d-spot" onClick={onSpotlight}>
        <span className="tip">Spotlight</span>⌕
      </div>
    </div>
  )
}

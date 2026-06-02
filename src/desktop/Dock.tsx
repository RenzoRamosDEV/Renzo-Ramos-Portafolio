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
            onClick={() => onLaunch(id)}
          >
            <span className="tip">{app.title}</span>
            {app.icon}
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

import { APPS, DOCK_IDS } from '../apps/manifest'

const COL_X = 16
const ROW_START = 48
const ROW_GAP = 96

type Props = {
  onLaunch: (id: string) => void
}

export function DesktopIcons({ onLaunch }: Props) {
  return (
    <>
      {DOCK_IDS.map((id, i) => {
        const app = APPS[id]
        return (
          <div
            key={id}
            className="desk-icon"
            style={{ left: COL_X, top: ROW_START + i * ROW_GAP }}
            onClick={e => {
              e.stopPropagation()
              onLaunch(id)
            }}
          >
            <div className={`di-ico ${app.dockClass}`} style={app.iconImg ? { overflow: 'hidden', position: 'relative' } : {}}>
              {app.iconImg
                ? <img src={app.iconImg} alt={app.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                : app.icon}
            </div>
            <div className="di-lbl">{app.title}</div>
          </div>
        )
      })}
    </>
  )
}

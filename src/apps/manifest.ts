export type AppMeta = {
  id: string
  title: string
  icon: string
  dockClass: string
  size: { w: number; h: number }
  /** Shown in the dock and as a desktop shortcut. Detail views are hidden. */
  inDock: boolean
}

export const APPS: Record<string, AppMeta> = {
  about: { id: 'about', title: 'Sobre mí', icon: '☻', dockClass: 'd-about', size: { w: 660, h: 460 }, inDock: true },
  proj: { id: 'proj', title: 'Proyectos', icon: '▦', dockClass: 'd-proj', size: { w: 560, h: 520 }, inDock: true },
  stack: { id: 'stack', title: 'Tech Stack', icon: '{ }', dockClass: 'd-stack', size: { w: 640, h: 560 }, inDock: true },
  path: { id: 'path', title: 'Trayectoria', icon: '◷', dockClass: 'd-path', size: { w: 580, h: 520 }, inDock: true },
  cert: { id: 'cert', title: 'Certificados', icon: '✦', dockClass: 'd-cert', size: { w: 600, h: 560 }, inDock: true },
  mail: { id: 'mail', title: 'Contacto', icon: '✉', dockClass: 'd-mail', size: { w: 520, h: 440 }, inDock: true },
  config: { id: 'config', title: 'Preferencias', icon: '⚙', dockClass: 'd-cfg', size: { w: 480, h: 560 }, inDock: true },
  'proj-booqi': { id: 'proj-booqi', title: 'Booqi', icon: 'B', dockClass: 'd-proj', size: { w: 700, h: 640 }, inDock: false },
  'proj-inv': { id: 'proj-inv', title: 'Inventario', icon: 'I', dockClass: 'd-stack', size: { w: 700, h: 640 }, inDock: false },
}

/** Ordered ids shown in the dock and as desktop shortcuts. */
export const DOCK_IDS = ['about', 'proj', 'stack', 'path', 'cert', 'mail', 'config'] as const

import type { ReactNode } from 'react'
import { About } from './About'
import { Projects } from './Projects'
import { ProjectDetail } from './ProjectDetail'
import { Stack } from './Stack'
import { Timeline } from './Timeline'
import { Certificates } from './Certificates'
import { Contact } from './Contact'
import { Config } from './Config'

/** Maps an app id to its window content. */
export const APP_CONTENT: Record<string, () => ReactNode> = {
  about: () => <About />,
  proj: () => <Projects />,
  'proj-booqi': () => <ProjectDetail id="booqi" />,
  'proj-inv': () => <ProjectDetail id="inventario" />,
  stack: () => <Stack />,
  path: () => <Timeline />,
  cert: () => <Certificates />,
  mail: () => <Contact />,
  config: () => <Config />,
}

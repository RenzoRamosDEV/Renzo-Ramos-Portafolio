import type { ReactNode } from 'react'
import { About } from './About'
import { Projects } from './Projects'
import { ProjectDetail } from './ProjectDetail'
import { Stack } from './Stack'
import { Timeline } from './Timeline'
import { Certificates } from './Certificates'
import { Contact } from './Contact'
import { Config } from './Config'
import { PortfolioV1 } from './PortfolioV1'

/** Maps an app id to its window content. */
export const APP_CONTENT: Record<string, () => ReactNode> = {
  about: () => <About />,
  proj: () => <Projects />,
  'proj-booqi': () => <ProjectDetail id="booqi" />,
  'proj-redactor-ia': () => <ProjectDetail id="redactor-ia" />,
  'proj-pokedex': () => <ProjectDetail id="pokedex" />,
  stack: () => <Stack />,
  path: () => <Timeline />,
  cert: () => <Certificates />,
  mail: () => <Contact />,
  config: () => <Config />,
  v1: () => <PortfolioV1 />,
}

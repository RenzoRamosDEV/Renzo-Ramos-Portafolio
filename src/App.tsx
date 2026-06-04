import { PortfolioSite } from './portfolio/PortfolioSite'

/** Punto de entrada: el portafolio (sitio scrollable) a pantalla completa. */
export function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PortfolioSite />
    </div>
  )
}

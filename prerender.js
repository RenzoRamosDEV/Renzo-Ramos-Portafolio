// Pre-render (SSG): inyecta el HTML de la app en dist/index.html tras el build.
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const dist = path.resolve('dist')
const indexPath = path.join(dist, 'index.html')
const serverEntry = path.resolve('dist-server', 'entry-server.js')

const template = fs.readFileSync(indexPath, 'utf-8')
const { render } = await import(url.pathToFileURL(serverEntry).href)

const appHtml = render()

if (!template.includes('<div id="root"></div>')) {
  throw new Error('No se encontró <div id="root"></div> en dist/index.html')
}

const out = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
fs.writeFileSync(indexPath, out)

// Limpieza del build de servidor (no se despliega).
fs.rmSync(path.resolve('dist-server'), { recursive: true, force: true })

console.log('✓ SSG: dist/index.html pre-renderizado (' + appHtml.length + ' chars)')

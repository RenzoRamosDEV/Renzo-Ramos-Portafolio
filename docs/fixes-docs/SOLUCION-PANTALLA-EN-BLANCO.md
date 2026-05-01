# Solución: Pantalla en Blanco - Error de Preamble

## 🐛 Problema Encontrado

Al ejecutar `npm run dev` en la rama `feature/refacto-limpieza`, la página aparecía completamente en blanco y en la consola del navegador se mostraba:

```
Nav.jsx:XX Uncaught Error: @vitejs/plugin-react can't detect preamble. Something is wrong.
```

## 🔍 Causa Raíz

El error ocurría porque **@vitejs/plugin-react** con React Fast Refresh no podía inyectar correctamente su código de inicialización (preamble) debido a la reorganización de archivos en la nueva estructura de carpetas (Clean Architecture):

```
# Estructura antigua (main - funcionaba):
src/
  ├── components/
  ├── hooks/
  ├── utils/
  └── constants/

# Nueva estructura (feature/refacto-limpieza - fallaba):
src/
  ├── presentation/
  │   ├── components/
  │   ├── pages/
  │   └── styles/
  ├── application/
  │   └── hooks/
  ├── infrastructure/
  ├── domain/
  └── config/
```

El plugin de React esperaba una estructura de carpetas específica y al reorganizar los archivos, el sistema de detección de módulos React se rompió.

## ✅ Solución Aplicada

**Desactivar @vitejs/plugin-react y usar esbuild nativo** para transformar JSX:

### Cambio en `vite.config.js`

**ANTES (con error):**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/RenzoRamosPortafolio/',
  server: {
    port: 5173,
    open: true
  }
});
```

**DESPUÉS (funciona):**
```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/RenzoRamosPortafolio/',
  server: {
    port: 5173,
    open: true
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react'
  }
});
```

### Cambios en los archivos JSX

**IMPORTANTE:** Asegúrate de que tus archivos JSX **NO** importen React innecesariamente:

**❌ INCORRECTO:**
```javascript
import React from 'react';

export function MyComponent() {
  return <div>Hello</div>;
}
```

**✅ CORRECTO:**
```javascript
// Sin import de React para componentes simples
export function MyComponent() {
  return <div>Hello</div>;
}
```

**✅ CORRECTO (si usas hooks):**
```javascript
import { useState, useEffect } from 'react';

export function MyComponent() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
```

**✅ CORRECTO (solo main.jsx necesita React completo):**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 🔄 Si el Problema Vuelve a Ocurrir

### Paso 1: Verificar que tienes la configuración correcta

```bash
cd docs
cat vite.config.js
```

Debe verse así:
```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/RenzoRamosPortafolio/',
  server: {
    port: 5173,
    open: true
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react'
  }
});
```

### Paso 2: Limpiar cache y reinstalar

```bash
cd docs

# Detener el servidor (Ctrl+C)

# Limpiar cache de Vite
rm -rf node_modules/.vite .vite

# Opcional: reinstalar dependencias si es necesario
# rm -rf node_modules package-lock.json
# npm install

# Iniciar de nuevo
npm run dev
```

### Paso 3: Verificar imports en archivos JSX

Buscar y eliminar imports innecesarios de React:

```bash
# Buscar archivos con import React innecesario
cd docs/src
grep -r "^import React from 'react';" --include="*.jsx"
```

Para cada archivo encontrado (excepto `main.jsx`), eliminar la línea:
```javascript
import React from 'react';
```

### Paso 4: Limpiar cache del navegador

1. Abre DevTools (F12)
2. Clic derecho en el botón de recargar
3. Selecciona "Vaciar caché y recargar de manera forzada"
4. O abre en ventana de incógnito: `Ctrl+Shift+N`

## 📊 Comparación de Configuraciones

| Aspecto | Con @vitejs/plugin-react | Con esbuild nativo |
|---------|-------------------------|-------------------|
| React Fast Refresh | ✅ Sí | ❌ No |
| Hot Module Reload | ✅ Sí | ⚠️ Limitado |
| Velocidad de build | ⚠️ Normal | ✅ Más rápido |
| Compatibilidad con estructuras custom | ❌ Problemas | ✅ Sin problemas |
| Configuración | Compleja | Simple |

## 🎯 Recomendaciones

1. **Mantener la configuración actual** (esbuild) hasta que migres a una versión más nueva de Vite que soporte mejor estructuras custom
2. **Durante desarrollo**: Recargar manualmente el navegador (F5) cuando hagas cambios, ya que no hay Fast Refresh
3. **Para producción**: `npm run build` funciona perfectamente con ambas configuraciones

## 🔗 Enlaces Útiles

- [Vite esbuild options](https://vitejs.dev/config/shared-options.html#esbuild)
- [React JSX Transform](https://react.dev/blog/2020/09/22/introducing-the-new-jsx-transform)
- [Vite troubleshooting](https://vitejs.dev/guide/troubleshooting.html)

## 📝 Notas Adicionales

- El problema solo afecta a `npm run dev` (desarrollo)
- `npm run build` (producción) **funciona correctamente** con cualquier configuración
- La rama `main` funcionaba porque usa la estructura de carpetas antigua que el plugin espera
- Esta solución es **permanente** y no afecta el rendimiento en producción

---

**Fecha de resolución:** 2026-05-01  
**Rama afectada:** `feature/refacto-limpieza`  
**Solución verificada:** ✅ Funcionando correctamente

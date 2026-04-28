# 📚 Guía: Trabajar con GitLab y GitHub Simultáneamente

Este proyecto está configurado para sincronizarse automáticamente en **dos** repositorios remotos:
- 🦊 **GitLab**: https://gitlab.com/mini-projects7212415/portafolio (solo código fuente)
- 🐙 **GitHub**: https://github.com/RenzoRamosDEV/RenzoRamosPortafolio

## 🌐 URL del sitio desplegado

- **GitHub Pages**: https://renzoramosdev.github.io/RenzoRamosPortafolio/

---

## 🔧 Configuración de Remotes

Tu repositorio tiene **2 remotes** configurados:

```bash
origin  → GitLab (https://gitlab.com/mini-projects7212415/portafolio.git)
github  → GitHub (https://github.com/RenzoRamosDEV/RenzoRamosPortafolio.git)
```

### Verificar remotes configurados:
```bash
git remote -v
```

---

## 📝 Flujo de trabajo diario

### ✅ Opción 1: Push a ambos repositorios (RECOMENDADO)

Usa este comando para hacer push a **ambos** a la vez:

```bash
# Hacer cambios en tu código
git add .
git commit -m "tu mensaje de commit"

# Push a ambos repositorios
git push origin main && git push github main
```

### ✅ Opción 2: Push individual

**Solo a GitLab:**
```bash
git push origin main
```

**Solo a GitHub:**
```bash
git push github main
```

---

## 🚀 Alias para facilitar el trabajo (OPCIONAL)

Puedes crear un alias para hacer push a ambos con un solo comando:

```bash
# Configurar el alias
git config alias.pushall '!git push origin main && git push github main'

# Ahora puedes usar:
git pushall
```

O si prefieres un script más robusto, agrega esto a tu `~/.gitconfig`:

```ini
[alias]
    pushall = !git push origin main && git push github main
    pullall = !git pull origin main
```

---

## 📋 Comandos completos paso a paso

### Flujo de trabajo completo:

```bash
# 1. Ver el estado de tus cambios
git status

# 2. Agregar archivos modificados
git add .

# 3. Hacer commit con mensaje descriptivo
git commit -m "feat: descripción del cambio"

# 4. Push a GitLab
git push origin main

# 5. Push a GitHub
git push github main
```

### Flujo simplificado (push dual):

```bash
git add .
git commit -m "feat: descripción del cambio"
git push origin main && git push github main
```

---

## 🔄 Pull (descargar cambios)

Si trabajas desde múltiples lugares o con otras personas:

```bash
# Pull desde GitLab (recomendado usar como principal)
git pull origin main

# O desde GitHub
git pull github main
```

**Recomendación:** Usa **siempre el mismo remote** para hacer pull (preferiblemente `origin` que es GitLab).

---

## 🌿 Trabajar con ramas

### Crear una rama nueva:
```bash
git checkout -b nombre-rama
```

### Push de rama a ambos repositorios:
```bash
git push origin nombre-rama
git push github nombre-rama
```

### Hacer merge a main:
```bash
git checkout main
git merge nombre-rama
git push origin main && git push github main
```

---

## 🛠️ Comandos útiles

### Ver historial de commits:
```bash
git log --oneline -10
```

### Ver diferencias antes de commit:
```bash
git diff
```

### Ver qué archivos cambiaron:
```bash
git status
```

### Deshacer cambios no commiteados:
```bash
git restore nombre-archivo
```

### Deshacer el último commit (manteniendo cambios):
```bash
git reset --soft HEAD~1
```

---

## 🎯 Mejores prácticas

### 1. **Mensajes de commit descriptivos**

Usa el formato:
```
tipo: descripción breve

- tipo: feat, fix, docs, style, refactor, test, chore
```

Ejemplos:
```bash
git commit -m "feat: agregar sección de certificados"
git commit -m "fix: corregir responsive en mobile"
git commit -m "docs: actualizar README con instrucciones"
git commit -m "style: mejorar espaciado en hero section"
```

### 2. **Hacer commits frecuentes**

✅ Mejor:
```bash
git commit -m "feat: agregar componente Hero"
git commit -m "style: aplicar estilos al Hero"
git commit -m "fix: corregir padding en mobile"
```

❌ Evitar:
```bash
git commit -m "cambios varios"
```

### 3. **Siempre hacer pull antes de push**

```bash
git pull origin main
# resolver conflictos si hay
git push origin main && git push github main
```

---

## 🚨 Solución de problemas

### Error: "Updates were rejected"

```bash
# Descargar cambios primero
git pull origin main --rebase

# Luego hacer push
git push origin main && git push github main
```

### Error: "Divergent branches"

```bash
# Opción 1: Rebase (recomendado)
git pull origin main --rebase

# Opción 2: Merge
git pull origin main --no-rebase
```

### Sincronizar GitHub con GitLab si se desincronizaron:

```bash
# Asegurarte de tener lo último de GitLab
git pull origin main

# Forzar push a GitHub para que coincida
git push github main --force-with-lease
```

---

## 📦 Deployment automático

### GitHub Pages
- Se despliega automáticamente con cada push a `main`
- Workflow definido en `.github/workflows/deploy.yml`
- URL: https://renzoramosdev.github.io/RenzoRamosPortafolio/

**IMPORTANTE:** Para activar GitHub Pages:
1. Ir a: https://github.com/RenzoRamosDEV/RenzoRamosPortafolio/settings/pages
2. En "Build and deployment" → "Source" → Seleccionar **"GitHub Actions"**
3. Esperar 2-3 minutos después del push para que se despliegue

---

## 📌 Resumen rápido

```bash
# Workflow diario:
git status                           # Ver cambios
git add .                           # Agregar archivos
git commit -m "tipo: descripción"   # Commit
git push origin main                # Push a GitLab
git push github main                # Push a GitHub

# O en una línea:
git push origin main && git push github main
```

---

## 🆘 Ayuda adicional

- **Git docs**: https://git-scm.com/doc
- **GitLab CI/CD**: https://docs.gitlab.com/ee/ci/
- **GitHub Actions**: https://docs.github.com/en/actions

---

**¿Preguntas?** Consulta la documentación oficial o revisa los logs del deployment en:
- GitHub Actions: https://github.com/RenzoRamosDEV/RenzoRamosPortafolio/actions

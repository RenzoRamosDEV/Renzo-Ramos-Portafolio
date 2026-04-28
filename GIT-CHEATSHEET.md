# ⚡ Cheat Sheet - Push Dual (GitLab + GitHub)

## 🚀 Comando más usado

```bash
# Workflow completo en 3 pasos:
git add .
git commit -m "descripción del cambio"
git push origin main && git push github main
```

---

## 📍 Remotes configurados

```
origin → GitLab
github → GitHub
```

---

## 🔥 Comandos rápidos

| Acción | Comando |
|--------|---------|
| Ver estado | `git status` |
| Ver remotes | `git remote -v` |
| Agregar todo | `git add .` |
| Commit | `git commit -m "mensaje"` |
| Push a GitLab | `git push origin main` |
| Push a GitHub | `git push github main` |
| **Push a ambos** | `git push origin main && git push github main` |
| Pull desde GitLab | `git pull origin main` |
| Ver últimos commits | `git log --oneline -5` |

---

## ✅ Alias recomendado

```bash
# Configurar una vez:
git config alias.pushall '!git push origin main && git push github main'

# Usar siempre:
git add .
git commit -m "mensaje"
git pushall
```

---

## 🌐 URL de deploy

- **GitHub Pages**: https://renzoramosdev.github.io/RenzoRamosPortafolio/

---

## 📝 Tipos de commit

```
feat:     Nueva funcionalidad
fix:      Corrección de bug
docs:     Documentación
style:    Estilos/formato
refactor: Refactorización
test:     Tests
chore:    Mantenimiento
```

**Ejemplo:** `git commit -m "feat: agregar sección de proyectos"`

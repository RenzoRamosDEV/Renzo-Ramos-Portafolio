# ⚡ Cheat Sheet - Push Dual (GitLab + GitHub)

## 🚀 Comando más usado

```bash
# Workflow completo con alias (RECOMENDADO):
git add .
git commit -m "descripción del cambio"
git pushall

# Workflow completo sin alias:
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
| **Push a ambos (alias)** | `git pushall` |
| **Push a ambos (completo)** | `git push origin main && git push github main` |
| Pull desde GitLab | `git pull origin main` |
| Ver últimos commits | `git log --oneline -5` |

---

## ✅ Alias pushall

**✅ Ya está configurado globalmente**

```bash
# Simplemente usa:
git add .
git commit -m "mensaje"
git pushall
```

### Verificar la configuración:
```bash
git config --get alias.pushall
```

### Configurar en otro proyecto (si es necesario):
```bash
# Global (todos los repos)
git config --global alias.pushall '!git push origin && git push github'

# Local (solo este repo)
git config alias.pushall '!git push origin && git push github'
```

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

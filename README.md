# Portfolio Renzo Ramos

Portfolio personal desarrollado con React y Vite.

🌐 **Demo en vivo**: https://renzoramosdev.github.io/RenzoRamosPortafolio/

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI
- **Vite 5** - Build tool y dev server
- **CSS Vanilla** - Estilos sin frameworks
- **GitHub Actions** - CI/CD automático

## 📁 Estructura del proyecto

```
portafolio/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions para deploy automático
├── public/                 # Assets estáticos
│   ├── icons/             # Iconos de tecnologías
│   └── certificates/      # Certificados y previews
├── src/
│   ├── components/        # Componentes React
│   ├── constants/         # Constantes y configuraciones
│   ├── data/             # Datos del portfolio
│   ├── hooks/            # Custom hooks
│   ├── styles/           # Archivos CSS
│   ├── utils/            # Utilidades
│   ├── App.jsx           # Componente principal
│   └── main.jsx          # Punto de entrada
├── index.html
├── package.json
├── vite.config.js
├── GIT-WORKFLOW.md       # Guía completa de Git
└── GIT-CHEATSHEET.md     # Comandos rápidos de Git
```

## 💻 Desarrollo local

### Requisitos previos
- Node.js 18 o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/RenzoRamosDEV/RenzoRamosPortafolio.git

# Entrar al directorio
cd RenzoRamosPortafolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

## 🔨 Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build de producción
```

## 🚢 Despliegue

El proyecto se despliega automáticamente en **GitHub Pages** cada vez que se hace push a la rama `main`.

- **Workflow**: `.github/workflows/deploy.yml`
- **URL**: https://renzoramosdev.github.io/RenzoRamosPortafolio/

### Configurar GitHub Pages (primera vez)

1. Ve a: **Settings** → **Pages**
2. En **Build and deployment**:
   - **Source**: GitHub Actions
3. ¡Listo! Los despliegues serán automáticos

## 🔄 Repositorios

Este proyecto está sincronizado en dos repositorios:

- 🐙 **GitHub** (principal): https://github.com/RenzoRamosDEV/RenzoRamosPortafolio
- 🦊 **GitLab** (respaldo): https://gitlab.com/mini-projects7212415/portafolio

Para trabajar con ambos repositorios, consulta:
- **Guía completa**: [GIT-WORKFLOW.md](./GIT-WORKFLOW.md)
- **Referencia rápida**: [GIT-CHEATSHEET.md](./GIT-CHEATSHEET.md)

## 📝 Flujo de trabajo

```bash
# Hacer cambios
git add .
git commit -m "descripción del cambio"

# Push a ambos repositorios
git push origin main && git push github main
```

## 🎨 Características

- ✨ Animaciones con canvas (starfield y cursor trail)
- 🎨 Esquemas de color personalizables
- 📱 Diseño totalmente responsive
- ⚡ Optimizado para performance
- 🚀 Deploy automático con GitHub Actions

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Renzo Ramos**
- GitHub: [@RenzoRamosDEV](https://github.com/RenzoRamosDEV)
- GitLab: [@mini-projects7212415](https://gitlab.com/mini-projects7212415)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!

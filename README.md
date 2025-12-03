# Climargentina - Landing Page

Landing page profesional y moderna para Climargentina, especialistas en climatización automotriz e industrial y lubricentro en Tucumán.

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`

### Preview del Build

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
CLIMARGENTINA/
├── public/
│   ├── logo-climargentina.svg    # Logo de la marca (placeholder)
│   └── images/                    # Carpeta para imágenes
│       ├── hero-taller.jpg
│       ├── servicio-automotriz.jpg
│       ├── servicio-industrial.jpg
│       └── servicio-lubricentro.jpg
├── src/
│   ├── components/
│   │   └── LandingClimargentina.tsx  # Componente principal
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## 🎨 Paleta de Colores

- **Blanco**: `#ffffff`
- **Rojo**: `#be3624`
- **Azul**: `#1c457f`

Los colores están configurados en `tailwind.config.js` como:
- `clima-white`
- `clima-red`
- `clima-blue`

## 📝 Notas Importantes

### Logo

El logo actual es un placeholder SVG. Para reemplazarlo:

1. Exporta el logo desde `/Recursos/CLIMARGENTINA_LOGO.ai` como SVG
2. Reemplaza el archivo `/public/logo-climargentina.svg` con tu exportación
3. Asegúrate de que el SVG tenga dimensiones apropiadas (recomendado: 300x80px o proporción similar)

### Imágenes

Las imágenes están configuradas como placeholders. Reemplaza los archivos en `/public/images/` con tus imágenes reales:

- `hero-taller.jpg` - Imagen principal del hero (recomendado: 1200x800px)
- `servicio-automotriz.jpg` - Imagen para servicio automotriz (recomendado: 600x400px)
- `servicio-industrial.jpg` - Imagen para servicio industrial (recomendado: 600x400px)
- `servicio-lubricentro.jpg` - Imagen para lubricentro (recomendado: 600x400px)

Si una imagen no se encuentra, se mostrará un placeholder SVG automáticamente.

### Formulario de Contacto

El formulario actualmente muestra un mensaje de éxito al enviar, pero no está conectado a un backend. Para implementar el envío real:

1. Modifica la función `handleSubmit` en `LandingClimargentina.tsx`
2. Agrega la lógica para enviar los datos a tu API o servicio de email

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 3** - Framework de CSS utility-first
- **Vite** - Build tool y dev server

## 📱 Características

- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Navbar fija con scroll suave
- ✅ Menú hamburguesa en móvil
- ✅ Formulario de contacto con validación
- ✅ Transiciones y animaciones suaves
- ✅ Optimizado para SEO
- ✅ Accesible (ARIA labels)

## 📄 Licencia

Todos los derechos reservados © 2024 Climargentina


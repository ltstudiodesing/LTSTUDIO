# LT STUDIO DESIGN - Nuevas Funcionalidades

## ✨ Funcionalidades Implementadas

### 1. 🌧️ Animación de Lluvia de Pelotitas

**Descripción:** Animación de pelotitas que caen detrás del logo "LT STUDIO DESIGN" durante la pantalla de carga.

**Características:**
- Pelotitas de diferentes tamaños (6px, 8px, 10px)
- Colores alternados (blanco y gris)
- Movimiento natural con rotación
- Aparición y desaparición gradual
- Velocidades aleatorias para efecto realista

**Archivos modificados:**
- `assets/css/bundle.css` - Estilos de la animación
- `assets/js/app.bundle.js` - Lógica de la animación

### 2. 📱 Sistema de Plantillas para Proyectos

**Descripción:** Sistema completo para crear páginas individuales de proyectos con diseño consistente.

**Características:**
- Plantilla base reutilizable (`project-template.html`)
- Diseño responsive y accesible
- Galería interactiva con navegación
- Contador de imágenes igual al inicio
- Soporte para 8 imágenes + 2 videos
- Navegación con teclado y mouse
- SEO optimizado

**Archivos creados:**
- `project-template.html` - Plantilla base
- `assets/css/project.css` - Estilos específicos
- `assets/js/project-gallery.js` - Funcionalidad de galería
- `projects/casa-moderna.html` - Ejemplo de proyecto

### 3. 🔗 Navegación Inteligente de Proyectos

**Descripción:** Sistema que convierte elementos de la página principal en enlaces hacia proyectos.

**Características:**
- Detección automática de elementos clickeables
- Efectos hover y click
- Navegación con teclado (teclas 1-3, P)
- Menú de proyectos emergente
- Enlaces directos en la esquina inferior
- Indicador de carga al navegar

**Archivos creados:**
- `assets/js/project-navigation.js` - Sistema de navegación

## 🚀 Cómo Usar

### Para Crear un Nuevo Proyecto:

1. **Copia la plantilla:**
   ```bash
   cp project-template.html projects/mi-nuevo-proyecto.html
   ```

2. **Reemplaza los placeholders:**
   - `{{PROJECT_NAME}}` → Nombre del proyecto
   - `{{PROJECT_DESCRIPTION}}` → Descripción
   - `{{PROJECT_YEAR}}` → Año
   - `{{PROJECT_LOCATION}}` → Ubicación
   - `{{PROJECT_TYPE}}` → Tipo (residencial, comercial, etc.)
   - `{{PROJECT_ID}}` → ID único del proyecto
   - `{{PROJECT_CLIENT}}` → Cliente
   - `{{PROJECT_AREA}}` → Área en m²
   - `{{PROJECT_STATUS}}` → Estado (Completado, En construcción, etc.)

3. **Añade las imágenes:**
   - Coloca 8 imágenes en `assets/img/projects/{PROJECT_ID}/`
   - Nombra como: `image-01.jpg`, `image-02.jpg`, etc.
   - Añade 2 videos en `assets/video/projects/{PROJECT_ID}/`
   - Nombra como: `video-01.mp4`, `video-02.mp4`

4. **Actualiza la navegación:**
   - Edita `assets/js/app.bundle.js`
   - Añade el proyecto al array `this.projects`

### Navegación en la Página Principal:

- **Click:** Cualquier imagen es clickeable y lleva a un proyecto
- **Teclado:** 
  - `1`, `2`, `3` → Ir directamente a proyecto 1, 2 o 3
  - `P` → Abrir menú de proyectos
- **Enlaces directos:** Panel en la esquina inferior izquierda

### Navegación en Páginas de Proyecto:

- **Flechas del teclado:** ← → para navegar imágenes
- **Mouse:** Scroll o botones de navegación
- **Touch:** Swipe izquierda/derecha en dispositivos móviles
- **Botones:** Controles en la parte inferior

## 📁 Estructura de Archivos

```
asmobius.co.jp/
├── assets/
│   ├── css/
│   │   ├── bundle.css (modificado - incluye lluvia)
│   │   ├── project.css (nuevo)
│   │   └── rain-animation.css (nuevo)
│   ├── js/
│   │   ├── app.bundle.js (modificado - incluye navegación y lluvia)
│   │   ├── project-gallery.js (nuevo)
│   │   ├── project-navigation.js (nuevo)
│   │   └── rain-animation.js (nuevo)
│   ├── img/
│   │   └── projects/
│   │       └── {project-id}/
│   │           ├── image-01.jpg
│   │           ├── ...
│   │           └── og-image.jpg
│   └── video/
│       └── projects/
│           └── {project-id}/
│               ├── video-01.mp4
│               └── video-02.mp4
├── projects/
│   ├── casa-moderna.html (ejemplo)
│   └── {otros-proyectos}.html
├── project-template.html (plantilla)
└── index.html (página principal)
```

## 🎨 Personalización

### Colores y Estilos:
Edita las variables CSS en `assets/css/project.css`:
```css
:root {
    --primary-color: #252525;
    --secondary-color: #666;
    --accent-color: #fff;
    --text-light: #999;
    --border-color: #e0e0e0;
    --transition: 0.3s ease;
}
```

### Animación de Lluvia:
Modifica parámetros en `assets/css/bundle.css`:
- Tamaño de pelotitas: `.rain-ball { width: Xpx; height: Xpx; }`
- Velocidad: `animation-duration` en JavaScript
- Colores: `background` en `.rain-ball`

### Proyectos:
Añade nuevos proyectos al array en `assets/js/app.bundle.js`:
```javascript
this.projects = [
    {
        id: 'proyecto-id',
        name: 'Nombre del Proyecto',
        url: 'projects/proyecto.html',
        keywords: ['palabra1', 'palabra2'],
        year: 2024,
        location: 'Ciudad, País'
    }
];
```

## 📱 Responsive Design

Todos los componentes están optimizados para:
- **Desktop:** Experiencia completa con todas las funcionalidades
- **Tablet:** Adaptación de layouts y controles táctiles
- **Mobile:** Navegación táctil, menús colapsables, tipografía ajustada

## 🔧 Mantenimiento

### Para actualizar un proyecto existente:
1. Edita el archivo HTML del proyecto
2. Reemplaza imágenes en la carpeta correspondiente
3. Actualiza metadatos si es necesario

### Para desactivar la lluvia de pelotitas:
Comenta esta línea en `assets/js/app.bundle.js`:
```javascript
// window.rainAnimation = new RainAnimation();
```

### Para cambiar navegación de proyectos:
Edita el array `this.projects` en el constructor de `ProjectNavigation`

## 🐛 Resolución de Problemas

**La lluvia no aparece:**
- Verifica que `bundle.css` y `app.bundle.js` estén cargando
- Comprueba la consola por errores de JavaScript

**Los proyectos no son clickeables:**
- Asegúrate de que `project-navigation.js` esté incluido
- Verifica que haya elementos con clases detectables en el DOM

**Imágenes no cargan en proyectos:**
- Verifica rutas de archivos
- Asegúrate de que las imágenes existan en las carpetas correctas

## 📞 Soporte

Para consultas o modificaciones adicionales, contacta al desarrollador con los detalles específicos de los cambios requeridos.

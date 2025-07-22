# Estructura de Imágenes para Proyectos

## 📁 Cómo usar estas carpetas:

### 1. **Ubicación**:
```
assets/projects/
├── park-mansion/           → Proyecto 1
├── kawana/                → Proyecto 2  
├── park-le-jade/          → Proyecto 3
├── sevens-villa/          → Proyecto 4
├── hikawa-gardens/        → Proyecto 5
├── one-avenue/            → Proyecto 6
├── century-forest/        → Proyecto 7
├── proud/                 → Proyecto 8
├── nishiazabu-residence/  → Proyecto 9
├── itohpia-jiyugaoka/     → Proyecto 10
├── urban-villa/           → Proyecto 11
└── modern-house/          → Proyecto 12
```

### 2. **Qué poner en cada carpeta**:
En cada carpeta de proyecto pon:
- `main.jpg` → Imagen principal del círculo
- `01.jpg`, `02.jpg`, `03.jpg`, etc. → Imágenes para las páginas de proyecto

### 3. **Formato recomendado**:
- **Formato**: JPG o PNG
- **Tamaño**: 800x800px para main.jpg (imagen del círculo)
- **Tamaño**: 1200x800px para las otras imágenes
- **Calidad**: Máxima calidad posible

### 4. **Ejemplo de estructura para un proyecto**:
```
park-mansion/
├── main.jpg     → Se ve en el círculo principal
├── 01.jpg       → Primera imagen de la página del proyecto
├── 02.jpg       → Segunda imagen
├── 03.jpg       → Tercera imagen
└── ...
```

### 5. **Cómo actualizar el código**:
Después de subir las imágenes, actualiza las rutas en `index-nuevo.html`:
```javascript
// Cambiar las URLs por rutas locales:
image: 'assets/projects/park-mansion/main.jpg'
```

## ⚠️ IMPORTANTE:
- Los nombres de archivo NO deben tener espacios (usa guiones: `my-image.jpg`)
- Usa minúsculas para los nombres
- Mantén la estructura exacta de carpetas

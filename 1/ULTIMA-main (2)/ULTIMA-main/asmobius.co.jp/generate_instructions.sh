#!/bin/bash

# Array de proyectos con sus nombres
declare -A projects=(
    ["sevens-villa"]="SEVENS VILLA (Karuizawa)"
    ["hikawa-gardens"]="HIKAWA GARDENS (Tokyo)"
    ["one-avenue"]="ONE AVENUE (Central District)"
    ["century-forest"]="CENTURY FOREST (Urban Integration)"
    ["proud"]="PROUD (Rokakoen)"
    ["nishiazabu-residence"]="NISHIAZABU RESIDENCE (Nishiazabu)"
    ["itohpia-jiyugaoka"]="ITOHPIA JIYUGAOKA (Jiyugaoka)"
    ["urban-villa"]="URBAN VILLA (Central Tokyo)"
    ["modern-house"]="MODERN HOUSE (Shibuya)"
)

# Crear instrucciones para cada proyecto
for folder in "${!projects[@]}"; do
    cat > "images/projects/$folder/INSTRUCCIONES.txt" << EOF
PROYECTO: ${projects[$folder]}

INSTRUCCIONES PARA AGREGAR IMÁGENES:

1. Borra este archivo (INSTRUCCIONES.txt)
2. Sube tus imágenes del proyecto y nómbralas exactamente así:
   - 1.jpg (imagen principal)
   - 2.jpg (segunda imagen)
   - 3.jpg (tercera imagen)
   - 4.jpg (cuarta imagen)
   - 5.jpg (quinta imagen)
   - 6.jpg (sexta imagen)
   - 7.jpg (séptima imagen)
   - 8.jpg (octava imagen)

IMPORTANTE:
- Los nombres DEBEN ser exactamente: 1.jpg, 2.jpg, 3.jpg, etc.
- Formato recomendado: .jpg (también funciona .png)
- Tamaño recomendado: mínimo 600x600 píxeles
- La imagen 1.jpg será la imagen principal que aparece en el círculo

Una vez que subas las imágenes, el sitio web las tomará automáticamente.
EOF
    echo "✅ Creado: $folder/INSTRUCCIONES.txt"
done

echo "🎉 Todas las instrucciones han sido creadas!"

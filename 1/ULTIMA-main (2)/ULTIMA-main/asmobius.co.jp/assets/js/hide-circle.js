// SCRIPT PARA FONDO DINÁMICO SIN INTERFERIR
(function() {
    console.log('🎯 INICIANDO SCRIPT DE FONDO DINÁMICO');

    // MAPEO DE IMÁGENES POR PROYECTO
    const PROJECT_IMAGES = {
        'PARK MANSION': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop',
        'KAWANA': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop',
        'SEVENS VILLA': 'https://images.unsplash.com/photo-1600563438938-a42d1c941a96?w=1920&h=1080&fit=crop',
        'PARK LE JADE': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop',
        'HIKAWA GARDENS': 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1920&h=1080&fit=crop',
        'ONE AVENUE': 'https://images.unsplash.com/photo-1600607688608-8029ab8bf4b7?w=1920&h=1080&fit=crop',
        'CENTURY FOREST': 'https://images.unsplash.com/photo-1600607688878-6b7f47e3f6a0?w=1920&h=1080&fit=crop',
        'PROUD': 'https://images.unsplash.com/photo-1600607688964-d6b3c0b47b42?w=1920&h=1080&fit=crop'
    };

    let currentProject = '';

    // Detectar proyecto actual
    function detectCurrentProject() {
        const projectList = document.querySelector('ul');
        if (!projectList) return null;

        const listItems = projectList.querySelectorAll('li');

        for (let item of listItems) {
            const style = window.getComputedStyle(item);
            const text = item.textContent.toUpperCase().trim();

            if (style.opacity > 0.7 || style.transform.includes('scale(1)')) {
                for (let projectName in PROJECT_IMAGES) {
                    if (text.includes(projectName)) {
                        return projectName;
                    }
                }
            }
        }
        return null;
    }

    // Aplicar imagen solo a elementos de fondo existentes
    function applyBackgroundImage(imageUrl) {
        // Buscar elementos que ya son de fondo (z-index negativo o muy bajo)
        const backgroundElements = [
            // Divs con z-index negativo
            ...Array.from(document.querySelectorAll('div')).filter(div => {
                const style = window.getComputedStyle(div);
                const zIndex = parseInt(style.zIndex) || 0;
                return zIndex < 0 || zIndex <= 10;
            }),
            // Divs con backgroundColor gris/negro que parecen fondos
            ...Array.from(document.querySelectorAll('div')).filter(div => {
                const style = window.getComputedStyle(div);
                return style.backgroundColor === 'rgb(37, 37, 37)' ||
                       style.backgroundColor === 'rgb(0, 0, 0)';
            }),
            // Canvas que también puede ser fondo
            ...document.querySelectorAll('canvas')
        ];

        console.log(`🎨 Encontrados ${backgroundElements.length} elementos de fondo`);

        backgroundElements.forEach((element, index) => {
            const style = window.getComputedStyle(element);
            const zIndex = parseInt(style.zIndex) || 0;

            // Solo aplicar a elementos que definitivamente son fondo
            if (zIndex <= 10) {
                element.style.setProperty('background-image', `url("${imageUrl}")`, 'important');
                element.style.setProperty('background-size', 'cover', 'important');
                element.style.setProperty('background-position', 'center', 'important');
                element.style.setProperty('background-repeat', 'no-repeat', 'important');

                console.log(`✅ Imagen aplicada a elemento ${index} (z-index: ${zIndex})`);
            }
        });
    }

    // Actualizar imagen según proyecto
    function updateProjectImage() {
        const project = detectCurrentProject();

        if (project && project !== currentProject) {
            currentProject = project;
            const image = PROJECT_IMAGES[project];

            if (image) {
                applyBackgroundImage(image);
                console.log(`🖼️ Imagen cambiada a proyecto: ${project}`);
            }
        }
    }

    // Ocultar círculo problemático del header
    function hideStuckCircle() {
        const problematicElements = document.querySelectorAll('svg[style*="mix-blend-mode: exclusion"], svg[viewBox="0 0 60 60"]');
        problematicElements.forEach(el => {
            el.style.display = 'none';
        });
    }

    // Función principal
    function main() {
        hideStuckCircle();
        updateProjectImage();

        // Si no hay proyecto, usar imagen por defecto
        if (!currentProject) {
            applyBackgroundImage(PROJECT_IMAGES['PARK MANSION']);
            console.log('🔄 Aplicando imagen por defecto');
        }
    }

    // Observer para cambios
    const observer = new MutationObserver(() => {
        updateProjectImage();
    });

    observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style', 'class']
    });

    // Ejecutar
    main();
    setInterval(updateProjectImage, 2000);

    // Eventos del DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    }
    window.addEventListener('load', main);

    console.log('🚀 Script de fondo dinámico activado');
})();

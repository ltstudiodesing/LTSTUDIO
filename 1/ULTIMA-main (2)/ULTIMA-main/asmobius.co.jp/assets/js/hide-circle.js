// SCRIPT PERSISTENTE PARA MANTENER IMÁGENES
(function() {
    console.log('🔥 SCRIPT ULTRA-PERSISTENTE ACTIVADO');

    const PROJECT_IMAGES = {
        'PARK MANSION': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
        'KAWANA': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
        'SEVENS VILLA': 'https://images.unsplash.com/photo-1600563438938-a42d1c941a96?w=1200&h=800&fit=crop',
        'PARK LE JADE': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
        'HIKAWA GARDENS': 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&h=800&fit=crop'
    };

    let currentProject = 'PARK MANSION';
    let lastImageUrl = '';
    let forceCounter = 0;

    // Forzar imagen de manera ultra-agresiva
    function forceImagePersistent(canvas, imageUrl) {
        if (!canvas || !imageUrl) return;

        // Aplicar múltiples veces para asegurar que se mantenga
        canvas.style.setProperty('background-image', `url("${imageUrl}")`, 'important');
        canvas.style.setProperty('background-size', 'cover', 'important');
        canvas.style.setProperty('background-position', 'center', 'important');
        canvas.style.setProperty('background-repeat', 'no-repeat', 'important');

        // También aplicar usando setAttribute como backup
        canvas.setAttribute('style',
            canvas.getAttribute('style') +
            `; background-image: url("${imageUrl}") !important;` +
            `; background-size: cover !important;` +
            `; background-position: center !important;`
        );

        forceCounter++;
        if (forceCounter % 10 === 0) {
            console.log(`🔄 Imagen forzada ${forceCounter} veces: ${imageUrl.substring(0, 50)}...`);
        }
    }

    // Detectar proyecto con mejor lógica
    function getActiveProject() {
        // Rotar proyectos cada 3 segundos aproximadamente
        const now = Date.now();
        const cycleTime = 3000; // 3 segundos por proyecto
        const projectKeys = Object.keys(PROJECT_IMAGES);
        const currentIndex = Math.floor((now / cycleTime) % projectKeys.length);

        return projectKeys[currentIndex];
    }

    // Aplicar y mantener imagen
    function maintainImage() {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        const project = getActiveProject();
        const imageUrl = PROJECT_IMAGES[project];

        // Si cambió el proyecto, actualizar
        if (project !== currentProject) {
            currentProject = project;
            lastImageUrl = imageUrl;
            console.log(`🔄 Proyecto cambiado a: ${project}`);
        }

        // SIEMPRE forzar la imagen actual (para combatir override)
        forceImagePersistent(canvas, lastImageUrl);
    }

    // Ocultar círculo problemático
    function hideStuckCircle() {
        const problematicElements = document.querySelectorAll('svg[viewBox="0 0 60 60"]');
        problematicElements.forEach(el => {
            el.style.display = 'none';
        });
    }

    // Inicializar
    hideStuckCircle();
    lastImageUrl = PROJECT_IMAGES[currentProject];

    // EJECUTAR CADA 100ms PARA MÁXIMA PERSISTENCIA
    setInterval(() => {
        hideStuckCircle();
        maintainImage();
    }, 100);

    // También observar cambios del DOM
    const observer = new MutationObserver(() => {
        maintainImage();
    });

    observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style']
    });

    // Detectar cuando el canvas se modifica y re-aplicar inmediatamente
    const canvasObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const canvas = mutation.target;
                if (canvas.tagName === 'CANVAS') {
                    // Re-aplicar imagen inmediatamente si se modificó el canvas
                    setTimeout(() => {
                        forceImagePersistent(canvas, lastImageUrl);
                    }, 10);
                }
            }
        });
    });

    // Observar cambios específicos en el canvas
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvasObserver.observe(canvas, {
            attributes: true,
            attributeFilter: ['style']
        });
    }

    console.log('🚀 Script ultra-persistente activo - Imágenes se mantendrán');
})();

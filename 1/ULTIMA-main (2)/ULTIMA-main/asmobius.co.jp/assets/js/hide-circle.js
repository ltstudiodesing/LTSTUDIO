// SCRIPT DINÁMICO PARA PROYECTOS CON IMÁGENES INMERSIVAS
(function() {
    console.log('🌟 INICIANDO SCRIPT DINÁMICO CON IMÁGENES POR PROYECTO');

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
    let fullScreenOverlay = null;

    // Crear overlay de pantalla completa para inmersión
    function createFullScreenOverlay() {
        if (fullScreenOverlay) return fullScreenOverlay;

        fullScreenOverlay = document.createElement('div');
        fullScreenOverlay.id = 'project-immersion-overlay';
        fullScreenOverlay.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            z-index: 5 !important;
            pointer-events: none !important;
            opacity: 0.8 !important;
            transition: background-image 0.8s ease-in-out !important;
        `;

        document.body.appendChild(fullScreenOverlay);
        console.log('✅ Overlay de pantalla completa creado');
        return fullScreenOverlay;
    }

    // Detectar proyecto actual
    function detectCurrentProject() {
        // Buscar en la lista de proyectos visible
        const projectList = document.querySelector('ul');
        if (!projectList) return null;

        const listItems = projectList.querySelectorAll('li');

        // Buscar el proyecto más visible o activo
        for (let item of listItems) {
            const style = window.getComputedStyle(item);
            const text = item.textContent.toUpperCase().trim();

            // Si el item está visible y tiene opacidad alta
            if (style.opacity > 0.7 || style.transform.includes('scale(1)')) {
                // Extraer nombre del proyecto
                for (let projectName in PROJECT_IMAGES) {
                    if (text.includes(projectName)) {
                        return projectName;
                    }
                }
            }
        }

        return null;
    }

    // Aplicar imagen del proyecto actual
    function updateProjectImage() {
        const project = detectCurrentProject();

        if (project && project !== currentProject) {
            currentProject = project;
            const image = PROJECT_IMAGES[project];

            if (image) {
                // Crear/actualizar overlay de pantalla completa
                const overlay = createFullScreenOverlay();
                overlay.style.setProperty('background-image', `url("${image}")`, 'important');

                console.log(`🖼️ Imagen cambiada a proyecto: ${project}`);
                console.log(`🌐 URL de imagen: ${image}`);
            }
        }
    }

    // Observar cambios en el DOM para detectar rotación de proyectos
    function observeProjectChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' || mutation.type === 'childList') {
                    updateProjectImage();
                }
            });
        });

        // Observar cambios en toda la página
        observer.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: ['style', 'class']
        });

        console.log('👁️ Observer de cambios de proyecto activado');
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

        // Si no hay proyecto detectado, usar imagen por defecto
        if (!currentProject) {
            const overlay = createFullScreenOverlay();
            overlay.style.setProperty('background-image', `url("${PROJECT_IMAGES['PARK MANSION']}")`, 'important');
            console.log('🔄 Aplicando imagen por defecto (PARK MANSION)');
        }
    }

    // Inicializar sistema
    main();
    observeProjectChanges();

    // Verificar cambios cada 2 segundos
    setInterval(() => {
        updateProjectImage();
    }, 2000);

    // Eventos del DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    }
    window.addEventListener('load', main);

    console.log('🚀 Sistema din��mico de proyectos activado - Imágenes cambiarán automáticamente');
})();

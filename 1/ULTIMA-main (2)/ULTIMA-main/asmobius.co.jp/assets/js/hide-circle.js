// SCRIPT PARA CANVAS INTERACTIVO
(function() {
    console.log('🎯 TARGETING CANVAS ELEMENT');

    const PROJECT_IMAGES = {
        'PARK MANSION': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
        'KAWANA': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
        'SEVENS VILLA': 'https://images.unsplash.com/photo-1600563438938-a42d1c941a96?w=1200&h=800&fit=crop',
        'PARK LE JADE': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
        'HIKAWA GARDENS': 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&h=800&fit=crop'
    };

    let currentProject = '';

    // Encontrar el canvas donde aparece el círculo interactivo
    function findCanvas() {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            console.log('✅ Canvas encontrado:', canvas.width, 'x', canvas.height);
            return canvas;
        }
        return null;
    }

    // Detectar proyecto actual de la lista
    function detectCurrentProject() {
        const projectList = document.querySelector('ul');
        if (!projectList) return 'PARK MANSION';

        const text = projectList.textContent.toUpperCase();
        console.log('📝 Texto de proyectos:', text.substring(0, 100));

        // Buscar palabras clave de cada proyecto
        if (text.includes('KAWANA')) return 'KAWANA';
        if (text.includes('SEVENS VILLA')) return 'SEVENS VILLA';
        if (text.includes('PARK LE JADE')) return 'PARK LE JADE';
        if (text.includes('HIKAWA GARDENS')) return 'HIKAWA GARDENS';
        if (text.includes('PARK MANSION')) return 'PARK MANSION';

        return 'PARK MANSION';
    }

    // Aplicar imagen como fondo del canvas
    function applyImageToCanvas() {
        const canvas = findCanvas();
        if (!canvas) {
            console.log('❌ No se encontró canvas');
            return;
        }

        const project = detectCurrentProject();

        if (project !== currentProject) {
            currentProject = project;
            const image = PROJECT_IMAGES[project];

            // Aplicar la imagen como fondo del canvas
            canvas.style.setProperty('background-image', `url("${image}")`, 'important');
            canvas.style.setProperty('background-size', 'cover', 'important');
            canvas.style.setProperty('background-position', 'center', 'important');
            canvas.style.setProperty('background-repeat', 'no-repeat', 'important');

            console.log(`🖼️ Imagen aplicada al canvas: ${project}`);
            console.log(`🌐 URL: ${image}`);
        }
    }

    // Ocultar círculo problemático
    function hideStuckCircle() {
        const problematicElements = document.querySelectorAll('svg[viewBox="0 0 60 60"]');
        problematicElements.forEach(el => {
            el.style.display = 'none';
        });
    }

    // Ejecutar inmediatamente
    hideStuckCircle();
    applyImageToCanvas();

    // Observar cambios en el DOM
    const observer = new MutationObserver(() => {
        applyImageToCanvas();
    });

    observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true
    });

    // Verificar cada 2 segundos
    setInterval(() => {
        hideStuckCircle();
        applyImageToCanvas();
    }, 2000);

    console.log('🚀 Script de canvas activado');
})();

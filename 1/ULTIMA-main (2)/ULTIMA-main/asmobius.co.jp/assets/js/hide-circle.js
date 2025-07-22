// SCRIPT ESPECÍFICO PARA EL CÍRCULO INTERACTIVO
(function() {
    console.log('🎯 TARGETING SPECIFIC CIRCLE');

    const PROJECT_IMAGES = {
        'PARK MANSION': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop',
        'KAWANA': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=800&fit=crop',
        'SEVENS VILLA': 'https://images.unsplash.com/photo-1600563438938-a42d1c941a96?w=800&h=800&fit=crop',
        'PARK LE JADE': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop',
        'HIKAWA GARDENS': 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&h=800&fit=crop'
    };

    let currentProject = '';
    let circleBackground = null;

    // Encontrar el círculo específico que seleccionaste
    function findTargetCircle() {
        // Buscar el círculo con las características exactas que mostraste
        const circles = document.querySelectorAll('circle');

        for (let circle of circles) {
            const cx = parseFloat(circle.getAttribute('cx'));
            const cy = parseFloat(circle.getAttribute('cy'));
            const r = parseFloat(circle.getAttribute('r'));

            // Buscar círculo grande (radio > 300) que sea el interactivo
            if (r > 300 && cx > 500 && cy > 300) {
                console.log(`✅ Círculo encontrado: cx=${cx}, cy=${cy}, r=${r}`);
                return { element: circle, cx, cy, r };
            }
        }
        return null;
    }

    // Crear fondo circular específico
    function createCircleBackground(circleData) {
        if (circleBackground) return circleBackground;

        const { cx, cy, r } = circleData;

        circleBackground = document.createElement('div');
        circleBackground.id = 'circle-background-image';
        circleBackground.style.cssText = `
            position: absolute !important;
            left: ${cx - r}px !important;
            top: ${cy - r}px !important;
            width: ${r * 2}px !important;
            height: ${r * 2}px !important;
            border-radius: 50% !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            z-index: 1 !important;
            pointer-events: none !important;
            transition: background-image 0.5s ease !important;
        `;

        // Insertar antes del círculo SVG
        circleData.element.parentNode.insertBefore(circleBackground, circleData.element);
        console.log('✅ Fondo circular creado');
        return circleBackground;
    }

    // Detectar proyecto actual
    function detectCurrentProject() {
        const projectList = document.querySelector('ul');
        if (!projectList) return null;

        const listItems = projectList.querySelectorAll('li');

        for (let item of listItems) {
            const style = window.getComputedStyle(item);
            const text = item.textContent.toUpperCase().trim();

            // Buscar proyecto visible
            if (style.opacity > 0.5) {
                for (let projectName in PROJECT_IMAGES) {
                    if (text.includes(projectName)) {
                        return projectName;
                    }
                }
            }
        }
        return 'PARK MANSION';
    }

    // Actualizar imagen del círculo
    function updateCircleImage() {
        const circleData = findTargetCircle();
        if (!circleData) {
            console.log('❌ No se encontró el círculo');
            return;
        }

        const project = detectCurrentProject();

        if (project && project !== currentProject) {
            currentProject = project;
            const image = PROJECT_IMAGES[project];

            const background = createCircleBackground(circleData);
            background.style.setProperty('background-image', `url("${image}")`, 'important');

            console.log(`🖼️ Imagen del círculo cambiada a: ${project}`);
        }
    }

    // Ocultar círculo problemático
    function hideStuckCircle() {
        const problematicElements = document.querySelectorAll('svg[viewBox="0 0 60 60"]');
        problematicElements.forEach(el => {
            el.style.display = 'none';
        });
    }

    // Ejecutar
    hideStuckCircle();
    updateCircleImage();

    // Observar cambios
    const observer = new MutationObserver(() => {
        updateCircleImage();
    });

    observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true
    });

    // Verificar cada 3 segundos
    setInterval(() => {
        hideStuckCircle();
        updateCircleImage();
    }, 3000);

    console.log('🚀 Script específico para círculo activado');
})();

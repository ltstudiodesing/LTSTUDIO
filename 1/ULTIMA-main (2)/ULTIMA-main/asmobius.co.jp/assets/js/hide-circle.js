// SCRIPT MINIMALISTA - SOLO FONDO PRINCIPAL
(function() {
    console.log('🎯 SCRIPT MINIMALISTA ACTIVADO');

    const PROJECT_IMAGES = {
        'PARK MANSION': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop',
        'KAWANA': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop',
        'SEVENS VILLA': 'https://images.unsplash.com/photo-1600563438938-a42d1c941a96?w=1920&h=1080&fit=crop'
    };

    let currentProject = '';

    // Solo ocultar círculo problemático
    function hideStuckCircle() {
        const problematicElements = document.querySelectorAll('svg[viewBox="0 0 60 60"]');
        problematicElements.forEach(el => {
            el.style.display = 'none';
        });
    }

    // Detectar proyecto muy conservadoramente
    function detectCurrentProject() {
        const projectList = document.querySelector('ul');
        if (!projectList) return 'PARK MANSION';

        const text = projectList.textContent.toUpperCase();

        if (text.includes('KAWANA')) return 'KAWANA';
        if (text.includes('SEVENS VILLA')) return 'SEVENS VILLA';
        return 'PARK MANSION';
    }

    // Solo aplicar al body como último recurso
    function applyToBody() {
        const project = detectCurrentProject();

        if (project !== currentProject) {
            currentProject = project;
            const image = PROJECT_IMAGES[project];

            // Solo aplicar al body, nada más
            document.body.style.setProperty('background-image', `url("${image}")`, 'important');
            document.body.style.setProperty('background-size', 'cover', 'important');
            document.body.style.setProperty('background-position', 'center', 'important');
            document.body.style.setProperty('background-attachment', 'fixed', 'important');

            console.log(`✅ Fondo aplicado al body: ${project}`);
        }
    }

    // Ejecutar solo lo mínimo
    hideStuckCircle();

    // Solo cada 5 segundos para no sobrecargar
    setInterval(() => {
        hideStuckCircle();
        applyToBody();
    }, 5000);

    console.log('🚀 Script minimalista activo');
})();

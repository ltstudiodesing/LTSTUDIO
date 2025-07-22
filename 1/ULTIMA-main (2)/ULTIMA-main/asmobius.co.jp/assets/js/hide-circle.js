// SCRIPT PARA MANTENER IMAGEN FIJA DURANTE PROYECTO
(function() {
    console.log('🔒 Script de imagen persistente');

    const PROJECT_IMAGES = {
        'PARK MANSION': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        'KAWANA': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        'SEVENS VILLA': 'https://images.unsplash.com/photo-1600563438938-a42d1c941a96?w=800&h=600&fit=crop'
    };

    let currentProject = 'PARK MANSION';
    let lockImage = false;

    // Forzar imagen con !important para que no se quite
    function lockImageToCanvas() {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        const imageUrl = PROJECT_IMAGES[currentProject];

        // Aplicar con !important para que no sea removida
        canvas.style.setProperty('background-image', `url("${imageUrl}")`, 'important');
        canvas.style.setProperty('background-size', 'cover', 'important');
        canvas.style.setProperty('background-position', 'center', 'important');
        canvas.style.setProperty('background-repeat', 'no-repeat', 'important');

        lockImage = true;
        console.log(`🔒 Imagen bloqueada: ${currentProject}`);
    }

    // Detectar proyecto actual
    function detectProject() {
        const ul = document.querySelector('ul');
        if (!ul) return currentProject;

        const text = ul.textContent.toUpperCase();

        if (text.includes('KAWANA')) return 'KAWANA';
        if (text.includes('SEVENS VILLA')) return 'SEVENS VILLA';
        return 'PARK MANSION';
    }

    // Mantener imagen aplicada constantemente
    function maintainImage() {
        if (!lockImage) return;

        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        const imageUrl = PROJECT_IMAGES[currentProject];

        // Re-aplicar constantemente para evitar que se quite
        canvas.style.setProperty('background-image', `url("${imageUrl}")`, 'important');
        canvas.style.setProperty('background-size', 'cover', 'important');
        canvas.style.setProperty('background-position', 'center', 'important');
    }

    // Cambiar proyecto solo cuando sea necesario
    function checkProjectChange() {
        const newProject = detectProject();

        if (newProject !== currentProject) {
            currentProject = newProject;
            lockImageToCanvas();
            console.log(`🔄 Proyecto cambiado a: ${currentProject}`);
        }
    }

    // Ocultar círculo problemático
    function hideStuckCircle() {
        const svg = document.querySelector('svg[viewBox="0 0 60 60"]');
        if (svg) svg.style.display = 'none';
    }

    // Inicializar
    hideStuckCircle();
    lockImageToCanvas();

    // Mantener imagen cada 500ms para que no desaparezca
    setInterval(maintainImage, 500);

    // Verificar cambios de proyecto cada 2 segundos
    setInterval(() => {
        hideStuckCircle();
        checkProjectChange();
    }, 2000);

    console.log('🚀 Script de persistencia activado');
})();

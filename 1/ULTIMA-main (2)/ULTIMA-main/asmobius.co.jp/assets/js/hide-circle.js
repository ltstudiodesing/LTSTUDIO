// SCRIPT SIMPLE Y LIGERO
(function() {
    console.log('✨ Script simple iniciado');

    const PROJECT_IMAGES = {
        'PARK MANSION': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        'KAWANA': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        'SEVENS VILLA': 'https://images.unsplash.com/photo-1600563438938-a42d1c941a96?w=800&h=600&fit=crop'
    };

    let currentProject = 'PARK MANSION';

    // Aplicar imagen al canvas de forma simple
    function applyImage() {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        const imageUrl = PROJECT_IMAGES[currentProject];
        canvas.style.backgroundImage = `url("${imageUrl}")`;
        canvas.style.backgroundSize = 'cover';
        canvas.style.backgroundPosition = 'center';

        console.log(`✅ Imagen aplicada: ${currentProject}`);
    }

    // Detectar proyecto simple
    function detectProject() {
        const ul = document.querySelector('ul');
        if (!ul) return;

        const text = ul.textContent;

        if (text.includes('KAWANA')) {
            currentProject = 'KAWANA';
        } else if (text.includes('SEVENS VILLA')) {
            currentProject = 'SEVENS VILLA';
        } else {
            currentProject = 'PARK MANSION';
        }
    }

    // Ocultar círculo problemático
    function hideStuckCircle() {
        const svg = document.querySelector('svg[viewBox="0 0 60 60"]');
        if (svg) svg.style.display = 'none';
    }

    // Función principal
    function main() {
        hideStuckCircle();
        detectProject();
        applyImage();
    }

    // Ejecutar cada 3 segundos (mucho más ligero)
    main();
    setInterval(main, 3000);

    console.log('🚀 Script ligero activo');
})();

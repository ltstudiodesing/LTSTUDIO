// SCRIPT PARA FONDO SOLAMENTE
(function() {
    console.log('🎯 Script de fondo activado');

    const IMAGENES = {
        'PARK MANSION': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
        'KAWANA': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
        'SEVENS VILLA': 'https://images.unsplash.com/photo-1600563438938-a42d1c941a96?w=1200&h=800&fit=crop'
    };

    let divFondo = null;
    let proyectoActual = 'PARK MANSION';
    let introTerminada = false;

    // Detectar si la intro ya terminó
    function checkIntro() {
        const canvas = document.querySelector('canvas');
        // Si hay canvas visible, la intro terminó
        if (canvas && canvas.offsetWidth > 100) {
            introTerminada = true;
            console.log('✅ Intro terminada, aplicando imágenes');
        }
    }

    // Crear fondo MUY atrás
    function crearFondo() {
        if (divFondo) return divFondo;

        divFondo = document.createElement('div');
        divFondo.id = 'fondo-proyecto';
        divFondo.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-size: cover !important;
            background-position: center !important;
            z-index: -999 !important;
            pointer-events: none !important;
            opacity: 0.7 !important;
        `;

        document.body.insertBefore(divFondo, document.body.firstChild);
        console.log('✅ Fondo creado muy atrás');
        return divFondo;
    }

    // Detectar proyecto actual por texto visible
    function detectarProyecto() {
        const ul = document.querySelector('ul');
        if (!ul) return 'PARK MANSION';

        // Buscar qué proyecto está visible en el momento
        const texto = ul.textContent.toUpperCase();

        if (texto.includes('KAWANA')) return 'KAWANA';
        if (texto.includes('SEVENS VILLA')) return 'SEVENS VILLA';
        return 'PARK MANSION';
    }

    // Aplicar imagen de fondo
    function aplicarFondo() {
        if (!introTerminada) return;

        const proyecto = detectarProyecto();

        if (proyecto !== proyectoActual) {
            proyectoActual = proyecto;
            const fondo = crearFondo();
            const imagen = IMAGENES[proyectoActual];

            fondo.style.backgroundImage = `url("${imagen}")`;
            console.log(`🖼️ Fondo cambiado a: ${proyectoActual}`);
        }
    }

    // Ocultar círculo molesto SOLAMENTE
    function ocultarCirculo() {
        const svg = document.querySelector('svg[viewBox="0 0 60 60"]');
        if (svg) svg.style.display = 'none';
    }

    // Verificar cada 2 segundos sin molestar
    setInterval(() => {
        checkIntro();
        ocultarCirculo();

        if (introTerminada) {
            aplicarFondo();
        }
    }, 2000);

    console.log('🚀 Script de fondo listo - Esperando que termine intro');
})();

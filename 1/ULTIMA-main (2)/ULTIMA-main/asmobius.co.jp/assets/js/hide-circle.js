// SCRIPT PARA IMAGEN DENTRO DEL CÍRCULO
(function() {
    console.log('🎯 Script para círculo específico');

    const IMAGENES = {
        'PARK MANSION': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop',
        'KAWANA': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=800&fit=crop',
        'SEVENS VILLA': 'https://images.unsplash.com/photo-1600563438938-a42d1c941a96?w=800&h=800&fit=crop'
    };

    let circuloImagen = null;
    let proyectoActual = 'PARK MANSION';

    // Crear div circular EXACTAMENTE donde está el círculo
    function crearCirculoImagen() {
        if (circuloImagen) return circuloImagen;

        const canvas = document.querySelector('canvas');
        if (!canvas) return null;

        // Crear un div circular que se posicione sobre el canvas
        circuloImagen = document.createElement('div');
        circuloImagen.id = 'imagen-circulo';
        circuloImagen.style.cssText = `
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            width: 600px !important;
            height: 600px !important;
            border-radius: 50% !important;
            transform: translate(-50%, -50%) !important;
            background-size: cover !important;
            background-position: center !important;
            z-index: 1 !important;
            pointer-events: none !important;
            opacity: 0.8 !important;
        `;

        // Insertar directamente sobre el canvas
        canvas.parentNode.insertBefore(circuloImagen, canvas.nextSibling);
        console.log('✅ Círculo de imagen creado');
        return circuloImagen;
    }

    // Detectar proyecto simple y directo
    function detectarProyecto() {
        const ul = document.querySelector('ul');
        if (!ul) return 'PARK MANSION';

        const texto = ul.textContent.toUpperCase();
        if (texto.includes('KAWANA')) return 'KAWANA';
        if (texto.includes('SEVENS VILLA')) return 'SEVENS VILLA';
        return 'PARK MANSION';
    }

    // Aplicar imagen al círculo
    function aplicarImagenCirculo() {
        const canvas = document.querySelector('canvas');
        if (!canvas || canvas.offsetWidth < 100) return;

        const proyecto = detectarProyecto();

        if (proyecto !== proyectoActual) {
            proyectoActual = proyecto;
            const circulo = crearCirculoImagen();

            if (circulo) {
                const imagen = IMAGENES[proyectoActual];
                circulo.style.backgroundImage = `url("${imagen}")`;
                console.log(`🖼️ Imagen aplicada al círculo: ${proyectoActual}`);
            }
        }
    }

    // Ocultar círculo molesto
    function ocultarCirculo() {
        const svg = document.querySelector('svg[viewBox="0 0 60 60"]');
        if (svg) svg.style.display = 'none';
    }

    // Verificar cada 2 segundos
    setInterval(() => {
        ocultarCirculo();
        aplicarImagenCirculo();
    }, 2000);

    console.log('🚀 Script del círculo listo');
})();

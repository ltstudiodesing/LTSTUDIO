// SOLUCIÓN DEFINITIVA - CÍRCULO PROPIO CON IMÁGENES
(function() {
    console.log('🚀 CREANDO SOLUCIÓN PROPIA - SIN DEPENDER DEL SITIO');

    // Imágenes de proyectos arquitectónicos
    const PROYECTOS = [
        {
            nombre: 'PARK MANSION',
            imagen: 'https://picsum.photos/600/600?random=1'
        },
        {
            nombre: 'KAWANA',
            imagen: 'https://picsum.photos/600/600?random=2'
        },
        {
            nombre: 'SEVENS VILLA',
            imagen: 'https://picsum.photos/600/600?random=3'
        },
        {
            nombre: 'PARK LE JADE',
            imagen: 'https://picsum.photos/600/600?random=4'
        },
        {
            nombre: 'HIKAWA GARDENS',
            imagen: 'https://picsum.photos/600/600?random=5'
        }
    ];

    let proyectoActual = 0;
    let miCirculo = null;

    // Crear MI PROPIO círculo completamente independiente
    function crearMiCirculo() {
        if (miCirculo) return miCirculo;

        // Eliminar cualquier círculo previo
        const circuloPrevio = document.getElementById('mi-circulo-imagenes');
        if (circuloPrevio) circuloPrevio.remove();

        miCirculo = document.createElement('div');
        miCirculo.id = 'mi-circulo-imagenes';
        miCirculo.style.cssText = `
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            width: 600px !important;
            height: 600px !important;
            border-radius: 50% !important;
            transform: translate(-50%, -50%) !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            z-index: 50 !important;
            pointer-events: none !important;
            box-shadow: 0 0 50px rgba(0,0,0,0.3) !important;
            border: 3px solid rgba(255,255,255,0.2) !important;
            transition: background-image 1s ease-in-out !important;
        `;

        document.body.appendChild(miCirculo);
        console.log('✅ MI CÍRCULO CREADO');
        return miCirculo;
    }

    // Crear texto de proyecto
    function crearTextoProyecto() {
        const textoExistente = document.getElementById('mi-texto-proyecto');
        if (textoExistente) textoExistente.remove();

        const miTexto = document.createElement('div');
        miTexto.id = 'mi-texto-proyecto';
        miTexto.style.cssText = `
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            color: white !important;
            font-family: 'butler_medium', serif !important;
            font-size: 24px !important;
            font-weight: bold !important;
            text-align: center !important;
            z-index: 60 !important;
            pointer-events: none !important;
            text-shadow: 2px 2px 10px rgba(0,0,0,0.8) !important;
            transition: opacity 0.5s ease !important;
        `;

        document.body.appendChild(miTexto);
        return miTexto;
    }

    // Cambiar imagen y texto
    function cambiarProyecto() {
        const circulo = crearMiCirculo();
        const texto = crearTextoProyecto();

        const proyecto = PROYECTOS[proyectoActual];

        circulo.style.backgroundImage = `url("${proyecto.imagen}")`;
        texto.textContent = proyecto.nombre;

        console.log(`🖼️ PROYECTO ACTUAL: ${proyecto.nombre}`);

        // Siguiente proyecto
        proyectoActual = (proyectoActual + 1) % PROYECTOS.length;
    }

    // Ocultar elementos molestos
    function limpiarElementos() {
        // Ocultar círculo problemático del header
        const circuloProblematico = document.querySelector('svg[viewBox="0 0 60 60"]');
        if (circuloProblematico) {
            circuloProblematico.style.display = 'none';
        }

        // Ocultar otros elementos giratorios molestos
        const elementosGiratorios = document.querySelectorAll('[style*="animation-name: spin"]');
        elementosGiratorios.forEach(el => {
            el.style.display = 'none';
        });
    }

    // Inicializar todo
    function inicializar() {
        limpiarElementos();
        cambiarProyecto();
        console.log('🎉 SOLUCIÓN PROPIA INICIADA');
    }

    // Comenzar inmediatamente
    setTimeout(inicializar, 500);

    // Cambiar proyecto cada 4 segundos
    setInterval(() => {
        limpiarElementos();
        cambiarProyecto();
    }, 4000);

    console.log('🚀 SCRIPT PROPIO ACTIVADO - VA A FUNCIONAR SÍ O SÍ');
})();

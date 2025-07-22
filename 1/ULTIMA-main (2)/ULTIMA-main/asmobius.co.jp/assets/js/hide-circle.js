// SCRIPT MÍNIMO - SOLO AGREGAR IMÁGENES DE FONDO SINCRONIZADAS
(function() {
    console.log('🎯 AGREGANDO SOLO IMÁGENES DE FONDO A TU WEB ORIGINAL');

    const IMAGENES_PROYECTOS = {
        'PARK MANSION': 'https://picsum.photos/1200/800?random=1',
        'KAWANA': 'https://picsum.photos/1200/800?random=2',
        'SEVENS VILLA': 'https://picsum.photos/1200/800?random=3',
        'PARK LE JADE': 'https://picsum.photos/1200/800?random=4',
        'HIKAWA GARDENS': 'https://picsum.photos/1200/800?random=5',
        'ONE AVENUE': 'https://picsum.photos/1200/800?random=6',
        'CENTURY FOREST': 'https://picsum.photos/1200/800?random=7',
        'PROUD': 'https://picsum.photos/1200/800?random=8'
    };

    let fondoActual = null;
    let proyectoAnterior = '';
    let timerImagen = null;

    // Crear fondo DETRÁS de todo (z-index muy bajo)
    function crearFondoImagen() {
        if (fondoActual) return fondoActual;

        fondoActual = document.createElement('div');
        fondoActual.id = 'fondo-imagen-proyecto';
        fondoActual.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            z-index: -10 !important;
            pointer-events: none !important;
            opacity: 0.3 !important;
            transition: none !important;
        `;

        // Insertar AL PRINCIPIO del body para que esté detrás de todo
        document.body.insertBefore(fondoActual, document.body.firstChild);
        console.log('✅ Fondo de imagen creado DETRÁS de todo');
        return fondoActual;
    }

    // Detectar proyecto actual de la lista
    function detectarProyectoActual() {
        const ul = document.querySelector('ul');
        if (!ul) return null;

        const texto = ul.textContent.toUpperCase();

        // Buscar qu�� proyecto está activo
        for (let proyecto in IMAGENES_PROYECTOS) {
            if (texto.includes(proyecto)) {
                return proyecto;
            }
        }
        return null;
    }

    // Aplicar imagen y mantenerla durante EXACTAMENTE 3 segundos
    function aplicarImagenSincronizada() {
        const proyectoActual = detectarProyectoActual();

        if (proyectoActual && proyectoActual !== proyectoAnterior) {
            proyectoAnterior = proyectoActual;

            const fondo = crearFondoImagen();
            const imagen = IMAGENES_PROYECTOS[proyectoActual];

            // Aplicar imagen inmediatamente
            fondo.style.backgroundImage = `url("${imagen}")`;
            fondo.style.opacity = '0.3';

            console.log(`🖼️ Imagen aplicada: ${proyectoActual}`);

            // Limpiar timer anterior
            if (timerImagen) {
                clearTimeout(timerImagen);
            }

            // Mantener imagen por EXACTAMENTE 3 segundos
            timerImagen = setTimeout(() => {
                // No hacer nada aquí - dejar que la imagen persista
                // hasta que el siguiente proyecto la cambie
                console.log(`⏰ 3 segundos completados para: ${proyectoActual}`);
            }, 3000);
        }
    }

    // Solo ocultar el círculo molesto del header
    function ocultarCirculoHeader() {
        const svg = document.querySelector('svg[viewBox="0 0 60 60"]');
        if (svg) {
            svg.style.display = 'none';
        }
    }

    // Monitorear cambios en la lista de proyectos
    function iniciarMonitoreo() {
        // Aplicar imagen inicial
        aplicarImagenSincronizada();

        // Observer para detectar cambios en la lista
        const observer = new MutationObserver(() => {
            aplicarImagenSincronizada();
        });

        const ul = document.querySelector('ul');
        if (ul) {
            observer.observe(ul, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true
            });
        }

        // También verificar cada 500ms como backup
        setInterval(() => {
            ocultarCirculoHeader();
            aplicarImagenSincronizada();
        }, 500);
    }

    // Inicializar después de que cargue la página
    setTimeout(() => {
        ocultarCirculoHeader();
        iniciarMonitoreo();
        console.log('🚀 Imágenes sincronizadas activadas - Durarán 3 segundos completos');
    }, 2000);

})();

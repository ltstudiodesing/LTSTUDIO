// SCRIPT ULTRA SIMPLE - SOLO FONDO AL CANVAS
(function() {
    console.log('🎯 SCRIPT ULTRA SIMPLE - SOLO FONDO');

    // Imágenes que funcionan sin CORS
    const IMAGENES = [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=3',
        'https://picsum.photos/800/600?random=4',
        'https://picsum.photos/800/600?random=5'
    ];

    let imagenActual = 0;

    // Solo aplicar fondo al canvas
    function aplicarFondo() {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        const imagen = IMAGENES[imagenActual];

        // Aplicar imagen de fondo al canvas
        canvas.style.setProperty('background-image', `url("${imagen}")`, 'important');
        canvas.style.setProperty('background-size', 'cover', 'important');
        canvas.style.setProperty('background-position', 'center', 'important');
        canvas.style.setProperty('background-repeat', 'no-repeat', 'important');

        console.log(`✅ Imagen ${imagenActual + 1} aplicada al canvas`);

        // Siguiente imagen
        imagenActual = (imagenActual + 1) % IMAGENES.length;
    }

    // Eliminar elementos creados por scripts anteriores
    function limpiarElementosAnteriores() {
        const elementosAEliminar = [
            'mi-circulo-imagenes',
            'mi-texto-proyecto',
            'imagen-circulo',
            'fondo-proyecto',
            'imagen-proyecto'
        ];

        elementosAnteriores.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.remove();
                console.log(`🗑️ Eliminado: ${id}`);
            }
        });
    }

    // Ocultar solo el círculo molesto del header
    function ocultarCirculoHeader() {
        const svg = document.querySelector('svg[viewBox="0 0 60 60"]');
        if (svg) svg.style.display = 'none';
    }

    // Inicializar
    limpiarElementosAnteriores();
    ocultarCirculoHeader();
    aplicarFondo();

    // Cambiar imagen cada 3 segundos
    setInterval(() => {
        ocultarCirculoHeader();
        aplicarFondo();
    }, 3000);

    console.log('🚀 Script ultra simple activado');
})();

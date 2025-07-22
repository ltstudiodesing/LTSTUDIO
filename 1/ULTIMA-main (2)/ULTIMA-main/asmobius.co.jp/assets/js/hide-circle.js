// SCRIPT SIMPLE PARA PONER IMÁGENES
(function() {
    console.log('🎯 Iniciando script simple en español');

    const IMAGENES = {
        'PARK MANSION': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
        'KAWANA': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
        'SEVENS VILLA': 'https://images.unsplash.com/photo-1600563438938-a42d1c941a96?w=1200&h=800&fit=crop'
    };

    let divImagen = null;
    let proyectoActual = 'PARK MANSION';

    // Crear div para la imagen
    function crearDivImagen() {
        if (divImagen) return divImagen;

        divImagen = document.createElement('div');
        divImagen.id = 'imagen-proyecto';
        divImagen.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-size: cover !important;
            background-position: center !important;
            z-index: 0 !important;
            pointer-events: none !important;
        `;

        document.body.appendChild(divImagen);
        console.log('✅ Div de imagen creado');
        return divImagen;
    }

    // Rotar proyectos automáticamente cada 3 segundos
    function rotarProyecto() {
        const proyectos = Object.keys(IMAGENES);
        const indiceActual = proyectos.indexOf(proyectoActual);
        const siguienteIndice = (indiceActual + 1) % proyectos.length;
        proyectoActual = proyectos[siguienteIndice];

        console.log(`🔄 Cambiando a: ${proyectoActual}`);
    }

    // Aplicar imagen
    function aplicarImagen() {
        const div = crearDivImagen();
        const imagen = IMAGENES[proyectoActual];

        div.style.backgroundImage = `url("${imagen}")`;
        console.log(`🖼️ Imagen aplicada: ${proyectoActual}`);
    }

    // Ocultar círculo molesto
    function ocultarCirculo() {
        const svg = document.querySelector('svg[viewBox="0 0 60 60"]');
        if (svg) svg.style.display = 'none';
    }

    // Inicializar
    ocultarCirculo();
    aplicarImagen();

    // Cambiar proyecto cada 3 segundos
    setInterval(() => {
        ocultarCirculo();
        rotarProyecto();
        aplicarImagen();
    }, 3000);

    console.log('🚀 Script activado - Las imágenes van a aparecer');
})();

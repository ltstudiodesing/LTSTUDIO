// SCRIPT ULTRA SIMPLE - SOLO UNA IMAGEN QUE SE VEA
(function() {
    console.log('🔥 SCRIPT ULTRA SIMPLE - SOLO HACER QUE SE VEA UNA IMAGEN');

    // Aplicar imagen directamente al canvas
    function aplicarImagenAlCanvas() {
        const canvas = document.querySelector('canvas');
        if (!canvas) {
            console.log('❌ No se encontró canvas');
            return;
        }

        console.log('✅ Canvas encontrado:', canvas);

        // Aplicar imagen de fondo DIRECTAMENTE
        const imagen = 'https://picsum.photos/1537/901?random=1';

        canvas.style.setProperty('background-image', `url("${imagen}")`, 'important');
        canvas.style.setProperty('background-size', 'cover', 'important');
        canvas.style.setProperty('background-position', 'center', 'important');
        canvas.style.setProperty('background-repeat', 'no-repeat', 'important');

        console.log('🖼️ IMAGEN APLICADA AL CANVAS:', imagen);
        console.log('📏 Canvas size:', canvas.width, 'x', canvas.height);

        // Verificar que se aplicó
        const style = window.getComputedStyle(canvas);
        console.log('🔍 Background aplicado:', style.backgroundImage);
    }

    // Crear div de fondo como backup
    function crearDivFondo() {
        // Eliminar div anterior si existe
        const divAnterior = document.getElementById('fondo-simple');
        if (divAnterior) divAnterior.remove();

        const divFondo = document.createElement('div');
        divFondo.id = 'fondo-simple';
        divFondo.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background-image: url('https://picsum.photos/1600/900?random=2') !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            z-index: -50 !important;
            pointer-events: none !important;
        `;

        document.body.insertBefore(divFondo, document.body.firstChild);
        console.log('✅ DIV DE FONDO CREADO COMO BACKUP');
    }

    // Ocultar círculo molesto
    function ocultarCirculo() {
        const svg = document.querySelector('svg[viewBox="0 0 60 60"]');
        if (svg) {
            svg.style.display = 'none';
            console.log('👻 Círculo molesto ocultado');
        }
    }

    // Función principal
    function main() {
        console.log('🚀 EJECUTANDO FUNCIÓN PRINCIPAL');

        ocultarCirculo();
        aplicarImagenAlCanvas();
        crearDivFondo();

        console.log('✅ TODO EJECUTADO - DEBERÍA VERSE UNA IMAGEN');
    }

    // Ejecutar inmediatamente
    main();

    // Ejecutar cada 2 segundos para asegurar
    setInterval(() => {
        console.log('🔄 Verificando cada 2 segundos...');
        main();
    }, 2000);

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    }

    // Ejecutar cuando todo esté cargado
    window.addEventListener('load', main);

    console.log('🚀 SCRIPT ACTIVADO - SI NO SE VE IMAGEN HAY OTRO PROBLEMA');
})();

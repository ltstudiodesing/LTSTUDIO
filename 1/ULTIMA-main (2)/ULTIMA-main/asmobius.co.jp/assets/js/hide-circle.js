// SCRIPT PRECISO PARA CÍRCULO INTERACTIVO
(function() {
    console.log('🎯 INICIANDO SCRIPT PRECISO PARA CÍRCULO');

    const PARK_MANSION_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1200&fit=crop';

    // Función para aplicar imagen SOLO al círculo interactivo
    function applyBackgroundToCircle() {
        console.log('🔍 Buscando círculo interactivo...');

        // Buscar círculo por diferentes métodos
        const possibleCircles = [
            // Por clase o ID específico
            document.querySelector('[data-circle="true"]'),
            document.querySelector('.interactive-circle'),
            document.querySelector('#circle'),
            // Por CSS que indique círculo (border-radius: 50%)
            ...Array.from(document.querySelectorAll('div')).filter(div => {
                const style = window.getComputedStyle(div);
                return style.borderRadius.includes('50%') &&
                       (parseInt(style.width) > 200 || parseInt(style.height) > 200);
            }),
            // Por tamaño cuadrado y grande (típico círculo)
            ...Array.from(document.querySelectorAll('div')).filter(div => {
                const style = window.getComputedStyle(div);
                const width = parseInt(style.width) || 0;
                const height = parseInt(style.height) || 0;
                return width > 300 && height > 300 && Math.abs(width - height) < 50;
            })
        ];

        // Encontrar el círculo correcto (el más grande)
        let targetCircle = null;
        let maxSize = 0;

        possibleCircles.forEach(circle => {
            if (!circle) return;
            const style = window.getComputedStyle(circle);
            const width = parseInt(style.width) || 0;
            const height = parseInt(style.height) || 0;
            const size = width * height;

            if (size > maxSize) {
                maxSize = size;
                targetCircle = circle;
            }
        });

        if (targetCircle) {
            console.log('✅ Círculo encontrado:', targetCircle);

            // SOLO aplicar la imagen, preservar todo lo demás
            targetCircle.style.setProperty('background-image', `url("${PARK_MANSION_IMAGE}")`, 'important');
            targetCircle.style.setProperty('background-size', 'cover', 'important');
            targetCircle.style.setProperty('background-position', 'center', 'important');
            targetCircle.style.setProperty('background-repeat', 'no-repeat', 'important');

            console.log('🖼️ Imagen aplicada al círculo correctamente');
            return true;
        } else {
            console.log('❌ No se encontró círculo interactivo');
            return false;
        }
    }

    // Ocultar círculo problemático del header
    function hideStuckCircle() {
        const problematicElements = document.querySelectorAll('svg[style*="mix-blend-mode: exclusion"], svg[viewBox="0 0 60 60"]');
        problematicElements.forEach(el => {
            el.style.display = 'none';
            console.log('🔧 Elemento problemático ocultado');
        });
    }

    // Función principal
    function main() {
        hideStuckCircle();
        const success = applyBackgroundToCircle();

        if (success) {
            console.log('🎉 ¡Imagen aplicada exitosamente!');
        } else {
            console.log('⚠️ Reintentando en 1 segundo...');
        }
    }

    // Ejecutar inmediatamente
    main();

    // Intentar cada segundo solo por 30 segundos (más conservador)
    let attempts = 0;
    const interval = setInterval(() => {
        main();
        attempts++;

        if (attempts >= 30) {
            clearInterval(interval);
            console.log('⏰ Intentos completados');
        }
    }, 1000);

    // Eventos del DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    }
    window.addEventListener('load', main);

    console.log('🚀 Script preciso activado');
})();

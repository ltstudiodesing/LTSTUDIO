// Script para ocultar el círculo problemático arriba a la izquierda
(function() {
    function hideStuckCircle() {
        // Buscar y ocultar el SVG problemático
        const problematicSVG = document.querySelector('svg[style*="mix-blend-mode: exclusion"]');
        if (problematicSVG) {
            problematicSVG.style.display = 'none';
            console.log('🔧 Círculo problemático ocultado');
        }
        
        // También buscar por viewBox específico
        const problematicCircle = document.querySelector('svg[viewBox="0 0 60 60"][style*="position: fixed"]');
        if (problematicCircle) {
            problematicCircle.style.display = 'none';
            console.log('🔧 Círculo con viewBox problemático ocultado');
        }
        
        // Buscar elementos con app-mousePointer
        const mousePointer = document.getElementById('app-mousePointer');
        if (mousePointer) {
            const svgInside = mousePointer.querySelector('svg');
            if (svgInside) {
                svgInside.style.display = 'none';
                console.log('🔧 SVG dentro de app-mousePointer ocultado');
            }
        }
    }
    
    // Ejecutar inmediatamente
    hideStuckCircle();
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideStuckCircle);
    }
    
    // Ejecutar después de que todo se haya cargado
    window.addEventListener('load', hideStuckCircle);
    
    // Ejecutar cada segundo durante los primeros 10 segundos por si acaso
    let attempts = 0;
    const interval = setInterval(() => {
        hideStuckCircle();
        attempts++;
        if (attempts >= 10) {
            clearInterval(interval);
        }
    }, 1000);
})();

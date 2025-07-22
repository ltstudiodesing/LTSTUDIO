// Auto-fix script que se inyecta automáticamente
(function() {
    'use strict';
    
    // Crear CSS para ocultar el círculo problemático
    function injectFixCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Ocultar el círculo problemático */
            svg[style*="mix-blend-mode: exclusion"],
            svg[viewBox="0 0 60 60"][style*="position: fixed"],
            #app-mousePointer svg {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
        console.log('🔧 CSS fix inyectado');
    }
    
    // Crear CSS para las pelotitas de fondo
    function injectBackgroundDotsCSS() {
        const dotsCSS = document.createElement('link');
        dotsCSS.rel = 'stylesheet';
        dotsCSS.href = 'assets/css/background-dots.css';
        document.head.appendChild(dotsCSS);
        console.log('✨ CSS de pelotitas inyectado');
    }
    
    // Cargar script de pelotitas de fondo
    function injectBackgroundDotsJS() {
        const dotsScript = document.createElement('script');
        dotsScript.src = 'assets/js/background-dots.js';
        dotsScript.onload = function() {
            console.log('✨ Script de pelotitas cargado');
        };
        document.body.appendChild(dotsScript);
    }
    
    // Función principal
    function init() {
        console.log('🚀 Iniciando auto-fix...');
        
        // Inyectar CSS inmediatamente
        injectFixCSS();
        injectBackgroundDotsCSS();
        
        // Esperar un poco antes de cargar el JavaScript
        setTimeout(() => {
            injectBackgroundDotsJS();
        }, 500);
        
        console.log('✅ Auto-fix completado');
    }
    
    // Ejecutar cuando esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// Inyectar este script inmediatamente
const autoFixScript = document.createElement('script');
autoFixScript.textContent = '(' + arguments.callee.toString() + ')();';

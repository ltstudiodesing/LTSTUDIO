// Arreglar círculo trabado y navegación de proyectos
(function() {
    'use strict';
    
    // 1. Eliminar círculos de carga trabados
    function removeStuckSpinners() {
        // Buscar elementos con animación de spin
        const spinElements = document.querySelectorAll('*');
        spinElements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.animation && computedStyle.animation.includes('spin')) {
                console.log('🔧 Eliminando elemento con spin:', el);
                el.remove();
            }
        });
        
        // Remover elementos de loading específicos
        const loadingSelectors = [
            '.loading-spinner',
            '.p-loading__spinner',
            '[class*="spin"]',
            '[style*="animation: spin"]'
        ];
        
        loadingSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                console.log('🔧 Eliminando elemento de loading:', el);
                el.remove();
            });
        });
    }
    
    // 2. Desactivar animaciones de spin en CSS
    function disableSpinAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            /* Eliminar animaciones de spin */
            * {
                animation: none !important;
                -webkit-animation: none !important;
            }
            
            /* Excepto las pelotitas de fondo */
            .floating-dot {
                animation: gentlePulse ease-in-out infinite !important;
            }
            
            /* Ocultar elementos de loading */
            .loading-spinner,
            .p-loading__spinner,
            [class*="spin"],
            [style*="animation: spin"] {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 3. Configurar navegación de proyectos
    function setupProjectNavigation() {
        // Lista de proyectos disponibles
        const projects = [
            'park-mansion-minami-azabu',
            'kawana-project', 
            'residential-building',
            'office-complex',
            'modern-apartment',
            'luxury-villa',
            'commercial-space',
            'urban-development'
        ];
        
        // Buscar elementos clickeables de proyectos
        setTimeout(() => {
            const projectElements = document.querySelectorAll('[data-works], .js-works, [href*="works"], .works-item');
            
            projectElements.forEach((el, index) => {
                el.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const projectName = projects[index] || 'park-mansion-minami-azabu';
                    console.log('📂 Navegando a proyecto:', projectName);
                    
                    // Navegar al template del proyecto
                    window.location.href = `projects/${projectName}.html`;
                });
            });
            
            console.log(`✅ Configurados ${projectElements.length} elementos de proyecto`);
        }, 1000);
    }
    
    // 4. Inicializar arreglos
    function init() {
        console.log('🔧 Iniciando arreglos del sitio...');
        
        // Remover spinners inmediatamente
        removeStuckSpinners();
        disableSpinAnimations();
        
        // Continuar removiendo cada segundo por 10 segundos
        let attempts = 0;
        const interval = setInterval(() => {
            removeStuckSpinners();
            attempts++;
            if (attempts >= 10) {
                clearInterval(interval);
                console.log('✅ Limpieza de spinners completada');
            }
        }, 1000);
        
        // Configurar navegación
        setupProjectNavigation();
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // También inicializar después de un delay por si acaso
    setTimeout(init, 500);
})();

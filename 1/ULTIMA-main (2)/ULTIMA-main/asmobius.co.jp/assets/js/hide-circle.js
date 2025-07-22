// Script para ocultar el círculo problemático arriba a la izquierda
(function() {
    // Prevenir errores de SecurityError con pushState
    const originalPushState = window.history.pushState;
    window.history.pushState = function(state, title, url) {
        try {
            return originalPushState.call(this, state, title, url);
        } catch (e) {
            if (e.name === 'SecurityError') {
                console.log('🔒 SecurityError con pushState silenciado:', e.message);
                return;
            }
            throw e;
        }
    };

    // Escuchar errores globales y silenciar los de pushState
    window.addEventListener('error', function(e) {
        if (e.message && (e.message.includes('pushState') || e.message.includes('History'))) {
            e.preventDefault();
            console.log('🔇 Error de pushState silenciado');
            return false;
        }

        // Silenciar errores de CORS de imágenes
        if (e.target && e.target.tagName === 'IMG') {
            e.preventDefault();
            console.log('🔇 Error de CORS de imagen silenciado:', e.target.src);
            return false;
        }
    });

    function updateLogoAndSetupBackgrounds() {
        // Cambiar logo de "LT STUDIO DESIGN" a "LTSD"
        const logoTexts = document.querySelectorAll('text');
        logoTexts.forEach(text => {
            if (text.textContent && text.textContent.includes('LT STUDIO DESIGN')) {
                text.textContent = 'LTSD';
                text.setAttribute('letter-spacing', '6px');
                console.log('🎨 Logo actualizado a LTSD');
            }
        });

        // Buscar elementos de proyecto para aplicar imágenes de fondo
        const projectElements = document.querySelectorAll('.js-canvas__target, .p-stage__menu__item');

        projectElements.forEach((element, index) => {
            const text = element.textContent || '';
            let backgroundImage = '';

            // Mapear proyectos a sus primeras imágenes
            if (text.toLowerCase().includes('park mansion')) {
                backgroundImage = 'url("https://picsum.photos/1200/1600?random=1")';
            } else if (text.toLowerCase().includes('kawana')) {
                backgroundImage = 'url("https://picsum.photos/1200/1600?random=2")';
            } else if (text.toLowerCase().includes('sevens villa')) {
                backgroundImage = 'url("https://picsum.photos/1200/1600?random=3")';
            } else if (text.toLowerCase().includes('hikawa')) {
                backgroundImage = 'url("https://picsum.photos/1200/1600?random=4")';
            } else {
                backgroundImage = `url("https://picsum.photos/1200/1600?random=${index + 5}")`;
            }

            // Aplicar imagen de fondo al elemento
            element.style.backgroundImage = backgroundImage;
            element.style.backgroundSize = 'cover';
            element.style.backgroundPosition = 'center';
            element.style.borderRadius = '50%';
            element.style.position = 'relative';
            element.style.overflow = 'hidden';

            // Agregar overlay para mejorar legibilidad del texto
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.4);
                border-radius: 50%;
                z-index: 1;
                transition: all 0.3s ease;
            `;

            // Asegurar que el texto esté por encima del overlay
            const textElements = element.querySelectorAll('*');
            textElements.forEach(el => {
                el.style.position = 'relative';
                el.style.zIndex = '2';
            });

            element.style.position = 'relative';
            element.appendChild(overlay);

            // Efecto hover
            element.addEventListener('mouseenter', function() {
                overlay.style.background = 'rgba(0, 0, 0, 0.2)';
            });

            element.addEventListener('mouseleave', function() {
                overlay.style.background = 'rgba(0, 0, 0, 0.4)';
            });
        });
    }

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
    updateLogoAndSetupBackgrounds();

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            hideStuckCircle();
            updateLogoAndSetupBackgrounds();
        });
    }

    // Ejecutar después de que todo se haya cargado
    window.addEventListener('load', function() {
        hideStuckCircle();
        updateLogoAndSetupBackgrounds();
    });

    // Ejecutar cada segundo durante los primeros 10 segundos por si acaso
    let attempts = 0;
    const interval = setInterval(() => {
        hideStuckCircle();
        updateLogoAndSetupBackgrounds();
        attempts++;
        if (attempts >= 10) {
            clearInterval(interval);
        }
    }, 1000);

    // Configurar navegación de proyectos
    function setupProjectNavigation() {
        // Mapeo de proyectos a páginas locales
        const projectMap = {
            'PARK MANSION': 'projects/park-mansion.html',
            'park mansion': 'projects/park-mansion.html',
            'pm_minami_azabu': 'projects/park-mansion.html',
            'with Silence Kawana': 'projects/kawana-project.html',
            'kawana': 'projects/kawana-project.html',
            'SEVENS VILLA': 'projects/sevens-villa.html',
            'HIKAWA GARDENS': 'projects/hikawa-gardens.html',
            'ONE AVENUE': 'projects/one-avenue.html',
            'CENTURY FOREST': 'projects/century-forest.html',
            'PROUD': 'projects/proud-rokakoen.html'
        };

        // Interceptar todos los clics en elementos de proyecto
        document.addEventListener('click', function(e) {
            const target = e.target;
            const clickedElement = target.closest('.js-canvas__target, .p-stage__menu__item, li');

            if (clickedElement) {
                const text = clickedElement.textContent || '';

                // Buscar coincidencia en el mapeo de proyectos
                for (const [key, url] of Object.entries(projectMap)) {
                    if (text.toLowerCase().includes(key.toLowerCase())) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🔗 Navegando a proyecto:', key, '→', url);
                        window.location.href = url;
                        return false;
                    }
                }
            }
        }, true); // useCapture = true para interceptar antes que otros handlers

        console.log('🔗 Navegación de proyectos configurada');
    }

    // Configurar navegación después de un delay
    setTimeout(setupProjectNavigation, 1000);
})();

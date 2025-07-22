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
        // Función para reemplazar/ocultar el logo ASM problemático
        function replaceASMLogo() {
            // Buscar el SVG específico que contiene "ASM" y "architecture"
            const allSVGs = document.querySelectorAll('svg');
            let logoReplaced = false;

            allSVGs.forEach(svg => {
                const paths = svg.querySelectorAll('path');
                const texts = svg.querySelectorAll('text');

                // Verificar si este SVG contiene texto "architecture" o tiene paths que forman "ASM"
                let hasArchitecture = false;
                texts.forEach(text => {
                    if (text.textContent && text.textContent.toLowerCase().includes('architecture')) {
                        hasArchitecture = true;
                        // Cambiar el texto "architecture" por "LTSD"
                        text.textContent = 'LTSD';
                        text.setAttribute('letter-spacing', '4px');
                        text.setAttribute('font-size', '12');
                        console.log('🎨 Texto "architecture" cambiado a "LTSD"');
                    }
                });

                // Si encontramos el SVG con "architecture", es probable que también tenga "ASM" en paths
                if (hasArchitecture && paths.length > 0) {
                    // Ocultar todo el SVG y crear uno nuevo con "LTSD"
                    const parentElement = svg.parentElement;
                    if (parentElement) {
                        // Crear un nuevo elemento de texto simple
                        const newLogo = document.createElement('div');
                        newLogo.innerHTML = `
                            <div style="
                                position: relative;
                                display: inline-block;
                                font-family: 'butler_medium', serif;
                                font-size: 14px;
                                font-weight: 500;
                                letter-spacing: 4px;
                                color: #666;
                                text-align: center;
                            ">
                                <div style="font-size: 16px; font-weight: bold; margin-bottom: 2px;">LTSD</div>
                                <div style="font-size: 10px; letter-spacing: 2px;">DESIGN</div>
                            </div>
                        `;

                        // Reemplazar el SVG con el nuevo logo
                        parentElement.replaceChild(newLogo, svg);
                        logoReplaced = true;
                        console.log('🎨 Logo ASM reemplazado completamente por LTSD');
                    }
                }
            });

            return logoReplaced;
        }

        // Ejecutar después de que la intro termine
        setTimeout(() => {
            const replaced = replaceASMLogo();
            if (!replaced) {
                // Si no encontramos el logo específico, buscar por texto
                const allTexts = document.querySelectorAll('text');
                allTexts.forEach(text => {
                    const parent = text.closest('svg');
                    const parentElement = parent ? parent.parentElement : null;

                    if (text.textContent && (
                        text.textContent.toLowerCase().includes('architecture') ||
                        text.textContent.includes('ASM') ||
                        text.textContent.includes('A S M')
                    )) {
                        const isInLoading = parent?.classList.contains('p-loading__logo') ||
                                           text.classList.contains('st-logo-load') ||
                                           text.classList.contains('st-logo-load-back') ||
                                           parentElement?.classList.contains('p-loading__back') ||
                                           parentElement?.classList.contains('p-loading__inner');

                        if (!isInLoading) {
                            text.textContent = 'LTSD';
                            text.setAttribute('letter-spacing', '4px');
                            console.log('🎨 Texto del logo actualizado a "LTSD"');
                        }
                    }
                });
            }
        }, 3000); // Esperar 3 segundos para que la intro termine

        // Aplicar imágenes de fondo solo a círculos de proyecto
        setTimeout(() => {
            const projectElements = document.querySelectorAll('.js-canvas__target, .p-stage__menu__item');
            console.log('🔍 Elementos de proyecto encontrados:', projectElements.length);

            projectElements.forEach((element, index) => {
                const text = element.textContent || '';
                let backgroundImage = '';

                // Mapear proyectos a sus primeras imágenes (exactamente las mismas que en cada proyecto)
                if (text.toLowerCase().includes('park mansion')) {
                    // Usar la misma primera imagen que en park-mansion.html
                    backgroundImage = 'url("https://picsum.photos/800/1000?random=1")';
                } else if (text.toLowerCase().includes('kawana')) {
                    backgroundImage = 'url("https://picsum.photos/800/1000?random=2")';
                } else if (text.toLowerCase().includes('sevens villa')) {
                    backgroundImage = 'url("https://picsum.photos/800/1000?random=3")';
                } else if (text.toLowerCase().includes('hikawa')) {
                    backgroundImage = 'url("https://picsum.photos/800/1000?random=4")';
                } else {
                    backgroundImage = `url("https://picsum.photos/800/1000?random=${index + 5}")`;
                }

                // Verificar si es realmente un círculo de proyecto y aplicar imagen
                const hasCircle = element.querySelector('circle') ||
                                element.classList.contains('js-canvas__target') ||
                                element.classList.contains('p-stage__menu__item');

                if (hasCircle && backgroundImage) {
                    console.log('🔍 Aplicando imagen a círculo:', text.substring(0, 30), 'URL:', backgroundImage);
                    // Aplicar imagen de fondo
                    element.style.backgroundImage = backgroundImage;
                    element.style.backgroundSize = 'cover';
                    element.style.backgroundPosition = 'center';
                    element.style.borderRadius = '50%';
                    element.style.position = 'relative';
                    element.style.overflow = 'hidden';
                    
                    // Agregar overlay para mejorar legibilidad del texto
                    if (!element.querySelector('.project-overlay')) {
                        const overlay = document.createElement('div');
                        overlay.className = 'project-overlay';
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
                            if (el !== overlay) {
                                el.style.position = 'relative';
                                el.style.zIndex = '2';
                            }
                        });

                        element.appendChild(overlay);

                        // Efecto hover
                        element.addEventListener('mouseenter', function() {
                            overlay.style.background = 'rgba(0, 0, 0, 0.2)';
                        });

                        element.addEventListener('mouseleave', function() {
                            overlay.style.background = 'rgba(0, 0, 0, 0.4)';
                        });
                    }
                    
                    console.log('✅ Imagen de fondo aplicada exitosamente a:', text.substring(0, 20));
                } else {
                    console.log('❌ No se pudo aplicar imagen a:', text.substring(0, 20), 'hasCircle:', hasCircle, 'backgroundImage:', !!backgroundImage);
                }
            });
        }, 2000);
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
        if (attempts >= 3) { // Solo ejecutar updateLogoAndSetupBackgrounds 3 veces
            clearInterval(interval);
        } else {
            updateLogoAndSetupBackgrounds();
        }
        attempts++;
    }, 2000);

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

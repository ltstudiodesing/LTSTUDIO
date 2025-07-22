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

    // Aplicar imágenes de fondo al área principal del canvas/stage
    function applyCircleBackgrounds() {
        console.log('🔄 Aplicando imágenes al área principal del stage...');

        // Variable para rastrear el proyecto actual que se está mostrando
        let currentProjectImage = '';

        // Encontrar el proyecto actual basado en elementos visibles o activos
        const projectLiElements = document.querySelectorAll('ul li');
        let activeProject = '';

        // Por defecto, empezar con Park Mansion
        activeProject = 'PARK MANSION';
        currentProjectImage = 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop")';

        // Buscar el área principal donde aplicar la imagen de fondo
        const targetSelectors = [
            'canvas',
            '.p-stage',
            '[style*="background-color: rgb(37, 37, 37)"]',
            'div[style*="position: fixed"][style*="width: 100%"][style*="height: 100%"]'
        ];

        let targetElement = null;

        // Buscar el elemento principal de background
        targetSelectors.forEach(selector => {
            if (!targetElement) {
                const element = document.querySelector(selector);
                if (element) {
                    targetElement = element;
                    console.log('🎯 Elemento encontrado con selector:', selector);
                }
            }
        });

        // Si no encontramos el elemento específico, buscar el div con backgroundColor rgb(37, 37, 37)
        if (!targetElement) {
            const allDivs = document.querySelectorAll('div');
            allDivs.forEach(div => {
                const style = window.getComputedStyle(div);
                if (style.backgroundColor === 'rgb(37, 37, 37)' &&
                    style.position === 'fixed' &&
                    style.width === '100%') {
                    targetElement = div;
                    console.log('🎯 Elemento de background negro encontrado');
                }
            });
        }

        if (targetElement) {
            console.log('✅ Aplicando imagen de fondo a:', activeProject);

            // Aplicar la imagen de fondo al elemento principal
            targetElement.style.backgroundImage = currentProjectImage;
            targetElement.style.backgroundSize = 'cover';
            targetElement.style.backgroundPosition = 'center';
            targetElement.style.backgroundRepeat = 'no-repeat';

            // Agregar un overlay semi-transparente para mantener legibilidad
            if (!targetElement.querySelector('.main-stage-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'main-stage-overlay';
                overlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.4);
                    z-index: 1;
                    pointer-events: none;
                `;
                targetElement.appendChild(overlay);
            }

            console.log('🖼️ Imagen aplicada exitosamente al área principal');
        } else {
            console.log('❌ No se encontró el elemento principal para aplicar la imagen');
        }

        // Función para cambiar imagen según proyecto activo
        window.changeProjectBackground = function(projectName) {
            let newImage = '';

            if (projectName.toLowerCase().includes('park mansion') || projectName.toLowerCase().includes('minami')) {
                newImage = 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop")';
            } else if (projectName.toLowerCase().includes('kawana')) {
                newImage = 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop")';
            } else if (projectName.toLowerCase().includes('sevens')) {
                newImage = 'url("https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=800&fit=crop")';
            } else if (projectName.toLowerCase().includes('hikawa')) {
                newImage = 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop")';
            } else if (projectName.toLowerCase().includes('proud')) {
                newImage = 'url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=800&fit=crop")';
            } else if (projectName.toLowerCase().includes('jade')) {
                newImage = 'url("https://images.unsplash.com/photo-1600485154356-be6161a56a0c?w=800&h=800&fit=crop")';
            } else if (projectName.toLowerCase().includes('one avenue')) {
                newImage = 'url("https://images.unsplash.com/photo-1600485154355-be6161a56a0c?w=800&h=800&fit=crop")';
            } else if (projectName.toLowerCase().includes('century')) {
                newImage = 'url("https://images.unsplash.com/photo-1600485154343-be6161a56a0c?w=800&h=800&fit=crop")';
            }

            if (newImage && targetElement) {
                targetElement.style.backgroundImage = newImage;
                console.log('🔄 Imagen cambiada a:', projectName);
            }
        };
    }

    function updateLogoAndSetupBackgrounds() {
        // Función para reemplazar/ocultar el logo ASM problemático
        function replaceASMLogo() {
            let logoReplaced = false;

            // Buscar específicamente el SVG con viewBox="0 0 60 23.3" que es el que seleccionaste
            const targetSVG = document.querySelector('svg[viewBox="0 0 60 23.3"]');

            if (targetSVG) {
                const parentElement = targetSVG.parentElement;
                if (parentElement) {
                    // Crear un nuevo SVG con "LTSD" que se vea similar
                    const newLogoSVG = document.createElement('div');
                    newLogoSVG.innerHTML = `
                        <div style="font-family: butler_medium, serif; font-size: 14px; font-weight: 400; color: #FFFFFF; letter-spacing: 0px; display: inline-block;">
                            LTSD
                        </div>
                    `;

                    // Reemplazar el SVG original
                    parentElement.replaceChild(newLogoSVG.firstElementChild, targetSVG);
                    logoReplaced = true;
                    console.log('✅ Logo ASM específico reemplazado por LTSD');
                }
            }

            // Si no encontramos el SVG específico, buscar por otros métodos
            if (!logoReplaced) {
                const allSVGs = document.querySelectorAll('svg');
                allSVGs.forEach(svg => {
                    const paths = svg.querySelectorAll('path');
                    const texts = svg.querySelectorAll('text');

                    // Buscar SVG que tiene muchos paths (probable logo ASM) y texto "architecture"
                    let hasArchitecture = false;
                    texts.forEach(text => {
                        if (text.textContent && text.textContent.toLowerCase().includes('architect')) {
                            hasArchitecture = true;
                        }
                    });

                    // Si tiene más de 10 paths y texto "architecture", es probable que sea el logo ASM
                    if (paths.length > 10 && hasArchitecture) {
                        const parentElement = svg.parentElement;
                        if (parentElement) {
                            const newLogo = document.createElement('div');
                            newLogo.innerHTML = `
                                <div style="
                                    position: relative;
                                    display: inline-block;
                                    font-family: butler_medium, serif;
                                    font-size: 14px;
                                    font-weight: 400;
                                    letter-spacing: 0px;
                                    color: #FFFFFF;
                                    text-align: center;
                                ">
                                    LTSD
                                </div>
                            `;

                            parentElement.replaceChild(newLogo, svg);
                            logoReplaced = true;
                            console.log('✅ Logo ASM alternativo reemplazado por LTSD');
                        }
                    }
                });
            }

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

        // Ejecutar aplicación de imágenes múltiples veces con diferentes intervalos
        setTimeout(applyCircleBackgrounds, 500);
        setTimeout(applyCircleBackgrounds, 1500);
        setTimeout(applyCircleBackgrounds, 3000);
        setTimeout(applyCircleBackgrounds, 5000);
        setTimeout(applyCircleBackgrounds, 8000);
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

    // Ejecutar múltiples veces para asegurar que las imágenes se apliquen
    let attempts = 0;
    const interval = setInterval(() => {
        hideStuckCircle();
        updateLogoAndSetupBackgrounds();
        attempts++;
        if (attempts >= 20) {
            clearInterval(interval);
            console.log('🔄 Finalizados intentos de aplicar imágenes a círculos');
            // Último intento directo
            setTimeout(() => {
                console.log('🎯 Último intento directo de aplicar imágenes');
                applyCircleBackgrounds();
            }, 2000);
        }
    }, 800);

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

    // Ejecutar una vez más después de 5 segundos para asegurar que las imágenes se carguen
    setTimeout(() => {
        console.log('🔄 Ejecución final para asegurar imágenes en círculos');
        updateLogoAndSetupBackgrounds();
    }, 5000);

    // Y otra vez después de 10 segundos por si la página tarda en cargar
    setTimeout(() => {
        console.log('🔄 Último intento para aplicar imágenes a círculos');
        updateLogoAndSetupBackgrounds();
    }, 10000);
})();

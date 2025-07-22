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

    // Aplicar imágenes de fondo a TODOS los elementos negros posibles
    function applyCircleBackgrounds() {
        console.log('🔄 Aplicando imágenes a TODOS los elementos negros...');

        const parkMansionImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1200&fit=crop';

        // Función para aplicar imagen a un elemento
        function forceBackgroundImage(element, imageUrl) {
            element.style.setProperty('background-image', `url("${imageUrl}")`, 'important');
            element.style.setProperty('background-size', 'cover', 'important');
            element.style.setProperty('background-position', 'center', 'important');
            element.style.setProperty('background-repeat', 'no-repeat', 'important');
            console.log('🖼️ Imagen aplicada a elemento:', element.tagName, element.className);
        }

        // Aplicar a TODOS los divs negros posibles
        function applyToAllBlackElements() {
            const allDivs = document.querySelectorAll('div');
            let count = 0;

            allDivs.forEach(div => {
                const style = window.getComputedStyle(div);

                // Aplicar a cualquier div negro grande
                if ((style.backgroundColor === 'rgb(37, 37, 37)' ||
                     style.backgroundColor === 'rgba(37, 37, 37, 1)') &&
                    (style.width === '100%' || parseInt(style.width) > 500) &&
                    (style.height === '100%' || parseInt(style.height) > 500)) {

                    forceBackgroundImage(div, parkMansionImage);
                    count++;
                }

                // También aplicar a elementos con z-index alto
                if (style.backgroundColor === 'rgb(37, 37, 37)' &&
                    parseInt(style.zIndex) > 100) {
                    forceBackgroundImage(div, parkMansionImage);
                    count++;
                }
            });

            console.log(`✅ Imagen aplicada a ${count} elementos`);

            // También aplicar al body y html como respaldo
            forceBackgroundImage(document.body, parkMansionImage);
            forceBackgroundImage(document.documentElement, parkMansionImage);

            // Buscar canvas y aplicar a su contenedor
            const canvas = document.querySelector('canvas');
            if (canvas && canvas.parentElement) {
                forceBackgroundImage(canvas.parentElement, parkMansionImage);
                console.log('🎯 Imagen aplicada al contenedor del canvas');
            }
        }

        // Ejecutar aplicación múltiples veces
        applyToAllBlackElements();

        // Repetir cada segundo para asegurar que persista
        setInterval(() => {
            applyToAllBlackElements();
        }, 1000);

        // También aplicar cuando hay cambios en el DOM
        const observer = new MutationObserver(() => {
            applyToAllBlackElements();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });

        console.log('🚀 Sistema agresivo de imágenes de fondo activado');
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

        // NO ejecutar durante la intro - solo después de que termine
        // (La función applyCircleBackgrounds se ejecuta internamente después de 3 segundos)
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
    
    // Ejecutar inmediatamente solo para ocultar círculo problemático
    hideStuckCircle();

    // Ejecutar funciones básicas inmediatamente
    hideStuckCircle();

    // Ejecutar aplicación de imágenes INMEDIATAMENTE
    applyCircleBackgrounds();

    // Y también en múltiples momentos
    setTimeout(() => {
        console.log('🚀 Aplicación de imágenes - 1 segundo');
        applyCircleBackgrounds();
    }, 1000);

    setTimeout(() => {
        console.log('🚀 Aplicación de imágenes - 2 segundos');
        applyCircleBackgrounds();
    }, 2000);

    setTimeout(() => {
        console.log('🚀 Aplicación de imágenes - 4 segundos');
        applyCircleBackgrounds();
    }, 4000);

    setTimeout(() => {
        console.log('🚀 Aplicación de imágenes - 6 segundos');
        applyCircleBackgrounds();
    }, 6000);

    // También ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            hideStuckCircle();
            applyCircleBackgrounds();
        });
    }

    // Ejecutar después de que todo se haya cargado
    window.addEventListener('load', function() {
        hideStuckCircle();
        updateLogoAndSetupBackgrounds();
        applyCircleBackgrounds();
    });

    // Configurar navegación de proyectos
    function setupProjectNavigation() {
        // Mapeo de proyectos a páginas locales
        const projectMap = {
            'PARK MANSION': 'projects/park-mansion.html',
            'park mansion': 'projects/park-mansion.html',
            'pm_minami_azabu': 'projects/park-mansion.html',
            'with Silence Kawana': 'projects/kawana.html',
            'kawana': 'projects/kawana.html',
            'SEVENS VILLA': 'projects/sevens-villa.html',
            'sevens villa': 'projects/sevens-villa.html',
            'sevens': 'projects/sevens-villa.html',
            'HIKAWA GARDENS': 'projects/hikawa-gardens.html',
            'hikawa': 'projects/hikawa-gardens.html',
            'ONE AVENUE': 'projects/one-avenue.html',
            'CENTURY FOREST': 'projects/century-forest.html',
            'PROUD': 'projects/proud-rokakoen.html',
            'JADE': 'projects/jade.html',
            'jade': 'projects/jade.html'
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

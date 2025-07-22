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
            let logoReplaced = false;

            // Buscar específicamente el SVG con viewBox="0 0 60 23.3" que es el que seleccionaste
            const targetSVG = document.querySelector('svg[viewBox="0 0 60 23.3"]');

            if (targetSVG) {
                const parentElement = targetSVG.parentElement;
                if (parentElement) {
                    // Crear un nuevo SVG con "LTSD" que se vea similar
                    const newLogoSVG = document.createElement('div');
                    newLogoSVG.innerHTML = `
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 60 23.3" style="height: 25px; width: 65px; display: inline;">
                            <style type="text/css">.st-logo { fill: #FFFFFF; }</style>
                            <g>
                                <!-- Texto principal LTSD -->
                                <text x="30" y="12" text-anchor="middle" class="st-logo" font-family="butler_medium, serif" font-size="14" font-weight="bold" letter-spacing="3px">LTSD</text>
                                <!-- Texto inferior design -->
                                <text x="30" y="22" text-anchor="middle" class="st-logo" font-family="butler_medium, serif" font-size="8" font-weight="400" letter-spacing="2px">design</text>
                            </g>
                        </svg>
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
                                    font-family: 'butler_medium', serif;
                                    font-size: 14px;
                                    font-weight: 500;
                                    letter-spacing: 4px;
                                    color: #FFFFFF;
                                    text-align: center;
                                ">
                                    <div style="font-size: 16px; font-weight: bold; margin-bottom: 2px;">LTSD</div>
                                    <div style="font-size: 10px; letter-spacing: 2px;">design</div>
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

        // Aplicar imágenes de fondo a círculos de proyecto con mejor detección
        function applyCircleBackgrounds() {
            console.log('🔄 Intentando aplicar imágenes a círculos...');

            // Buscar elementos de proyecto con múltiples selectores
            const selectors = [
                '.js-canvas__target',
                '.p-stage__menu__item',
                '[class*="menu"][class*="item"]',
                'svg circle',
                '[data-project]'
            ];

            let projectElements = [];
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    if (!projectElements.includes(el)) {
                        projectElements.push(el);
                    }
                });
            });

            console.log('🔍 Total elementos encontrados:', projectElements.length);

            projectElements.forEach((element, index) => {
                const text = element.textContent || element.getAttribute('data-project') || '';
                console.log('📝 Procesando elemento:', text.substring(0, 50));

                let backgroundImage = '';
                let projectName = '';

                // Mapear proyectos a sus primeras imágenes (usar imágenes más pequeñas para mejor carga)
                if (text.toLowerCase().includes('park mansion') || text.toLowerCase().includes('minami')) {
                    backgroundImage = 'url("https://picsum.photos/400/400?random=1")';
                    projectName = 'Park Mansion';
                } else if (text.toLowerCase().includes('kawana')) {
                    backgroundImage = 'url("https://picsum.photos/400/400?random=2")';
                    projectName = 'Kawana';
                } else if (text.toLowerCase().includes('sevens villa')) {
                    backgroundImage = 'url("https://picsum.photos/400/400?random=3")';
                    projectName = 'Sevens Villa';
                } else if (text.toLowerCase().includes('hikawa')) {
                    backgroundImage = 'url("https://picsum.photos/400/400?random=4")';
                    projectName = 'Hikawa';
                } else if (text.trim().length > 3) { // Solo si hay texto significativo
                    backgroundImage = `url("https://picsum.photos/400/400?random=${index + 5}")`;
                    projectName = text.substring(0, 20);
                }

                // Verificar si es un círculo de proyecto
                const isProjectElement = element.querySelector('circle') ||
                                       element.classList.contains('js-canvas__target') ||
                                       element.classList.contains('p-stage__menu__item') ||
                                       element.tagName === 'circle' ||
                                       (element.parentElement && element.parentElement.querySelector('circle'));

                if (isProjectElement && backgroundImage && projectName) {
                    console.log('🎯 Aplicando imagen a círculo de proyecto:', projectName);

                    // Encontrar el elemento contenedor apropiado
                    let targetElement = element;
                    if (element.tagName === 'circle') {
                        targetElement = element.closest('svg').parentElement || element.parentElement;
                    }

                    // Aplicar estilos de imagen de fondo
                    targetElement.style.backgroundImage = backgroundImage;
                    targetElement.style.backgroundSize = 'cover';
                    targetElement.style.backgroundPosition = 'center';
                    targetElement.style.backgroundRepeat = 'no-repeat';

                    // Solo agregar border-radius si no tiene uno ya
                    if (!targetElement.style.borderRadius) {
                        targetElement.style.borderRadius = '50%';
                    }

                    targetElement.style.position = 'relative';
                    targetElement.style.overflow = 'hidden';

                    // Agregar overlay solo si no existe
                    if (!targetElement.querySelector('.project-overlay')) {
                        const overlay = document.createElement('div');
                        overlay.className = 'project-overlay';
                        overlay.style.cssText = `
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: rgba(0, 0, 0, 0.3);
                            border-radius: inherit;
                            z-index: 1;
                            transition: all 0.3s ease;
                            pointer-events: none;
                        `;

                        // Asegurar que el contenido esté por encima
                        const allChildren = targetElement.querySelectorAll('*');
                        allChildren.forEach(child => {
                            if (child !== overlay && !child.classList.contains('project-overlay')) {
                                child.style.position = 'relative';
                                child.style.zIndex = '2';
                            }
                        });

                        targetElement.appendChild(overlay);

                        // Efecto hover
                        targetElement.addEventListener('mouseenter', function() {
                            overlay.style.background = 'rgba(0, 0, 0, 0.1)';
                        });

                        targetElement.addEventListener('mouseleave', function() {
                            overlay.style.background = 'rgba(0, 0, 0, 0.3)';
                        });
                    }

                    console.log('✅ Imagen aplicada exitosamente a:', projectName);
                } else {
                    console.log('⚠️ Elemento omitido:', {
                        text: text.substring(0, 30),
                        isProject: isProjectElement,
                        hasBackground: !!backgroundImage,
                        hasName: !!projectName
                    });
                }
            });
        }

        // Ejecutar aplicación de imágenes varias veces para asegurar que funcione
        setTimeout(applyCircleBackgrounds, 1000);
        setTimeout(applyCircleBackgrounds, 3000);
        setTimeout(applyCircleBackgrounds, 5000);
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

    // Ejecutar cada segundo durante los primeros 15 segundos para asegurar que se apliquen las imágenes
    let attempts = 0;
    const interval = setInterval(() => {
        hideStuckCircle();
        updateLogoAndSetupBackgrounds();
        attempts++;
        if (attempts >= 15) {
            clearInterval(interval);
            console.log('🔄 Finalizados intentos de aplicar imágenes a círculos');
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

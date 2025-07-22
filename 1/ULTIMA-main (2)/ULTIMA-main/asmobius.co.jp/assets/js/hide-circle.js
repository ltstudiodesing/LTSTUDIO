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

    // Sistema de imágenes de fondo con transiciones suaves y detección de cambios
    function applyCircleBackgrounds() {
        console.log('🔄 Inicializando sistema de imágenes de fondo...');

        // Mapeo de proyectos a imágenes
        const projectImages = {
            'park mansion': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1200&fit=crop',
            'minami': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1200&fit=crop',
            'kawana': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=1200&fit=crop',
            'jade': 'https://images.unsplash.com/photo-1600485154356-be6161a56a0c?w=1200&h=1200&fit=crop',
            'sevens': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=1200&fit=crop',
            'hikawa': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1200&fit=crop',
            'one avenue': 'https://images.unsplash.com/photo-1600485154355-be6161a56a0c?w=1200&h=1200&fit=crop',
            'century': 'https://images.unsplash.com/photo-1600485154343-be6161a56a0c?w=1200&h=1200&fit=crop',
            'proud': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=1200&fit=crop',
            'roppongi': 'https://images.unsplash.com/photo-1600485154345-be6161a56a0c?w=1200&h=1200&fit=crop',
            'nishiazabu': 'https://images.unsplash.com/photo-1600485154354-be6161a56a0c?w=1200&h=1200&fit=crop',
            'azabu gardens': 'https://images.unsplash.com/photo-1600485154341-be6161a56a0c?w=1200&h=1200&fit=crop'
        };

        // Encontrar el elemento de fondo negro principal
        let backgroundElement = null;

        // Buscar el div con background negro
        const allDivs = document.querySelectorAll('div');
        allDivs.forEach(div => {
            const style = window.getComputedStyle(div);
            if (style.backgroundColor === 'rgb(37, 37, 37)' &&
                style.position === 'fixed' &&
                style.width === '100%' &&
                style.height === '100%') {
                backgroundElement = div;
                console.log('🎯 Elemento de fondo principal encontrado');
            }
        });

        if (!backgroundElement) {
            console.log('❌ No se pudo encontrar el elemento de fondo');
            return;
        }

        // Crear contenedor para las imágenes con transiciones
        if (!backgroundElement.querySelector('.image-transition-container')) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-transition-container';
            imageContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
                pointer-events: none;
            `;

            // Crear dos capas para crossfade
            const layer1 = document.createElement('div');
            layer1.className = 'bg-layer bg-layer-1';
            layer1.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                opacity: 1;
                transition: opacity 1.5s ease-in-out;
            `;

            const layer2 = document.createElement('div');
            layer2.className = 'bg-layer bg-layer-2';
            layer2.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                opacity: 0;
                transition: opacity 1.5s ease-in-out;
            `;

            // Overlay para mantener legibilidad
            const overlay = document.createElement('div');
            overlay.className = 'main-stage-overlay';
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.3);
                z-index: 10;
                pointer-events: none;
            `;

            imageContainer.appendChild(layer1);
            imageContainer.appendChild(layer2);
            imageContainer.appendChild(overlay);
            backgroundElement.appendChild(imageContainer);

            // Establecer imagen inicial
            layer1.style.backgroundImage = `url("${projectImages['park mansion']}")`;

            console.log('✅ Sistema de transiciones de imagen inicializado');
        }

        // Variables para monitorear cambios
        let currentProject = '';
        let activeLayer = 1; // 1 o 2

        // Función para cambiar imagen con transición suave
        function changeBackgroundImage(projectName) {
            const container = backgroundElement.querySelector('.image-transition-container');
            if (!container) return;

            const layer1 = container.querySelector('.bg-layer-1');
            const layer2 = container.querySelector('.bg-layer-2');

            // Encontrar imagen correspondiente al proyecto
            let imageUrl = '';
            for (const [key, url] of Object.entries(projectImages)) {
                if (projectName.toLowerCase().includes(key)) {
                    imageUrl = url;
                    break;
                }
            }

            if (!imageUrl) return;

            console.log('🔄 Transicionando a proyecto:', projectName);

            // Crossfade entre capas
            if (activeLayer === 1) {
                // Preparar layer2 con nueva imagen
                layer2.style.backgroundImage = `url("${imageUrl}")`;
                // Crossfade: ocultar layer1, mostrar layer2
                layer1.style.opacity = '0';
                layer2.style.opacity = '1';
                activeLayer = 2;
            } else {
                // Preparar layer1 con nueva imagen
                layer1.style.backgroundImage = `url("${imageUrl}")`;
                // Crossfade: ocultar layer2, mostrar layer1
                layer2.style.opacity = '0';
                layer1.style.opacity = '1';
                activeLayer = 1;
            }
        }

        // Monitorear cambios en los proyectos
        function monitorProjectChanges() {
            const projectList = document.querySelectorAll('ul li');

            const observer = new MutationObserver(() => {
                // Buscar proyecto visible o activo
                projectList.forEach(li => {
                    const rect = li.getBoundingClientRect();
                    const style = window.getComputedStyle(li);

                    // Si el elemento es visible o está en una posición específica
                    if (style.display !== 'none' && (rect.width > 0 || rect.height > 0)) {
                        const projectText = li.textContent.trim();
                        if (projectText && projectText !== currentProject) {
                            currentProject = projectText;
                            changeBackgroundImage(projectText);
                        }
                    }
                });
            });

            // Observar cambios en el DOM
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });

            // También monitorear cada segundo para detectar cambios
            setInterval(() => {
                projectList.forEach((li, index) => {
                    const style = window.getComputedStyle(li);
                    const transform = style.transform;

                    // Detectar si este proyecto está "activo" basado en transformaciones
                    if (transform && transform !== 'none' && transform.includes('matrix')) {
                        const projectText = li.textContent.trim();
                        if (projectText && projectText !== currentProject) {
                            currentProject = projectText;
                            changeBackgroundImage(projectText);
                        }
                    }
                });
            }, 500);
        }

        // Iniciar monitoreo
        setTimeout(monitorProjectChanges, 2000);

        // Función global para cambio manual
        window.changeProjectBackground = changeBackgroundImage;
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

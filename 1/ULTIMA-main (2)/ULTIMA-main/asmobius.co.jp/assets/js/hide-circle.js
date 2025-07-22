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

    // Aplicar imágenes de fondo directamente al área negra
    function applyCircleBackgrounds() {
        console.log('🔄 Aplicando imágenes de fondo directamente...');

        // Imágenes para cada proyecto
        const projectImages = {
            'park mansion': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1200&fit=crop',
            'kawana': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=1200&fit=crop',
            'jade': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=1200&fit=crop',
            'sevens': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=1200&fit=crop',
            'hikawa': 'https://images.unsplash.com/photo-1600485154340-be6161a56a0c?w=1200&h=1200&fit=crop',
            'one avenue': 'https://images.unsplash.com/photo-1600485154355-be6161a56a0c?w=1200&h=1200&fit=crop',
            'century': 'https://images.unsplash.com/photo-1600485154343-be6161a56a0c?w=1200&h=1200&fit=crop',
            'proud': 'https://images.unsplash.com/photo-1600485154356-be6161a56a0c?w=1200&h=1200&fit=crop',
            'roppongi': 'https://images.unsplash.com/photo-1600485154345-be6161a56a0c?w=1200&h=1200&fit=crop',
            'nishiazabu': 'https://images.unsplash.com/photo-1600485154354-be6161a56a0c?w=1200&h=1200&fit=crop',
            'azabu': 'https://images.unsplash.com/photo-1600485154341-be6161a56a0c?w=1200&h=1200&fit=crop',
            'park house': 'https://images.unsplash.com/photo-1600485154342-be6161a56a0c?w=1200&h=1200&fit=crop'
        };

        // Buscar el div negro principal usando múltiples métodos
        function findBackgroundElement() {
            // Método 1: Buscar por computed style específico
            const allDivs = document.querySelectorAll('div');
            for (const div of allDivs) {
                const style = window.getComputedStyle(div);
                if (style.backgroundColor === 'rgb(37, 37, 37)' &&
                    style.zIndex === '110' &&
                    style.position === 'absolute' &&
                    style.width === '100%' &&
                    style.height === '100%') {
                    console.log('✅ Elemento de fondo encontrado (método 1)');
                    return div;
                }
            }

            // Método 2: Buscar por background-color con cualquier z-index
            for (const div of allDivs) {
                const style = window.getComputedStyle(div);
                if (style.backgroundColor === 'rgb(37, 37, 37)' &&
                    style.position === 'absolute' &&
                    style.width === '100%') {
                    console.log('✅ Elemento de fondo encontrado (método 2)');
                    return div;
                }
            }

            // Método 3: Usar el body como último recurso
            console.log('⚠️ Usando body como elemento de fondo');
            return document.body;
        }

        const backgroundElement = findBackgroundElement();

        // Aplicar imagen inicial inmediatamente
        function applyImage(imageUrl) {
            console.log('🖼️ Aplicando imagen:', imageUrl);

            // Forzar aplicación con !important
            backgroundElement.style.setProperty('background-image', `url("${imageUrl}")`, 'important');
            backgroundElement.style.setProperty('background-size', 'cover', 'important');
            backgroundElement.style.setProperty('background-position', 'center', 'important');
            backgroundElement.style.setProperty('background-repeat', 'no-repeat', 'important');

            // Agregar overlay solo una vez
            if (!backgroundElement.querySelector('.image-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'image-overlay';
                overlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.3);
                    z-index: 1;
                    pointer-events: none;
                `;
                backgroundElement.appendChild(overlay);
            }
        }

        // Aplicar imagen inicial de Park Mansion
        applyImage(projectImages['park mansion']);

        // Cambiar imagen según proyecto activo
        let currentProject = '';
        function updateProjectImage() {
            const projectList = document.querySelectorAll('ul li');

            projectList.forEach(li => {
                const rect = li.getBoundingClientRect();
                const isInViewport = rect.top >= -200 && rect.top <= window.innerHeight + 200;

                if (isInViewport) {
                    const projectText = li.textContent.trim().toLowerCase();

                    // Buscar imagen correspondiente
                    for (const [key, imageUrl] of Object.entries(projectImages)) {
                        if (projectText.includes(key) && projectText !== currentProject) {
                            console.log('📋 Proyecto detectado:', projectText, '→', key);
                            applyImage(imageUrl);
                            currentProject = projectText;
                            break;
                        }
                    }
                }
            });
        }

        // Monitorear cambios cada segundo
        setInterval(updateProjectImage, 1000);

        console.log('✅ Sistema de imágenes de fondo inicializado');
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

    // Ejecutar después de que la intro termine (5 segundos)
    setTimeout(() => {
        hideStuckCircle();
        updateLogoAndSetupBackgrounds();
        applyCircleBackgrounds();
    }, 5000);

    // Ejecutar cuando el DOM esté listo (pero sin imágenes todavía)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            hideStuckCircle();
        });
    }

    // Ejecutar después de que todo se haya cargado
    window.addEventListener('load', function() {
        setTimeout(() => {
            hideStuckCircle();
            updateLogoAndSetupBackgrounds();
            applyCircleBackgrounds();
        }, 6000);
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

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

    // Aplicar imágenes de fondo solo a elementos LI específicos
    function applyCircleBackgrounds() {
        console.log('🔄 Aplicando imágenes solo a elementos LI...');

        // Solo buscar elementos LI que son círculos de proyecto
        const projectLiElements = document.querySelectorAll('.p-stage__menu li, ul li');

        console.log('🔍 Elementos LI encontrados:', projectLiElements.length);

        projectLiElements.forEach((li, index) => {
            const text = li.textContent || '';

            // Solo procesar si el LI tiene texto de proyecto
            if (text.length < 3) return;

            let backgroundImage = '';
            let projectName = '';

            // Mapear proyectos específicos
            if (text.toLowerCase().includes('park mansion') || text.toLowerCase().includes('minami')) {
                backgroundImage = 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop")';
                projectName = 'Park Mansion';
            } else if (text.toLowerCase().includes('kawana')) {
                backgroundImage = 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop")';
                projectName = 'Kawana';
            } else if (text.toLowerCase().includes('sevens')) {
                backgroundImage = 'url("https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop")';
                projectName = 'Sevens Villa';
            } else if (text.toLowerCase().includes('hikawa')) {
                backgroundImage = 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop")';
                projectName = 'Hikawa';
            } else if (text.toLowerCase().includes('proud')) {
                backgroundImage = 'url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=400&fit=crop")';
                projectName = 'Proud';
            } else if (text.toLowerCase().includes('jade')) {
                backgroundImage = 'url("https://images.unsplash.com/photo-1600485154356-be6161a56a0c?w=400&h=400&fit=crop")';
                projectName = 'Park le JADE';
            } else if (text.toLowerCase().includes('one avenue')) {
                backgroundImage = 'url("https://images.unsplash.com/photo-1600485154355-be6161a56a0c?w=400&h=400&fit=crop")';
                projectName = 'One Avenue';
            } else if (text.toLowerCase().includes('century')) {
                backgroundImage = 'url("https://images.unsplash.com/photo-1600485154343-be6161a56a0c?w=400&h=400&fit=crop")';
                projectName = 'Century Forest';
            } else if (text.toLowerCase().includes('nishiazabu')) {
                backgroundImage = 'url("https://images.unsplash.com/photo-1600485154354-be6161a56a0c?w=400&h=400&fit=crop")';
                projectName = 'Nishiazabu';
            } else if (text.toLowerCase().includes('azabu gardens')) {
                backgroundImage = 'url("https://images.unsplash.com/photo-1600485154341-be6161a56a0c?w=400&h=400&fit=crop")';
                projectName = 'Azabu Gardens';
            }

            if (backgroundImage && projectName) {
                console.log('🎯 Aplicando imagen a LI:', projectName);

                // SOLO aplicar background image al LI, nada más
                if (!li.style.backgroundImage) {
                    li.style.backgroundImage = backgroundImage;
                    li.style.backgroundSize = 'cover';
                    li.style.backgroundPosition = 'center';
                    li.style.backgroundRepeat = 'no-repeat';

                    // NO aplicar overlay ni cambiar position/width/height
                    console.log('✅ Background aplicado a:', projectName);
                }
            }
        });
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

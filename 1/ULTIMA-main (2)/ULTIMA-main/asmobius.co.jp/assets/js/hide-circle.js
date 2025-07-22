// SCRIPT SIMPLE Y DIRECTO PARA FORZAR IMÁGENES
(function() {
    console.log('🚀 INICIANDO SCRIPT SIMPLE DE IMÁGENES');
    
    const PARK_MANSION_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1200&fit=crop';
    
    // Función para aplicar imagen a cualquier elemento
    function forceBackgroundImage(element, imageUrl) {
        element.style.setProperty('background-image', `url("${imageUrl}")`, 'important');
        element.style.setProperty('background-size', 'cover', 'important');
        element.style.setProperty('background-position', 'center', 'important');
        element.style.setProperty('background-repeat', 'no-repeat', 'important');
        console.log('✅ IMAGEN FORZADA EN:', element.tagName, element.className);
    }
    
    // Aplicar imagen EVERYWHERE sin excepciones
    function applyEveryhere() {
        console.log('🔄 APLICANDO IMAGEN EVERYWHERE...');
        
        // 1. Body y HTML siempre
        forceBackgroundImage(document.body, PARK_MANSION_IMAGE);
        forceBackgroundImage(document.documentElement, PARK_MANSION_IMAGE);
        
        // 2. Todos los divs, sin excepciones
        const allDivs = document.querySelectorAll('div');
        console.log('📋 Total divs encontrados:', allDivs.length);
        
        allDivs.forEach((div, index) => {
            const style = window.getComputedStyle(div);
            
            // Aplicar a CUALQUIER div negro o gris
            if (style.backgroundColor === 'rgb(37, 37, 37)' || 
                style.backgroundColor === 'rgb(0, 0, 0)' ||
                style.backgroundColor === 'rgba(37, 37, 37, 1)' ||
                style.backgroundColor === 'rgba(0, 0, 0, 1)' ||
                style.backgroundColor.includes('37, 37, 37') ||
                style.backgroundColor.includes('0, 0, 0')) {
                
                console.log(`🎯 Aplicando a div ${index} por color:`, style.backgroundColor);
                forceBackgroundImage(div, PARK_MANSION_IMAGE);
            }
            
            // También aplicar a divs grandes (probablemente el área principal)
            const width = parseInt(style.width) || 0;
            const height = parseInt(style.height) || 0;
            
            if ((width > 500 || style.width === '100%') &&
                (height > 500 || style.height === '100%')) {
                
                console.log(`📐 Aplicando a div ${index} por tamaño:`, style.width, 'x', style.height);
                forceBackgroundImage(div, PARK_MANSION_IMAGE);
            }
            
            // También aplicar a divs con z-index alto
            const zIndex = parseInt(style.zIndex) || 0;
            if (zIndex > 100) {
                console.log(`🔢 Aplicando a div ${index} por z-index:`, zIndex);
                forceBackgroundImage(div, PARK_MANSION_IMAGE);
            }
        });
        
        // 3. También aplicar a main, section, article por si acaso
        const mainElements = document.querySelectorAll('main, section, article, #stage, #app-canvas');
        mainElements.forEach(el => {
            console.log('🏗️ Aplicando a elemento:', el.tagName, el.id);
            forceBackgroundImage(el, PARK_MANSION_IMAGE);
        });
        
        console.log('✅ APLICACIÓN COMPLETADA');
    }
    
    // Ocultar círculo problemático
    function hideStuckCircle() {
        const problematicElements = document.querySelectorAll('svg[style*="mix-blend-mode: exclusion"], svg[viewBox="0 0 60 60"]');
        problematicElements.forEach(el => {
            el.style.display = 'none';
            console.log('🔧 Elemento problemático ocultado');
        });
    }
    
    // Ejecutar TODO inmediatamente
    console.log('🚀 EJECUTANDO TODO INMEDIATAMENTE...');
    hideStuckCircle();
    applyEveryhere();
    
    // Ejecutar cada segundo durante 120 segundos para asegurar que funcione
    let attempts = 0;
    const interval = setInterval(() => {
        hideStuckCircle();
        applyEveryhere();
        attempts++;
        console.log(`🔄 Intento ${attempts}/120`);
        
        if (attempts >= 120) {
            clearInterval(interval);
            console.log('⏰ Intentos completados');
        }
    }, 1000);
    
    // También cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            hideStuckCircle();
            applyEveryhere();
        });
    }
    
    // Y cuando todo se haya cargado
    window.addEventListener('load', () => {
        hideStuckCircle();
        applyEveryhere();
    });
    
    console.log('🚀 SCRIPT COMPLETAMENTE NUEVO ACTIVADO - LA IMAGEN VA A APARECER SÍ O SÍ');
})();

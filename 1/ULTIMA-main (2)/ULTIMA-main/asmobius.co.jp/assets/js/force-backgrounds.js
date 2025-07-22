// SCRIPT SIMPLE PARA FORZAR IMÁGENES DE FONDO
(function() {
    console.log('🚀 INICIANDO SCRIPT SIMPLE DE IMÁGENES');
    
    const PARK_MANSION_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1200&fit=crop';
    
    // Función para aplicar imagen a cualquier elemento
    function forceBackgroundImage(element, imageUrl) {
        element.style.setProperty('background-image', `url("${imageUrl}")`, 'important');
        element.style.setProperty('background-size', 'cover', 'important');
        element.style.setProperty('background-position', 'center', 'important');
        element.style.setProperty('background-repeat', 'no-repeat', 'important');
        console.log('✅ IMAGEN FORZADA EN:', element);
    }
    
    // Aplicar imagen a TODOS los elementos posibles
    function applyEveryhere() {
        console.log('🔄 APLICANDO IMAGEN EVERYWHERE...');
        
        // 1. Body y HTML
        forceBackgroundImage(document.body, PARK_MANSION_IMAGE);
        forceBackgroundImage(document.documentElement, PARK_MANSION_IMAGE);
        
        // 2. Todos los divs
        const allDivs = document.querySelectorAll('div');
        console.log('📋 Total divs encontrados:', allDivs.length);
        
        allDivs.forEach((div, index) => {
            const style = window.getComputedStyle(div);
            
            // Aplicar a CUALQUIER div gris/negro
            if (style.backgroundColor === 'rgb(37, 37, 37)' || 
                style.backgroundColor === 'rgb(0, 0, 0)' ||
                style.backgroundColor === 'rgba(37, 37, 37, 1)' ||
                style.backgroundColor === 'rgba(0, 0, 0, 1)') {
                
                console.log(`🎯 Aplicando a div ${index}:`, style.backgroundColor);
                forceBackgroundImage(div, PARK_MANSION_IMAGE);
            }
            
            // También aplicar a divs grandes
            if ((parseInt(style.width) > 500 || style.width === '100%') &&
                (parseInt(style.height) > 500 || style.height === '100%')) {
                
                console.log(`📐 Aplicando a div grande ${index}`);
                forceBackgroundImage(div, PARK_MANSION_IMAGE);
            }
        });
        
        // 3. Main, section, article
        const mainElements = document.querySelectorAll('main, section, article');
        mainElements.forEach(el => {
            forceBackgroundImage(el, PARK_MANSION_IMAGE);
        });
        
        console.log('✅ APLICACIÓN COMPLETADA');
    }
    
    // Ejecutar INMEDIATAMENTE
    applyEveryhere();
    
    // Ejecutar cada segundo durante 60 segundos
    let attempts = 0;
    const interval = setInterval(() => {
        applyEveryhere();
        attempts++;
        console.log(`🔄 Intento ${attempts}/60`);
        
        if (attempts >= 60) {
            clearInterval(interval);
            console.log('⏰ Intentos completados');
        }
    }, 1000);
    
    // También cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyEveryhere);
    }
    
    // Y cuando todo se haya cargado
    window.addEventListener('load', applyEveryhere);
    
    console.log('🚀 SCRIPT ACTIVADO - IMAGEN SERÁ FORZADA');
})();

// REDIRECCIÓN AUTOMÁTICA A LA NUEVA VERSIÓN
console.log('🔧 Redirigiendo a la nueva implementación...');

// Esperar a que la página cargue completamente y luego redirigir
setTimeout(() => {
    if (window.location.pathname.includes('index.html') ||
        window.location.pathname.endsWith('/') ||
        window.location.pathname.includes('asmobius.co.jp')) {
        window.location.href = 'index-nuevo.html';
    }
}, 100);

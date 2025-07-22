// REDIRECCIÓN AL NUEVO SISTEMA LTSD
(function() {
    console.log('🚀 LTSD - Cargando nuevo sistema...');

    // Mostrar mensaje de redirección
    function mostrarMensajeRedireccion() {
        const mensaje = document.createElement('div');
        mensaje.id = 'mensaje-redireccion';
        mensaje.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: #252525 !important;
            color: white !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-family: Inter, sans-serif !important;
            font-size: 24px !important;
            z-index: 99999 !important;
            flex-direction: column !important;
        `;

        mensaje.innerHTML = `
            <div style="font-size: 48px; font-weight: 300; margin-bottom: 20px; letter-spacing: 0.1em;">
                LT Studio Design
            </div>
            <div style="font-size: 16px; opacity: 0.7;">
                Cargando experiencia mejorada...
            </div>
        `;

        document.body.appendChild(mensaje);

        // Redireccionar después de 2 segundos
        setTimeout(() => {
            window.location.href = 'index-nuevo.html';
        }, 2000);
    }

    // Ocultar todo el contenido original
    function ocultarContenidoOriginal() {
        document.body.style.overflow = 'hidden';

        // Ocultar todos los elementos principales
        const elementos = document.querySelectorAll('*:not(#mensaje-redireccion)');
        elementos.forEach(el => {
            if (el.id !== 'mensaje-redireccion') {
                el.style.opacity = '0';
                el.style.pointerEvents = 'none';
            }
        });
    }

    // Inicializar redirección
    function iniciarRedireccion() {
        console.log('🔄 Iniciando redirección al sistema mejorado');
        ocultarContenidoOriginal();
        mostrarMensajeRedireccion();
    }

    // Ejecutar cuando la página esté lista
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarRedireccion);
    } else {
        iniciarRedireccion();
    }

    console.log('✅ Sistema de redirección LTSD activado');
})();

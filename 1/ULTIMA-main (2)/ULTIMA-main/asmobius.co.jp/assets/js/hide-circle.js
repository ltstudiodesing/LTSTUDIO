// SOLUCIÓN COMPLETA PROPIA - ELIMINO TODO Y CREO NUEVO SISTEMA
(function() {
    console.log('🔥 ELIMINANDO TODO Y CREANDO SISTEMA PROPIO');

    const PROYECTOS = [
        { nombre: 'PARK MANSION', imagen: 'https://picsum.photos/800/800?random=1' },
        { nombre: 'KAWANA', imagen: 'https://picsum.photos/800/800?random=2' },
        { nombre: 'SEVENS VILLA', imagen: 'https://picsum.photos/800/800?random=3' },
        { nombre: 'PARK LE JADE', imagen: 'https://picsum.photos/800/800?random=4' },
        { nombre: 'HIKAWA GARDENS', imagen: 'https://picsum.photos/800/800?random=5' }
    ];

    let proyectoActual = 0;
    let miSistema = null;

    // ELIMINAR TODO LO PROBLEMÁTICO DEL SITIO ORIGINAL
    function eliminarTodoProblematico() {
        // Eliminar canvas problemático
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.remove();
            console.log('🗑️ Canvas problemático eliminado');
        }

        // Eliminar SVG problemáticos
        const svgs = document.querySelectorAll('svg');
        svgs.forEach(svg => {
            svg.remove();
            console.log('🗑️ SVG problemático eliminado');
        });

        // Eliminar lista oculta
        const ul = document.querySelector('ul');
        if (ul) {
            ul.remove();
            console.log('🗑️ Lista problemática eliminada');
        }

        // Eliminar elementos giratorios
        const giratorios = document.querySelectorAll('[style*="animation-name: spin"]');
        giratorios.forEach(el => {
            el.remove();
            console.log('🗑️ Elemento giratorio eliminado');
        });

        // Eliminar elementos con mix-blend-mode
        const mixBlend = document.querySelectorAll('[style*="mix-blend-mode"]');
        mixBlend.forEach(el => {
            el.remove();
            console.log('🗑️ Elemento mix-blend eliminado');
        });
    }

    // CREAR MI PROPIO SISTEMA COMPLETO
    function crearMiSistema() {
        if (miSistema) return miSistema;

        // Contenedor principal
        miSistema = document.createElement('div');
        miSistema.id = 'mi-sistema-completo';
        miSistema.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: #252525 !important;
            z-index: 9999 !important;
            overflow: hidden !important;
        `;

        // Mi logo LTSD
        const logo = document.createElement('div');
        logo.style.cssText = `
            position: absolute !important;
            top: 30px !important;
            left: 30px !important;
            color: white !important;
            font-family: Arial, sans-serif !important;
            font-size: 24px !important;
            font-weight: bold !important;
            letter-spacing: 2px !important;
            z-index: 10000 !important;
        `;
        logo.textContent = 'LTSD';
        miSistema.appendChild(logo);

        // Mi círculo con imagen
        const circulo = document.createElement('div');
        circulo.id = 'mi-circulo';
        circulo.style.cssText = `
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            width: 600px !important;
            height: 600px !important;
            border-radius: 50% !important;
            transform: translate(-50%, -50%) !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            border: 3px solid white !important;
            box-shadow: 0 0 50px rgba(255,255,255,0.3) !important;
            transition: background-image 0.8s ease !important;
        `;
        miSistema.appendChild(circulo);

        // Texto del proyecto
        const texto = document.createElement('div');
        texto.id = 'mi-texto';
        texto.style.cssText = `
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            color: white !important;
            font-family: Arial, sans-serif !important;
            font-size: 32px !important;
            font-weight: bold !important;
            text-align: center !important;
            z-index: 10001 !important;
            text-shadow: 2px 2px 10px rgba(0,0,0,0.8) !important;
            transition: opacity 0.5s ease !important;
        `;
        miSistema.appendChild(texto);

        // Lista de proyectos visible
        const lista = document.createElement('div');
        lista.style.cssText = `
            position: absolute !important;
            bottom: 100px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            color: white !important;
            font-family: Arial, sans-serif !important;
            font-size: 16px !important;
            text-align: center !important;
            line-height: 1.8 !important;
        `;

        let listaHTML = '';
        PROYECTOS.forEach((proyecto, index) => {
            listaHTML += `<div style="opacity: ${index === 0 ? '1' : '0.5'}; transition: opacity 0.3s;">${proyecto.nombre}</div>`;
        });
        lista.innerHTML = listaHTML;
        miSistema.appendChild(lista);

        document.body.appendChild(miSistema);
        console.log('✅ MI SISTEMA COMPLETO CREADO');
        return miSistema;
    }

    // ACTUALIZAR PROYECTO
    function actualizarProyecto() {
        const sistema = crearMiSistema();
        const circulo = sistema.querySelector('#mi-circulo');
        const texto = sistema.querySelector('#mi-texto');
        const lista = sistema.querySelectorAll('div[style*="opacity"]');

        const proyecto = PROYECTOS[proyectoActual];

        // Cambiar imagen y texto
        circulo.style.backgroundImage = `url("${proyecto.imagen}")`;
        texto.textContent = proyecto.nombre;

        // Actualizar lista
        lista.forEach((item, index) => {
            item.style.opacity = index === proyectoActual ? '1' : '0.5';
        });

        console.log(`✅ PROYECTO: ${proyecto.nombre}`);

        // Siguiente proyecto
        proyectoActual = (proyectoActual + 1) % PROYECTOS.length;
    }

    // INICIALIZAR SISTEMA COMPLETO
    function inicializar() {
        eliminarTodoProblematico();
        crearMiSistema();
        actualizarProyecto();
        console.log('🎉 SISTEMA PROPIO FUNCIONANDO AL 100%');
    }

    // Esperar un poco para que la página cargue
    setTimeout(inicializar, 1000);

    // Cambiar proyecto cada 4 segundos
    setInterval(actualizarProyecto, 4000);

    console.log('🚀 SOLUCIÓN PROPIA DEFINITIVA ACTIVADA');
})();

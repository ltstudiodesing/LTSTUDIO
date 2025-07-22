// SCRIPT DIRECTO PARA EL CÍRCULO SVG
(function() {
    console.log('🎯 Aplicando imagen al círculo SVG directamente');

    const IMAGENES = {
        'PARK MANSION': 'https://picsum.photos/800/800?random=1',
        'KAWANA': 'https://picsum.photos/800/800?random=2',
        'SEVENS VILLA': 'https://picsum.photos/800/800?random=3'
    };

    let proyectoActual = 'PARK MANSION';

    // Encontrar el círculo SVG específico que me mostraste
    function encontrarCirculoSVG() {
        // Buscar círculo con cx=777, cy=476.5, r=333.55 aproximadamente
        const circulos = document.querySelectorAll('circle');

        for (let circulo of circulos) {
            const cx = parseFloat(circulo.getAttribute('cx') || 0);
            const cy = parseFloat(circulo.getAttribute('cy') || 0);
            const r = parseFloat(circulo.getAttribute('r') || 0);

            // Buscar el círculo grande que me mostraste
            if (cx > 700 && cx < 800 && cy > 400 && cy < 500 && r > 300) {
                console.log(`✅ Círculo SVG encontrado: cx=${cx}, cy=${cy}, r=${r}`);
                return circulo;
            }
        }
        return null;
    }

    // Aplicar imagen usando patrón SVG
    function aplicarImagenSVG() {
        const circulo = encontrarCirculoSVG();
        if (!circulo) {
            console.log('❌ No se encontró el círculo SVG');
            return;
        }

        const svg = circulo.closest('svg');
        if (!svg) return;

        const proyecto = proyectoActual;
        const imagen = IMAGENES[proyecto];

        // Crear patrón de imagen si no existe
        let defs = svg.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            svg.insertBefore(defs, svg.firstChild);
        }

        // Crear patrón de imagen
        const patternId = 'imagen-proyecto';
        let pattern = defs.querySelector(`#${patternId}`);
        if (!pattern) {
            pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
            pattern.setAttribute('id', patternId);
            pattern.setAttribute('patternUnits', 'userSpaceOnUse');
            pattern.setAttribute('width', '100%');
            pattern.setAttribute('height', '100%');
            defs.appendChild(pattern);
        }

        // Limpiar patrón anterior
        pattern.innerHTML = '';

        // Crear imagen dentro del patrón
        const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        image.setAttribute('href', imagen);
        image.setAttribute('x', '0');
        image.setAttribute('y', '0');
        image.setAttribute('width', '100%');
        image.setAttribute('height', '100%');
        image.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        pattern.appendChild(image);

        // Aplicar patrón al círculo
        circulo.setAttribute('fill', `url(#${patternId})`);
        circulo.style.opacity = '0.8';

        console.log(`🖼️ Imagen SVG aplicada: ${proyecto}`);
    }

    // Detectar proyecto
    function detectarProyecto() {
        const ul = document.querySelector('ul');
        if (!ul) return 'PARK MANSION';

        const texto = ul.textContent.toUpperCase();
        if (texto.includes('KAWANA')) return 'KAWANA';
        if (texto.includes('SEVENS VILLA')) return 'SEVENS VILLA';
        return 'PARK MANSION';
    }

    // Cambiar proyecto y aplicar imagen
    function actualizarProyecto() {
        const nuevoProyecto = detectarProyecto();

        if (nuevoProyecto !== proyectoActual) {
            proyectoActual = nuevoProyecto;
            aplicarImagenSVG();
            console.log(`🔄 Proyecto cambiado a: ${proyectoActual}`);
        }
    }

    // Ocultar círculo molesto
    function ocultarCirculo() {
        const svg = document.querySelector('svg[viewBox="0 0 60 60"]');
        if (svg) svg.style.display = 'none';
    }

    // Aplicar imagen inicial
    setTimeout(() => {
        ocultarCirculo();
        aplicarImagenSVG();
    }, 1000);

    // Verificar cambios cada 3 segundos
    setInterval(() => {
        ocultarCirculo();
        actualizarProyecto();
    }, 3000);

    console.log('🚀 Script SVG listo');
})();

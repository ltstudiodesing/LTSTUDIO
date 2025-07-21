// Solo pelotitas de fondo - SIN tocar navegación del sitio original
(function() {
    'use strict';
    
    let dotsContainer;
    let dotsActive = false;
    let dots = [];
    
    function createDotsContainer() {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'background-dots-container';
        document.body.appendChild(dotsContainer);
    }
    
    function createDot() {
        const dot = document.createElement('div');
        dot.className = 'floating-dot';
        
        // Posición completamente aleatoria
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        dot.style.left = left + '%';
        dot.style.top = top + '%';
        
        // Duración aleatoria
        const duration = 2 + Math.random() * 8;
        dot.style.animationDuration = duration + 's';
        
        // Delay aleatorio
        const delay = Math.random() * 12;
        dot.style.animationDelay = delay + 's';
        
        // Tamaño aleatorio
        const sizeRandom = Math.random();
        if (sizeRandom < 0.3) {
            dot.style.width = '2px';
            dot.style.height = '2px';
        } else if (sizeRandom < 0.7) {
            dot.style.width = '4px';
            dot.style.height = '4px';
        } else {
            dot.style.width = '6px';
            dot.style.height = '6px';
        }
        
        return dot;
    }
    
    function startDots() {
        if (dotsActive) return;
        dotsActive = true;
        
        // Crear pelotitas iniciales
        for (let i = 0; i < 50; i++) {
            const dot = createDot();
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }
        
        // Añadir pelotitas nuevas periódicamente
        function addDots() {
            if (!dotsActive) return;
            
            if (dotsContainer.children.length < 70) {
                const newDot = createDot();
                dotsContainer.appendChild(newDot);
                dots.push(newDot);
                
                // Remover después de un tiempo
                setTimeout(() => {
                    if (newDot.parentNode) {
                        newDot.parentNode.removeChild(newDot);
                        dots = dots.filter(d => d !== newDot);
                    }
                }, 20000);
            }
            
            setTimeout(addDots, 800 + Math.random() * 1500);
        }
        
        addDots();
    }
    
    // Inicializar solo cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Esperar un poco para asegurar que todo esté cargado
        setTimeout(() => {
            createDotsContainer();
            startDots();
            console.log('✨ Pelotitas de fondo iniciadas');
        }, 200);
    }
})();

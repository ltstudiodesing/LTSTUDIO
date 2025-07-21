// Solo pelotitas de fondo - Version limpia sin interferencias
(function() {
    'use strict';
    
    let dotsContainer;
    let dotsActive = false;
    let dots = [];
    
    function createDotsContainer() {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'background-dots-container';
        dotsContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            z-index: -1;
            pointer-events: none;
            background: transparent;
        `;
        document.body.appendChild(dotsContainer);
    }
    
    function createDot() {
        const dot = document.createElement('div');
        dot.className = 'floating-dot';
        
        // Posición aleatoria
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
        
        // Estilos CSS inline para evitar dependencias
        dot.style.cssText += `
            position: absolute;
            background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
            border-radius: 50%;
            animation: gentlePulse ease-in-out infinite;
        `;
        
        return dot;
    }
    
    // Agregar CSS de animación
    function addAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gentlePulse {
                0% {
                    opacity: 0;
                    transform: scale(0.2);
                }
                15% {
                    opacity: 0.4;
                    transform: scale(0.6);
                }
                35% {
                    opacity: 0.8;
                    transform: scale(1);
                }
                65% {
                    opacity: 1;
                    transform: scale(1.3);
                }
                85% {
                    opacity: 0.3;
                    transform: scale(0.8);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.1);
                }
            }
        `;
        document.head.appendChild(style);
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
    
    function init() {
        // Esperar un poco para asegurar que todo esté cargado
        setTimeout(() => {
            addAnimation();
            createDotsContainer();
            startDots();
            console.log('✨ Pelotitas de fondo iniciadas (versión limpia)');
        }, 500);
    }
    
    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

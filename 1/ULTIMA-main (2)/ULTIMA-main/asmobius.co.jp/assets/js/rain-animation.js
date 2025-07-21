// Animación de lluvia de pelotitas para el loading
class RainAnimation {
    constructor() {
        this.rainContainer = null;
        this.animationActive = false;
        this.createRainContainer();
        this.startRain();
    }

    createRainContainer() {
        // Crear contenedor para las pelotitas
        this.rainContainer = document.createElement('div');
        this.rainContainer.className = 'rain-container';
        
        // Buscar el contenedor de loading principal
        const loadingInner = document.querySelector('.p-loading__inner');
        const loadingBackInner = document.querySelector('.p-loading__back__inner');
        
        if (loadingInner) {
            loadingInner.insertBefore(this.rainContainer, loadingInner.firstChild);
        }
        
        if (loadingBackInner) {
            const rainContainerBack = this.rainContainer.cloneNode(true);
            loadingBackInner.insertBefore(rainContainerBack, loadingBackInner.firstChild);
        }
    }

    createRainBall() {
        const ball = document.createElement('div');
        ball.className = 'rain-ball';
        
        // Posición aleatoria horizontal
        const leftPosition = Math.random() * 100;
        ball.style.left = leftPosition + '%';
        
        // Duración aleatoria de la animación (entre 3 y 8 segundos)
        const duration = 3 + Math.random() * 5;
        ball.style.animationDuration = duration + 's';
        
        // Delay aleatorio para crear efecto más natural
        const delay = Math.random() * 2;
        ball.style.animationDelay = delay + 's';
        
        return ball;
    }

    startRain() {
        this.animationActive = true;
        
        const addBalls = () => {
            if (!this.animationActive) return;
            
            // Añadir pelotitas a todos los contenedores de lluvia
            const rainContainers = document.querySelectorAll('.rain-container');
            
            rainContainers.forEach(container => {
                // Crear entre 1-3 pelotitas por ciclo
                const ballCount = 1 + Math.floor(Math.random() * 3);
                
                for (let i = 0; i < ballCount; i++) {
                    const ball = this.createRainBall();
                    container.appendChild(ball);
                    
                    // Remover la pelotita después de la animación
                    setTimeout(() => {
                        if (ball.parentNode) {
                            ball.parentNode.removeChild(ball);
                        }
                    }, 10000); // 10 segundos para asegurar que termine la animación
                }
            });
            
            // Repetir cada 500ms para un efecto continuo
            setTimeout(addBalls, 500);
        };
        
        addBalls();
    }

    stopRain() {
        this.animationActive = false;
        
        // Limpiar contenedores
        const rainContainers = document.querySelectorAll('.rain-container');
        rainContainers.forEach(container => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        });
    }
}

// Inicializar la animación cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para asegurar que el DOM esté completamente cargado
    setTimeout(() => {
        const rainAnimation = new RainAnimation();
        
        // Detener la animación cuando termine el loading (opcional)
        window.rainAnimation = rainAnimation; // Guardar referencia global
    }, 500);
});

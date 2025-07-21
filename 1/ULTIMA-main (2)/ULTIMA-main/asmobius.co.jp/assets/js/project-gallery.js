// Galería de proyectos - LT STUDIO DESIGN
class ProjectGallery {
    constructor() {
        this.currentIndex = 0;
        this.galleryItems = [];
        this.totalItems = 0;
        this.isTransitioning = false;
        
        this.init();
    }

    init() {
        // Obtener elementos de la galería
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.totalItems = this.galleryItems.length;
        
        // Elementos de control
        this.counterCurrent = document.querySelector('.counter-current');
        this.counterTotal = document.querySelector('.counter-total');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        // Configurar contador total
        if (this.counterTotal) {
            this.counterTotal.textContent = this.totalItems.toString().padStart(2, '0');
        }
        
        // Configurar eventos
        this.setupEvents();
        
        // Mostrar primera imagen
        this.updateGallery();
        
        // Auto-avance opcional (descomentear para activar)
        // this.startAutoAdvance();
    }

    setupEvents() {
        // Botones de navegación
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousImage());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextImage());
        }
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'A' || e.key === 'a') {
                this.previousImage();
            } else if (e.key === 'ArrowRight' || e.key === 'D' || e.key === 'd') {
                this.nextImage();
            } else if (e.key === 'Escape') {
                this.pauseAutoAdvance();
            }
        });
        
        // Navegación con mouse/touch
        this.setupSwipeNavigation();
        
        // Pausa de videos cuando no están activos
        this.setupVideoControls();
    }

    setupSwipeNavigation() {
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        
        const gallery = document.querySelector('.project-gallery');
        if (!gallery) return;
        
        gallery.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        gallery.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Solo responder a swipes horizontales significativos
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextImage();
                } else {
                    this.previousImage();
                }
            }
        });
        
        // Navegación con wheel del mouse
        gallery.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            if (this.isTransitioning) return;
            
            if (e.deltaY > 0) {
                this.nextImage();
            } else {
                this.previousImage();
            }
        });
    }

    setupVideoControls() {
        this.galleryItems.forEach((item, index) => {
            const video = item.querySelector('video');
            if (video) {
                // Pausar video cuando no está activo
                video.addEventListener('play', () => {
                    if (index !== this.currentIndex) {
                        video.pause();
                    }
                });
                
                // Auto-pausa cuando cambia la imagen
                video.addEventListener('loadeddata', () => {
                    if (index !== this.currentIndex) {
                        video.pause();
                    }
                });
            }
        });
    }

    nextImage() {
        if (this.isTransitioning) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateGallery();
    }

    previousImage() {
        if (this.isTransitioning) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.updateGallery();
    }

    goToImage(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        
        this.currentIndex = Math.max(0, Math.min(index, this.totalItems - 1));
        this.updateGallery();
    }

    updateGallery() {
        this.isTransitioning = true;
        
        // Actualizar contador
        if (this.counterCurrent) {
            this.counterCurrent.textContent = (this.currentIndex + 1).toString().padStart(2, '0');
        }
        
        // Pausar todos los videos
        this.pauseAllVideos();
        
        // Actualizar clases activas
        this.galleryItems.forEach((item, index) => {
            if (index === this.currentIndex) {
                item.classList.add('active');
                
                // Si es un video, prepararlo para reproducir
                const video = item.querySelector('video');
                if (video) {
                    video.currentTime = 0;
                }
            } else {
                item.classList.remove('active');
            }
        });
        
        // Actualizar URL sin recargar la página
        this.updateURL();
        
        // Resetear flag de transición
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
        
        // Precargar imágenes adyacentes
        this.preloadAdjacentImages();
    }

    pauseAllVideos() {
        this.galleryItems.forEach(item => {
            const video = item.querySelector('video');
            if (video) {
                video.pause();
            }
        });
    }

    preloadAdjacentImages() {
        const preloadIndexes = [
            (this.currentIndex + 1) % this.totalItems,
            (this.currentIndex - 1 + this.totalItems) % this.totalItems
        ];
        
        preloadIndexes.forEach(index => {
            const item = this.galleryItems[index];
            if (item) {
                const img = item.querySelector('img');
                if (img && !img.complete) {
                    const preloadImg = new Image();
                    preloadImg.src = img.src;
                }
            }
        });
    }

    updateURL() {
        const currentImageNumber = this.currentIndex + 1;
        const newURL = `${window.location.pathname}#image-${currentImageNumber}`;
        
        if (window.location.hash !== `#image-${currentImageNumber}`) {
            history.replaceState(null, null, newURL);
        }
    }

    startAutoAdvance(interval = 5000) {
        this.autoAdvanceInterval = setInterval(() => {
            // Solo avanzar si no hay videos reproduciéndose
            const currentItem = this.galleryItems[this.currentIndex];
            const currentVideo = currentItem ? currentItem.querySelector('video') : null;
            
            if (!currentVideo || currentVideo.paused) {
                this.nextImage();
            }
        }, interval);
    }

    pauseAutoAdvance() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
            this.autoAdvanceInterval = null;
        }
    }

    // Método para ir a una imagen específica desde URL
    initFromURL() {
        const hash = window.location.hash;
        const match = hash.match(/#image-(\d+)/);
        
        if (match) {
            const imageNumber = parseInt(match[1], 10);
            if (imageNumber >= 1 && imageNumber <= this.totalItems) {
                this.currentIndex = imageNumber - 1;
                this.updateGallery();
            }
        }
    }
}

// Utilidades adicionales
class ProjectUtils {
    static init() {
        // Smooth scroll para navegación
        ProjectUtils.setupSmoothScroll();
        
        // Lazy loading para imágenes
        ProjectUtils.setupLazyLoading();
        
        // Efectos de paralaje sutiles
        ProjectUtils.setupParallaxEffects();
    }

    static setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    static setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    static setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    const yPos = -(scrollTop * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
            });
        }
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar galería si estamos en una página de proyecto
    if (document.querySelector('.project-gallery')) {
        window.projectGallery = new ProjectGallery();
        
        // Inicializar desde URL si hay hash
        window.addEventListener('load', () => {
            window.projectGallery.initFromURL();
        });
    }
    
    // Inicializar utilidades del proyecto
    ProjectUtils.init();
    
    // Efectos adicionales de carga
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Manejar cambios de hash en la URL
window.addEventListener('hashchange', function() {
    if (window.projectGallery) {
        window.projectGallery.initFromURL();
    }
});

// Prevenir comportamiento de scroll en espacios
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
    }
});

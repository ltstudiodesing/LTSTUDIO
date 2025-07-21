// Navegación de proyectos desde la página principal
class ProjectNavigation {
    constructor() {
        this.projects = [
            {
                id: 'casa-moderna',
                name: 'Casa Moderna',
                url: 'projects/casa-moderna.html',
                keywords: ['casa', 'moderna', 'residencial', 'home', 'house'],
                year: 2024,
                location: 'Tokyo, Japón'
            },
            {
                id: 'edificio-comercial',
                name: 'Edificio Comercial',
                url: 'projects/edificio-comercial.html',
                keywords: ['edificio', 'comercial', 'office', 'building'],
                year: 2023,
                location: 'Osaka, Japón'
            },
            {
                id: 'complejo-residencial',
                name: 'Complejo Residencial',
                url: 'projects/complejo-residencial.html',
                keywords: ['complejo', 'residencial', 'apartments', 'complex'],
                year: 2024,
                location: 'Kyoto, Japón'
            }
        ];
        
        this.init();
    }

    init() {
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupNavigation());
        } else {
            this.setupNavigation();
        }
    }

    setupNavigation() {
        // Buscar elementos clickeables que podrían ser proyectos
        this.findAndSetupProjectElements();
        
        // Agregar navegación con teclado
        this.setupKeyboardNavigation();
        
        // Crear enlaces directos en el DOM
        this.createProjectLinks();
    }

    findAndSetupProjectElements() {
        // Buscar elementos que contengan imágenes de proyectos
        const possibleProjectElements = [
            ...document.querySelectorAll('img[src*="project"]'),
            ...document.querySelectorAll('img[src*="portfolio"]'), 
            ...document.querySelectorAll('img[src*="work"]'),
            ...document.querySelectorAll('[data-project]'),
            ...document.querySelectorAll('.project-item'),
            ...document.querySelectorAll('.portfolio-item'),
            ...document.querySelectorAll('.work-item'),
            // Buscar por posibles clases genéricas
            ...document.querySelectorAll('.gallery-item'),
            ...document.querySelectorAll('.slide'),
            ...document.querySelectorAll('[class*="item"]')
        ];

        // También buscar elementos que podrían contener proyectos por su posición
        const allImages = document.querySelectorAll('img');
        const allClickableElements = document.querySelectorAll('a, [onclick], [data-href], .clickable');
        
        // Combinar todos los elementos candidatos
        const candidates = [...new Set([...possibleProjectElements, ...allImages, ...allClickableElements])];
        
        candidates.forEach((element, index) => {
            this.setupProjectClick(element, index);
        });
    }

    setupProjectClick(element, index) {
        // Determinar qué proyecto mostrar basado en el índice
        const projectIndex = index % this.projects.length;
        const project = this.projects[projectIndex];
        
        // Añadir cursor pointer
        element.style.cursor = 'pointer';
        
        // Añadir clase identificadora
        element.classList.add('project-clickable');
        element.dataset.projectId = project.id;
        
        // Agregar tooltip con información del proyecto
        element.title = `${project.name} - ${project.location} (${project.year})`;
        
        // Agregar evento de click
        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Efecto visual al hacer click
            this.addClickEffect(element);
            
            // Navegar al proyecto después de un pequeño delay para el efecto
            setTimeout(() => {
                this.navigateToProject(project);
            }, 300);
        });
        
        // Efectos hover
        element.addEventListener('mouseenter', () => {
            this.addHoverEffect(element);
        });
        
        element.addEventListener('mouseleave', () => {
            this.removeHoverEffect(element);
        });
    }

    addClickEffect(element) {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }

    addHoverEffect(element) {
        element.style.transform = 'scale(1.05)';
        element.style.transition = 'transform 0.3s ease';
        element.style.filter = 'brightness(1.1)';
    }

    removeHoverEffect(element) {
        element.style.transform = 'scale(1)';
        element.style.filter = 'brightness(1)';
    }

    navigateToProject(project) {
        // Mostrar indicador de carga
        this.showLoadingIndicator();
        
        // Navegar a la página del proyecto
        window.location.href = project.url;
    }

    showLoadingIndicator() {
        // Crear overlay de carga
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'project-loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p class="loading-text">Cargando proyecto...</p>
            </div>
        `;
        
        // Estilos para el overlay
        loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'butler_medium', serif;
        `;
        
        document.body.appendChild(loadingOverlay);
        
        // Remover después de 3 segundos por seguridad
        setTimeout(() => {
            if (loadingOverlay.parentNode) {
                loadingOverlay.remove();
            }
        }, 3000);
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // P para proyectos
            if (e.key.toLowerCase() === 'p') {
                e.preventDefault();
                this.showProjectsMenu();
            }
            
            // Números 1-3 para ir a proyectos específicos
            if (e.key >= '1' && e.key <= '3') {
                e.preventDefault();
                const projectIndex = parseInt(e.key) - 1;
                if (this.projects[projectIndex]) {
                    this.navigateToProject(this.projects[projectIndex]);
                }
            }
        });
    }

    showProjectsMenu() {
        // Crear menú de proyectos
        const menu = document.createElement('div');
        menu.className = 'projects-menu-overlay';
        
        const menuContent = `
            <div class="projects-menu">
                <h3 class="menu-title">Seleccionar Proyecto</h3>
                <div class="projects-list">
                    ${this.projects.map((project, index) => `
                        <div class="project-menu-item" data-project-id="${project.id}">
                            <span class="project-number">${index + 1}</span>
                            <div class="project-info">
                                <h4 class="project-name">${project.name}</h4>
                                <p class="project-details">${project.location} • ${project.year}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <p class="menu-instructions">Usa las teclas 1-3 o haz click para seleccionar</p>
                <button class="menu-close">Cerrar (ESC)</button>
            </div>
        `;
        
        menu.innerHTML = menuContent;
        
        // Estilos del menú
        menu.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'butler_medium', serif;
        `;
        
        document.body.appendChild(menu);
        
        // Eventos del menú
        menu.addEventListener('click', (e) => {
            if (e.target === menu || e.target.classList.contains('menu-close')) {
                menu.remove();
            }
            
            const projectItem = e.target.closest('.project-menu-item');
            if (projectItem) {
                const projectId = projectItem.dataset.projectId;
                const project = this.projects.find(p => p.id === projectId);
                if (project) {
                    menu.remove();
                    this.navigateToProject(project);
                }
            }
        });
        
        // Cerrar con ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                menu.remove();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    createProjectLinks() {
        // Crear enlaces directos si no hay elementos clickeables suficientes
        const projectLinksContainer = document.createElement('div');
        projectLinksContainer.className = 'project-direct-links';
        projectLinksContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1000;
            font-family: 'butler_medium', serif;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        `;
        
        const linksHTML = `
            <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #666; letter-spacing: 1px;">PROYECTOS</h4>
            ${this.projects.map((project, index) => `
                <a href="${project.url}" class="direct-project-link" style="
                    display: block;
                    color: #252525;
                    text-decoration: none;
                    padding: 5px 0;
                    font-size: 13px;
                    letter-spacing: 0.5px;
                    transition: color 0.3s ease;
                " onmouseover="this.style.color='#999'" onmouseout="this.style.color='#252525'">
                    ${index + 1}. ${project.name}
                </a>
            `).join('')}
            <p style="margin: 10px 0 0 0; font-size: 11px; color: #999;">Presiona 'P' para menú rápido</p>
        `;
        
        projectLinksContainer.innerHTML = linksHTML;
        document.body.appendChild(projectLinksContainer);
        
        // Hacer el contenedor colapsable
        projectLinksContainer.addEventListener('dblclick', () => {
            projectLinksContainer.style.display = 'none';
        });
    }
}

// CSS para el spinner de carga
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #252525;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loading-text {
        color: #252525;
        font-size: 16px;
        letter-spacing: 1px;
        margin: 0;
    }
    
    .projects-menu {
        background: white;
        padding: 40px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .menu-title {
        margin: 0 0 30px 0;
        font-size: 24px;
        color: #252525;
        letter-spacing: 2px;
    }
    
    .project-menu-item {
        display: flex;
        align-items: center;
        padding: 15px;
        margin: 10px 0;
        border: 2px solid #f0f0f0;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .project-menu-item:hover {
        border-color: #252525;
        background: #f8f9fa;
    }
    
    .project-number {
        width: 30px;
        height: 30px;
        background: #252525;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 15px;
    }
    
    .project-info {
        text-align: left;
        flex: 1;
    }
    
    .project-name {
        margin: 0;
        font-size: 16px;
        color: #252525;
        letter-spacing: 1px;
    }
    
    .project-details {
        margin: 5px 0 0 0;
        font-size: 12px;
        color: #666;
        letter-spacing: 0.5px;
    }
    
    .menu-instructions {
        margin: 20px 0 10px 0;
        font-size: 12px;
        color: #999;
        letter-spacing: 0.5px;
    }
    
    .menu-close {
        background: #252525;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-family: inherit;
        letter-spacing: 1px;
    }
    
    .menu-close:hover {
        background: #666;
    }
`;

document.head.appendChild(loadingStyles);

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.projectNavigation = new ProjectNavigation();
    });
} else {
    window.projectNavigation = new ProjectNavigation();
}

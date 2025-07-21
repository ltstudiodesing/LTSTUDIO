// Navegación súper simple que no interfiere con nada
(function() {
    'use strict';
    
    const projects = [
        { name: "Park Mansion Minami Azabu", url: "projects/park-mansion-minami-azabu.html" },
        { name: "Hikawa Gardens", url: "projects/hikawa-gardens.html" },
        { name: "One Avenue", url: "projects/one-avenue.html" },
        { name: "Itohpia Jiyugaoka", url: "projects/itohpia-jiyugaoka.html" }
    ];
    
    function navigateToProject(index) {
        if (projects[index]) {
            console.log('Navegando a:', projects[index].name);
            window.location.href = projects[index].url;
        }
    }
    
    function showMenu() {
        const menu = document.createElement('div');
        menu.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 99999;
            font-family: Arial, sans-serif;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            border: 2px solid #333;
        `;
        
        const title = document.createElement('h3');
        title.textContent = 'Seleccionar Proyecto';
        title.style.margin = '0 0 15px 0';
        menu.appendChild(title);
        
        projects.forEach((project, index) => {
            const item = document.createElement('div');
            item.textContent = `${index + 1}. ${project.name}`;
            item.style.cssText = `
                padding: 10px;
                margin: 5px 0;
                background: #f0f0f0;
                border-radius: 5px;
                cursor: pointer;
                border: 1px solid #ddd;
            `;
            item.addEventListener('click', () => {
                document.body.removeChild(menu);
                navigateToProject(index);
            });
            menu.appendChild(item);
        });
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Cerrar';
        closeBtn.style.cssText = `
            margin-top: 15px;
            padding: 8px 16px;
            background: #333;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        `;
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(menu);
        });
        menu.appendChild(closeBtn);
        
        document.body.appendChild(menu);
    }
    
    // Solo navegación por teclado - no tocar nada más
    document.addEventListener('keydown', function(e) {
        // P para abrir menú
        if (e.key.toLowerCase() === 'p') {
            e.preventDefault();
            showMenu();
        }
        
        // 1-4 para ir directamente a proyectos
        if (e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            navigateToProject(parseInt(e.key) - 1);
        }
    });
    
    console.log('🚀 Navegación simple cargada - Usa P para menú o 1-4 para proyectos directos');
})();

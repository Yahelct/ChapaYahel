document.addEventListener('DOMContentLoaded', function () {
    // Cargar el primer proyecto por defecto al cargar la página
    cargarProyecto('01_Intereses/Index.html');

    // Agregar manejadores de eventos a los enlaces
    const enlacesProyectos = document.querySelectorAll('nav ul li a');
    enlacesProyectos.forEach(enlace => {
        enlace.addEventListener('click', function (event) {
            event.preventDefault(); // Evitar la recarga de la página al hacer clic en un enlace
            const rutaProyecto = this.getAttribute('href');
            cargarProyecto(rutaProyecto);
        });
    });
});

function cargarProyecto(rutaProyecto) {
    const proyectoIframe = document.getElementById('proyecto-iframe');
    
    // Agregamos un timestamp para evitar problemas de caché
    proyectoIframe.src = `${rutaProyecto}?${Date.now()}`;
}

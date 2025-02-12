document.addEventListener("DOMContentLoaded", () => {
    actualizarEstado();
    setInterval(actualizarEstado, 3000); // Actualiza cada 3 segundos
});

function actualizarEstado() {
    fetch("/.netlify/functions/api?query=estado")
        .then(response => response.json())
        .then(data => {
            document.getElementById("texto").value = data.texto;
            actualizarIndicadores(data.indicadores);
        })
        .catch(error => console.error("Error al obtener estado:", error));
}

function actualizarIndicadores(indicadores) {
    Object.keys(indicadores).forEach(key => {
        const elemento = document.getElementById(key);
        if (elemento) {
            elemento.classList.toggle("activo", indicadores[key]);
        }
    });
}

function buscar(query) {
    fetch(`/.netlify/functions/api?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => actualizarEstado())
        .catch(error => console.error("Error en la búsqueda:", error));
}

function borrarTexto() {
    buscar("Escribir "); // Enviar una búsqueda con texto vacío
}

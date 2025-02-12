const API_URL = "/api?query="; // Usa el redirect de Netlify

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("texto");
    const borrarBtn = document.getElementById("borrar");

    // Verificar si los elementos existen
    if (!textarea) {
        console.error("Error: No se encontró el elemento de texto.");
        return;
    }
    if (!borrarBtn) {
        console.error("Error: No se encontró el botón de borrar.");
        return;
    }

    // Función para actualizar el estado desde la API
    async function actualizarEstado() {
        try {
            const response = await fetch(API_URL + "estado");
            if (!response.ok) throw new Error("No se pudo obtener el estado");
            
            const data = await response.json();
            textarea.value = data.texto;

            // Actualizar indicadores visuales
            ["escribir", "leer", "izquierda", "derecha", "adelante", "atras"].forEach(id => {
                const elem = document.getElementById(id);
                if (elem) {
                    elem.style.color = data.indicadores[id] ? "green" : "red";
                }
            });
        } catch (error) {
            console.error("Error al obtener estado:", error);
        }
    }

    // Definir la función borrarTexto correctamente
    async function borrarTexto() {
        try {
            await fetch(API_URL + "Escribir ");
            actualizarEstado();
        } catch (error) {
            console.error("Error al borrar texto:", error);
        }
    }

    // Asignar el evento al botón de borrar
    borrarBtn.addEventListener("click", borrarTexto);

    setInterval(actualizarEstado, 3000); // Actualiza cada 3 segundos
    actualizarEstado(); // Llamada inicial
});

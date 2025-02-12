// script.js

const API_URL = "/api?query="; // Usa el redirect de Netlify

// Esperar a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("texto");
    const borrarBtn = document.getElementById("borrar");
    
    if (!textarea || !borrarBtn) {
        console.error("Error: Elementos del DOM no encontrados.");
        return;
    }

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

    borrarBtn.addEventListener("click", async () => {
        try {
            await fetch(API_URL + "Escribir ");
            actualizarEstado();
        } catch (error) {
            console.error("Error al borrar texto:", error);
        }
    });

    setInterval(actualizarEstado, 3000); // Actualiza cada 3 segundos
    actualizarEstado(); // Llamada inicial
});

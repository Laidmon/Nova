// script.js

const API_URL = "/api?query="; // Con el redirect de Netlify, esto es suficiente

async function actualizarEstado() {
    try {
        const response = await fetch(API_URL + "estado");
        if (!response.ok) throw new Error("No se pudo obtener el estado");
        
        const data = await response.json();
        document.getElementById("texto").value = data.texto;

        // Actualizar indicadores visuales
        ["escribir", "leer", "izquierda", "derecha", "adelante", "atras"].forEach(id => {
            document.getElementById(id).style.color = data.indicadores[id] ? "green" : "red";
        });
    } catch (error) {
        console.error("Error al obtener estado:", error);
    }
}

document.getElementById("borrar").addEventListener("click", async () => {
    await fetch(API_URL + "Escribir ");
    actualizarEstado();
});

setInterval(actualizarEstado, 3000); // Actualiza cada 3 segundos

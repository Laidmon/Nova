const API_URL = "/api?query="; // Se usa el redirect de Netlify correctamente

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("textIA");
    const borrarBtn = document.getElementById("borrar");

    if (!textarea || !borrarBtn) {
        console.error("Error: Elementos del DOM no encontrados.");
        return;
    }

    // Función para actualizar el estado desde la API
    async function actualizarEstado() {
        try {
            const response = await fetch(`${API_URL}estado`);
            if (!response.ok) throw new Error("No se pudo obtener el estado");

            const data = await response.json();
            textarea.textContent = data.texto;

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

    // Función para buscar y actualizar el estado
    async function buscar(query) {
        try {
            await fetch(`${API_URL}${encodeURIComponent(query)}`);
            actualizarEstado();
        } catch (error) {
            console.error("Error al buscar:", error);
        }
    }

    // Función para borrar el texto (equivalente a escribir "")
    async function borrarTexto() {
        try {
            await fetch(`${API_URL}Escribir `);
            actualizarEstado();
        } catch (error) {
            console.error("Error al borrar texto:", error);
        }
    }

    // Asignar evento al botón de borrar
    borrarBtn.addEventListener("click", borrarTexto);

    setInterval(actualizarEstado, 3000); // Actualiza cada 3 segundos
    actualizarEstado(); // Llamada inicial
});

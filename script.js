document.addEventListener("DOMContentLoaded", () => {
    actualizarEstado();
});

function actualizarEstado() {
    fetch("/.netlify/functions/api/estado")
        .then(response => response.json())
        .then(data => {
            document.getElementById("texto").value = data.texto;
            for (const key in data.indicadores) {
                document.getElementById(key).classList.toggle("activo", data.indicadores[key]);
            }
        });
}

function buscar(query) {
    fetch(`/.netlify/functions/api/buscar?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(() => actualizarEstado());
}

function borrarTexto() {
    fetch("/.netlify/functions/api/borrar", { method: "POST" })
        .then(() => actualizarEstado());
}
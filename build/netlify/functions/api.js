// netlify/functions/api.js
exports.handler = async (event) => {
    try {
        const query = event.queryStringParameters.query || "";
        
        // Variables globales simuladas (en producción se debería usar una base de datos)
        global.__texto = global.__texto || "";
        global.__indicadores = global.__indicadores || {
            escribir: false,
            leer: false,
            izquierda: false,
            derecha: false,
            adelante: false,
            atras: false
        };

        let texto = global.__texto;
        let indicadores = global.__indicadores;

        // Lógica de control según el query recibido
        if (query === "estado") {
            // No cambia nada, solo devuelve el estado actual
        } else if (query.startsWith("Escribir ")) {
            texto = query.substring(9); // Extrae el texto después de "Escribir "
            indicadores = {
                escribir: true, leer: false,
                izquierda: false, derecha: false,
                adelante: false, atras: false
            };
        } else if (query.startsWith("Leer ")) {
            const textoBuscar = query.substring(5);
            indicadores = {
                escribir: false, leer: texto.includes(textoBuscar),
                izquierda: false, derecha: false,
                adelante: false, atras: false
            };
        } else if (query.startsWith("ir ")) {
            const direction = query.replace("ir ", "");
            if (indicadores.hasOwnProperty(direction)) {
                indicadores = {
                    escribir: false, leer: false,
                    izquierda: false, derecha: false,
                    adelante: false, atras: false
                };
                indicadores[direction] = true;
            }
        }

        // Guardamos los cambios en las variables globales
        global.__texto = texto;
        global.__indicadores = indicadores;

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texto, indicadores })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Error interno en la API", detalle: error.message })
        };
    }
};

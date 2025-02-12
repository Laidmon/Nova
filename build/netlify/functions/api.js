const { Handler } = require('@netlify/functions');

let texto = "";
let indicadores = {
    escribir: false,
    leer: false,
    izquierda: false,
    derecha: false,
    adelante: false,
    atras: false
};

const handler = async (event) => {
    const params = new URLSearchParams(event.queryStringParameters);
    const query = params.get("query") || "";

    Object.keys(indicadores).forEach(key => indicadores[key] = false);

    if (query.startsWith("Escribir ")) {
        texto = query.substring(9);
        indicadores.escribir = true;
    } else if (query.startsWith("Leer ")) {
        indicadores.leer = true;
    } else {
        const direction = query.replace("ir ", "");
        if (indicadores.hasOwnProperty(direction)) {
            indicadores[direction] = true;
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ texto, indicadores })
    };
};
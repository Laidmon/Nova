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
    const { path, queryStringParameters, httpMethod, body } = event;
    
    if (httpMethod === "GET" && path.includes("/api/buscar")) {
        const query = queryStringParameters.query || "";
        Object.keys(indicadores).forEach(k => indicadores[k] = false);
        
        if (query.startsWith("Escribir ")) {
            texto = query.substring(9);
            indicadores.escribir = true;
        } else if (query.startsWith("Leer ")) {
            indicadores.leer = texto.includes(query.substring(5));
        } else {
            const key = query.replace("ir ", "");
            if (indicadores.hasOwnProperty(key)) {
                indicadores[key] = true;
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ texto, indicadores })
        };
    }
    
    if (httpMethod === "GET" && path.includes("/api/estado")) {
        return {
            statusCode: 200,
            body: JSON.stringify({ texto, indicadores })
        };
    }

    if (httpMethod === "POST" && path.includes("/api/actualizar")) {
        const data = JSON.parse(body || "{}");
        texto = data.texto || "";
        return {
            statusCode: 200,
            body: "Texto actualizado"
        };
    }
    
    if (httpMethod === "POST" && path.includes("/api/borrar")) {
        texto = "";
        return {
            statusCode: 200,
            body: "Texto borrado"
        };
    }
    
    return {
        statusCode: 404,
        body: "Not Found"
    };
};

module.exports = { handler };
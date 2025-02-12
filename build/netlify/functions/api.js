// netlify/functions/api.js
exports.handler = async (event) => {
  const query = event.queryStringParameters.query || "";
  
  // Inicializamos el estado
  let texto = global.__texto || "";
  let indicadores = {
    escribir: false,
    leer: false,
    izquierda: false,
    derecha: false,
    adelante: false,
    atras: false
  };

  // Si la consulta es "estado", simplemente retornamos el estado actual
  if (query === "estado") {
    // No se modifica nada
  } else if (query.startsWith("Escribir ")) {
    texto = query.substring(9);
    indicadores.escribir = true;
  } else if (query.startsWith("Leer ")) {
    indicadores.leer = texto.includes(query.substring(5));
  } else if (query.startsWith("ir ")) {
    const direction = query.replace("ir ", "");
    if (indicadores.hasOwnProperty(direction)) {
      indicadores[direction] = true;
    }
  }

  // Simulamos persistencia con una variable global (nota: esto se reinicia en invocaciones frías)
  global.__texto = texto;
  
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto, indicadores })
  };
};

package com.example;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.io.*;
import java.nio.charset.StandardCharsets;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

public class ApiHandler implements RequestStreamHandler {
    private static String texto = "";
    private static final Map<String, Boolean> indicadores = new HashMap<>();

    static {
        indicadores.put("escribir", false);
        indicadores.put("leer", false);
        indicadores.put("izquierda", false);
        indicadores.put("derecha", false);
        indicadores.put("adelante", false);
        indicadores.put("atras", false);
    }

    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> response = new HashMap<>();
        response.put("statusCode", 200);
        response.put("headers", Map.of("Content-Type", "application/json"));

        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
        String body = reader.lines().collect(Collectors.joining());

        if (body.contains("query")) {
            String query = objectMapper.readTree(body).get("query").asText();
            indicadores.replaceAll((k, v) -> false);

            if (query.startsWith("Escribir ")) {
                texto = query.substring(9);
                indicadores.put("escribir", true);
            } else if (query.startsWith("Leer ")) {
                indicadores.put("leer", texto.contains(query.substring(5)));
            } else {
                indicadores.put(query.replace("ir ", ""), true);
            }
        }

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("texto", texto);
        responseBody.put("indicadores", indicadores);

        response.put("body", objectMapper.writeValueAsString(responseBody));

        OutputStreamWriter writer = new OutputStreamWriter(outputStream, StandardCharsets.UTF_8);
        writer.write(objectMapper.writeValueAsString(response));
        writer.close();
    }
}
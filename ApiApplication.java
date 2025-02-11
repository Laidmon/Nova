package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.function.adapter.aws.SpringBootRequestHandler;

@SpringBootApplication
public class ApiApplication extends SpringBootRequestHandler<Object, Object> {
    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }
}
package com.server.rest_server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:3001")
                .allowedMethods("GET","POST", "PUT", "DELETE", "OPTIONS", "HEAD")
                .allowCredentials(true);
        //.allowedMethods("GET", "POST", "PUT", "DELETE") // Specify allowed HTTP methods
        //.maxAge(3600); // Set preflight response cache duration
    }
}
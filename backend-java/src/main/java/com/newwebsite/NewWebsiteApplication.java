package com.newwebsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@SpringBootApplication
public class NewWebsiteApplication {
    public static void main(String[] args) {
        SpringApplication.run(NewWebsiteApplication.class, args);
    }
}

@RestController
class CareerController {
    @GetMapping("/api/health")
    Map<String, String> health() {
        return Map.of("status", "ok", "service", "java-api");
    }

    @GetMapping("/api/careers")
    Map<String, List<String>> careers() {
        return Map.of("careers", List.of("Frontend Developer", "Backend Developer", "Full Stack Developer", "Java Software Engineer"));
    }
}

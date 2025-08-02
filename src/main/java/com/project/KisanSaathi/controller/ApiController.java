// src/main/java/com/project/KisanSaathi/controller/ApiController.java
package com.project.KisanSaathi.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // For frontend framework integration
public class ApiController {

    @GetMapping("/weather")
    public Map<String, Object> getWeatherData() {
        Map<String, Object> response = new HashMap<>();
        response.put("temperature", "25°C");
        response.put("humidity", "60%");
        response.put("status", "Sunny");
        return response;
    }

    @PostMapping("/disease-detection")
    public Map<String, Object> detectDisease(@RequestParam("image") String imageData) {
        Map<String, Object> response = new HashMap<>();
        response.put("disease", "Healthy Plant");
        response.put("confidence", "95%");
        response.put("recommendation", "Continue current care routine");
        return response;
    }

    @GetMapping("/soil-data")
    public Map<String, Object> getSoilData() {
        Map<String, Object> response = new HashMap<>();
        response.put("ph", "6.5");
        response.put("moisture", "45%");
        response.put("nutrients", "Optimal");
        return response;
    }
}


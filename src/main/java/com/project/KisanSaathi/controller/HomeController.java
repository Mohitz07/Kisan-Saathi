// src/main/java/com/project/KisanSaathi/controller/HomeController.java
package com.project.KisanSaathi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/weather")
    public String weather() {
        return "weather";
    }

    @GetMapping("/disease-detection")
    public String diseaseDetection() {
        return "disease-detection";
    }

    @GetMapping("/soil-monitoring")
    public String soilMonitoring() {
        return "soil-monitoring";
    }
}


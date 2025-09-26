package com.project.KisanSaathi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/gemini")
public class GeminiController {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    static class SoilRequest {
        public Double nitrogen;
        public Double phosphorus;
        public Double potassium;
    }

    // Gemini's expected request model classes
    static class GeminiRequestBody {
        public List<Content> contents;
        public GeminiRequestBody(List<Content> contents) {
            this.contents = contents;
        }
    }

    static class Content {
        public List<Part> parts;
        public Content(List<Part> parts) {
            this.parts = parts;
        }
    }

    static class Part {
        public String text;
        public Part(String text) {
            this.text = text;
        }
    }

    @PostMapping("/advice")
    public ResponseEntity<String> getSoilAdvice(@RequestBody SoilRequest soilRequest) {
        try {
            String prompt = String.format(
                    "You are an expert agriculture advisor for Indian farmers. Please reply in plain text only. Do not use any markdown formatting or special characters like asterisks.\n"+ "Soil test results:\n" +
                            "Nitrogen: %.2f\nPhosphorus: %.2f\nPotassium: %.2f\n" +
                            "Provide soil health improvement measures and recommended fertilizers in HINDI language. should be short and precise and produce output in such a way that you are talking with a person",
                    soilRequest.nitrogen, soilRequest.phosphorus, soilRequest.potassium
            );

            GeminiRequestBody requestBody = new GeminiRequestBody(
                    List.of(new Content(List.of(new Part(prompt))))
            );
            RestTemplate restTemplate = new RestTemplate();
            String apiUrlWithKey = geminiApiUrl + "?key=" + geminiApiKey;
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<GeminiRequestBody> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> rawResponse = restTemplate.exchange(
                    apiUrlWithKey, HttpMethod.POST, entity, String.class);

            if (rawResponse.getStatusCode() == HttpStatus.OK) {
                ObjectMapper mapper = new ObjectMapper();
                Map<?, ?> responseMap = mapper.readValue(rawResponse.getBody(), Map.class);
                List<?> candidates = (List<?>) responseMap.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<?, ?> candidate = (Map<?, ?>) candidates.get(0);
                    Map<?, ?> content = (Map<?, ?>) candidate.get("content");
                    List<?> parts = (List<?>) content.get("parts");
                    if (parts != null && !parts.isEmpty()) {
                        Map<?, ?> part = (Map<?, ?>) parts.get(0);
                        String generatedText = (String) part.get("text");
                        return ResponseEntity.ok(generatedText);
                    }
                }
                return ResponseEntity.ok("No advice generated.");
            } else {
                return ResponseEntity.status(rawResponse.getStatusCode()).body(rawResponse.getBody());
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }
}

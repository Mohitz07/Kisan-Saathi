package com.project.KisanSaathi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/crop-advisory")
public class CropAdvisoryController {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    static class CropAdvisoryRequest {
        public String cropType;
        public String query;
        public Double nitrogen = 25.0;
        public Double phosphorus = 20.0;
        public Double potassium = 30.0;
    }

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

    // Crop-specific advisory endpoint
    @PostMapping("/get-crop-advice")
    public ResponseEntity<String> getCropAdvice(@RequestBody CropAdvisoryRequest request) {
        try {
            // Create crop-specific prompt
            String prompt = createCropSpecificPrompt(request);
            System.out.println("Crop Advisory Prompt: " + prompt);

            return callGeminiAPI(prompt);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server error: " + e.getMessage());
        }
    }

    // General farming advice endpoint (separate from soil)
    @PostMapping("/get-general-advice")
    public ResponseEntity<String> getGeneralAdvice(@RequestBody CropAdvisoryRequest request) {
        try {
            // Create general farming prompt
            String prompt = createGeneralFarmingPrompt(request);
            System.out.println("General Advice Prompt: " + prompt);

            return callGeminiAPI(prompt);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server error: " + e.getMessage());
        }
    }

    private String createCropSpecificPrompt(CropAdvisoryRequest request) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are an expert agriculture advisor for Indian farmers. ");
        prompt.append("Provide advice in simple, conversational English. ");
        prompt.append("Do NOT use any markdown, asterisks (*), bullet points, or special formatting. ");
        prompt.append("Provide concise advice in 15-20 lines maximum. ");
        prompt.append("Use complete sentences only. Do not use lists or numbering. ");
        prompt.append("Be practical and focus on actionable steps. ");

        if (request.cropType != null) {
            prompt.append("Crop: ").append(request.cropType).append(". ");
        }

        if (request.query != null && !request.query.trim().isEmpty()) {
            prompt.append("Answer this question: ").append(request.query).append(". ");
        }

        if (shouldIncludeSoilParameters(request.query)) {
            prompt.append("Current soil NPK: Nitrogen ").append(String.format("%.2f", request.nitrogen))
                    .append(", Potassium ").append(String.format("%.2f", request.potassium))
                    .append(", Phosphorus ").append(String.format("%.2f", request.potassium)).append(". ");
            prompt.append("Consider these values in your advice. ");
        }

        prompt.append("Provide practical, step-by-step guidance for successful cultivation. ");
        prompt.append("Include only the most important recommendations. Keep it concise and helpful.");

        return prompt.toString();
    }


    private String createGeneralFarmingPrompt(CropAdvisoryRequest request) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are an expert agriculture advisor for Indian farmers.\n\n");
        prompt.append("Farmer's question: ").append(request.query != null ? request.query : "General farming advice").append("\n\n");

        prompt.append("Current soil conditions:\n");
        prompt.append(String.format("Nitrogen: %.2f\n", request.nitrogen));
        prompt.append(String.format("Phosphorus: %.2f\n", request.phosphorus));
        prompt.append(String.format("Potassium: %.2f\n", request.potassium));

        prompt.append("\nProvide comprehensive soil health improvement measures and fertilizer recommendations.\n");
        prompt.append("Focus on:\n");
        prompt.append("- Specific fertilizer types and quantities\n");
        prompt.append("- Application timing and methods\n");
        prompt.append("- Organic alternatives\n");
        prompt.append("- Deficiency symptom identification\n");
        prompt.append("- Long-term soil improvement strategies\n\n");
        prompt.append("This is specifically for soil monitoring advice, not general crop cultivation.");

        return prompt.toString();
    }

    private boolean shouldIncludeSoilParameters(String query) {
        if (query == null) return false;

        String lowerQuery = query.toLowerCase();
        return lowerQuery.contains("soil") ||
                lowerQuery.contains("मिट्टी") ||
                lowerQuery.contains("fertilizer") ||
                lowerQuery.contains("उर्वरक") ||
                lowerQuery.contains("nutrient");
    }

    private ResponseEntity<String> callGeminiAPI(String prompt) {
        try {
            // Create request body for Gemini API
            GeminiRequestBody requestBody = new GeminiRequestBody(
                    Arrays.asList(new Content(Arrays.asList(new Part(prompt))))
            );

            // Call Gemini API
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
                return ResponseEntity.ok("Try Again");
            } else {
                return ResponseEntity.status(rawResponse.getStatusCode())
                        .body("API error: " + rawResponse.getStatusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("API call error: " + e.getMessage());
        }
    }
}

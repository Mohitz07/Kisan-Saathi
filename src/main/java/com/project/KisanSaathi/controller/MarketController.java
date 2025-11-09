package com.project.KisanSaathi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/market")
public class MarketController {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    static class MarketRequest {
        public String crop;
        public String location;
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

    @PostMapping("/get-prices")
    public ResponseEntity<String> getMarketPrices(@RequestBody MarketRequest request) {
        try {
            // Create Gemini prompt with better structure
            String prompt = "Act as a market expert for Indian farmers. Provide the latest market prices for " + request.crop +
                    " in " + request.location + ". " +
                    "Structure your response with the following sections:\n" +
                    "1. Market Price Range (per quintal) - Show price ranges for different quality grades\n" +
                    "2. Key Factors Affecting Price\n" +
                    "3. Potential Buyers in " + request.location + "\n" +
                    "4. Selling Tips for Farmers\n" +
                    "5. Final Advice\n\n" +
                    "Make it specific to " + request.crop + " and use Indian Rupees (₹). Be practical and helpful.";

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

                        // Format the Gemini response as HTML
                        String htmlResponse = formatGeminiResponseToHtml(request.crop, request.location, generatedText);

                        // Escape JSON characters
                        String safeHtml = htmlResponse.replace("\\", "\\\\")
                                .replace("\"", "\\\"")
                                .replace("\n", "\\n");

                        return ResponseEntity.ok("{\"prices\": \"" + safeHtml + "\"}");
                    }
                }
                return ResponseEntity.ok("{\"prices\": \"<p>No data found for selected crop and location.</p>\"}");
            } else {
                return ResponseEntity.status(rawResponse.getStatusCode())
                        .body("{\"prices\": \"<p>API error: " + rawResponse.getStatusCode() + "</p>\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"prices\": \"<p>Server error: " + e.getMessage() + "</p>\"}");
        }
    }

    // Helper method to format Gemini's text response into structured HTML
    private String formatGeminiResponseToHtml(String crop, String location, String geminiText) {
        StringBuilder htmlResponse = new StringBuilder();

        htmlResponse.append("<div class='market-response'>");
        htmlResponse.append("<h3 class='crop-title'>").append(crop.toUpperCase()).append(" Market Information for ").append(location).append("</h3>");

        // Convert Gemini's text response to HTML with proper formatting
        // Split by lines and add appropriate HTML tags
        String[] lines = geminiText.split("\n");
        boolean inList = false;

        for (String line : lines) {
            line = line.trim();

            if (line.isEmpty()) {
                if (inList) {
                    htmlResponse.append("</ul>");
                    inList = false;
                }
                htmlResponse.append("<br/>");
                continue;
            }

            // Check if line is a heading (starts with ##, **, or is ALL CAPS with :)
            if (line.startsWith("##") || line.startsWith("**") ||
                    (line.matches("^[A-Z\\s]+:.*") && line.length() < 100)) {
                if (inList) {
                    htmlResponse.append("</ul>");
                    inList = false;
                }
                String heading = line.replaceAll("^#+\\s*", "")
                        .replaceAll("\\*\\*", "")
                        .replaceAll(":$", "");
                htmlResponse.append("<h4>").append(heading).append("</h4>");
            }
            // Check if line is a list item (starts with -, *, or digit.)
            else if (line.matches("^[-*•]\\s.*") || line.matches("^\\d+\\.\\s.*")) {
                if (!inList) {
                    htmlResponse.append("<ul>");
                    inList = true;
                }
                String listItem = line.replaceAll("^[-*•]\\s*", "")
                        .replaceAll("^\\d+\\.\\s*", "");
                htmlResponse.append("<li>").append(listItem).append("</li>");
            }
            // Regular paragraph
            else {
                if (inList) {
                    htmlResponse.append("</ul>");
                    inList = false;
                }
                htmlResponse.append("<p>").append(line).append("</p>");
            }
        }

        // Close any open list
        if (inList) {
            htmlResponse.append("</ul>");
        }

        htmlResponse.append("</div>");

        return htmlResponse.toString();
    }
}

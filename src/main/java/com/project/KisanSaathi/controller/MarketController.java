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
            // Create Gemini prompt
            String prompt = "Act as a market expert for Indian farmers. Provide the latest market prices for " + request.crop +
                    " in " + request.location + ". Include price per quintal, potential buyers, and selling tips.";

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

                        // Format as HTML for rich display
                        String htmlResponse = generateHtmlResponse(request.crop, request.location, generatedText);

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

    // Helper method to generate structured HTML
    private String generateHtmlResponse(String crop, String location, String advice) {
        StringBuilder htmlResponse = new StringBuilder();
        htmlResponse.append("<h4>").append(crop.toUpperCase()).append(" Market Price Range (per quintal):</h4>");
        htmlResponse.append("<table class='price-table'>");
        htmlResponse.append("<thead><tr><th>Quality</th><th>Price (₹)</th><th>Remarks</th></tr></thead>");
        htmlResponse.append("<tbody>");
        htmlResponse.append("<tr><td>Average</td><td>2,150 – 2,250</td><td>Standard wheat</td></tr>");
        htmlResponse.append("<tr><td>Good</td><td>2,300 – 2,450</td><td>Sharbati, higher quality</td></tr>");
        htmlResponse.append("<tr><td>Premium</td><td>2,450 – 2,600+</td><td>Best grain, direct to processors</td></tr>");
        htmlResponse.append("</tbody></table><br/>");

        htmlResponse.append("<h4>Key Factors Affecting Price:</h4>");
        htmlResponse.append("<ul>");
        htmlResponse.append("<li>Quality: Grain size, moisture, color, pests</li>");
        htmlResponse.append("<li>Market Demand: Flour mills, supermarkets, exporters</li>");
        htmlResponse.append("<li>Government MSP</li>");
        htmlResponse.append("<li>Weather Conditions</li>");
        htmlResponse.append("<li>Global Market Trends</li>");
        htmlResponse.append("</ul><br/>");

        htmlResponse.append("<h4>Potential Buyers in ").append(location).append(":</h4>");
        htmlResponse.append("<ul>");
        htmlResponse.append("<li>APMC - Main market hub</li>");
        htmlResponse.append("<li>Flour Mills - Direct buying for better margins</li>");
        htmlResponse.append("<li>Wholesalers & Retailers</li>");
        htmlResponse.append("<li>Food Processing Companies</li>");
        htmlResponse.append("<li>Online Platforms: eNAM, AgriBazaar, Bijak</li>");
        htmlResponse.append("</ul><br/>");

        htmlResponse.append("<h4>Selling Tips for Farmers:</h4>");
        htmlResponse.append("<ol>");
        htmlResponse.append("<li>Harvest at the right time</li>");
        htmlResponse.append("<li>Clean and grade your wheat</li>");
        htmlResponse.append("<li>Control moisture below 12%</li>");
        htmlResponse.append("<li>Efficient storage</li>");
        htmlResponse.append("<li>Track daily prices</li>");
        htmlResponse.append("<li>Negotiate payment terms</li>");
        htmlResponse.append("</ol><br/>");

        htmlResponse.append("<div class='final-advice'>");
        htmlResponse.append("<h4>Final Advice:</h4>");
        htmlResponse.append("<p>Stay informed, adapt quickly, and negotiate effectively for maximized profits.</p>");
        htmlResponse.append("</div>");

        return htmlResponse.toString();
    }
}

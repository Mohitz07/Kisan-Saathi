package com.project.KisanSaathi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/schemes")
public class SchemeController {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    // Request model
    public static class FetchRequest {
        public String state;
        public String lang;
    }

    static class Schema {
        public String type = "object";
        public PropertiesSchema properties;
        public List<String> required = Arrays.asList("schemes");

        static class PropertiesSchema {
            public SchemesSchema schemes;
        }

        static class SchemesSchema {
            public String type = "array";
            public ItemsSchema items;
        }

        static class ItemsSchema {
            public String type = "object";
            public Map<String, TypeSchema> properties = new HashMap<>();
            public List<String> required = Arrays.asList("title", "description", "link");
        }

        static class TypeSchema {
            public String type = "string";
        }
    }

    static class GeminiRequestBody {
        public List<Content> contents;
        public GenerationConfig generationConfig;

        public GeminiRequestBody(List<Content> contents) {
            this.contents = contents;
            this.generationConfig = new GenerationConfig();
        }

        static class GenerationConfig {
            public String responseMimeType = "application/json";
            public Schema responseSchema = new Schema();
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

    // NEW: GET endpoint for fetching schemes by state
    @GetMapping("/{state}")
    public ResponseEntity<String> getSchemesByState(@PathVariable String state) {
        try {
            // Create a fetch request with default language
            FetchRequest request = new FetchRequest();
            request.state = state;
            request.lang = "English"; // Default to English

            // Reuse the existing fetchSchemes logic
            return fetchSchemes(request);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    // Existing POST endpoint
    @PostMapping("/fetch")
    public ResponseEntity<String> fetchSchemes(@RequestBody FetchRequest request) {
        try {
            // Schema setup
            Schema.ItemsSchema itemsSchema = new Schema.ItemsSchema();
            Schema.TypeSchema titleSchema = new Schema.TypeSchema();
            Schema.TypeSchema descSchema = new Schema.TypeSchema();
            Schema.TypeSchema linkSchema = new Schema.TypeSchema();

            itemsSchema.properties.put("title", titleSchema);
            itemsSchema.properties.put("description", descSchema);
            itemsSchema.properties.put("link", linkSchema);

            Schema.PropertiesSchema propertiesSchema = new Schema.PropertiesSchema();
            propertiesSchema.schemes = new Schema.SchemesSchema();
            propertiesSchema.schemes.items = itemsSchema;

            Schema schema = new Schema();
            schema.properties = propertiesSchema;
            schema.required = Arrays.asList("schemes");

            String prompt = String.format(
                    "Generate a list of current agriculture schemes for %s in India. " +
                            "Answer in %s. Return answer in strict JSON format as requested.",
                    request.state, request.lang
            );

            GeminiRequestBody requestBody = new GeminiRequestBody(
                    Arrays.asList(new Content(Arrays.asList(new Part(prompt))))
            );
            requestBody.generationConfig.responseSchema = schema;

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
                return ResponseEntity.ok("{\"schemes\": []}");
            } else {
                return ResponseEntity.status(rawResponse.getStatusCode()).body(rawResponse.getBody());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}

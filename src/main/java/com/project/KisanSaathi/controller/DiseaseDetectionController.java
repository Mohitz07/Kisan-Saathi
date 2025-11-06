package com.project.KisanSaathi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.io.IOException;
import java.util.Base64;

@RestController
@RequestMapping("/api/disease")
public class DiseaseDetectionController {

    @Value("${kindwise.api.key}")
    private String apiKey;

    private static final String API_URL = "https://crop.kindwise.com/api/v1/identification";
    private static final long MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

    @PostMapping("/detect")
    public ResponseEntity<Map<String, Object>> detectDisease(
            @RequestParam("image") MultipartFile image
    ) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Validate image
            if (image.isEmpty()) {
                response.put("error", "No image provided");
                return ResponseEntity.badRequest().body(response);
            }

            if (image.getSize() > MAX_IMAGE_SIZE) {
                response.put("error", "Image size exceeds 10 MB");
                return ResponseEntity.badRequest().body(response);
            }

            // Convert image to base64
            byte[] imageBytes = image.getBytes();
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            // Detect MIME type
            String mimeType = image.getContentType();
            if (mimeType == null) {
                mimeType = "image/jpeg"; // default
            }
            String imagePrefix = "data:" + mimeType + ";base64,";

            // Prepare request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("images", Arrays.asList(imagePrefix + base64Image));
            requestBody.put("similar_images", true);

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Api-Key", apiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // Call Kindwise API
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> apiResponse = restTemplate.exchange(
                    API_URL,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            // Parse and return response
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> result = mapper.readValue(apiResponse.getBody(), Map.class);

            return ResponseEntity.ok(result);

        } catch (IOException e) {
            e.printStackTrace();
            response.put("error", "Failed to process image: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", "API call failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}

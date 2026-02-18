package com.accessai.backend.controller;

import com.accessai.backend.service.AiService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/description")
    public Map<String, String> getDescription(@RequestBody Map<String, String> request) {
        String prompt = request.get("prompt");
        String description = aiService.generateDescription(prompt);
        return Map.of("description", description);
    }
    
    @GetMapping("/role-description")
    public Map<String, String> getRoleDescription(@RequestParam String role) {
        String description = aiService.generateRoleDescription(role);
        return Map.of("role", role, "description", description);
    }
}

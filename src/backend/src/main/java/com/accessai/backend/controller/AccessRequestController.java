package com.accessai.backend.controller;

import com.accessai.backend.model.AccessRequest;
import com.accessai.backend.model.User;
import com.accessai.backend.repository.AccessRequestRepository;
import com.accessai.backend.repository.UserRepository;
import com.accessai.backend.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/requests")
public class AccessRequestController {

    private final AccessRequestRepository accessRequestRepository;
    private final UserRepository userRepository;
    private final AiService aiService;

    public AccessRequestController(AccessRequestRepository accessRequestRepository,
            UserRepository userRepository,
            AiService aiService) {
        this.accessRequestRepository = accessRequestRepository;
        this.userRepository = userRepository;
        this.aiService = aiService;
    }

    @PostMapping
    public ResponseEntity<?> submitRequest(@RequestBody Map<String, String> requestData) {
        Long userId = Long.valueOf(requestData.get("userId"));
        String applicationName = requestData.get("applicationName");
        String justification = requestData.get("justification");

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // AI Analysis
        AiService.AnalysisResult analysis = aiService.analyzeAccessRequest(
                user.getName(),
                user.getRole().name(),
                user.getDepartment(),
                applicationName,
                justification);

        AccessRequest accessRequest = new AccessRequest();
        accessRequest.setUser(user);
        accessRequest.setApplicationName(applicationName);
        accessRequest.setJustification(justification);
        accessRequest.setRiskLevel(analysis.riskLevel());
        accessRequest.setAiExplanation(analysis.explanation());
        accessRequest.setStatus(AccessRequest.Status.PENDING);

        AccessRequest saved = accessRequestRepository.save(accessRequest);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/pending")
    public List<AccessRequest> getPendingRequests() {
        return accessRequestRepository.findByStatus(AccessRequest.Status.PENDING);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> statusData) {
        AccessRequest accessRequest = accessRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        String statusStr = statusData.get("status");
        accessRequest.setStatus(AccessRequest.Status.valueOf(statusStr));

        AccessRequest saved = accessRequestRepository.save(accessRequest);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/user/{userId}")
    public List<AccessRequest> getUserRequests(@PathVariable Long userId) {
        return accessRequestRepository.findByUserId(userId);
    }
}

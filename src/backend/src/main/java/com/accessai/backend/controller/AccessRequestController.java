package com.accessai.backend.controller;

import com.accessai.backend.model.AccessRequest;
import com.accessai.backend.model.User;
import com.accessai.backend.repository.AccessRequestRepository;
import com.accessai.backend.repository.UserRepository;
import com.accessai.backend.service.AiService;
import com.accessai.backend.service.AuditLogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/requests")
public class AccessRequestController {

    private static final Logger logger = LoggerFactory.getLogger(AccessRequestController.class);

    private final AccessRequestRepository accessRequestRepository;
    private final UserRepository userRepository;
    private final AiService aiService;
    private final AuditLogService auditLogService;

    public AccessRequestController(AccessRequestRepository accessRequestRepository,
            UserRepository userRepository,
            AiService aiService,
            AuditLogService auditLogService) {
        this.accessRequestRepository = accessRequestRepository;
        this.userRepository = userRepository;
        this.aiService = aiService;
        this.auditLogService = auditLogService;
    }

    @PostMapping
    public ResponseEntity<?> submitRequest(@RequestBody Map<String, String> requestData) {
        try {
            Long userId = Long.valueOf(requestData.get("userId"));
            String applicationName = requestData.get("applicationName");
            String justification = requestData.get("justification");

            logger.info("Received request for user ID: {}", userId);

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
            accessRequest.setStatus(AccessRequest.Status.PENDING_MANAGER);

            AccessRequest saved = accessRequestRepository.save(accessRequest);
            logger.info("Request saved: {}", saved.getId());

            // Audit Log
            auditLogService.logAction(
                    user.getId(),
                    user.getEmail(),
                    "Access Request Submitted",
                    applicationName,
                    "pending",
                    "127.0.0.1", // In real app, get from request
                    analysis.explanation());

            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            logger.error("Error submitting request", e);
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body(Map.of("error", e.getMessage(), "trace", e.getStackTrace()[0].toString()));
        }
    }

    @GetMapping("/pending")
    public List<AccessRequest> getPendingRequests() {
        return accessRequestRepository.findByStatus(AccessRequest.Status.PENDING_MANAGER);
    }

    @GetMapping("/pending-security")
    public List<AccessRequest> getSecurityPendingRequests() {
        return accessRequestRepository.findByStatus(AccessRequest.Status.PENDING_SECURITY);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable("id") Long id, @RequestBody Map<String, String> payload) {
        AccessRequest accessRequest = accessRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        String action = payload.get("status"); // APPROVED, REJECTED
        String reviewerRolePayload = payload.get("reviewerRole"); // MANAGER, SECURITY_ADMIN
        Long reviewerId = Long.valueOf(payload.get("reviewerId")); // For audit

        // Fetch Reviewer User Object
        User reviewer = userRepository.findById(reviewerId)
                .orElseThrow(() -> new RuntimeException("Reviewer not found"));

        AccessRequest.Status newStatus;
        String auditAction;

        if ("REJECTED".equals(action)) {
            newStatus = AccessRequest.Status.REJECTED;
            String rejectionReason = payload.get("rejectionReason");

            if ("MANAGER".equals(reviewerRolePayload)) {
                accessRequest.setManager(reviewer);
            } else if ("SECURITY_ADMIN".equals(reviewerRolePayload)) {
                accessRequest.setSecurityAdmin(reviewer);
            }

            if (rejectionReason != null && !rejectionReason.isEmpty()) {
                accessRequest.setRejectionReason(rejectionReason);
                auditAction = "Access Request Rejected by " + reviewer.getName() + " (" + reviewerRolePayload + "): "
                        + rejectionReason;
            } else {
                auditAction = "Access Request Rejected by " + reviewerRolePayload;
            }
        } else {
            // Approval Logic
            if ("MANAGER".equals(reviewerRolePayload)) {
                accessRequest.setManager(reviewer);
                if ("High".equalsIgnoreCase(accessRequest.getRiskLevel())) {
                    newStatus = AccessRequest.Status.PENDING_SECURITY;
                    auditAction = "Manager Approved (Escalated to Security)";
                } else {
                    newStatus = AccessRequest.Status.APPROVED;
                    auditAction = "Access Request Approved by Manager";
                }
            } else if ("SECURITY_ADMIN".equals(reviewerRolePayload)) {
                accessRequest.setSecurityAdmin(reviewer);
                newStatus = AccessRequest.Status.APPROVED;
                auditAction = "Access Request Approved by Security Admin";
            } else {
                newStatus = AccessRequest.Status.APPROVED; // Default fallback
                auditAction = "Access Request Approved";
            }
        }

        accessRequest.setStatus(newStatus);
        AccessRequest saved = accessRequestRepository.save(accessRequest);

        // Audit Log
        auditLogService.logAction(
                reviewer.getId(),
                reviewer.getEmail(), // Use actual email instead of role
                auditAction,
                accessRequest.getApplicationName(),
                newStatus.name(),
                "127.0.0.1",
                accessRequest.getAiExplanation());

        return ResponseEntity.ok(saved);
    }

    @GetMapping("/user/{userId}")
    public List<AccessRequest> getUserRequests(@PathVariable("userId") Long userId) {
        return accessRequestRepository.findByUserId(userId);
    }

    @GetMapping("/history")
    public List<AccessRequest> getRequestHistory(@RequestParam(required = false) String role,
            @RequestParam(required = false) Long userId) {

        logger.info("Fetching history for Role: {}, UserId: {}", role, userId);

        try {
            // SAFE MODE: Fetch all and filter in memory to avoid Repository Method
            // derivation issues (AbstractMethodError)
            List<AccessRequest> allRequests = accessRequestRepository.findAll();

            if ("MANAGER".equals(role) && userId != null) {
                // Filter where manager.id == userId
                List<AccessRequest> filtered = allRequests.stream()
                        .filter(req -> req.getManager() != null && req.getManager().getId().equals(userId))
                        .toList();
                logger.info("Found {} requests for Manager {}", filtered.size(), userId);
                return filtered;
            } else if ("SECURITY_ADMIN".equals(role) && userId != null) {
                // Filter where securityAdmin.id == userId
                List<AccessRequest> filtered = allRequests.stream()
                        .filter(req -> req.getSecurityAdmin() != null && req.getSecurityAdmin().getId().equals(userId))
                        .toList();
                logger.info("Found {} requests for Security Admin {}", filtered.size(), userId);
                return filtered;
            }

            // Fallback - Return ALL requests (for Admin or client-side filtering fallback)
            logger.info("Returning all {} requests (Fallback/Admin)", allRequests.size());
            return allRequests;

        } catch (Exception e) {
            logger.error("ERROR_FETCHING_HISTORY: ", e);
            throw e;
        }
    }

    @GetMapping("/debug/error")
    public void triggerError() {
        throw new RuntimeException("Test 500 Error for Debugging");
    }
}

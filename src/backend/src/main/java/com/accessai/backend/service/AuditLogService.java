package com.accessai.backend.service;

import com.accessai.backend.model.AuditLog;
import com.accessai.backend.repository.AuditLogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditLogService {

    private static final Logger logger = LoggerFactory.getLogger(AuditLogService.class);

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void logAction(Long userId, String userEmail, String action, String application, String status,
            String ipAddress, String aiAnalysis) {
        logger.info("Audit Log: User={} Action='{}' App='{}' Status='{}'", userEmail, action, application, status);

        AuditLog log = new AuditLog();
        log.setUserId(userId);
        log.setUserEmail(userEmail);
        log.setAction(action);
        log.setApplication(application);
        log.setStatus(status);
        log.setIpAddress(ipAddress);
        log.setAiAnalysis(aiAnalysis);
        log.setTimestamp(LocalDateTime.now());

        auditLogRepository.save(log);
    }

    public List<AuditLog> getAllLogs() {
        logger.debug("Fetching all audit logs");
        return auditLogRepository.findAllByOrderByTimestampDesc();
    }
}

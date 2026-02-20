package com.accessai.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String action; // e.g., "Access Request Approved", "Role Changed"

    @Column(nullable = false)
    private String application; // e.g., "Salesforce", "User Management"

    @Column(nullable = false)
    private String status; // "success", "rejected"

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "ai_analysis", length = 2000)
    private String aiAnalysis;

    @PrePersist
    protected void onCreate() {
        if (timestamp == null) {
            timestamp = LocalDateTime.now();
        }
    }
}

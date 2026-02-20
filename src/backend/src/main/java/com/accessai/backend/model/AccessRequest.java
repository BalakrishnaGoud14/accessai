package com.accessai.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "access_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccessRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String applicationName;

    @Column(nullable = false, length = 1000)
    private String justification;

    @Column(nullable = false)
    private String riskLevel; // Low, Medium, High

    @Column(nullable = false, length = 2000)
    private String aiExplanation;

    @Column(nullable = true, length = 1000)
    private String rejectionReason;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @ManyToOne
    @JoinColumn(name = "security_admin_id")
    private User securityAdmin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public enum Status {
        PENDING_MANAGER, PENDING_SECURITY, APPROVED, REJECTED;

        // Helper specifically for legacy support if needed, or mapped from frontend
        // "PENDING"
        public static Status fromLegacy(String status) {
            if ("PENDING".equalsIgnoreCase(status))
                return PENDING_MANAGER;
            return valueOf(status);
        }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) {
            status = Status.PENDING_MANAGER;
        }
    }
}

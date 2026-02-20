package com.accessai.backend.repository;

import com.accessai.backend.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    // Determine sort order if needed, e.g. findByOrderByTimestampDesc()
    List<AuditLog> findAllByOrderByTimestampDesc();
}

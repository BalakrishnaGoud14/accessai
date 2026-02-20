package com.accessai.backend.repository;

import com.accessai.backend.model.AccessRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccessRequestRepository extends JpaRepository<AccessRequest, Long> {
    @org.springframework.data.jpa.repository.EntityGraph(attributePaths = { "user", "manager", "securityAdmin" })
    List<AccessRequest> findByStatus(AccessRequest.Status status);

    @org.springframework.data.jpa.repository.EntityGraph(attributePaths = { "user", "manager", "securityAdmin" })
    List<AccessRequest> findByUserId(Long userId);

    @org.springframework.data.jpa.repository.EntityGraph(attributePaths = { "user", "manager", "securityAdmin" })
    List<AccessRequest> findAll();

    @org.springframework.data.jpa.repository.EntityGraph(attributePaths = { "user", "manager", "securityAdmin" })
    List<AccessRequest> findByManagerId(Long managerId);

    @org.springframework.data.jpa.repository.EntityGraph(attributePaths = { "user", "manager", "securityAdmin" })
    List<AccessRequest> findBySecurityAdminId(Long securityAdminId);
}

package com.accessai.backend.repository;

import com.accessai.backend.model.AccessRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccessRequestRepository extends JpaRepository<AccessRequest, Long> {
    List<AccessRequest> findByStatus(AccessRequest.Status status);

    List<AccessRequest> findByUserId(Long userId);
}

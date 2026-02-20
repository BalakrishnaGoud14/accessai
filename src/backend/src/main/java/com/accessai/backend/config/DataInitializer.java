package com.accessai.backend.config;

import com.accessai.backend.model.User;
import com.accessai.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder,
            org.springframework.jdbc.core.JdbcTemplate jdbcTemplate) {
        return args -> {
            // Fix legacy status
            try {
                // Drop outdated check constraint to allow new enum values
                jdbcTemplate
                        .execute("ALTER TABLE access_requests DROP CONSTRAINT IF EXISTS access_requests_status_check");
                logger.info("Dropped outdated check constraint access_requests_status_check");

                jdbcTemplate.update("UPDATE access_requests SET status = 'PENDING_MANAGER' WHERE status = 'PENDING'");
                logger.info("Migrated legacy PENDING requests to PENDING_MANAGER");
            } catch (Exception e) {
                logger.warn("Migration/Constraint fix skipped or failed: {}", e.getMessage());
            }

            // Admin
            if (!userRepository.existsByEmail("admin@accessai.com")) {
                User admin = new User();
                admin.setEmail("admin@accessai.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setName("Admin User");
                admin.setDepartment("IT");
                admin.setRole(User.Role.ADMIN);
                admin.setJoinedDate(LocalDate.now().toString());
                userRepository.save(admin);
                logger.info("Admin user created: admin@accessai.com");
            }

            // Manager
            if (!userRepository.existsByEmail("manager@accessai.com")) {
                User manager = new User();
                manager.setEmail("manager@accessai.com");
                manager.setPassword(passwordEncoder.encode("manager123"));
                manager.setName("Manager User");
                manager.setDepartment("Engineering");
                manager.setRole(User.Role.MANAGER);
                manager.setJoinedDate(LocalDate.now().toString());
                userRepository.save(manager);
                logger.info("Manager user created: manager@accessai.com");
            }

            // Security Admin
            if (!userRepository.existsByEmail("security@accessai.com")) {
                User security = new User();
                security.setEmail("security@accessai.com");
                security.setPassword(passwordEncoder.encode("security123"));
                security.setName("Security Admin");
                security.setDepartment("Security");
                security.setRole(User.Role.SECURITY_ADMIN);
                security.setJoinedDate(LocalDate.now().toString());
                userRepository.save(security);
                logger.info("Security Admin user created: security@accessai.com");
            }

            // Employee
            if (!userRepository.existsByEmail("employee@accessai.com")) {
                User employee = new User();
                employee.setEmail("employee@accessai.com");
                employee.setPassword(passwordEncoder.encode("employee123"));
                employee.setName("John Employee");
                employee.setDepartment("Sales");
                employee.setRole(User.Role.EMPLOYEE);
                employee.setJoinedDate(LocalDate.now().toString());
                userRepository.save(employee);
                logger.info("Employee user created: employee@accessai.com");
            }
        };
    }
}

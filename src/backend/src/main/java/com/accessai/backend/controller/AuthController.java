package com.accessai.backend.controller;

import com.accessai.backend.model.User;
import com.accessai.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {
        logger.info("Attempting to register user with email: {}", user.getEmail());
        if (userRepository.existsByEmail(user.getEmail())) {
            logger.warn("Registration failed: Email {} already exists", user.getEmail());
            return Map.of("success", false, "error", "Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setJoinedDate(LocalDate.now().toString());
        // Default department if not provided
        if (user.getDepartment() == null || user.getDepartment().isBlank()) {
            user.setDepartment("General");
        }
        // Always assign EMPLOYEE role by default
        user.setRole(User.Role.EMPLOYEE);
        userRepository.save(user);
        logger.info("User registered successfully: {}", user.getEmail());
        return Map.of("success", true, "message", "User registered successfully");
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        // Don't log passwords!

        logger.debug("Login attempt for email: {}", email);

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && passwordEncoder.matches(credentials.get("password"), userOpt.get().getPassword())) {
            User user = userOpt.get();
            logger.info("User logged in successfully: {}", email);
            // In a real app, return JWT here. For now, returning user details (excluding
            // password)
            return Map.of(
                    "success", true,
                    "user", Map.of(
                            "id", user.getId(),
                            "name", user.getName(),
                            "email", user.getEmail(),
                            "role", user.getRole(),
                            "department", user.getDepartment()));
        }
        logger.warn("Login failed for email: {} - Invalid credentials", email);
        return Map.of("success", false, "error", "Invalid credentials");
    }
}

package com.accessai.backend.controller;

import com.accessai.backend.model.User;
import com.accessai.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/{id}/role")
    public Map<String, Object> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return userRepository.findById(id).map(user -> {
            try {
                User.Role newRole = User.Role.valueOf(payload.get("role"));
                user.setRole(newRole);
                userRepository.save(user);
                return Map.<String, Object>of("success", true, "user", user);
            } catch (IllegalArgumentException e) {
                return Map.<String, Object>of("success", false, "error", "Invalid role");
            }
        }).orElse(Map.of("success", false, "error", "User not found"));
    }
}

package com.demo.personalfinancetracker.controller;

import com.demo.personalfinancetracker.model.User;
import com.demo.personalfinancetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String name = body.get("name");
        if (username == null || password == null || name == null) {
            return ResponseEntity.badRequest().body("username, name and password required");
        }
        if (userRepository.existsByUsername(username)) {
            return ResponseEntity.status(409).body("username already exists");
        }
        User user = new User();
        user.setUsername(username);
        user.setName(name);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        Map<String, Object> resp = new HashMap<>();
        resp.put("id", user.getId());
        resp.put("username", user.getUsername());
        resp.put("name", user.getName());
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("username and password required");
        }
        return userRepository.findByUsername(username)
                .map(user -> {
                    if (passwordEncoder.matches(password, user.getPassword())) {
                        Map<String, Object> resp = new HashMap<>();
                        resp.put("id", user.getId());
                        resp.put("username", user.getUsername());
                        resp.put("name", user.getName());
                        return ResponseEntity.ok(resp);
                    } else {
                        return ResponseEntity.status(401).body("invalid credentials");
                    }
                })
                .orElse(ResponseEntity.status(401).body("invalid credentials"));
    }
}

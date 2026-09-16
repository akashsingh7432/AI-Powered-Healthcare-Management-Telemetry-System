package com.healthcare.telemetry.controller;

import com.healthcare.telemetry.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public static class LoginRequest {
        private String email;
        private String password;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Mock authentication for initial setup
        if ("doctor@clinic.com".equals(request.getEmail()) && "password".equals(request.getPassword())) {
            UserDetails user = User.builder()
                    .username("doctor@clinic.com")
                    .password("{noop}password")
                    .roles("DOCTOR")
                    .build();
            
            String token = jwtUtil.generateToken(user);
            
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", "DOCTOR");
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}

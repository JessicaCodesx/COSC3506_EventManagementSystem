package com.event.backend.controller;

import com.event.backend.model.User;
import com.event.backend.model.UserRole;
import com.event.backend.repository.UserRepository;
import com.event.backend.security.JwtUtil;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthController authController;

    public AuthControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSuccessfulLogin() {
        User user = new User();
        user.setEmail("admin@ems.com");
        user.setPassword("encodedpass");
        user.setRole(UserRole.ADMIN);

        when(userRepository.findByEmail("admin@ems.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("rawpass", "encodedpass")).thenReturn(true);
        when(jwtUtil.generateToken("admin@ems.com", "ADMIN")).thenReturn("mocked.jwt.token");

        ResponseEntity<?> response = authController.login(Map.of(
                "email", "admin@ems.com",
                "password", "rawpass"
        ));

        assertEquals(200, response.getStatusCodeValue());
        Map<?, ?> body = (Map<?, ?>) response.getBody();
        assertEquals("mocked.jwt.token", body.get("token"));
        assertEquals("ADMIN", body.get("role"));
    }

    @Test
    public void testInvalidLogin() {
        when(userRepository.findByEmail("missing@ems.com")).thenReturn(Optional.empty());

        ResponseEntity<?> response = authController.login(Map.of(
                "email", "missing@ems.com",
                "password", "nopass"
        ));

        assertEquals(401, response.getStatusCodeValue());
    }
}
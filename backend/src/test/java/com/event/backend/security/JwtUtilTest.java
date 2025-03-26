package com.event.backend.security;

import com.event.backend.model.UserRole;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class JwtUtilTest {

    private final JwtUtil jwtUtil = new JwtUtil();

    @Test
    public void testGenerateAndValidateToken() {
        String email = "test@ems.com";
        String role = UserRole.ADMIN.name();

        String token = jwtUtil.generateToken(email, role);

        assertNotNull(token);
        assertTrue(jwtUtil.isValid(token));
        assertEquals(email, jwtUtil.getEmail(token));
        assertEquals(role, jwtUtil.getRole(token));
    }

    @Test
    public void testInvalidToken() {
        String invalidToken = "not.a.real.token";

        assertFalse(jwtUtil.isValid(invalidToken));
    }
}

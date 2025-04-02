package com.event.backend.config;

import com.event.backend.model.User;
import com.event.backend.model.UserRole;
import com.event.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class ApplicationInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create admin user if it doesn't exist
        if (userRepository.findByEmail("admin@example.com").isEmpty()) {
            User admin = new User();
            admin.setFirstName("System");
            admin.setLastName("Admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("Admin123"));
            admin.setRole(UserRole.ADMIN);
            userRepository.save(admin);
            System.out.println("Admin user created");
        }
        
        // Create test client
        if (userRepository.findByEmail("client@example.com").isEmpty()) {
            User client = new User();
            client.setFirstName("Test");
            client.setLastName("Client");
            client.setEmail("client@example.com");
            client.setPassword(passwordEncoder.encode("Client123"));
            client.setRole(UserRole.CLIENT);
            client.setPhoneNumber("123-456-7890");
            userRepository.save(client);
            System.out.println("Test client created");
        }
        
        // Create test vendor
        if (userRepository.findByEmail("vendor@example.com").isEmpty()) {
            User vendor = new User();
            vendor.setFirstName("Test");
            vendor.setLastName("Vendor");
            vendor.setEmail("vendor@example.com");
            vendor.setPassword(passwordEncoder.encode("Vendor123"));
            vendor.setRole(UserRole.VENDOR);
            vendor.setPhoneNumber("987-654-3210");
            userRepository.save(vendor);
            System.out.println("Test vendor created");
        }
    }
}
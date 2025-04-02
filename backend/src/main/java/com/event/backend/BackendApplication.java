package com.event.backend;

import com.event.backend.model.User;
import com.event.backend.model.UserRole;
import com.event.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner run(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
		return args -> {
			// Create admin user if not exists
			if (userRepository.findByEmail("admin@example.com").isEmpty()) {
				User admin = new User();
				admin.setFirstName("System");
				admin.setLastName("Admin");
				admin.setEmail("admin@example.com");
				admin.setPassword(passwordEncoder.encode("Admin123"));
				admin.setRole(UserRole.ADMIN);
				userRepository.save(admin);
				System.out.println("Admin user created successfully");
			}

			// Create test client if not exists
			if (userRepository.findByEmail("client@example.com").isEmpty()) {
				User client = new User();
				client.setFirstName("Test");
				client.setLastName("Client");
				client.setEmail("client@example.com");
				client.setPassword(passwordEncoder.encode("Client123"));
				client.setRole(UserRole.CLIENT);
				userRepository.save(client);
				System.out.println("Test client created successfully");
			}

			// Create test vendor if not exists
			if (userRepository.findByEmail("vendor@example.com").isEmpty()) {
				User vendor = new User();
				vendor.setFirstName("Test");
				vendor.setLastName("Vendor");
				vendor.setEmail("vendor@example.com");
				vendor.setPassword(passwordEncoder.encode("Vendor123"));
				vendor.setRole(UserRole.VENDOR);
				userRepository.save(vendor);
				System.out.println("Test vendor created successfully");
			}

			// Create test staff if not exists
			if (userRepository.findByEmail("staff@example.com").isEmpty()) {
				User staff = new User();
				staff.setFirstName("Test");
				staff.setLastName("Staff");
				staff.setEmail("staff@example.com");
				staff.setPassword(passwordEncoder.encode("Staff123"));
				staff.setRole(UserRole.STAFF);
				userRepository.save(staff);
				System.out.println("Test staff created successfully");
			}
		};
	}
}
package com.event.backend.config;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.event.backend.model.Event;
import com.event.backend.model.EventAssignment;
import com.event.backend.model.EventStatus;
import com.event.backend.model.Invoice;
import com.event.backend.model.InvoiceStatus;
import com.event.backend.model.Payment;
import com.event.backend.model.User;
import com.event.backend.model.UserRole;
import com.event.backend.repository.EventAssignmentRepository;
import com.event.backend.repository.EventRepository;
import com.event.backend.repository.InvoiceRepository;
import com.event.backend.repository.PaymentRepository;
import com.event.backend.repository.UserRepository;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private InvoiceRepository invoiceRepository;
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private EventAssignmentRepository assignmentRepository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Only seed if the database is empty
        if (userRepository.count() > 0) {
            return;
        }
        
        // Create users
        User admin = createUser("Admin", "User", "admin@example.com", "Admin123", UserRole.ADMIN);
        User client1 = createUser("John", "Doe", "client@example.com", "Client123", UserRole.CLIENT);
        User client2 = createUser("Jane", "Smith", "jane@example.com", "Client123", UserRole.CLIENT);
        User vendor1 = createUser("Catering", "Services", "vendor@example.com", "Vendor123", UserRole.VENDOR);
        User vendor2 = createUser("Decoration", "Pro", "decor@example.com", "Vendor123", UserRole.VENDOR);
        User staff1 = createUser("Event", "Staff", "staff@example.com", "Staff123", UserRole.STAFF);
        
        // Create events
        Event event1 = createEvent("Corporate Conference", "Downtown Conference Center", 
                LocalDateTime.now().plusDays(30), EventStatus.SCHEDULED, client1, "flat_rate", 2500.0);
        
        Event event2 = createEvent("Wedding Reception", "Grand Hotel", 
                LocalDateTime.now().plusDays(60), EventStatus.SCHEDULED, client2, "per_attendee", 75.0);
        
        Event event3 = createEvent("Product Launch", "Tech Hub", 
                LocalDateTime.now().minusDays(15), EventStatus.COMPLETED, client1, "flat_rate", 5000.0);
        
        // Add ratings to completed events
        event3.addRating(4);
        event3.addRating(5);
        event3.addRating(4);
        eventRepository.save(event3);
        
        // Create invoices
        Invoice invoice1 = createInvoice(event1, client1, 2500.0, InvoiceStatus.DUE, 
                LocalDateTime.now().plusDays(15));
        
        Invoice invoice2 = createInvoice(event2, client2, 7500.0, InvoiceStatus.DUE, 
                LocalDateTime.now().plusDays(30));
        
        Invoice invoice3 = createInvoice(event3, client1, 5000.0, InvoiceStatus.PAID, 
                LocalDateTime.now().minusDays(20));
        
        // Create payments
        createPayment(invoice3, 5000.0, LocalDate.now().minusDays(10), "Credit Card");
        
        // Create event assignments
        createAssignment(event1, vendor1, null, "Catering");
        createAssignment(event1, null, staff1, "Event Coordinator");
        createAssignment(event2, vendor1, null, "Catering");
        createAssignment(event2, vendor2, null, "Decoration");
        createAssignment(event3, vendor1, null, "Catering");
        createAssignment(event3, vendor2, null, "Decoration");
        
        System.out.println("Database seeded successfully with test data!");
    }
    
    private User createUser(String firstName, String lastName, String email, String password, UserRole role) {
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setPhoneNumber("123-456-7890");
        return userRepository.save(user);
    }
    
    private Event createEvent(String name, String location, LocalDateTime date, EventStatus status, 
                              User client, String pricingType, Double basePrice) {
        Event event = new Event();
        event.setEventName(name);
        event.setLocation(location);
        event.setEventDate(date);
        event.setStatus(status);
        event.setClient(client);
        event.setPricingType(pricingType);
        event.setBasePrice(basePrice);
        return eventRepository.save(event);
    }
    
    private Invoice createInvoice(Event event, User client, Double amount, InvoiceStatus status, 
                                 LocalDateTime dueDate) {
        Invoice invoice = new Invoice();
        invoice.setEvent(event);
        invoice.setClient(client);
        invoice.setTotalAmount(amount);
        invoice.setStatus(status);
        invoice.setDueDate(dueDate);
        invoice.setCreatedAt(LocalDateTime.now());
        return invoiceRepository.save(invoice);
    }
    
    private Payment createPayment(Invoice invoice, Double amount, LocalDate date, String method) {
        Payment payment = new Payment();
        payment.setInvoice(invoice);
        payment.setAmountPaid(amount);
        payment.setPaymentDate(date);
        payment.setPaymentMethod(method);
        return paymentRepository.save(payment);
    }
    
    private EventAssignment createAssignment(Event event, User vendor, User staff, String role) {
        EventAssignment assignment = new EventAssignment();
        assignment.setEvent(event);
        assignment.setVendor(vendor);
        assignment.setStaff(staff);
        assignment.setRole(role);
        return assignmentRepository.save(assignment);
    }
}
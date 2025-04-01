package com.event.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_assignments")
public class EventAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many assignments → 1 event
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    // Optional: Vendor
    @ManyToOne
    @JoinColumn(name = "vendor_id", nullable = true)
    private User vendor;

    // Optional: Staff
    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = true)
    private User staff;

    private String role; // e.g., "Catering", "AV Tech", "MC", etc.

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public User getVendor() {
        return vendor;
    }

    public void setVendor(User vendor) {
        this.vendor = vendor;
    }

    public User getStaff() {
        return staff;
    }

    public void setStaff(User staff) {
        this.staff = staff;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
